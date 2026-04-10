# 睿度文档工程

## 项目

VitePress 技术文档站点，产品线：
- **DeepRobot01/03**: 无人车（REST API 标准模板）
- **OrbitControl**: 云平台（MQTT API 简洁风格）
- **CeMos**: 云平台

## 写文档时遵循

1. **REST API 模板**：简要描述 → 版本 → 状态限制 → 请求URL → 参数 → 返回示例 → 备注
2. **图片路径**：`/images/{product}/path/image.png`
3. **侧边栏**：`.vitepress/sidebar/{product}.ts`，需在 `sidebar/index.ts` 注册
4. **导航链接**：`.vitepress/config.mts` 的 `nav` 中添加

完整规范见 `.claude/skills/ruidu-docs-writer.md`
