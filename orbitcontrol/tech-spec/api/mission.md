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
        "longitude": -122.4194
      }
    }
  }
  ```

- **场景说明**

  收到 `开始录制` 消息后，每移动固定步长的距离，就上报一个位置；
  `msg_id` 要和 `开始录制` 的 `msg_id` 严格保持一致，客户端才可以找到对应关系，知道是哪个任务的哪段 Waypoint。

### 任务下发

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/mission_items`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id": "uuid-901", // 小车端保存该ID，执行任务时用
      "updated_at": 1757403776, // Unix 时间戳，辅助判断任务版本
      "waypoints": [
        {
          "seq": 0,
          "coordinate_frame": "earth",
          // 目标位置
          "position": {
            "latitude": 37.7749,
            "longitude": -122.4194
          },
          // 辅助路径，可为空
          "path": [
            {
              "latitude": 37.7749,
              "longitude": -122.4194
            }
          ],
          "actions": [
            {
              "type": "gimbal",
              "params": {
                "pitch": -30.0,
                "yaw": 90.0,
                "flag": "angle"
              }
            }
          ]
        }
      ]
    }
  }
  ```

- **Mavlink 参考**
  - [MISSION_ITEM_INT](https://mavlink.io/en/messages/common.html#MISSION_ITEM_INT)
  - [MAV_CMD_NAV_WAYPOINT](https://mavlink.io/en/messages/common.html#MAV_CMD_NAV_WAYPOINT)

### 暂停/继续任务

适用于任务执行过程中调用。

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/pause_continue`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "action": "pause|continue"
    }
  }
  ```
- **Mavlink 参考**
  - [MAV_CMD_DO_PAUSE_CONTINUE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_PAUSE_CONTINUE)

## 字典定义

### 执行动作类型

| value            | name             | desc     |
| ---------------- | ---------------- | -------- |
| return_to_launch | RETURN_TO_LAUNCH | 返航     |
| land             | LAND             | 降落     |
| takeoff          | TAKEOFF          | 起飞     |
| hover            | HOVER            | 待机     |
| gimbal           | GIMBAL           | 云台控制 |
| capture          | CAPTURE          | 拍照     |
| record           | RECORD           | 录像     |
