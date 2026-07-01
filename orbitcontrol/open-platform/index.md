# Orbit 开放平台 API 文档

**版本**：v1.0
**日期**：2026年6月30日
**项目**：Orbit 无人车管理平台

## 概述

### 1.1 平台介绍

Orbit 开放平台为第三方应用提供标准化的 API 接口，允许开发者通过编程方式访问 Orbit 无人车管理平台的核心功能，包括：

- **设备管理**：无人车设备的注册、状态监控、远程控制
- **任务管理**：创建、执行、监控无人车任务
- **地图管理**：建图、保存、分发地图数据
- **告警管理**：接收、处理、响应系统告警
- **组织管理**：管理用户、组织、站点等结构

### 1.2 技术特性

- **RESTful API**：标准 HTTP 协议，JSON 数据格式
- **双重鉴权**：API Key + JWT Token，保障接口安全
- **租户隔离**：多租户架构，数据安全隔离

### 1.3 通信方式

第三方应用通过 HTTPS 调用 REST API 接口，使用 JSON 格式进行数据交互。

## 2. 快速开始

### 2.1 获取访问令牌

使用平台分配的 `app_id` 和 `app_secret` 调用 Token 接口：

```bash
POST /api/v1/oauth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "app_id": "app_1234567890",
  "app_secret": "secret_abcdefg"
}
```

**响应示例：**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "refresh_token": "ref_1234567890"
  }
}
```

### 2.2 调用 API

使用获取的 `access_token` 调用业务 API：

```bash
GET /api/v1/missions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. 应用申请

### 3.1 申请流程

```mermaid
flowchart LR
    A[第三方厂商] --> B[Orbit 平台]
    B --> C[审核通过]
    C --> D[获得 app_id, app_secret]
```

### 3.2 申请材料

请提供以下信息：

| 信息项     | 说明                 | 示例                               |
| ---------- | -------------------- | ---------------------------------- |
| 应用名称   | 应用的正式名称       | "XX 巡检管理系统"                  |
| 应用类型   | 应用类型             | Web应用 / 移动应用 / 服务          |
| 应用描述   | 应用功能描述         | "用于管理无人车巡检任务和数据统计" |
| 使用场景   | 具体使用场景         | "每日定时巡检，数据报表生成"       |
| 权限需求   | 需要的权限范围       | 见下方权限列表                     |
| 回调地址   | 重要事件回调通知地址 | https:/your-domain.com/callback    |
| 联系人信息 | 技术对接人           | 姓名、邮箱、电话                   |

### 3.3 可申请的权限范围

| 权限              | 描述          | 适用场景                   |
| ----------------- | ------------- | -------------------------- |
| mission:read      | 读取任务信息  | 查询任务列表、获取任务详情 |
| mission:write     | 创建/更新任务 | 创建新任务、修改任务配置   |
| mission:execute   | 执行任务      | 启动/停止任务执行          |
| device:read       | 读取设备信息  | 查询设备列表、获取设备状态 |
| device:control    | 控制设备      | 设置设备模式、发送控制指令 |
| map:read          | 读取地图数据  | 查询地图列表、下载地图文件 |
| map:write         | 创建/更新地图 | 保存地图、更新地图信息     |
| alert:read        | 读取告警信息  | 查询告警列表、获取告警详情 |
| alert:manage      | 管理告警      | 确认、解决、关闭告警       |
| organization:read | 读取组织信息  | 查询组织结构、获取组织成员 |
| site:read         | 读取站点信息  | 查询站点列表、获取站点详情 |

### 3.4 接入测试

审核通过后，平台会提供：

- **测试环境地址**：用于开发测试
- **测试凭证**：`app_id` 和 `app_secret`
- **测试设备**：可用的测试设备列表

测试通过后，提供生产环境凭证。

## 4 接口鉴权

### 4.1 鉴权方式

Orbit 开放平台采用 **API Key + JWT Token** 双重鉴权模式：

