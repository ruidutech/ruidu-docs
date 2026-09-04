#!/usr/bin/env python3
"""生成 pandoc reference-doc 样式模板（对齐 VitePress 站点观感）

从 pandoc 默认 reference.docx 出发，逐样式打补丁后打包。
微调下方 STYLE_PATCHES / 调色板后重新运行即可再生成。

用法: python3 templates/make-reference.py [default|zh]

- default: 现代风格，等线正文，标题用主题字体 → orbit-reference.docx
- zh: 中文出版风格，宋体正文（西文 Times New Roman），黑体标题（西文 Arial）→ orbit-reference-zh.docx
"""

import os
import re
import shutil
import subprocess
import sys
import tempfile
import zipfile

TEMPLATES_DIR = os.path.dirname(os.path.abspath(__file__))

# ── 调色板（对齐 VitePress 默认主题） ─────────────────────────────
BRAND = '3EAF7C'      # 站点品牌绿: H1 / Title / 超链接
TEXT_DARK = '2C3E50'  # H2 深色
TEXT_MID = '3A5169'   # H3/H4 蓝灰
DIVIDER = 'E2E2E2'    # H2 底边框 / 表格边框（站点 --vp-c-divider）
CODE_BG = 'F6F6F7'    # 代码块背景（--vp-c-bg-soft）
CODE_FG = '383A42'
INLINE_CODE = '476582'  # 行内代码色（VitePress 文档站习惯色）
INLINE_BG = 'F3F4F5'    # 行内代码底色
MUTED = '6A737D'      # Caption 灰
EAST_ASIA = '等线'    # 中文正文字体（Word/WPS 默认自带）
MONO = 'Consolas'

# ── 字体方案 ────────────────────────────────────────────────────
# ascii 为 None 时保留 pandoc 主题字体（Calibri / Calibri Light）
PROFILES = {
    'default': {
        'body': {'ascii': None, 'ea': '等线'},
        'heading': {'ascii': None, 'ea': None},
    },
    'zh': {
        'body': {'ascii': 'Times New Roman', 'ea': '宋体'},
        'heading': {'ascii': 'Arial', 'ea': '黑体'},
    },
}


def rfonts_frag(spec, mono=False):
    """由方案生成 rFonts 元素；mono 时西文用等宽字体、中文跟正文"""
    if mono:
        return ('<w:rFonts w:ascii="%s" w:hAnsi="%s" w:eastAsia="%s" w:cs="%s" />'
                % (MONO, MONO, spec['ea'], MONO))
    ascii_font = spec['ascii']
    if ascii_font is None:
        return None
    return ('<w:rFonts w:ascii="%s" w:hAnsi="%s" w:eastAsia="%s" w:cs="%s" />'
            % (ascii_font, ascii_font, spec['ea'], ascii_font))

# ── OOXML 子元素顺序（插入位置感知用） ──────────────────────────
PPR_ORDER = ['keepNext', 'keepLines', 'pageBreakBefore', 'framePr', 'widowControl',
             'numPr', 'suppressLineNumbers', 'pBdr', 'shd', 'tabs', 'suppressAutoHyphens',
             'kinsoku', 'wordWrap', 'overflowPunct', 'topLinePunct', 'autoSpaceDE',
             'autoSpaceDN', 'bidi', 'adjustRightInd', 'snapToGrid', 'spacing', 'ind',
             'contextualSpacing', 'mirrorIndents', 'suppressOverlap', 'jc',
             'textDirection', 'textAlignment', 'textboxTightWrap', 'outlineLvl',
             'divId', 'cnfStyle', 'rPr', 'sectPr', 'pPrChange']
RPR_ORDER = ['rStyle', 'rFonts', 'b', 'bCs', 'i', 'iCs', 'caps', 'smallCaps', 'strike',
             'dstrike', 'outline', 'shadow', 'emboss', 'imprint', 'noProof',
             'snapToGrid', 'vanish', 'webHidden', 'color', 'spacing', 'w', 'kern',
             'position', 'sz', 'szCs', 'highlight', 'u', 'effect', 'bdr', 'shd',
             'fitText', 'vertAlign', 'rtl', 'cs', 'em', 'lang', 'eastAsianLayout',
             'specVanish', 'oMath']


def frag_tag(frag):
    return re.match(r'<w:(\w+)', frag).group(1)


