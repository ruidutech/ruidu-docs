# 任务执行相关

### 任务下发

- **协议类型**: MQTT
- **接口地址**: `site/:site_id/mission_items`（站点广播）/ `device/:serial_number/mission_items`（启动单播，payload 同）
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      "mission_id": "uuid-901", // 任务ID，和任务配置关联，小车端可以配合任务详情进行缓存
      "updated_at": 1757403776000, // Unix 时间戳（毫秒），任务表 updated_at，版本比对锚点：启动单播时设备与本地已缓存版本一致则跳过重写
      "waypoints": [
        {
          "seq": 0,
          "coordinate_frame": "wgs84",
          "map_id?": "uuid-923", // 地图ID（map=本地地图 / wgs84=世界区域图）；纯世界地图（无区域归属）时为空
          "map_version?": "1", // 地图版本，int，和 map_id 组合进行地图加载和地图版本校验
          // 目标位置
          "position": {
            // wgs84 下 x=经度、y=纬度（GeoJSON RFC 7946 顺序，与 orbit-web map.ts 一致）
            "x": -122.4194,
            "y": 37.7749,
            "yaw": 0 // 航向角（弧度），范围 [-π, π]，0 = 正东（x 正方向），逆时针为正；缺省 = 不指定朝向
          },
          // 辅助路径，可为空
          "path": [
            {
              "x": -122.4194,
              "y": 37.7749,
              "yaw": 0
            }
          ],
          "actions": [
            // 任务动作，可为空，可任意组合和排序，按顺序执行
            {
              "type": "recall_gimbal", // 调整云台，参数定义同「上报云台状态」
              "pitch": -30.0,
              "yaw": 90.0,
              "zoom": 100.0,
              "focus": 0.5
            },
            {
              "type": "hover",
              "duration_seconds": 600 // 停留时间，单位秒，0 表示一直停留
            },
            {
              "type": "start_capture", // 拍照，参数定义同云台控制「开始抓拍」
              "numbers": 1,
              "interval": 0
            },
            {
              "type": "start_record",
              "duration_seconds": 1 // 录像时长，单位秒
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

::: tip 变更 2026-10-20（mission 启动事务化）
- **新增启动单播通道** `device/:serial_number/mission_items`：任务启动时平台必达重推全量内容（设备级信封，携带 `serial_number`，`data` 结构与广播一致），等待[任务回执](#任务回执)确认后才下发[任务开始](#任务开始)。站点广播保留，定位为编辑后的缓存预热（尽力而为、允许丢失、不回执）
- **版本快速路径**：单播携带的 `updated_at` 为版本锚点，与设备本地已缓存版本一致时设备跳过重写、直接回 `accepted`
- 设备仅对**单播**回执（[任务回执](#任务回执)，`type = mission_items`）；站点广播不回执
:::

### 任务回执

::: tip 新增 2026-10-20（mission 启动事务化）
任务内容单播的事务确认通道，设计动机对标 MAVLink [MISSION_ACK](https://mavlink.io/en/messages/common.html#MISSION_ACK)：任务数据传输的最终确认语义，解决设备离线期间编辑导致的平台/设备任务不同步（下发失败或静默跑旧航线）。
:::

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/mission_ack`
- **协议方向**: 设备 -> 平台
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 被响应指令的 msg_id，原样回显
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "type": "mission_items", // 指令标识，与下行单播指令对应
      "result": "accepted", // 受理结果，复用 command_ack_result 字典（见 MQTT 协议规范）
      "message": "" // 可选，补充说明（失败原因等）
    }
  }
  ```

- **result 场景**（其余取值语义同 [command_ack_result 字典](./mqtt_convention.md#result-字典)）

  | type          | accepted                                 | denied                | failed                                                | temp_rejected           |
  | ------------- | ---------------------------------------- | --------------------- | ----------------------------------------------------- | ----------------------- |
  | mission_items | 任务数据已写入本地（或版本一致跳过重写） | 航点/参数校验失败     | 地图缺失或解析失败、底盘写入失败（message 携带原因） | mission worker 忙，可重试 |

- **接口说明**
  - 本通道仅承载 `mission_items` 设备单播的回执；任务控制命令（mission_start / pause_continue / mission_stop）经统一命令通道下发、回执走 `command_ack`——对标 MAVLink 通道划分：MAV_CMD 命令回 COMMAND_ACK，任务内容传输（MISSION_COUNT/ITEMS）回 MISSION_ACK
  - 回执表达**数据落地**结果：执行进度与终态走[任务状态上报](#任务状态上报)，不进回执（同 command_ack 约定）
  - `temp_rejected` 表示暂时性拒绝（如 mission worker 正忙），平台可原参重试
  - 平台对启动单播等待回执（默认 5s，同 command_ack 约定），超时即视为本次执行失败，不下发 mission_start；`set_mode` 已回执成功而 `mission_items` 超时，通常表示设备固件未升级至支持 mission_ack 的版本

### 任务开始

设备端保存任务后，由云端下发此指令触发任务执行。

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = mission_start`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "type": "mission_start",
      "mission_id": "uuid-901", // 任务ID，需与任务下发时一致
      "execution_id": "uuid-912" // 任务执行ID，唯一标志单次执行实例，车载端上传媒体数据时，需要与其关联
    }
  }
  ```

- **回执**: `device/:serial_number/command_ack`（`type = mission_start`）——设备完成准入检查（模式/预约互斥）后回执

- **Mavlink 参考**
  - [MAV_CMD_MISSION_START](https://mavlink.io/en/messages/common.html#MAV_CMD_MISSION_START)

::: tip 变更 2026-10-20（mission 启动事务化）
下发通道由独立 topic `device/:serial_number/mission_start` 迁移至统一命令通道；新增受理回执（原为无回执下发）。启动事务时序：平台 `set_mode(auto)`（command_ack）→ `mission_items` 启动单播（[mission_ack](#任务回执)）→ `mission_start`（command_ack），三步全部确认后由[任务状态上报](#任务状态上报)跟踪执行。控制命令与任务数据传输分通道回执，对标 MAVLink：MAV_CMD 走 COMMAND_ACK、任务内容走 MISSION_ACK。
:::

### 暂停/继续任务

适用于任务执行过程中调用。

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = pause_continue`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "type": "pause_continue",
      "action": "pause|continue"
    }
  }
  ```

- **回执**: `device/:serial_number/command_ack`（`type = pause_continue`）——受理结果

- **Mavlink 参考**
  - [MAV_CMD_DO_PAUSE_CONTINUE](https://mavlink.io/en/messages/common.html#MAV_CMD_DO_PAUSE_CONTINUE)

::: tip 变更 2026-10-20（mission 启动事务化）
下发通道由独立 topic `device/:serial_number/pause_continue` 迁移至统一命令通道；新增受理回执（原为无回执下发）。
:::

### 停止任务

终止设备当前正在执行的任务。经统一命令通道下发，设备须回复命令回执。

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = mission_stop`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "type": "mission_stop"
    }
  }
  ```

- **回执**: `device/:serial_number/command_ack`（`type = mission_stop`）

  | result        | 设备侧场景                          |
  | ------------- | ----------------------------------- |
  | accepted      | 已停止当前任务                      |
  | denied        | 当前无执行中的任务，或当前模式不允许停止 |
  | failed        | 停止失败（message 携带原因）        |
  | unsupported   | 固件不支持停止任务                  |

- **接口说明**

  - **无命令参数**：设备按当前执行中的任务处理，不指定任务标识
  - 与暂停（[pause_continue](#暂停继续任务)）的区别：停止为终止性操作，任务不再继续；暂停可经 `continue` 恢复
  - 回执仅表达受理结果，任务终止终态经[任务状态上报](#任务状态上报)以 `mission_state: "aborted"` 上报

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
      "mission_mode": "参考字典",
      "navigation_time": 19, // 导航执行时间，单位秒（忽略掉 Ros Duration 中的 nanosec）
      "estimated_time_remaining": 300, // 预计剩余时间，单位秒
      "distance_remaining": 2.1 // 预计剩余距离，单位m
    }
  }
  ```

- **无任务上报**：设备在任务结束（或初始无任务）时会以 `mission_state: "no_mission"` 上报，此时无关联任务，`mission_id` / `execution_id` 为空字符串（或省略），进度类字段（`navigation_time` / `estimated_time_remaining` / `distance_remaining`）为 `null`

  ```json
  {
    "data": {
      "mission_id": "",
      "execution_id": "",
      "seq": 0,
      "total": 0,
      "mission_state": "no_mission",
      "mission_mode": "unknown",
      "navigation_time": null,
      "estimated_time_remaining": null,
      "distance_remaining": null
    }
  }
  ```

- **任务失败上报**：设备端任务失败时以 `mission_state: "failed"` 上报终态（关联任务时进度类字段仍需携带）；`mission_current` 不含具体失败原因，原因通过[事件上报](./events.md) `3001`（`arguments` 携带 `reason`）补充，平台生成站内信展示

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
      "component_id": 106, // 组件ID，默认106(云台相机)
      "mission_id?": "uuid-xxx", // 不传或传 null 时表示手动模式下的媒体文件
      "execution_id?": "uuid-987", // 同上
      "alarm_id?": "uuid-301", // 告警关联键：与 device/:sn/alarm 上报的 alarm_id 同值（即平台告警 ID），标识本文件为告警证据（截图/clip），优先级高于 mission_id
      "filename": "patrol_01.mp4",
      "file_size": 104857600,
      "mime_type": "video/mp4",
      "md5": "a3f8...", // 用于完整性校验
      "width?": 1920, // 画面尺寸
      "height?": 1080,
      "duration_seconds?": 15, // 视频时长（秒）,非视频文件可以不传
      "capture_time": 1757403770000, // 拍摄时间（毫秒）
      // 设备姿态信息（通用）
      "position?": {
        // wgs84 下 x=经度、y=纬度（同任务下发 position 约定）
        "x": -122.4194,
        "y": 37.7749,
        "z": 0,
        "yaw": 0,
        "pitch": 0,
        "roll": 0
      },
      // 云台姿态信息 (用于分析拍摄视角)
      "gimbal_pose?": {
        "yaw": 0,
        "pitch": 0,
        "zoom": 1.0,
        "focus": 0.5
      },
      "frame_id?": "map",
      // 如果没有缩略图（比如本身就是小图），这里不传
      "thumbnail_filename?": "patrol_01_thumb.jpg"
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
    "msg_id": "uuid-789", // 要和 media_upload/req 接口对应
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "result": "accepted", // [!code ++] 处理结果，字典同 command_ack 的 result：accepted / denied（请求被拒，勿原样重试）/ failed（平台故障，可退避重试）
      "message": "device not found: sn-191", // [!code ++] 仅 result != accepted 时携带，失败原因
      "upload_id": "uuid-for-db-record", // 平台生成的媒体资源 ID（以下凭证字段仅 accepted 时携带）
      "upload_url": "http://115.29.200.60:9000/orbit-private/xxxx.jpg?X-Amz-Signature=...",
      "thumbnail_upload_url?": "http://115.29.200.60:9000/orbit-private/xxxx_thumb.jpg?X-Amz-Signature=...",
      "expire_at": 1700000600
    }
  }
  ```

- **失败必答**（新增 `result` / `message` 字段，**平台已实现、设备端待适配**）：`media_upload/req` 处理失败时平台同样经由本接口应答（msg_id 回显关联，不再静默中断），设备按 `result` 分流——`denied` 为请求侧问题（未知设备 / 参数 / 业务规则），修正后重发；`failed` 为平台侧故障，可退避后重新发起 `media_upload/req`。失败时凭证字段缺省。`result` 字典与 MAVLink [COMMAND_ACK](https://mavlink.io/en/messages/common.html#COMMAND_ACK) 对齐，与 `command_ack` 接口共用同一词表

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

| value            | name             | desc                     |
| ---------------- | ---------------- | ------------------------ |
| return_to_launch | RETURN_TO_LAUNCH | 返航                     |
| land             | LAND             | 降落                     |
| takeoff          | TAKEOFF          | 起飞                     |
| hover            | HOVER            | 待机                     |
| recall_gimbal    | RECALL_GIMBAL    | 云台回位（回到指定位置） |
| start_capture    | START_CAPTURE    | 拍照                     |
| start_record     | START_RECORD     | 录像                     |
| play_voice       | PLAY_VOICE       | 播放语音                 |
| set_charging     | SET_CHARGING     | 充电设置                 |

play_voice 参数定义（与统一命令通道 `play_voice` 同一词表，参数语义一致，见[设备协议](./device.md#播放语音)）：

```json
{
  "type": "play_voice",
  // 播放源，key / text 恰好其二一：
  //   key：语音 key，须在站点语音清单中，见 voice.md
  //   text：实时文本，设备端实时 TTS，需设备具备 TTS 能力
  "key": "warn_obstacle_01",
  "volume": 80 // 音量 0-100，可选，缺省用设备默认
}
```

set_charging 参数定义（与统一命令通道 `set_charging` 同一词表，参数语义一致，见[设备协议](./device.md#充电设置)）：

```json
{
  "type": "set_charging",
  "on": true, // 期望充电状态：true 开启 / false 停止
  "target_soc": 80 // 目标电量百分比（0-100），可选；充至该值后设备自动停止充电并继续任务
}
```

`target_soc` 仅 `on = true` 时有效，`on = false` 时必须缺省；携带 = 设置/更新目标，缺省 = 空闲启动则为持续充电、不自动退出（区别于 `100`：后者充满即自动停止），充电中则保持现目标。任务中到达 `target_soc` 后的停止充电由设备端自动执行。

语音文件的分发与 key 共识机制见 [voice.md](./voice.md)。

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
| aborted     | ABORTED     | 终止（[停止任务](#停止任务)受理后设备上报；或平台侧推断：安全模式/监管抢占） |
| failed      | FAILED      | 失败（设备上报终态；或平台推断：任务上报超时） |
