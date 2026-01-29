# 云台相关 API

## 云台控制（包括相机）

### 云台方向控制

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/gimbal`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "pitch": -30.0, // 俯仰角，根据控制模式，分别表示速度值或者具体角度
      "yaw": 90.0, // 偏航角
      "flag": "speed" // 控制模式
    }
  }
  ```

  > flag 参考 [云台控制模式](#云台控制模式)

### 上报云台姿态

收到 [请求消息推送](./common.md#请求消息推送) 后进行上报。

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/gimbal_pose`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "component_id": "1", // 云台设备ID，1-6 或者其他字符串标识
      "pitch": -30.0, // 俯仰角
      "yaw": 90.0, // 偏航角
      "zoom": -76.0, // zoom 位置
      "focus": 50.0 // focus 位置
    }
  }
  ```

### 开始抓拍

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/start_capture`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "interval": 2.0, // 抓拍间隔，0表示只拍一张
      "numbers": 5 // 抓拍张数，0表示无限制
    }
  }
  ```

### 结束抓拍

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/stop_capture`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {}
  }
  ```

### 抓拍状态

- **接口方向**: 设备 -> 平台
- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/capture_status`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 与开始抓拍的 msg_id 保持一致
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "status": 0 // 0-停止；1-开始（进行中）
    }
  }
  ```

### 开始录像

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/start_record`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {}
  }
  ```

### 结束录像

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/stop_record`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {}
  }
  ```

### 录像状态

- **接口方向**: 设备 -> 平台
- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/record_status`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 与开始录像的 msg_id 保持一致
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "status": 0 // 0-停止；1-开始（进行中）
    }
  }
  ```

### 调整焦距

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/zoom`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      // -1..1，正数：zoom in/narrow，负数：zoom out/wide，0：停止
      "zoom_value": 1,
      "zoom_type": "zoom_type_continuous"
    }
  }
  ```

  > zoom_type 参考 [调焦模式](#调焦模式)

### 对焦

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/focus`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      // 焦距，focus+/focus-，0表示停止，自动模式下忽略
      "focus_value": 1,
      "focus_type": "focus_type_continuous"
    }
  }
  ```

  > focus_type 参考 [对焦模式](#对焦模式)

### 开始推流

WHIP -> LiveKit

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/start_stream`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {
      "whip_url": ""
    }
  }
  ```

### 结束推流

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/stop_stream`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {}
  }
  ```

## 字典定义

### 云台控制模式

| value | name  | desc     |
| ----- | ----- | -------- |
| speed | SPEED | 速度模式 |
| angle | ANGLE | 角度目标 |
| reset | RESET | 回中     |

### 调焦模式

| value                | name                 | desc               |
| -------------------- | -------------------- | ------------------ |
| zoom_type_step       | ZOOM_TYPE_STEP       | 调整指定步长       |
| zoom_type_continuous | ZOOM_TYPE_CONTINUOUS | 连续调焦，默认方式 |

### 对焦模式

| value                 | name                  | desc               |
| --------------------- | --------------------- | ------------------ |
| focus_type_step       | FOCUS_TYPE_STEP       | 按指定步长         |
| focus_type_continuous | FOCUS_TYPE_CONTINUOUS | 连续调整，默认方式 |
| focus_type_auto       | FOCUS_TYPE_AUTO       | 自动               |
