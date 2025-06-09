# PDF导出工具使用指南

这个工具集可以帮你将 VitePress 文档网站的页面导出为PDF文件。

## 快速开始

### 1. 启动本地服务器

首先确保你的文档服务器正在运行：

```bash
# 开发模式
npm run docs:dev

# 或者预览模式
npm run docs:build
npm run docs:preview
```

### 2. 导出页面

```bash
npm run docs:export
```

导出范围可在 `pdf-exports/config.json` 中进行配置。

## 配置文件说明

### PDF配置选项

- `format`: 页面格式 (A4, A3, Letter等)
- `margin`: 页边距设置
- `printBackground`: 是否打印背景
- `displayHeaderFooter`: 是否显示页眉页脚
- `headerTemplate`: 页眉HTML模板
- `footerTemplate`: 页脚HTML模板