def strip_existing(block, frags):
    """移除与待插入元素同 tag 的既有元素（避免重复/属性残留）"""
    for frag in frags:
        tag = frag_tag(frag)
        block = re.sub(
            r'<w:%s(?: [^>]*)?/>|<w:%s(?: [^>]*)?>.*?</w:%s>' % (tag, tag, tag),
            '', block, flags=re.DOTALL)
    return block


def ordered_insert(body, frag, order):
    """按 OOXML schema 顺序把 frag 插入容器内容（找到第一个顺序更靠后的既有元素插其前）"""
    idx = order.index(frag_tag(frag))
    for m in re.finditer(r'<w:(\w+)[ />]', body):
        name = m.group(1)
        if name in order and order.index(name) > idx:
            return body[:m.start()] + frag + body[m.start():]
    return body + frag


def patch_style(xml, style_id, ppr_frags=(), rpr_frags=()):
    m = re.search(r'<w:style [^>]*w:styleId="%s">.*?</w:style>' % re.escape(style_id),
                  xml, re.DOTALL)
    if not m:
        raise SystemExit('style not found: %s' % style_id)
    block = strip_existing(m.group(0), list(ppr_frags) + list(rpr_frags))

    if ppr_frags:
        pm = re.search(r'<w:pPr>(.*?)</w:pPr>', block, re.DOTALL)
        if pm:
            body = ordered_insert(pm.group(1), ''.join(ppr_frags), PPR_ORDER)
            block = block[:pm.start(1)] + body + block[pm.end(1):]
        else:
            new = '<w:pPr>%s</w:pPr>' % ''.join(ppr_frags)
            rm = re.search(r'<w:rPr>', block)
            at = rm.start() if rm else block.rindex('</w:style>')
            block = block[:at] + new + block[at:]

    if rpr_frags:
        rm = re.search(r'<w:rPr>(.*?)</w:rPr>', block, re.DOTALL)
        if rm:
            body = ordered_insert(rm.group(1), ''.join(rpr_frags), RPR_ORDER)
            block = block[:rm.start(1)] + body + block[rm.end(1):]
        else:
            new = '<w:rPr>%s</w:rPr>' % ''.join(rpr_frags)
            at = block.rindex('</w:style>')
            block = block[:at] + new + block[at:]

    return xml[:m.start()] + block + xml[m.end():]


# ── 样式补丁 ────────────────────────────────────────────────────
HEADING_COLOR = lambda: '<w:color w:val="%s" />'  # noqa: E731

# 标题类样式（字体方案替换作用对象）
HEADING_STYLES = ('Title', 'Heading1', 'Heading2', 'Heading3', 'Heading4')


