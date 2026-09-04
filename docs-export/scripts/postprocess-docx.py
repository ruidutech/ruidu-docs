#!/usr/bin/env python3
"""pandoc docx 后处理（实例级属性，reference-doc 样式模板覆盖不到的部分）

- 表格: pandoc 给每个表写 tblW=100% + fixed 布局 → 改为 auto + autofit，
  即 Word 的「根据内容调整表格」；--no-table-autofit 跳过
- 表格间距: 表后插入 7pt 固定高小空段（比整行空行小，段前后内容样式不受影响）
- 链接: 内部锚点链接补 w:history="1"（WPS 仅认带该属性的 anchor 元素形式，
  缺失时按外部文件处理导致跳转失效；Word 有无该属性均可跳转）
- 目录: TOC 域去掉 w:dirty（打开文档不再提示更新域）并预生成缓存条目，
  页码为排版估算值，需精确时手动 F9 刷新
- 封面: --cover-* 参数提供时，替换 pandoc 的 Title 段为品牌封面
  （logo + 品牌名 / 产品手册标题 / 页底锚定的年月）
- 列表: 一级/二级/三级 bullet 由 Symbol/Wingdings/Courier New 私有区字符
  换为 Unicode •/○/▪ 并移除专用字体依赖（marker 继承正文字体，WPS/macOS 兼容）

用法: python3 scripts/postprocess-docx.py <file.docx> [--no-table-autofit]
          [--cover-logo <png>] [--cover-brand <品牌名>]
          [--cover-title <标题行>] [--cover-date <年月>]
"""

import math
import re
import struct
import sys
import zipfile

# 与 templates/make-reference.py 中 Table 样式的 tblInd 保持一致（twips）
TBL_IND = 108

# 表格后间距空段：7pt 固定行高 + 1pt 字号（行高不被字体撑大）
TBL_SPACER = ('<w:p><w:pPr><w:spacing w:before="0" w:after="0" w:line="140"'
              ' w:lineRule="exact" /><w:rPr><w:sz w:val="2" /><w:szCs w:val="2"'
              ' /></w:rPr></w:pPr></w:p>')

# A4 + 1 英寸页边距：pandoc 输出的 sectPr 不含页面尺寸（由打开端默认值决定，
# Word/WPS/区域设置不同会导致排版不一致），显式写入统一几何
PAGE_GEOM = ('<w:pgSz w:w="11906" w:h="16838" />'
             '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"'
             ' w:header="720" w:footer="720" w:gutter="0" />')


def patch_document(xml, table_autofit, has_cover=False):
    if not re.search(r'<w:pgSz ', xml):
        xml = re.sub(r'(</w:footnotePr>\s*)(</w:sectPr>)',
                     r'\1' + PAGE_GEOM + r'\2', xml, count=1)
    if table_autofit:
        xml = re.sub(r'<w:tblW w:type="pct" w:w="\d+"\s*/>',
                     '<w:tblW w:type="auto" w:w="0" />', xml)
        xml = re.sub(r'<w:tblLayout w:type="fixed"\s*/>',
                     '<w:tblLayout w:type="autofit" />', xml)
        # tblInd 语义补偿：表宽起点右移 cellMar 后，gridCol 总宽等比缩去同量，避免宽表右侧超界
        xml = re.sub(r'<w:tblGrid>(.*?)</w:tblGrid>', _shrink_grid, xml, flags=re.DOTALL)

    # pandoc 把书签放在 body 层级（段落外），WPS 对段外书签定位不稳；
    # 规范化为段内书签：Start 移入其后首个段落 pPr 之后，End 移入其前段落末尾
    # （先于表格间距插入执行，否则 spacer 空段会插在书签与标题之间，
    #   书签被移进 spacer 段导致标题失去跳转锚点）
    xml = _normalize_bookmarks(xml)

    # 表格与后续内容间插入小间距（跳过中间的书签标记；文档末尾不加）
    xml = re.sub(
        r'(</w:tbl>)((?:\s*<w:bookmark(?:Start|End)[^>]*/>)*)(\s*)(?=<w:p[ >]|<w:tbl>)',
        r'\1\2\3' + TBL_SPACER + r'\3', xml)

    # 内部锚点链接补 w:history="1"（WPS 仅认带该属性的元素形式，见模块 docstring）
    xml = re.sub(r'<w:hyperlink ([^>]*)>(.*?)</w:hyperlink>', _add_history,
                 xml, flags=re.DOTALL)

    xml = _cache_toc(xml, has_cover)
    return xml


