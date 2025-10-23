# 任务执行相关

## 路径录制

### 开始录制

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/start_path_recording`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id": "uuid-901" // 上报时需带上该 id
    }
  }
  ```

### 继续录制

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/continue_path_recording`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id": "uuid-901"
    }
  }
  ```

- **场景说明**

  将当前录制的内容通过 `路径上报接口` 上传至平台，然后继续下一段路径的录制。

### 结束录制

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/stop_path_recording`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id": "uuid-901"
    }
  }
  ```

### 路径上报

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/upload_path`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 与开始录制的 msg_id 保持一致 !important
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id": "uuid-901", // 与开始录制的 mission_id 保持一致
      "seq": 1, // 消息序号，当分段进行 Path 上报的时候，用来区分前后关系
      // 目前，路径记录只用于无人车室外场景，位置使用地球坐标系
      "position": {
        "latitude": 37.7749,
        "longitude": -122.4194,
      }
    }
  }
  ```

- **场景说明**

  收到 `开始录制` 消息后，每移动固定步长的距离，就上报一个位置；
  `msg_id` 要和 `开始录制` 的 `msg_id` 严格保持一致，客户端才可以找到对应关系，知道是哪个任务的哪段 Waypoint。