1. **API Key 阶段**：使用 `app_id` 和 `app_secret` 获取 `access_token`
2. **JWT Token 阶段**：使用 `access_token` 调用业务 API

### 4.2 鉴权流程

```mermaid
sequenceDiagram
    participant TP as 第三方应用
    participant API as Orbit API
    TP->>API: POST /oauth/token<br/>app_id + app_secret
    activate API
    Note right of API: 验证凭证
    API-->>TP: 返回 access_token
    deactivate API
    TP->>API: 调用业务 API<br/>Authorization: Bearer token
    activate API
    Note right of API: 验证 Token 和权限
    API-->>TP: 返回业务数据
    deactivate API
```

### 4.3 获取访问令牌

**请求：**

```http
POST /api/v1/oauth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "app_id": "app_abc123xyz",
  "app_secret": "secret_abcdef123456"
}
```

**响应：**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "refresh_token": "ref_xyz123abc456"
  }
}
```

**错误响应：**

```json
{
  "code": 401,
  "message": "Invalid app_id or app_secret"
}
```

### 4.4 刷新访问令牌

当 `access_token` 过期后，使用 `refresh_token` 获取新的令牌：

**请求：**

```http
POST /api/v1/oauth/refresh
Content-Type: application/json

{
  "grant_type": "refresh_token",
  "refresh_token": "ref_xyz123abc456"
}
```

**响应：**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "refresh_token": "ref_new_xyz789"
  }
}
```

### 4.5 使用令牌调用 API

在请求头中添加 `Authorization` 字段：

```http
GET /api/v1/missions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4.6 代码示例

```javascript
// 1. 获取 access_token
const authResponse = await fetch(
  "https:/api.orbit.example.com/api/v1/oauth/token",
  {
    method: "POST",
    headers: "Content-Type": "application/json",
    body: JSON.stringify({
      grant_type: "client_credentials",
      app_id: "app_abc123xyz",
      app_secret: "secret_abcdef123456",
    }),
  },
);
const {
  data: `{access_token}`,
} = await authResponse.json();

// 2. 调用业务 API
const missions = await fetch("https:/api.orbit.example.com/api/v1/missions", {
  headers: `Authorization: Bearer ${access_token}` },
});
const missionsData = await missions.json();
console.log(missionsData);
```

## 5. 控制类指令说明

### 5.1 执行流程

```mermaid
sequenceDiagram
    participant TP as 第三方应用
    participant API as Orbit API
    TP->>API: 发送控制指令
    activate API
    API-->>TP: 返回 execution_id
    deactivate API
    par 状态获取方式二选一或并行
      TP->>API: 轮询查询状态（execution_id, 可选）
      activate API
      API-->>TP: 返回执行状态
      deactivate API
      Note over API: 重要节点完成时触发
      API->>TP: 回调通知
    end
```

### 5.2 控制指令发起

通过 REST API 发送控制指令，接口返回 `execution_id` 用于后续状态查询：

**请求示例：**

```http
POST /api/v1/missions/{id}/execute
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "device_id": "device_abc123",
  "parameters": {
    "speed": 1.5,
    "retry_on_failure": true
  }
}
```

**响应示例：**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "execution_id": "exec_abc123xyz",
    "status": "pending",
    "estimated_duration": 300,
    "created_at": "2026-06-30T10:00:00Z"
  }
}
```

### 5.3 状态轮询

第三方可按需查询执行状态，建议策略：

- 根据 `estimated_duration` 延迟首次查询
- 按固定间隔（如 30 秒）轮询
- 收到回调后停止轮询

**查询请求：**

```http
GET /api/v1/executions/{execution_id}
Authorization: Bearer {access_token}
```

**响应示例：**

```json
{
  "code": 0,
  "data": {
    "id": "exec_abc123xyz",
    "mission_id": "mission_xyz",
    "device_id": "device_abc123",
    "status": "running",
    "progress": 45,
    "started_at": "2026-06-30T10:00:00Z",
    "updated_at": "2026-06-30T10:02:30Z",
    "result": null
  }
}
```