def _normalize_bookmarks(xml):
    # Start 组移入后续段落内（pPr 之后）
    xml = re.sub(
        r'((?:<w:bookmarkStart w:id="\d+" w:name="[^"]+" />\s*)+)(<w:p>)((?:<w:pPr>(?:(?!</w:pPr>).)*</w:pPr>)?)',
        lambda m: m.group(2) + m.group(3) + m.group(1).strip(), xml, flags=re.DOTALL)
    # End 组移入前面段落末尾（</w:p> 前）
    xml = re.sub(
        r'</w:p>((?:\s*<w:bookmarkEnd w:id="\d+" />)+)',
        lambda m: m.group(1).strip() + '</w:p>', xml)
    return xml


def _add_history(match):
    attrs, inner = match.group(1), match.group(2)
    if 'w:anchor=' not in attrs or 'w:history=' in attrs:
        return match.group(0)
    return '<w:hyperlink %s w:history="1">%s</w:hyperlink>' % (attrs.strip(), inner)


# ── 目录缓存（去 dirty + 预生成条目） ──────────────────────────
TWIPS_PER_EMU = 635

# 标题行高 / 段前后间距（twips），与 templates/make-reference.py 的样式参数对应
HEADING_H = {'Heading1': (528, 560), 'Heading2': (384, 520),
             'Heading3': (336, 420), 'Heading4': (288, 360)}


def _xml_escape(text):
    return text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def _xml_unescape(text):
    return (text.replace('&lt;', '<').replace('&gt;', '>')
                .replace('&quot;', '"').replace('&amp;', '&'))


def _sect_geometry(xml):
    """从 sectPr 取页面/页边距，得文本宽度与可用高度（twips）"""
    pg = re.search(r'<w:pgSz [^>]*/>', xml)
    mar = re.search(r'<w:pgMar [^>]*/>', xml)
    page_w = int(re.search(r'w:w="(\d+)"', pg.group(0)).group(1))
    page_h = int(re.search(r'w:h="(\d+)"', pg.group(0)).group(1))
    mtop = int(re.search(r'w:top="(\d+)"', mar.group(0)).group(1))
    mbot = int(re.search(r'w:bottom="(\d+)"', mar.group(0)).group(1))
    mleft = int(re.search(r'w:left="(\d+)"', mar.group(0)).group(1))
    mright = int(re.search(r'w:right="(\d+)"', mar.group(0)).group(1))
    return page_w - mleft - mright, page_h - mtop - mbot


def _text_units(text):
    """排版宽度估算单位：CJK 记 2，其余记 1"""
    return sum(2 if ord(ch) > 0x2E80 else 1 for ch in text)


