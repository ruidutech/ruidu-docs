# Orbit Docs Export

VitePress 文档导出工具，支持 PDF / Word (docx) 两种格式，支持模块合并和精确的导出范围控制。

## 功能

- **精确范围控制**：根据 VitePress sidebar 配置，支持按模块、分组、单页导出
- **双格式输出**：PDF（浏览器渲染）与 Word docx（pandoc 转换，内容可编辑）
- **模块合并**：将多个页面合并为一个文件
- **Mermaid 支持**：自动渲染并包含 Mermaid 图表
- **页码与页眉页脚**（PDF）：自动添加页码和自定义页眉页脚
- **TypeScript**：与 VitePress 配置无缝集成

## 安装

```bash
cd docs-export
pnpm install
```

外部依赖：

- PDF / docx 的 Mermaid 渲染需要 Chrome（`config.json` 的 `chrome.executablePath`）
- docx 需要 [pandoc](https://pandoc.org/)（`brew install pandoc`）

## 使用

### 基本用法

```bash
# 从项目根目录，默认导出 PDF
pnpm run docs:export <导出路径>

# 导出 Word 文档
pnpm run docs:export <导出路径> --format docx

# 指定样式模板（默认 templates/orbit-reference.docx，中文出版风格用 zh 版）
pnpm run docs:export <导出路径> --format docx --reference-doc ./templates/orbit-reference-zh.docx
```

### 导出路径格式

支持三级路径格式：

| 格式 | 说明 | 示例 |
|------|------|------|
| `<模块>` | 导出整个模块的所有页面 | `orbitcontrol` |
| `<模块> > <分组>` | 导出指定分组下的所有页面 | `orbitcontrol > 使用手册` |
| `<模块> > <分组> > <页面>` | 导出单个页面 | `orbitcontrol > 使用手册 > 站点管理` |

### 示例

```bash
# 导出 orbitcontrol 整个模块（约 25 个页面）
pnpm run docs:export orbitcontrol

# 导出使用手册分组为 Word 文档（品牌封面 + 中文模板）
cd docs-export
npx tsx src/index.ts "orbitcontrol > 使用手册" --format docx --reference-doc ./templates/orbit-reference-zh.docx

# 导出单个页面
pnpm run docs:export "orbitcontrol > 使用手册 > 站点管理"

# 导出其他模块
pnpm run docs:export deeprobot01
pnpm run docs:export deeprobot03
```

## 配置

配置文件：`docs-export/config.json`

```json
{
  "baseUrl": "http://localhost:5173/ruidu-docs",
  "outputDir": "./tmp",
  "defaultModule": "orbitcontrol",
  "docx": {
    "referenceDoc": "./templates/orbit-reference.docx",
    "tableAutofit": true,
    "cover": {
      "brand": "睿度智能",
      "logo": "./templates/ruidu-logo.png",
      "title": "ORBIT 无人车管理平台",
      "subtitle": "用户手册"
    }
  },
  "pdf": {
    "format": "A4",
    "margin": { "top": "20mm", "right": "20mm", "bottom": "20mm", "left": "20mm" },
    "printBackground": true,
    "displayHeaderFooter": true,
    "headerTemplate": "<div style=\"font-size: 10px; text-align: center;\">{{title}}</div>",
    "footerTemplate": "<div style=\"font-size: 10px; text-align: center;\"><span class=\"pageNumber\"></span> / <span class=\"totalPages\"></span></div>"
  },
  "chrome": {
    "headless": "new",
    "executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  }
}
```

`docx.cover` 为封面配置（logo 路径相对 docs-export 目录），`subtitle` 决定封面第二行与文档类型文案——导出其他范围（如产品介绍）时按需调整；删掉 `cover` 配置则回退 pandoc 默认标题页。

## 项目结构

```
docs-export/
├── package.json           # 包配置
├── config.json            # 导出配置
├── README.md
├── templates/
│   ├── make-reference.py    # 样式模板生成脚本（default | zh 两种字体方案）
│   ├── ruidu-logo.png       # 封面品牌 logo（源: orbit-web/static/logo.png）
│   ├── orbit-reference.docx # pandoc reference-doc（现代风格，等线）
│   └── orbit-reference-zh.docx # 中文出版风格（宋体正文/黑体标题）
├── scripts/
│   └── postprocess-docx.py  # 导出后处理（表格自适应、列表符号）
└── src/
    ├── index.ts            # CLI 入口
    ├── config/
    │   ├── types.ts        # 类型定义
    │   ├── default.ts     # 默认配置
    │   └── loader.ts      # 配置加载器
    ├── discovery/
    │   └── resolver.ts    # 路径解析器（从 VitePress sidebar 导入）
    ├── renderer/
    │   ├── browser.ts     # 浏览器管理
    │   ├── page.ts        # 页面渲染
    │   ├── pdf.ts         # PDF 导出器
    │   ├── docx.ts        # Word 导出器（pandoc）
    │   └── mermaid.ts     # Mermaid 代码块渲染（docx 用）
    ├── merger/
    │   └── pdf.ts         # PDF 合并
    └── utils/
        ├── logger.ts      # 日志工具
        └── path.ts        # 路径工具
```

## 工作原理

### PDF

1. **路径解析**：从 VitePress `sidebar/index.ts` 导入模块配置
2. **页面发现**：根据路径表达式（如 `orbitcontrol > 使用手册`）查找对应页面
3. **PDF 生成**：使用 Puppeteer 渲染站点页面并生成 PDF
4. **合并输出**：使用 `pdf-lib` 合并多个页面为单个 PDF

### Word (docx)

1. **页面发现**：同 PDF，按 sidebar 顺序解析页面
2. **源文件预处理**：直接读取 markdown 源文件；图片绝对路径改写为仓库 `public/` 下的实际路径；mermaid 代码块用 Puppeteer 渲染为 PNG 后替换为图片引用；站内链接（绝对/相对）改写为文档内部锚点，每章首页标题注入锚点 id
3. **pandoc 转换**：按 sidebar 顺序合并（章节起新页由 Heading1 样式的段前分页承担），经 pandoc 生成 docx，自带中文目录，标题映射为 Word 内置 Heading 样式
4. **样式模板**：默认使用 `templates/orbit-reference.docx`（对齐 VitePress 站点观感：品牌绿标题、等宽代码、浅灰表格边框）；中文出版风格用 `templates/orbit-reference-zh.docx`（宋体正文 + Times New Roman，黑体标题 + Arial）。微调样式：编辑 `templates/make-reference.py` 中的调色板/字体方案后重新运行 `python3 templates/make-reference.py [default|zh]` 生成；置空 `config.json` 的 `docx.referenceDoc` 可回退 pandoc 默认样式
5. **后处理**（`scripts/postprocess-docx.py`，导出时自动执行）：pandoc 写在实例上的属性样式模板覆盖不到——
   - 表格由 100% 定宽改为「根据内容调整」（`docx.tableAutofit: false` 可关闭），表后插入 7pt 小间距段
   - 品牌封面（`docx.cover` 配置）：logo + 品牌名居中、产品手册大标题、当前年月锚定页底，目录独立成页
   - 内部锚点链接补 `w:history="1"`（WPS 仅认带该属性的元素形式，缺失时按外部文件处理导致跳转失效；Word 两者均可）
   - 书签规范化为段内（pandoc 放在 body 层级，WPS 定位不稳）
   - 目录预生成缓存条目并去掉 `w:dirty`：打开文档不再提示更新域；页码为排版估算值，需精确时全选目录按 F9 刷新
   - 页面几何显式写 A4 + 1 英寸边距（pandoc 输出不含页面尺寸，由打开端默认值决定会导致排版不一致）
   - 列表 bullet 由 Symbol/Wingdings 私有区字符换为 Unicode `• ○ ▪` 并去掉专用字体依赖

## 可用模块

根据 VitePress 配置，当前支持：

- **orbitcontrol**：OrbitControl 控制平台（产品介绍、使用手册、开放平台、设备端 API）
- **deeprobot01**：DeepRobot01 产品文档
- **deeprobot03**：DeepRobot03 产品文档

## 输出

文件保存在 `docs-export/tmp/` 目录：

- 单页导出：`<路径>.<ext>`（如 `使用手册-站点管理.pdf`）
- 多页导出：`<路径>-merged.<ext>`（如 `orbitcontrol-使用手册-merged.docx`）

## 依赖

- `puppeteer`：浏览器自动化（PDF 生成、Mermaid 渲染）
- `pdf-lib`：PDF 合并
- `pandoc`：docx 转换（外部命令）
- `mermaid`：图表渲染
- `commander`：CLI 参数解析
- `tsx`：TypeScript 执行
