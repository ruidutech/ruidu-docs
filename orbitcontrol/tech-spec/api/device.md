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
      "admission_status": "pending"
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
      "x": 10.0, // x 坐标
      "y": 12.0, // y 坐标
      "z": 1.0, // 无人车：角度，rad
      "vx": 2.0, // x轴线速度
      "vy": 1.6, // y轴线速度
      "vz": 0.9 // 无人车：角速度，rad/s
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
      "charge_state": "ok" // 当前状态
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

| value        | name         | desc                               |
| ------------ | ------------ | ---------------------------------- |
| manual_input | MANUAL_INPUT | 手动控制                           |
| guided       | GUIDED       | 任务执行模式（接收地面站控制指令） |
| auto         | AUTO         | 自动模式（根据上传航点自动执行）   |

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

charge_state

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

sensors_status

| value       | name        | desc   |
| ----------- | ----------- | ------ |
| not_present | NOT_PRESENT | 不存在 |
| ok          | OK          | 正常   |
| emergency   | EMERGENCY   | 故障   |