**状态说明：**

| 状态      | 说明     |
| --------- | -------- |
| pending   | 等待执行 |
| running   | 执行中   |
| completed | 执行完成 |
| failed    | 执行失败 |
| cancelled | 已取消   |

### 5.4 回调通知

仅针对重要节点触发回调，确保关键事件不会遗漏。

**触发事件：**

| 事件               | 说明         |
| ------------------ | ------------ |
| mission.completed  | 任务执行完成 |
| mission.failed     | 任务执行失败 |
| mission.cancelled  | 任务被取消   |
| navigation.arrived | 导航到达目标 |
| mapping.completed  | 建图完成     |

**回调请求格式：**

```http
POST {callback_url}
Content-Type: application/json

{
  "event": "mission.completed",
  "execution_id": "exec_abc123xyz",
  "mission_id": "mission_xyz",
  "status": "completed",
  "result": {
    "distance": 150.5,
    "duration": 280,
    "waypoints_completed": 12
  },
  "timestamp": "2026-06-30T10:05:00Z"
}
```

**回调响应：**

第三方需返回 2xx 状态码确认收到：

```json
{
  "code": 0,
  "message": "received"
}
```

**回调重试策略：**

- 回调失败自动重试，最多 3 次
- 重试间隔：1 分钟、5 分钟、10 分钟
- 超过时间不再回调

### 5.5 涉及控制的接口

以下接口涉及设备控制，执行流程如上所述：

| 接口                              | 功能           | 回调事件                           |
| --------------------------------- | -------------- | ---------------------------------- |
| POST /missions/`{id}`execute      | 执行任务       | mission.completed/failed/cancelled |
| POST /navigation/navigate-to-pose | 导航到目标位姿 | navigation.arrived/failed          |
| POST /maps/start                  | 开始建图       | mapping.completed/failed           |
| POST /devices/`{id}`/set_mode     | 设置设备模式   | -                                  |
| POST /gimbals/`{sn}`/start_record | 开始录像       | -                                  |

## 6. API 接口列表

### 6.1 基础信息

- **Base URL**：`https:/api.orbit.example.com/api/v1`
- **数据格式**：JSON
- **字符编码**：UTF-8
- **请求头**：`Authorization: Bearer {access_token}`

### 6.2 告警管理 /alerts

告警管理接口，用于查询和处理系统告警信息。

| 方法 | 路径                   | 功能             | 所需权限     |
| ---- | ---------------------- | ---------------- | ------------ |
| GET  | /alerts                | 获取告警列表     | alert:read   |
| GET  | /alerts/active-count   | 获取活跃告警数量 | alert:read   |
| GET  | /alerts/`{id}`         | 获取告警详情     | alert:read   |
| POST | /alerts/`{id}`/ack     | 确认告警         | alert:manage |
| POST | /alerts/`{id}`/resolve | 解决告警         | alert:manage |
| POST | /alerts/`{id}`/close   | 关闭告警         | alert:manage |

### 6.3 标注管理 /annotations

标注管理接口，用于管理地图标注信息。

| 方法   | 路径                | 功能         | 所需权限 |
| ------ | ------------------- | ------------ | -------- |
| GET    | /annotations        | 获取标注列表 | -        |
| POST   | /annotations        | 创建标注     | -        |
| GET    | /annotations/`{id}` | 获取标注详情 | -        |
| PUT    | /annotations/`{id}` | 更新标注     | -        |
| DELETE | /annotations/`{id}` | 删除标注     | -        |

### 6.4 标注分组 /annotation-groups

标注分组管理接口。

