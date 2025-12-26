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
      // 同时支持室内外场景，可以是经纬度或者local_map坐标
      "position": {
        "x": 37.7749,
        "y": -122.4194,
        "z": 0,
        "yaw": 0,
        "pitch": 0,
        "roll": 0
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
      "mission_id": "uuid-901", // 任务ID，和任务配置关联，小车端可以配合任务详情进行缓存
      "execution_id": "uuid-1101", // 执行ID，具体某次执行的实例ID
      "updated_at": 1757403776, // Unix 时间戳，辅助判断任务版本
      "waypoints": [
        {
          "seq": 0,
          "coordinate_frame": "earth",
          // 目标位置
          "position": {
            "x": 37.7749,
            "y": -122.4194,
            "z": 0,
            "yaw": 0,
            "pitch": 0,
            "roll": 0
          },
          // 辅助路径，可为空
          "path": [
            {
              "x": 37.7749,
              "y": -122.4194,
              "z": 0
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

### 任务状态上报

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/mission_current`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id": "uuid-789",
      "execution_id": "uuid-1101",
      "seq": 1,
      "total": 10,
      "mission_state": "参考字典",
      "mission_mode": "参考字典"
    }
  }
  ```

- **字典参考**
  - [mission_state](#任务状态)
  - [mission_mode](#任务模式)
- **Mavlink 参考**
  - [MISSION_CURRENT](https://mavlink.io/en/messages/common.html#MISSION_CURRENT)

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

### 任务模式

mission_mode

| value      | name       | desc             |
| ---------- | ---------- | ---------------- |
| unknown    | UNKNOWN    | 未知             |
| in_mission | IN_MISSION | 任务中           |
| suspended  | SUSPENDED  | 待命，未在任务中 |

### 任务状态

mission_state

| value       | name        | desc   |
| ----------- | ----------- | ------ |
| unknown     | UNKNOWN     | 未知   |
| no_mission  | NO_MISSION  | 无任务 |
| not_started | NOT_STARTED | 未开始 |
| active      | ACTIVE      | 运行   |
| paused      | PAUSED      | 暂停   |
| complete    | COMPLETE    | 完成   |
