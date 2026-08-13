# Device Component ID 分配规范

本文档定义 Orbit 系统中设备组件（Device Components）的标识规范，参考 [MAVLink Component ID](https://mavlink.io/en/messages/common.html#MAV_COMPONENT) 标准进行分配。

## 概述

`device_components` 表用于管理设备上的各种组件/传感器，如摄像头、激光雷达、毫米波雷达等。每个组件通过 `component_id`（数值）和 `component_name`（代码用字符串）唯一标识。

## Component ID 分配

参考 MAVLink 标准，Orbit 系统的 Component ID 分配如下：

| Component ID | 组件类型 | 说明 | 代码示例 |
|-------------|---------|------|---------|
| 1 | MAV_COMP_ID_AUTOPILOT1 | 飞控/主控制器 | - |
| 25 | MAV_COMP_ID_USER1 | 语音播报喇叭 | `audio.megaphone` |
| 50 | LIDAR_MAIN | 主激光雷达 | `lidar_name: "main"` |
| 51 | LIDAR_AUX | 辅助激光雷达 | `lidar_name: "aux"` |
| 60-67 | RADAR | 毫米波雷达（前2/后2/左2/右2） | `radar_name: "front_left"` 等 |
| 100 | CAMERA_FRONT | 前摄像头 | `camera_name: "front"` |
| 101 | CAMERA_REAR | 后摄像头 | `camera_name: "rear"` |
| 102 | CAMERA_LEFT | 左摄像头 | `camera_name: "left"` |
| 103 | CAMERA_RIGHT | 右摄像头 | `camera_name: "right"` |
| 104 | CAMERA_TOP | 顶部摄像头 | `camera_name: "top"` |
| 105 | CAMERA_BOTTOM | 底部摄像头 | `camera_name: "bottom"` |
| 106 | CAMERA_GIMBAL | 云台摄像头 | `camera_name: "gimbal"` |
| 200 | IMU | 惯性测量单元 | `imu_name: "main"` |
| 220 | GPS | GPS/RTK 定位模块 | `gps_name: "main"` |

## 与 MAVLink 的对齐说明

参考 [MAV_COMPONENT](https://mavlink.io/en/messages/common.html#MAV_COMPONENT) 枚举：

- **`MAV_COMP_ID_ALL = 0`**：广播目标 id（target_component），不是合法的 source id，不可分配给具体组件
- **`MAV_COMP_ID_USER1-USER75 = 25-99`**：MAVLink 预留的自定义段。标准中没有音频/雷达类组件，语音播报喇叭用 `25`，激光雷达用 `50-51`，毫米波雷达用 `60-67`
- **100-105 = CAMERA1-6**：与 Orbit 摄像头段对齐；`106` 云台摄像头为 Orbit 自定义扩展（MAVLink 无 CAMERA7）
- **140-153 = SERVO1-14**：Orbit 设备无舵机，为避免与未来 MAVLink 设备混淆，**不使用 140-153 段**
- **200（IMU）/ 220（GPS）** 为 Orbit 自定义分配，MAVLink 标准中无对应组件（注意 180 在 MAVLink 中是 BATTERY，故 GPS 取 220）

## Component Type 枚举

`component_type` 字段用于区分组件类型：

```typescript
enum ComponentType {
  CAMERA = 'camera',
  AUDIO = 'audio',
  LIDAR = 'lidar',
  RADAR = 'radar',
  IMU = 'imu',
  GPS = 'gps',
  ODOMETRY = 'odometry',
  OTHER = 'other'
}
```

## Component Name 命名规范

`component_name` 应使用小写、下划线分隔的英文字符串，便于代码中使用：

| Component Type | 命名模式 | 示例 |
|----------------|---------|------|
| Camera | 方向英文 | `front`, `rear`, `left`, `right`, `top`, `gimbal` |
| Audio | 功能描述 | `megaphone` |
| LiDAR | 功能描述 | `main`, `aux`, `front`, `rear` |
| Radar | 位置+方向 | `front_left`, `front_right`, `rear_left`, `rear_right` |
| IMU/GPS | 功能描述 | `main`, `primary`, `secondary` |

> ⚠️ `component_name` 单独**不唯一**（如 `main` 有主控/激光雷达/IMU/GPS 四个），
> 唯一约束是 `component_type + component_name`（心跳 `components` 的 key 即
> `"{type}.{name}"` 点分复合键，见 [心跳](../api/device.md#心跳)）。

## Display Name 显示名

`display_name` 用于前端显示，建议使用中文：

```typescript
{component_name: "front", display_name: "前摄像头"}
{component_name: "rear", display_name: "后摄像头"}
{component_name: "lidar_main", display_name: "主激光雷达"}
```

## 数据库表结构

```sql
CREATE TABLE device_components (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  
  component_type VARCHAR(50) NOT NULL,  -- 'camera', 'lidar', 'radar'...
  component_id INTEGER NOT NULL,        -- MAVLink component_id
  component_name VARCHAR(50) NOT NULL,  -- 代码用标识
  display_name VARCHAR(100) NOT NULL,  -- 显示用名称
  
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  
  UNIQUE(device_id, component_id),
  UNIQUE(device_id, component_type, component_name)
);
```

## 使用示例

### 1. 查询设备的所有摄像头

```sql
SELECT component_id, component_name, display_name
FROM device_components
WHERE device_id = 'xxx' AND component_type = 'camera'
ORDER BY component_id;
```

### 2. 创建媒体资源时关联摄像头

```typescript
// 拍摄照片时，记录来自哪个摄像头
const mediaAsset = {
  device_id: 'device-uuid',
  camera_id: 100,  // 前摄像头
  // ...
};
```

## 扩展计划

未来可能需要添加的字段（预留）：

- **物理属性**：安装位置、朝向
- **技术参数**：分辨率、视场角、扫描频率
- **校准数据**：内参、外参、畸变系数

这些将在需要时通过 ALTER TABLE 添加。

## 参考文档

- [MAVLink Component Definitions](https://mavlink.io/en/messages/common.html#MAV_COMPONENT)
- [MAVLink Camera Definitions](https://mavlink.io/en/messages/common.html#CAMERA_MODE)

---

**最后更新**: 2026-08-13