def build_patches(prof):
    body_fonts = rfonts_frag(prof['body'])
    head_fonts = rfonts_frag(prof['heading'])
    mono_fonts = rfonts_frag(prof['body'], mono=True)
    patches = [
    # H1: 品牌绿 + 加粗 + 22pt（站点 h1 字号梯度最大）；样式级分页，章节起新页
    ('Heading1',
     ['<w:pageBreakBefore />', '<w:spacing w:before="360" w:after="200" />'],
     ['<w:b />', HEADING_COLOR() % BRAND, '<w:sz w:val="44" />', '<w:szCs w:val="44" />']),
    # H2: 深色 + 底边框（VitePress h2 特征）+ 加粗 16pt
    ('Heading2',
     ['<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="%s" /></w:pBdr>' % DIVIDER,
      '<w:spacing w:before="360" w:after="160" />'],
     ['<w:b />', HEADING_COLOR() % TEXT_DARK, '<w:sz w:val="32" />', '<w:szCs w:val="32" />']),
    # H3: 蓝灰 + 加粗 14pt
    ('Heading3',
     ['<w:spacing w:before="280" w:after="140" />'],
     ['<w:b />', HEADING_COLOR() % TEXT_MID, '<w:sz w:val="28" />', '<w:szCs w:val="28" />']),
    # H4: 同 H3 色系，12pt
    ('Heading4',
     ['<w:spacing w:before="240" w:after="120" />'],
     ['<w:b />', HEADING_COLOR() % TEXT_MID, '<w:sz w:val="24" />', '<w:szCs w:val="24" />']),
    # 正文: 11pt + 1.5 倍行距（中文阅读）
    ('BodyText',
     ['<w:spacing w:before="0" w:after="200" w:line="360" w:lineRule="auto" />'],
     ['<w:sz w:val="22" />', '<w:szCs w:val="22" />']),
    ('FirstParagraph',
     ['<w:spacing w:before="0" w:after="200" w:line="360" w:lineRule="auto" />'],
     ['<w:sz w:val="22" />', '<w:szCs w:val="22" />']),
    # 紧凑段落（列表/表格内）: 覆盖继承的 1.5 倍行距
    ('Compact',
     ['<w:spacing w:before="36" w:after="36" w:line="276" w:lineRule="auto" />'],
     []),
    # 封面标题: 居中 + 品牌绿
    ('Title',
     ['<w:spacing w:before="240" w:after="480" />'],
     ['<w:b />', '<w:color w:val="%s" />' % BRAND, '<w:sz w:val="56" />', '<w:szCs w:val="56" />']),
    # 行内代码: 等宽 + 蓝灰 + 浅底
    ('VerbatimChar',
     [],
     [mono_fonts,
      '<w:color w:val="%s" />' % INLINE_CODE,
      '<w:shd w:val="clear" w:color="auto" w:fill="%s" />' % INLINE_BG]),
    # 引用块（VitePress 自定义容器）: 左边框 + 浅底
    ('BlockText',
     ['<w:pBdr><w:left w:val="single" w:sz="12" w:space="4" w:color="%s" /></w:pBdr>' % BRAND,
      '<w:shd w:val="clear" w:color="auto" w:fill="F8F8F8" />',
      '<w:ind w:left="240" w:right="120" />',
      '<w:spacing w:before="120" w:after="120" />'],
     []),
    # 表/图题注: 灰色小字居中
    ('Caption',
     ['<w:jc w:val="center" />'],
     ['<w:color w:val="%s" />' % MUTED, '<w:sz w:val="18" />', '<w:szCs w:val="18" />']),
    # 超链接: 品牌绿
    ('Hyperlink',
     [],
     ['<w:color w:val="%s" />' % BRAND]),
    # 目录标题独立成页（封面 → 目录 → 正文）
    ('TOCHeading',
     ['<w:pageBreakBefore />'],
     []),
    ]

    # 字体方案显式时，替换标题类样式的主题字体（宋体方案下标题用黑体）
    if head_fonts:
        patches = [
            (sid, ppr, list(rpr) + [head_fonts] if sid in HEADING_STYLES else rpr)
            for sid, ppr, rpr in patches
        ]
    return patches


# 代码块样式: pandoc 使用但默认模板缺失，新增（背景 + 等宽 + 缩进）
def build_source_code(prof):
    return '''  <w:style w:type="paragraph" w:customStyle="1" w:styleId="SourceCode">
    <w:name w:val="Source Code" />
    <w:basedOn w:val="Normal" />
    <w:qFormat />
    <w:pPr>
      <w:shd w:val="clear" w:color="auto" w:fill="%(bg)s" />
      <w:spacing w:before="120" w:after="120" w:line="276" w:lineRule="auto" />
      <w:ind w:left="180" w:right="180" />
    </w:pPr>
    <w:rPr>
      <w:rFonts w:ascii="%(mono)s" w:hAnsi="%(mono)s" w:eastAsia="%(ea)s" w:cs="%(mono)s" />
      <w:color w:val="%(fg)s" />
      <w:sz w:val="19" />
      <w:szCs w:val="19" />
    </w:rPr>
  </w:style>
''' % {'bg': CODE_BG, 'fg': CODE_FG, 'mono': MONO, 'ea': prof['body']['ea']}


# 目录条目样式: pandoc 默认模板缺失（仅有 TOCHeading），F9 重算目录与缓存条目共用
def build_toc_styles():
    return '''  <w:style w:type="paragraph" w:styleId="TOC1">
    <w:name w:val="toc 1" />
    <w:basedOn w:val="Normal" />
    <w:pPr>
      <w:spacing w:before="80" w:after="40" w:line="276" w:lineRule="auto" />
    </w:pPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="TOC2">
    <w:name w:val="toc 2" />
    <w:basedOn w:val="Normal" />
    <w:pPr>
      <w:ind w:left="240" />
      <w:spacing w:before="40" w:after="40" w:line="276" w:lineRule="auto" />
    </w:pPr>
  </w:style>
'''

