# API 接口文档

DeepRobot 01 系列机器人的完整API接口文档，包含所有功能模块的接口说明。

## 核心功能接口

### 机器人基础功能
- [机器人状态相关](./robot-state) - 获取机器人运行状态、电量、位置等信息
- [控制命令](./control-commands) - 机器人移动控制、操作命令接口
- [导航相关](./navigation) - 导航功能相关接口

### 地图与路径管理
- [建图相关](./mapping) - 地图创建、更新、保存等功能
- [地图管理](./map-management) - 地图文件的增删改查操作
- [虚拟墙相关](./virtual-wall) - 虚拟墙创建和管理
- [点位相关](./point-management) - 导航点的创建、编辑、删除
- [路径相关](./path-management) - 路径规划和管理
- [轨道相关](./track-management) - 轨道管理功能

### 任务与调度
- [任务相关](./task-management) - 任务创建、执行、监控
- [停车位管理](./parking) - 停车位设置和管理
- [目标跟随](./target-following) - 目标跟随功能

### 数据管理
- [数据包录制](./data-recording) - 数据包录制和回放
- [机器人数据获取](./robot-data-acquisition) - 传感器数据获取
- [图片管理相关](./image-management) - 图片上传、存储、管理
- [音频管理](./audio-management) - 音频文件管理

### 系统设置
- [用户管理相关](./user-management) - 用户账户管理
- [系统设置](./system-settings) - 系统参数配置
- [参数配置](./parameter-configuration) - 机器人参数设置
- [模式设置](./mode-settings) - 运行模式配置

### 通信与消息
- [消息推送](./message-push) - 消息推送和通知
- [激光消息](./laser-messages) - 激光雷达数据接口

## 开发指南

在使用这些API接口之前，建议先阅读：
- [开发指南](../development-guide/) - 开发环境设置和基础概念
- [错误代码参考](../development-guide/error-codes) - 错误处理指南
- [坐标计算相关](../development-guide/coordinate) - 坐标系统说明

## 接口规范

所有API接口都遵循RESTful设计规范，支持JSON格式数据交互。详细的接口调用方法和参数说明请查看各个模块的具体文档。 