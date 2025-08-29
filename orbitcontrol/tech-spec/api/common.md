# 通用 API

## 请求消息推送

set_message_interval 的一次性版本。

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/request_message`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "serial_number": "sn-191", // 设备序列号
    "data": {
      "topic": "", // 消息类型，比如录像状态为 record_status
      "...": "" // 参数列表，可自定义
    }
  }
  ```

## 设置消息推送间隔

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/set_message_interval`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "serial_number": "sn-191", // 设备序列号
    "data": {
      "topic": "", // 消息类型，比如录像状态为 record_status
      "interval": 20, // int，单位 Hz
      "...": "" // 参数列表，可自定义
    }
  }
  ```