# 表格: 全边框浅灰 + 单元格上下留白 + 表头加粗
TBL_BORDERS = (
    '<w:tblBorders>'
    + ''.join('<w:%s w:val="single" w:sz="4" w:space="0" w:color="%s" />' % (side, DIVIDER)
              for side in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'))
    + '</w:tblBorders>')
TBL_CELLMAR = (
    '<w:tblCellMar>'
    '<w:top w:w="40" w:type="dxa" />'
    '<w:left w:w="108" w:type="dxa" />'
    '<w:bottom w:w="40" w:type="dxa" />'
    '<w:right w:w="108" w:type="dxa" />'
    '</w:tblCellMar>')


def patch_table(xml):
    m = re.search(r'<w:style [^>]*w:styleId="Table">.*?</w:style>', xml, re.DOTALL)
    if not m:
        raise SystemExit('style not found: Table')
    block = re.sub(r'<w:tblCellMar(?: [^>]*)?>.*?</w:tblCellMar>', '', m.group(0), flags=re.DOTALL)
    # tblInd 度量到第一列文字（Word legacy 语义），取 cellMar 值使表格边框与正文左缘对齐
    block = block.replace('<w:tblInd w:w="0" w:type="dxa" />',
                          '<w:tblInd w:w="108" w:type="dxa" />' + TBL_BORDERS + TBL_CELLMAR, 1)
    # 表头行加粗（tblStylePr 中 rPr 须位于 tcPr 之前）
    block = block.replace('<w:tcPr>', '<w:rPr><w:b /></w:rPr>\n      <w:tcPr>', 1)
    return xml[:m.start()] + block + xml[m.end():]


def patch_doc_defaults(xml, prof):
    # 正文字号 12pt → 11pt
    xml = xml.replace('<w:sz w:val="24" />\n        <w:szCs w:val="24" />',
                      '<w:sz w:val="22" />\n        <w:szCs w:val="22" />')
    # 正文字体: 西文保留主题字体时仅显式指定中文，否则整体替换
    body_fonts = rfonts_frag(prof['body'])
    if body_fonts:
        xml = re.sub(r'<w:rFonts w:asciiTheme="minorHAnsi"[^/]*/>', body_fonts, xml, count=1)
    else:
        xml = re.sub(r'<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorEastAsia"',
                    '<w:rFonts w:asciiTheme="minorHAnsi" w:eastAsia="%s"' % prof['body']['ea'],
                    xml, count=1)
    return xml


def main():
    profile_name = sys.argv[1] if len(sys.argv) > 1 else 'default'
    if profile_name not in PROFILES:
        raise SystemExit('未知字体方案: %s（可选 %s）' % (profile_name, '|'.join(PROFILES)))
    prof = PROFILES[profile_name]
    out = os.path.join(
        TEMPLATES_DIR,
        'orbit-reference.docx' if profile_name == 'default' else 'orbit-reference-%s.docx' % profile_name)

    workdir = tempfile.mkdtemp(prefix='orbit-ref-')
    base = os.path.join(workdir, 'base.docx')
    with open(base, 'wb') as f:
        f.write(subprocess.check_output(['pandoc', '--print-default-data-file', 'reference.docx']))
    with zipfile.ZipFile(base) as zf:
        zf.extractall(workdir)

    styles_path = os.path.join(workdir, 'word', 'styles.xml')
    with open(styles_path, encoding='utf-8') as f:
        xml = f.read()

    xml = patch_doc_defaults(xml, prof)
    for style_id, ppr, rpr in build_patches(prof):
        xml = patch_style(xml, style_id, ppr, rpr)
    xml = patch_table(xml)
    # 新增 SourceCode（插在 VerbatimChar 之后）与目录条目样式（插在 TOCHeading 之后）
    anchor = re.search(r'<w:style [^>]*w:styleId="VerbatimChar">.*?</w:style>', xml, re.DOTALL).end()
    xml = xml[:anchor] + '\n' + build_source_code(prof) + xml[anchor:]
    toc_anchor = re.search(r'<w:style [^>]*w:styleId="TOCHeading">.*?</w:style>', xml, re.DOTALL)
    if toc_anchor:
        xml = xml[:toc_anchor.end()] + '\n' + build_toc_styles() + xml[toc_anchor.end():]

    with open(styles_path, 'w', encoding='utf-8') as f:
        f.write(xml)

    if os.path.exists(out):
        os.remove(out)
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, _dirs, files in os.walk(workdir):
            for name in files:
                if name == 'base.docx':
                    continue
                full = os.path.join(root, name)
                zf.write(full, os.path.relpath(full, workdir))

    shutil.rmtree(workdir)
    print('generated: %s (%d bytes)' % (out, os.path.getsize(out)))


if __name__ == '__main__':
    main()
