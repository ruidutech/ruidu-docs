# Orbit PDF Export

VitePress PDF 导出工具，支持模块合并和精确的导出范围控制。

## 功能

- **精确范围控制**：根据 VitePress sidebar 配置，支持按模块、分组、单页导出
- **模块合并**：将多个页面合并为一个 PDF 文件
- **Mermaid 支持**：自动渲染并包含 Mermaid 图表
- **页码与页眉页脚**：自动添加页码和自定义页眉页脚
- **TypeScript**：与 VitePress 配置无缝集成

## 安装

```bash
cd pdf-export
pnpm install
```

## 使用

### 基本用法

```bash
# 从项目根目录
pnpm run docs:export <导出路径>
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

# 导出使用手册分组（13 个页面）
pnpm run docs:export "orbitcontrol > 使用手册"

# 导出单个页面
pnpm run docs:export "orbitcontrol > 使用手册 > 站点管理"

# 导出其他模块
pnpm run docs:export deeprobot01
pnpm run docs:export deeprobot03
```

## 配置

配置文件：`pdf-export/config.json`

```json
{
  "baseUrl": "http://localhost:5173/ruidu-docs",
  "outputDir": "./tmp/pdf-export",
  "defaultModule": "orbitcontrol",
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

## 项目结构

```
pdf-export/
├── package.json           # 包配置
├── config.json            # PDF 配置
├── README.md
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
    │   └── pdf.ts         # PDF 导出器
    ├── merger/
    │   └── pdf.ts         # PDF 合并
    └── utils/
        ├── logger.ts      # 日志工具
        └── path.ts        # 路径工具
```

## 工作原理

1. **路径解析**：从 VitePress `sidebar/index.ts` 导入模块配置
2. **页面发现**：根据路径表达式（如 `orbitcontrol > 使用手册`）查找对应页面
3. **PDF 生成**：使用 Puppeteer 生成每个页面的 PDF
4. **合并输出**：使用 `pdf-lib` 合并多个页面为单个 PDF

## 可用模块

根据 VitePress 配置，当前支持：

- **orbitcontrol**：OrbitControl 控制平台（产品介绍、使用手册、开放平台、设备端 API）
- **deeprobot01**：DeepRobot01 产品文档
- **deeprobot03**：DeepRobot03 产品文档

## 输出

PDF 文件保存在 `pdf-export/tmp/` 目录：

- 单页导出：`<路径>.pdf`（如 `使用手册-站点管理.pdf`）
- 多页导出：`<路径>-merged.pdf`（如 `orbitcontrol-merged.pdf`）

## 依赖

- `puppeteer`：浏览器自动化（生成 PDF）
- `pdf-lib`：PDF 合并
- `commander`：CLI 参数解析
- `tsx`：TypeScript 执行
