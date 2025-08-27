# 设备 API

## 注册与保活

### 设备注册

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/register`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "device_id": "uuid-191",
      "serial_number": "", // 设备序列号
      "device_type": "", // 设备类型
      "manufacturer": "", // 制造商
      "model": "", // 型号
      "firmware": "" // 固件版本
    }
  }
  ```

### 设备注册 ACK

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/register/ack`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "success": true
  }
  ```

### 心跳

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/heartbeat`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "device_id": "uuid-191",
      "device_type": "", // 设备类型
      "base_mode": "", // 当前模式
      "state": "", // 当前状态
      // 传感器状态
      "sensors": {
        "laser": 0,
        "gps": 1
      }
    }
  }
  ```

### 位姿

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/pose`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
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
- **接口地址**: `device/:device_id/gps`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "lat": 22.9921234, // 纬度
      "lon": 113.891234, // 经度
      "alt": 140.0, // 海拔
      "hdg": 90.0 // 航向，相对于北向的角度
    }
  }
  ```

### 电池

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/battery`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "temperature": 25.0, // 温度
      "voltage": 3700, // 电压，mV
      "current_battery": 15000, // 当前电流，mA
      "battery_remaining": 80.0, // 剩余电量，百分比
      "charge_state": 1 // 当前状态
    }
  }
  ```

## 手动控制

### 移动

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/cmd_vel`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "x": 100.0, // 前后方向速度
      "y": -90.0, // 左右方向，无人车可用于转向控制
      "z": 0, // 油门，不是高度，但有关，为无人机预留
      "r": 0 // 偏航，无人机预留
    }
  }
  ```

### 急停

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/terminate`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

### 充电

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/charge`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

## 云台控制（包括相机）

### 云台方向控制

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/gimbal`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "pitch": -30.0, // 俯仰角，根据控制模式，分别表示速度值或者具体角度
      "yaw": 90.0, // 偏航角
      "flag": 1 // 控制模式，1-Speed：速度模式；2-Angle：角度模式
    }
  }
  ```

### 开始抓拍

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/start_capture`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "interval": 2.0, // 抓拍间隔，0表示只拍一张
      "numbers": 5 // 抓拍张数，0表示无限制
    }
  }
  ```

### 结束抓拍

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/stop_capture`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

### 抓拍状态

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/capture_status`
- **请求参数**: 无
- **响应消息**

  ```json
  {
    "msg_id": "uuid-789", // 与开始抓拍的 msg_id 保持一致
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "status": 0 // 0-停止；1-开始（进行中）
    }
  }
  ```

### 开始录像

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/start_record`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

### 结束录像

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/stop_record`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

### 录像状态

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/record_status`
- **请求参数**: 无
- **响应消息**

  ```json
  {
    "msg_id": "uuid-789", // 与开始录像的 msg_id 保持一致
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "status": 0 // 0-停止；1-开始（进行中）
    }
  }
  ```

### 调整焦距

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/zoom`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "zoom_value": 1, // int
      "zoom_type": 1
  }
  ```

  > zoom_type 参考 [调焦模式](./dict.md#调焦模式)

### 对焦

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/focus`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      // 焦距，focus+/focus-，0表示停止，自动模式下忽略
      "focus_value": 1,
      "focus_type": 1
    }
  }
  ```

  > focus_type 参考 [对焦模式](./dict.md#对焦模式)

### 开始推流

WHIP -> LiveKit

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/start_stream`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "serial_number": "DEVICE-001",
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
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "serial_number": "DEVICE-001"
    }
  }
  ```

## 机械臂（ TODO ）
