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

  > flag 参考 [云台控制模式](./dict.md#云台控制模式)

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
      "zoom_value": 1, // int
      "zoom_type": "zoom_type_continuous"
    }
  }
  ```

  > zoom_type 参考 [调焦模式](./dict.md#调焦模式)

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

  > focus_type 参考 [对焦模式](./dict.md#对焦模式)

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

## 机械臂（ TODO ）