| 方法   | 路径                              | 功能         | 所需权限 |
| ------ | --------------------------------- | ------------ | -------- |
| GET    | /annotation-groups                | 获取分组列表 | -        |
| POST   | /annotation-groups                | 创建分组     | -        |
| GET    | /annotation-groups/`{id}`         | 获取分组详情 | -        |
| PUT    | /annotation-groups/`{id}`         | 更新分组     | -        |
| DELETE | /annotation-groups/`{id}`         | 删除分组     | -        |
| PATCH  | /annotation-groups/`{id}`/visible | 设置可见性   | -        |

### 6.5 设备管理 /devices

设备管理接口，用于查询设备状态和控制设备。

| 方法 | 路径                     | 功能         | 所需权限       | 说明       |
| ---- | ------------------------ | ------------ | -------------- | ---------- |
| POST | /devices                 | 创建设备     | device:write   | 注册新设备 |
| GET  | /devices                 | 获取设备列表 | device:read    | -          |
| GET  | /devices/`{id}`          | 获取设备详情 | device:read    | -          |
| PUT  | /devices/`{id}`          | 更新设备信息 | device:write   | -          |
| POST | /devices/`{id}`/set_mode | 设置设备模式 | device:control | 控制类接口 |

### 6.6 站点管理 /sites

站点管理接口，用于管理物理站点信息。

| 方法   | 路径                  | 功能         | 所需权限   |
| ------ | --------------------- | ------------ | ---------- |
| GET    | /sites                | 获取站点列表 | site:read  |
| POST   | /sites                | 创建站点     | site:write |
| GET    | /sites/`{id}`         | 获取站点详情 | site:read  |
| PUT    | /sites/`{id}`         | 更新站点     | site:write |
| DELETE | /sites/`{id}`         | 删除站点     | site:write |
| GET    | /sites/`{id}`/members | 获取站点成员 | site:read  |

### 6.7 组织管理 /organizations

组织管理接口，用于管理组织架构和成员。

| 方法   | 路径                                           | 功能           | 所需权限           |
| ------ | ---------------------------------------------- | -------------- | ------------------ |
| GET    | /organizations                                 | 获取组织列表   | organization:read  |
| POST   | /organizations                                 | 创建组织       | organization:write |
| GET    | /organizations/`{id}`                          | 获取组织详情   | organization:read  |
| PUT    | /organizations/`{id}`                          | 更新组织       | organization:write |
| DELETE | /organizations/`{id}`                          | 删除组织       | organization:write |
| GET    | /organizations/code/`{code}`                   | 按代码查询组织 | organization:read  |
| GET    | /organizations/tree                            | 获取组织树结构 | organization:read  |
| GET    | /organizations/roots                           | 获取顶层组织   | organization:read  |
| GET    | /organizations/`{id}`/children                 | 获取子组织列表 | organization:read  |
| GET    | /organizations/`{id}`/members                  | 获取组织成员   | organization:read  |
| POST   | /organizations/`{id}`/members                  | 添加组织成员   | organization:write |
| PUT    | /organizations/`{id}`/members/`{user_id}`/role | 修改成员角色   | organization:write |
| DELETE | /organizations/`{id}`/members/`{user_id}`      | 移除组织成员   | organization:write |

### 6.8 角色管理 /roles

角色管理接口，用于管理系统角色。

| 方法   | 路径          | 功能         | 所需权限 |
| ------ | ------------- | ------------ | -------- |
| GET    | /roles        | 获取角色列表 | -        |
| POST   | /roles        | 创建角色     | -        |
| GET    | /roles/`{id}` | 获取角色详情 | -        |
| PUT    | /roles/`{id}` | 更新角色     | -        |
| DELETE | /roles/`{id}` | 删除角色     | -        |

### 6.9 用户管理 /users

用户管理接口，用于管理系统用户。

