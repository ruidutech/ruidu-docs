# 设备 API

## 注册与保活

### 设备注册

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/register`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "", // 设备序列号
    "data": {
      "device_type": "", // 设备类型
      "manufacturer": "", // 制造商
      "model": "", // 型号
      "hardware_version": "", // 固件版本
      "software_version": "" // 软件版本
    }
  }
  ```

### 设备注册 ACK

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/register/ack`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      "registration_status": "registered", // pending | registered | rejected
      "device_id": "uuid-456",
      "site_id": "uuid-123"
    }
  }
  ```

### 心跳

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/heartbeat`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "device_type": "", // 设备类型
      "base_mode": "", // 当前模式
      "device_state": "", // 当前状态
      // 传感器状态
      "sensors": {
        "laser": "not_present",
        "gps": "ok",
        ...
      }
    }
  }
  ```

- **接口说明**
  - site 绑定通过 `provision/desired` 下发，地图引用通过 `map_ref` 上报
  - 心跳保持轻量，仅包含高频变更的设备状态信息

### 模式设置

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/set_mode`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "base_mode": ""
    }
  }
  ```
- **字典参考**
  - [base_mode](#设备控制模式)
- **Mavlink 参考**
  - [MAV_CMD_DO_SET_MODE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_SET_MODE)

### 位姿

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/pose`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "position": {
        "x": 3.52, // X 轴坐标（米）
        "y": -1.75, // Y 轴坐标（米）
        "z": 0.12 // Z 轴坐标（米）
      },
      "orientation": {
        "x": 0.0, // 四元数 X 分量
        "y": 0.0, // 四元数 Y 分量
        "z": 0.38, // 四元数 Z 分量
        "w": 0.92 // 四元数 W 分量（实部）
      }
    }
  }
  ```

### 速度

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/velocity`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "linear": {
        "x": 0.5, // X 轴线速度（m/s）
        "y": 0.0, // Y 轴线速度（m/s）
        "z": 0.0 // Z 轴线速度（m/s）
      },
      "angular": {
        "x": 0.0, // X 轴角速度（rad/s）
        "y": 0.0, // Y 轴角速度（rad/s）
        "z": 0.3 // Z 轴角速度（rad/s）
      }
    }
  }
  ```

### 全局定位

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/gps`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "latitude": 22.9921234, // 纬度
      "longitude": 113.891234, // 经度
      "altitude": 140.0, // 海拔
      "heading": 90.0, // 航向，相对于北向的角度
      "satellites_visible": 16 // 可见卫星数
    }
  }
  ```

### 电池

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/battery`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "temperature": 25.0, // 温度
      "voltage": 3700, // 电压，mV
      "current_battery": 15000, // 当前电流，mA
      "battery_remaining": 80.0, // 剩余电量，百分比
      "charge_status": "ok" // 当前状态
    }
  }
  ```

## 手动控制

### 移动

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/cmd_vel`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "x": 100.0, // 前后方向速度，x 轴线速度
      "y": -90.0, // 左右方向，y 轴线速度
      "z": 0, // 无人机：油门；无人车：角速度
      "r": 0 // 偏航，无人机预留
    }
  }
  ```

### 急停

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/terminate`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {}
  }
  ```

### 充电

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/charge`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {}
  }
  ```

## 部署环境（工作空间）同步

### 平台下发环境信息

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/workspace/desired`
- **接口方向**: 平台 -> 设备
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    // 所有配置项都为可选，选择性下发需要修改的配置项即可
    "data": {
      "site_id": "uuid-site-001",
      "coordinate_frame": "map", // map | earth
      "map_id": "uuid-map-id-111",
      "map_version": 1
    }
  }
  ```
- **接口说明**
  - 用于设备的部署环境初始化或变更配置，包括站点绑定等信息，通常需要谨慎对待
  - MQTT Retain 开启，确保设备在重启后能够立即获取到最新的配置信息
  - 示例场景：平台下达指令：“你去 X 站点，用 Y 地图”

### 设备上报环境信息

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/workspace/report`
- **接口方向**: 设备 -> 平台
- **上报频率**: 1 Hz
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    // 数据结构和 `provision/desired` 相同
    "data": {
      "site_id": "uuid-site-001",
      "coordinate_frame": "map", // map | earth
      "map_id": "uuid-map-id-111",
      "map_version": 1
    }
  }
  ```

- **接口说明**
  - 参考 ROS2 TRANSIENT_LOCAL QoS 模式：在变更时发布，Retain 确保新订阅者能获取最新状态
  - 与心跳解耦，避免高频上报低频变更数据
  - 示例场景：设备上报：“我已在 X 站点就绪，当前使用 Y 地图”

## 字典定义

### 设备准入状态

admission_status

| value    | name     | desc               |
| -------- | -------- | ------------------ |
| pending  | PENDING  | 待确认             |
| approved | APPROVED | 准入通过           |
| rejected | REJECTED | 不予准入，拒绝接入 |

### 设备类型

device_type

| value              | name               | desc         |
| ------------------ | ------------------ | ------------ |
| generic            | GENERIC            | 通用飞行器   |
| ground_rover       | GROUND_ROVER       | 地面无人车   |
| surfaceboat        | SURFACE_BOAT       | 水面无人船   |
| gimbal             | GIMBAL             | 云台         |
| onboard_controller | ONBOARD_CONTROLLER | 智能从属设备 |

### 设备控制模式

base_mode

| value        | name         | desc                                   |
| ------------ | ------------ | -------------------------------------- |
| manual_input | MANUAL_INPUT | 手动控制                               |
| guided       | GUIDED       | 任务执行模式（接收地面站控制指令）     |
| auto         | AUTO         | 自动模式（根据上传航点自动执行）       |
| safety_armed | SAFETY_ARMED | 已安全解锁（随时可进行控制或任务执行） |
| mapping      | MAPPING      | 建图模式                               |

### 设备状态

device_state

| value     | name      | desc                            |
| --------- | --------- | ------------------------------- |
| uninit    | UNINIT    | 系统未初始化（刚上电）          |
| boot      | BOOT      | 正在启动                        |
| standby   | STANDBY   | 就绪                            |
| active    | ACTIVE    | 运行中                          |
| critical  | CRITICAL  | 出现严重异常                    |
| emergency | EMERGENCY | 严重故障（进入 fail-safe 模式） |
| poweroff  | POWEROFF  | 正在断电或关闭系统              |

### 电池状态

charge_status

| value    | name     | desc   |
| -------- | -------- | ------ |
| ok       | OK       | 正常   |
| low      | LOW      | 低电量 |
| critical | CRITICAL | 故障   |

### 传感器类型

| value          | name           | desc             |
| -------------- | -------------- | ---------------- |
| gps            | GPS            | GPS 传感器       |
| camera         | CAMERA         | 摄像头           |
| lidar          | LIDAR          | 激光雷达         |
| imu            | IMU            | 惯性测量单元     |
| ultrasonic     | ULTRASONIC     | 超声波传感器     |
| temperature    | TEMPERATURE    | 温度传感器       |
| humidity       | HUMIDITY       | 湿度传感器       |
| custom_sensors | CUSTOM_SENSORS | 自定义传感器列表 |

### 传感器状态

sensors_load_status

| value       | name        | desc   |
| ----------- | ----------- | ------ |
| not_present | NOT_PRESENT | 不存在 |
| ok          | OK          | 正常   |
| emergency   | EMERGENCY   | 故障   |

### GPS状态

gps_status，在 sensors_load_status 的基础上增加：

| value    | name     | desc                               |
| -------- | -------- | ---------------------------------- |
| fix      | FIX      | GPS定位模式                        |
| sbas_fix | SBAS_FIX | 卫星增强（SBAS），精度优于普通 FIX |
| gbas_fix | GBAS_FIX | 地面增强（GBAS/RTK 等），精度最高  |
