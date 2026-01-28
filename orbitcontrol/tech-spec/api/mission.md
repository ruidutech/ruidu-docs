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
      "execution_id": "uuid-912", // 任务执行ID，和具体任务执行详情关联，车载端上传媒体数据时，需要与其关联
      "updated_at": 1757403776, // Unix 时间戳，辅助判断任务版本
      "waypoints": [
        {
          "seq": 0,
          "coordinate_frame": "earth",
          "map_id?": "uuid-923", // 地图ID，earth frame 时为空
          "map_version?": "1", // 地图版本，int，和 map_id 组合进行地图加载和地图版本校验
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
          "actions": [ // 任务动作，可为空，可任意组合和排序，按顺序执行
            {
              "type": "gimbal", // 调整云台，参数定义同「上报云台状态」
              "params": {
                "pitch": -30.0,
                "yaw": 90.0,
                "flag": "angle",
                "zoom": 100.0,
                "focus": 0.5
              }
            },
            {
              "type": "hover",
              "params": {
                "interval": 600 // 停留时间，单位秒
              }
            },
            {
              "type": "capture", // 拍照，参数定义同云台控制「开始抓拍」
              "params": {
                "numbers": 1,
                "interval": 0
              }
            },
            {
              "type": "record",
              "params": {
                "duration": 1 // 录像时长，单位秒
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
      "execution_id": "uuid-987",
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

### 媒体文件上传请求

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/media_upload/req`
- **协议方向**: Edge -> Platform
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "mission_id?": "uuid-xxx", // 不传或传 null 时表示手动模式下的媒体文件
      "execution_id?": "uuid-987", // 同上
      "filename": "patrol_01.mp4",
      "file_size": 104857600,
      "mime_type": "video/mp4",
      "md5": "a3f8...", // 用于完整性校验
      "width": 1920, // 画面尺寸
      "height": 1080,
      "duration": 15, // 视频时长（秒）
      "metadata": {
        "capture_time": 1757403770,
        "frame_id": "map",
        // 设备姿态信息（通用）
        "position": {
          "x": 37.7749,
          "y": -122.4194,
          "z": 0,
          "yaw": 0,
          "pitch": 0,
          "roll": 0
        },
        // 云台姿态信息 (用于分析拍摄视角)
        "gimbal": {
          "yaw": 0,
          "pitch": 0,
          "zoom": 1.0,
          "focus": 0.5
        },
        // (可选) 额外的设备状态
        "extra": {}
      },
      // 如果没有缩略图（比如本身就是小图），这里传 null
      "thumbnail?": {
        "filename": "patrol_01_thumb.jpg",
        "file_size": 5120, // 5KB
        "mime_type": "image/jpeg",
        "md5": "b2c9..."
      }
    }
  }
  ```

### 媒体文件上传响应

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/media_upload/resp`
- **协议方向**: Platform -> Edge
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 要和 media_uplaod/req 接口对应
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "upload_id": "uuid-for-db-record", // 平台生成的媒体资源 ID
      "upload_url": "http://115.29.200.60:9000/orbit-private/xxxx.jpg?X-Amz-Signature=...",
      "thumbnail_upload_url?": "http://115.29.200.60:9000/orbit-private/xxxx_thumb.jpg?X-Amz-Signature=...",
      "expire_at": 1700000600
    }
  }
  ```

### 媒体文件上传完成通知

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/media_upload/complete`
- **协议方向**: Edge -> Platform
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "upload_id": "uuid-for-db-record", // 对应申请时的 ID
      "status": "completed", // 或 failed
      "cost_time": 5400 // ms，用于监控网络质量
    }
  }
  ```

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