| 方法   | 路径                               | 功能               | 所需权限 |
| ------ | ---------------------------------- | ------------------ | -------- |
| GET    | /users                             | 获取用户列表       | -        |
| POST   | /users                             | 创建用户           | -        |
| GET    | /users/`{id}`                      | 获取用户详情       | -        |
| PUT    | /users/`{id}`                      | 更新用户信息       | -        |
| DELETE | /users/`{id}`                      | 删除用户           | -        |
| GET    | /users/username/`{username}`       | 按用户名查询用户   | -        |
| POST   | /users`{id}`/restore               | 恢复已删除用户     | -        |
| GET    | /users/check-username/`{username}` | 检查用户名是否存在 | -        |
| GET    | /users/check-email/`{email}`       | 检查邮箱是否存在   | -        |
| GET    | /users/count                       | 获取用户数量       | -        |

### 6.10 云台操作 /gimbals

云台控制接口，用于控制设备云台。

| 方法 | 路径                                     | 功能     | 所需权限       |
| ---- | ---------------------------------------- | -------- | -------------- |
| POST | /gimbals/`{serial_number}`/start_stream  | 开始推流 | device:control |
| POST | /gimbals/`{serial_number}`/start_capture | 开始抓拍 | device:control |
| POST | /gimbals/`{serial_number}`/start_record  | 开始录像 | device:control |
| POST | /gimbals/`{serial_number}`/stop_record   | 停止录像 | device:control |

### 6.11 任务管理 /missions

任务管理接口，用于创建和管理无人车任务。

| 方法   | 路径                                  | 功能         | 所需权限        | 说明               |
| ------ | ------------------------------------- | ------------ | --------------- | ------------------ |
| GET    | /missions                             | 获取任务列表 | mission:read    | -                  |
| POST   | /missions                             | 创建新任务   | mission:write   | -                  |
| GET    | /missions/`{id}`                      | 获取任务详情 | mission:read    | -                  |
| PUT    | /missions/`{id}`                      | 更新任务     | mission:write   | -                  |
| DELETE | /missions/`{id}`                      | 删除任务     | mission:write   | -                  |
| POST   | /missions/`{id}`/start_path_recording | 开始路径记录 | mission:write   | -                  |
| POST   | /missions/`{id}`/stop_path_recording  | 停止路径记录 | mission:write   | -                  |
| POST   | /missions/`{id}`/execute              | 执行任务     | mission:execute | 控制类接口，有回调 |

### 6.12 调度管理 /schedules

调度配置接口，用于管理定时任务调度。

| 方法   | 路径              | 功能         | 所需权限 |
| ------ | ----------------- | ------------ | -------- |
| POST   | /schedules        | 创建调度配置 | -        |
| GET    | /schedules        | 获取调度列表 | -        |
| GET    | /schedules/`{id}` | 获取调度详情 | -        |
| PUT    | /schedules/`{id}` | 更新调度配置 | -        |
| DELETE | /schedules/`{id}` | 删除调度配置 | -        |

### 6.13 地图管理 /maps

地图管理接口，用于建图和地图数据管理。

| 方法 | 路径                       | 功能               | 所需权限  | 说明               |
| ---- | -------------------------- | ------------------ | --------- | ------------------ |
| POST | /maps/start                | 开始建图           | map:write | 控制类接口，有回调 |
| POST | /maps/stop                 | 停止建图（不保存） | map:write | -                  |
| POST | /maps/save                 | 保存地图           | map:write | -                  |
| GET  | /maps/list                 | 按站点获取地图列表 | map:read  | -                  |
| GET  | /maps/`{id}`               | 获取地图详情       | map:read  | -                  |
| POST | /maps/`{id}`/rename        | 重命名地图         | map:write | -                  |
| POST | /maps/`{id}`/notify-update | 通知设备地图更新   | map:write | -                  |

### 6.14 导航管理 /navigation

导航控制接口，用于控制无人车导航。

| 方法 | 路径                          | 功能           | 所需权限       | 说明               |
| ---- | ----------------------------- | -------------- | -------------- | ------------------ |
| POST | /navigation/navigate-to-pose  | 导航到目标位姿 | device:control | 控制类接口，有回调 |
| POST | /navigation/cancel-navigation | 取消当前导航   | device:control | -                  |

