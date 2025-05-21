# SeaRobot 文档中心

本项目是使用 [VitePress](https://vitepress.dev/) 构建的 SeaRobot 产品技术文档，包含机器人和APP相关的使用说明文档。

## 前置条件

- [Node.js](https://nodejs.org/) v16.0.0 或更高版本
- npm 或 yarn 包管理器
- 基础的 Markdown 知识
- Git（用于版本控制）

## 安装与启动

1. **克隆仓库**
   ```bash
   git clone https://github.com/ushisoft/searobot-docs.git
   cd searobot-docs
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或者使用 yarn
   # yarn
   ```

3. **本地开发**
   ```bash
   npm run docs:dev
   # 或者使用 yarn
   # yarn docs:dev
   ```
   启动后，根据控制台提示地址访问文档内容。

4. **构建静态文件**
   ```bash
   npm run docs:build
   # 或者使用 yarn
   # yarn docs:build
   ```
   构建后的文件将存放在 `.vitepress/dist` 目录下。

5. **预览构建结果**
   ```bash
   npm run docs:preview
   # 或者使用 yarn
   # yarn docs:preview
   ```

## 目录结构

```
searobot-docs/
├── .github/              # GitHub相关配置
├── .vitepress/           # VitePress配置目录
│   ├── cache/            # VitePress缓存
│   ├── theme/            # 自定义主题
│   │   ├── custom.css    # 自定义CSS样式
│   │   └── index.js      # 主题入口文件
│   └── config.mts        # VitePress配置文件
├── app/                  # APP 2.0.0 文档
├── public/               # 静态资源目录
│   └── images/           # 图片资源
│       ├── app/          # APP相关图片
│       └── searobot/     # 机器人相关图片  
├── searobot/             # SeaRobot 01 系列文档
├── .gitignore            # Git忽略文件
├── index.md              # 文档首页
├── package.json          # 项目依赖和脚本
└── README.md             # 项目说明文档（本文件）
```

## 内容摘要

### SeaRobot 01 系列文档 (`/searobot/`)

包含 SeaRobot 01 系列机器人的相关文档。

### APP 2.0.0 文档 (`/app/`)

包含 SeaRobot APP 2.0.0 的使用指南。

### 静态资源 (`/public/`)

包含文档中使用的所有图片和其他静态资源。图片按照文档类别进行分类存放。

### 自定义主题 (`/.vitepress/theme/`)

- `custom.css`: 自定义CSS样式，解决图片与文字在同一行显示的问题
- `index.js`: 主题入口文件，用于加载自定义CSS

## 贡献指南

1. 文档内容修改：直接编辑对应的Markdown文件
2. 添加新图片：将图片放入 `public/images/` 对应子目录
3. 修改导航和侧边栏：编辑 `.vitepress/config.mts` 文件

## 许可证

Copyright © 2024 SeaRobot 