def _block_height(tok, text_w):
    """估算块元素高度（twips）：仅用于目录页码，不求精确"""
    if tok.startswith('<w:tbl'):
        return len(re.findall(r'<w:tr[ >]', tok)) * 460 + 140
    style_m = re.search(r'<w:pStyle w:val="([^"]+)"', tok)
    style = style_m.group(1) if style_m else 'BodyText'
    ext = re.search(r'<wp:extent cx="(\d+)" cy="(\d+)"', tok)
    if ext:
        cx, cy = int(ext.group(1)), int(ext.group(2))
        if cx > text_w * TWIPS_PER_EMU:  # 超出文本宽度的图片按比例折算高度
            cy = cy * text_w * TWIPS_PER_EMU // cx
        return cy / TWIPS_PER_EMU + 400
    text = _xml_unescape(''.join(re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>', tok)))
    units = _text_units(text)
    if style in HEADING_H:
        lh, sp = HEADING_H[style]
        return lh + sp
    if style == 'Compact':
        return max(1, math.ceil(units / 80)) * 292 + 72
    if style == 'SourceCode':
        lines = max(tok.count('<w:br />') + 1, math.ceil(units / 86))
        return lines * 260 + 240
    if style == 'BlockText':
        return max(1, math.ceil(units / 78)) * 380 + 240
    return max(1, math.ceil(units / 80)) * 380 + 200


def _cache_toc(xml, has_cover=False):
    """TOC 域展开为带缓存条目的形式：去掉 w:dirty（打开不提示更新域），
    条目带锚点链接与估算页码；Word/WPS 中 F9 可整域重算为精确值"""
    m = re.search(r'<w:docPartGallery w:val="Table of Contents"', xml)
    if not m:
        return xml
    sdt_end = xml.find('</w:sdt>', m.start())
    body = xml[sdt_end:]
    text_w, avail = _sect_geometry(xml)

    # body 顶层块序列（表格优先整体匹配，段内段落不单独出现）
    tokens = re.findall(r'<w:tbl>.*?</w:tbl>|<w:p(?: [^>]*)?>.*?</w:p>',
                        body, flags=re.DOTALL)

    # 目录自身占的页数（条目数 × 单条高度），决定正文起始页；
    # 封面独占第 1 页（TOCHeading 样式 pageBreakBefore），目录从第 2 页起
    n_entries = sum(1 for t in tokens
                    if re.search(r'<w:pStyle w:val="Heading[12]"', t))
    head = 700 if has_cover else 3300  # 目录页首行前的标题/封面残留高度
    toc_pages = math.ceil((head + n_entries * 412) / avail)

    headings = []  # (bookmark, escaped text, level, estimated page)
    page, used = (2 if has_cover else 1) + toc_pages, 0
    for tok in tokens:
        if not tok.startswith('<w:tbl'):
            style_m = re.search(r'<w:pStyle w:val="(Heading[1-4])"', tok)
            if style_m and style_m.group(1) == 'Heading1' and used > 0:
                page += 1  # Heading1 样式 pageBreakBefore，章节起新页
                used = 0
            if style_m and style_m.group(1) in ('Heading1', 'Heading2'):
                bm = re.search(r'<w:bookmarkStart w:id="\d+" w:name="([^"]+)"', tok)
                if bm:
                    text = _xml_escape(_xml_unescape(''.join(
                        re.findall(r'<w:t(?: [^>]*)?>([^<]*)</w:t>', tok))))
                    headings.append((bm.group(1), text,
                                     1 if style_m.group(1) == 'Heading1' else 2, page))
        used += _block_height(tok, text_w)
        while used > avail:
            used -= avail
            page += 1

    if not headings:
        return xml

    # Word 原生 TOC 结构：begin/instrText/separate 在首条目段首，end 在末条目段尾
    tab = '<w:tabs><w:tab w:val="right" w:leader="dot" w:pos="%d" /></w:tabs>' % text_w
    np_ = '<w:rPr><w:noProof /></w:rPr>'
    paras = []
    for i, (name, text, lvl, pg) in enumerate(headings):
        head = ('<w:r><w:fldChar w:fldCharType="begin" /></w:r>'
                '<w:r><w:instrText xml:space="preserve"> TOC \\o &quot;1-2&quot;'
                ' \\h \\z \\u </w:instrText></w:r>'
                '<w:r><w:fldChar w:fldCharType="separate" /></w:r>') if i == 0 else ''
        entry = ('<w:hyperlink w:anchor="%s" w:history="1">'
                 '<w:r>%s<w:t xml:space="preserve">%s</w:t></w:r>'
                 '<w:r>%s<w:tab /></w:r>'
                 '<w:r>%s<w:fldChar w:fldCharType="begin" /></w:r>'
                 '<w:r>%s<w:instrText xml:space="preserve"> PAGEREF %s \\h '
                 '</w:instrText></w:r>'
                 '<w:r>%s<w:fldChar w:fldCharType="separate" /></w:r>'
                 '<w:r>%s<w:t>%d</w:t></w:r>'
                 '<w:r>%s<w:fldChar w:fldCharType="end" /></w:r>'
                 '</w:hyperlink>') % (name, np_, text, np_, np_, np_, name,
                                      np_, np_, pg, np_)
        tail = ('<w:r><w:fldChar w:fldCharType="end" /></w:r>'
                if i == len(headings) - 1 else '')
        paras.append('<w:p><w:pPr><w:pStyle w:val="TOC%d" />%s</w:pPr>%s%s%s</w:p>'
                     % (lvl, tab, head, entry, tail))

    fp = re.search(r'<w:p>(?:(?!</w:p>).)*?<w:instrText[^>]*>\s*TOC '
                   r'(?:(?!</w:p>).)*?</w:p>', xml[m.start():sdt_end], re.DOTALL)
    if not fp:
        return xml
    span_start, span_end = m.start() + fp.start(), m.start() + fp.end()
    return xml[:span_start] + ''.join(paras) + xml[span_end:]


# ── 封面（替换 pandoc Title 段） ────────────────────────────────
PNG_SIG = b'\x89PNG\r\n\x1a\n'
LOGO_CY = 220000  # EMU，约 0.6cm，与 16pt 品牌名行高匹配

COVER_TEXT_DARK = '2C3E50'
COVER_MUTED = '6A737D'


def _cover_xml(rel_id, cx, cy, brand, title, date):
    drawing = ('<w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0">'
               '<wp:extent cx="%d" cy="%d" /><wp:effectExtent b="0" l="0" r="0" t="0" />'
               '<wp:docPr id="901" name="CoverLogo" />'
               '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1" />'
               '</wp:cNvGraphicFramePr>'
               '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">'
               '<pic:pic><pic:nvPicPr><pic:cNvPr id="901" name="CoverLogo" /><pic:cNvPicPr />'
               '</pic:nvPicPr><pic:blipFill><a:blip r:embed="%s" /><a:stretch><a:fillRect />'
               '</a:stretch></pic:blipFill><pic:spPr bwMode="auto"><a:xfrm><a:off x="0" y="0" />'
               '<a:ext cx="%d" cy="%d" /></a:xfrm><a:prstGeom prst="rect"><a:avLst />'
               '</a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline>'
               '</w:drawing>') % (cx, cy, rel_id, cx, cy)
    return (
        # 行1: logo + 品牌名（居中）
        '<w:p><w:pPr><w:spacing w:before="1400" w:after="0" /><w:jc w:val="center" /></w:pPr>'
        '<w:r>' + drawing + '</w:r>'
        '<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="黑体" w:hint="eastAsia" />'
        '<w:b /><w:color w:val="%s" /><w:sz w:val="32" /><w:szCs w:val="32" /></w:rPr>'
        '<w:t xml:space="preserve">  %s</w:t></w:r></w:p>'
        # 行2: 产品 + 手册类型（居中，大字）
        '<w:p><w:pPr><w:spacing w:before="3400" w:after="0" /><w:jc w:val="center" /></w:pPr>'
        '<w:r><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="黑体" w:hint="eastAsia" />'
        '<w:b /><w:color w:val="%s" /><w:sz w:val="52" /><w:szCs w:val="52" /></w:rPr>'
        '<w:t xml:space="preserve">%s</w:t></w:r></w:p>'
        # 行3: 年月，框架锚定到页面底部
        '<w:p><w:pPr><w:framePr w:wrap="none" w:vAnchor="page" w:hAnchor="page"'
        ' w:xAlign="center" w:y="15000" />'
        '<w:spacing w:before="0" w:after="0" /><w:jc w:val="center" /></w:pPr>'
        '<w:r><w:rPr><w:rFonts w:hint="eastAsia" /><w:color w:val="%s" />'
        '<w:sz w:val="21" /><w:szCs w:val="21" /></w:rPr>'
        '<w:t xml:space="preserve">%s</w:t></w:r></w:p>'
    ) % (COVER_TEXT_DARK, brand, COVER_TEXT_DARK, title, COVER_MUTED, date)


def insert_cover(entries, cover):
    """嵌入 logo 资源并把 pandoc Title 段替换为封面三行"""
    logo = open(cover['logo'], 'rb').read()
    if logo[:8] != PNG_SIG:
        raise SystemExit('封面 logo 不是 PNG: %s' % cover['logo'])
    width, height = struct.unpack('>II', logo[16:24])
    cy = LOGO_CY
    cx = round(cy * width / height)

    rels = entries['word/_rels/document.xml.rels'].decode('utf-8')
    rel_id = 'rId%d' % (max(int(i) for i in re.findall(r'Id="rId(\d+)"', rels)) + 1)
    rels = rels.replace(
        '</Relationships>',
        '<Relationship Id="%s" Type="http://schemas.openxmlformats.org/officeDocument'
        '/2006/relationships/image" Target="media/cover-logo.png" /></Relationships>' % rel_id)
    entries['word/_rels/document.xml.rels'] = rels.encode('utf-8')

    ctypes = entries['[Content_Types].xml'].decode('utf-8')
    if 'Extension="png"' not in ctypes:
        ctypes = re.sub(r'(<Types[^>]*>)',
                        r'\1<Default Extension="png" ContentType="image/png" />',
                        ctypes, count=1)
        entries['[Content_Types].xml'] = ctypes.encode('utf-8')
    entries['word/media/cover-logo.png'] = logo

    doc = entries['word/document.xml'].decode('utf-8')
    cover_xml = _cover_xml(rel_id, cx, cy, _xml_escape(cover.get('brand', '')),
                           _xml_escape(cover.get('title', '')),
                           _xml_escape(cover.get('date', '')))
    title_p = re.search(r'<w:p>(?:(?!</w:p>).)*?<w:pStyle w:val="Title" />'
                        r'(?:(?!</w:p>).)*?</w:p>', doc, re.DOTALL)
    if title_p:
        doc = doc[:title_p.start()] + cover_xml + doc[title_p.end():]
    else:
        doc = doc.replace('<w:body>', '<w:body>' + cover_xml, 1)
    entries['word/document.xml'] = doc.encode('utf-8')
    return entries

# 私有区字符 → Unicode 符号（Symbol ●、Wingdings ■）
BULLET_MAP = {'': '•', '': '▪'}


def _shrink_grid(match):
    cols = [int(x) for x in re.findall(r'w:w="(\d+)"', match.group(1))]
    total = sum(cols)
    if not cols or total <= TBL_IND:
        return match.group(0)
    scale = (total - TBL_IND) / total
    return '<w:tblGrid>%s</w:tblGrid>' % ''.join(
        '<w:gridCol w:w="%d" />' % round(c * scale) for c in cols)


def patch_numbering(xml):
    for src, dst in BULLET_MAP.items():
        xml = xml.replace(src, dst)
    # Courier New 'o' 二级圆圈
    xml = xml.replace('w:lvlText w:val="o"', 'w:lvlText w:val="○"')
    # 移除 marker 的专用字体声明（继承正文字体）
    xml = re.sub(r'<w:rPr><w:rFonts w:ascii="(?:Symbol|Wingdings|Courier New)"[^>]*/></w:rPr>',
                 '', xml)
    return xml


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if not args:
        raise SystemExit(__doc__)
    path = args[0]
    table_autofit = '--no-table-autofit' not in sys.argv

    cover = {}
    opts = sys.argv[1:]
    for i, opt in enumerate(opts):
        if opt in ('--cover-logo', '--cover-brand', '--cover-title', '--cover-date'):
            cover[opt[8:]] = opts[i + 1]

    with zipfile.ZipFile(path) as src:
        entries = {info.filename: src.read(info.filename) for info in src.infolist()}

    patched = []
    if 'word/document.xml' in entries:
        entries['word/document.xml'] = patch_document(
            entries['word/document.xml'].decode('utf-8'),
            table_autofit, has_cover=bool(cover.get('logo'))).encode('utf-8')
        patched.append('document.xml')
        if cover.get('logo'):
            entries = insert_cover(entries, cover)
            patched.append('cover')
    if 'word/numbering.xml' in entries:
        entries['word/numbering.xml'] = patch_numbering(
            entries['word/numbering.xml'].decode('utf-8')).encode('utf-8')
        patched.append('numbering.xml')

    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as out:
        for name, data in entries.items():
            out.writestr(name, data)

    print('postprocessed (%s): %s' % (', '.join(patched) or 'nothing to do', path))


if __name__ == '__main__':
    main()