### 6.15 执行管理 /executions

执行记录接口，用于查询任务执行历史。

| 方法 | 路径               | 功能             | 所需权限     |
| ---- | ------------------ | ---------------- | ------------ |
| GET  | /executions        | 获取执行记录列表 | mission:read |
| GET  | /executions/`{id}` | 获取执行详情     | mission:read |

### 6.16 画廊管理 /galleries

媒体画廊接口，用于获取媒体资源。

| 方法 | 路径              | 功能             | 所需权限 |
| ---- | ----------------- | ---------------- | -------- |
| GET  | /galleries        | 获取媒体画廊列表 | -        |
| GET  | /galleries/`{id}` | 获取媒体资产详情 | -        |

## 7. 错误码

### 7.1 错误响应格式

所有 API 错误响应遵循统一格式：

```json
{
  "code": 40001,
  "message": "Invalid parameter",
  "details": "The parameter 'app_name' is required"
}
```

### 7.2 通用错误码

| 错误码 | 说明                       | 处理建议                       |
| ------ | -------------------------- | ------------------------------ |
| 0      | 成功                       | -                              |
| 400    | 请求参数错误               | 检查请求参数格式和内容         |
| 401    | 未授权（Token 无效或过期） | 重新获取 access_token          |
| 403    | 权限不足                   | 检查应用权限范围               |
| 404    | 资源不存在                 | 检查资源 ID 是否正确           |
| 409    | 资源冲突                   | 检查资源状态或是否存在         |
| 429    | 请求频率超限               | 降低请求频率，联系平台提升限额 |
| 500    | 服务器内部错误             | 联系技术支持                   |
| 503    | 服务暂时不可用             | 稍后重试                       |

## 8. 附录

### 8.1 数据类型

| 类型     | 说明                 | 示例                                   |
| -------- | -------------------- | -------------------------------------- |
| String   | 字符串               | "hello"                                |
| Integer  | 整数                 | 123                                    |
| Float    | 浮点数               | 123.45                                 |
| Boolean  | 布尔值               | true / false                           |
| UUID     | 唯一标识符           | "550e8400-e29b-41d4-a716-446655440000" |
| DateTime | 日期时间（ISO 8601） | "2026-06-30T10:00:00Z"                 |
| Array    | 数组                 | `["item1", "item2"]`                   |
| Object   | 对象                 | `{"key": "value"}`                     |

### 8.2 请求头说明

| 请求头        | 必填           | 说明         | 示例                |
| ------------- | -------------- | ------------ | ------------------- |
| Authorization | 是             | Bearer Token | `Bearer eyJhbGc...` |
| Content-Type  | 是（POST/PUT） | 内容类型     | `application/json`  |

### 8.3 分页参数

列表类接口支持分页，使用以下查询参数：

| 参数      | 类型    | 必填 | 默认值     | 说明                 |
| --------- | ------- | ---- | ---------- | -------------------- |
| page      | Integer | 否   | 1          | 页码                 |
| page_size | Integer | 否   | 20         | 每页数量（最大 100） |
| sort_by   | String  | 否   | created_at | 排序字段             |
| order     | String  | 否   | desc       | 排序方向：asc/desc   |

**响应示例：**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 150,
    "page": 1,
    "page_size": 20,
    "items": [...]
  }
}
```

### 8.4 环境信息

| 环境     | 地址                              | 说明         |
| -------- | --------------------------------- | ------------ |
| 测试环境 | https:/api-test.orbit.example.com | 开发测试使用 |
| 生产环境 | https:/api.orbit.example.com      | 正式环境     |

### 8.5 联系方式

- **技术支持邮箱**：support@ruidutech.com

### 8.6 更新日志

| 版本 | 日期       | 变更说明                    |
| ---- | ---------- | --------------------------- |
| v1.0 | 2026-06-30 | 初始版本，包含基础 API 接口 |
