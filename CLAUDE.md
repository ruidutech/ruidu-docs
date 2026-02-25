# Claude Code 项目配置

## 项目概述

睿度智能产品技术文档中心，基于 VitePress 构建的静态文档站点。

**主要产品线**:
- **DeepRobot01**: 四轮无人车相关文档
- **DeepRobot03**: 履带无人车相关文档
- **OrbitControl**: 无人机器人调度平台（主要编写目录）

---

## 项目结构

```
ruidu-docs/
├── orbitcontrol/           # 主要编写目录 - OrbitControl平台文档
│   ├── introduction/       # 产品介绍
│   ├── tech-spec/         # 技术规范
│   │   ├── api/          # 设备端 API 文档
│   │   └── ros_msgs/     # ROS2 消息接口
│   └── user-guide/        # 用户使用手册
├── deeprobot01/           # DeepRobot01 产品文档
├── deeprobot03/           # DeepRobot03 产品文档
├── .vitepress/
│   ├── config.mts        # VitePress 主配置
│   ├── sidebar/          # 侧边栏导航配置
│   │   └── orbitcontrol.ts  # OrbitControl 导航结构
│   └── theme/            # 自定义主题
└── public/               # 静态资源
    └── images/
        └── orbitcontrol/ # OrbitControl 相关图片
```

---

## 主要编写目录：orbitcontrol/

OrbitControl 是一个无人机器人调度平台，包含以下核心功能模块：

### 用户指南 (user-guide/)
- `platform-navigation.md` - 页面导航结构说明
- `sites.md` - 站点管理
- `device.md` - 设备管理（设备列表、详情、注册）
- `mapping.md` - 地图管理
- `planning.md` - 任务设置和调度
- `live-control.md` - 实时控制
- `mission-log.md` - 运行日志
- `gallery.md` - 画廊
- `notification.md` - 消息通知
- `zones.md` - 区域管理
- `annotations.md` - 标注功能
- `map-layer.md` - 地图图层
- `roles-and-permissions.md` - 角色和权限
- `data-center.md` - 数据中心

### 技术规范 (tech-spec/api/)
- `common.md` - 通用 API
- `device.md` - 设备控制与状态
- `gimbal.md` - 云台相关
- `manipulator.md` - 机械臂相关
- `map.md` - 地图相关
- `mission.md` - 任务执行相关
- `events.md` - 事件上报

### 技术规范 (tech-spec/ros_msgs/)
- `navigation.md` - 导航相关 ROS2 消息

---

## 导航结构配置

侧边栏配置位于 `.vitepress/sidebar/orbitcontrol.ts`，修改导航结构需要同步更新该文件。

**注意**：新增 Markdown 文件后，需要同时在对应的 sidebar 配置文件中添加导航项。

---

## Markdown 编写规范

### 图片资源

- 所有图片存放在 `public/images/` 目录下
- 按 `产品线/子目录/功能` 组织图片
- OrbitControl 图片路径示例：`/images/orbitcontrol/user-guide/device-page-device-list.png`
- 使用格式：`![描述](/images/orbitcontrol/user-guide/xxx.png)`

### 图片与文字同行显示

如需图片与文字在同一行显示，在图片标签后添加 `{.inline}` 属性：
```markdown
![](/images/orbitcontrol/xxx.png){.inline} 这段文字会与图片同行显示
```

### 自定义容器

```markdown
::: tip 提示内容
:::

::: warning 警告内容
:::

::: danger 危险内容
:::
```

### Tab 选项卡

```markdown
:::tabs
=== Tab 1
内容 1

=== Tab 2
内容 2
:::
```

### 右侧目录

右侧自动显示 h2 和 h3 级别标题作为目录导航。

---

## 常用命令

```bash
# 开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览构建结果
npm run docs:preview

# 导出 PDF
npm run docs:export
```

开发服务器默认地址：http://localhost:5173/ruidu-docs/

---

## 代码规范

- 使用中文编写文档
- 标题尽量包含关键信息（影响搜索索引）
- API 文档使用清晰的分类和结构化格式
- 代码块标明语言类型：\`\`\`bash, \`\`\`python 等
- TODO 标记：`// TODO` 或 `:::` 注释说明待完善内容

---

## Git 提交规范

提交信息参考：
- `feat: 添加 xxx 功能文档`
- `fix: 修复 xxx 文档错误`
- `docs: 更新 xxx 文档内容`
- `style: 格式调整`
- `refactor: 重构 xxx 文档结构`

---

## 注意事项

1. **srcExclude 配置**：`temp/` 目录下的文件会被 VitePress 忽略
2. **base 路径**：项目部署在 `/ruidu-docs/` 路径下，本地开发需注意
3. **搜索索引**：标题内容会被索引，重要信息应放在标题中
4. **侧边栏更新**：新增/删除文档文件时，记得更新对应的 sidebar 配置

---

## 技术栈

- **VitePress**: ^1.6.3
- **Node.js**: v16.0.0+
- **markdown-it-attrs**: Markdown 属性扩展
- **vitepress-plugin-tabs**: Tab 选项卡插件
