# 视频流相关 API

设备摄像头实时视频流基于 WebRTC（WHIP -> LiveKit）。视频媒体流不经过 MQTT，MQTT 仅用于推流信令。

## 总体流程

1. 平台调用 LiveKit 创建房间（房间名 = 设备序列号），并为每路摄像头创建一个 WHIP Ingress
2. 平台通过 MQTT 下发 [开始推流](#开始推流)，携带各路摄像头的 WHIP 推流地址
3. 设备端逐路向对应 WHIP 地址推流（每路 = 房间内一个独立 participant）
4. 观看端使用平台签发的 token 直连 LiveKit 订阅视频轨
5. 房间内无观看者时，平台下发 [结束推流](#结束推流) 并清理房间

## 推流信令

### 开始推流

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/start_stream`
- **接口方向**: 平台 -> 设备
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {
      "type": "start_stream",
      "streams": [
        { "component_id": 106, "whip_url": "https://livekit.example.com/whip/xxx" },
        { "component_id": 100, "whip_url": "https://livekit.example.com/whip/yyy" }
      ]
    }
  }
  ```

- **字段说明**
  - `streams`: 平台期望的**当前推流全量集合**
    - `component_id`: 摄像头组件 ID，遵循 [Component ID 分配规范](../design/component-id.md)（100 前 / 101 后 / 102 左 / 103 右 / 104 顶 / 105 底 / 106 云台）
    - `whip_url`: 该路的 WHIP 推流地址

- **接口说明（全量集合语义）**

  设备收到后与本地推流状态 diff：

  | 情况 | 设备行为 |
  | ---- | -------- |
  | 集合中新增的 component_id | 向对应 whip_url 开播 |
  | 集合中消失的 component_id | 停播该路 |
  | 已存在且 whip_url 未变 | 保持不变（幂等） |
  | 已存在但 whip_url 变化 | 重推该路 |

  - 单路开关 = 平台重发新的全量集合（如关闭左路 = 集合中去掉 102）
  - 消息可能重复投递（QoS 1），设备端必须幂等处理
  - 设备重启或消息丢失后，以下一次收到的 `start_stream` 为准恢复一致

### 结束推流

停止全部推流路。

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/stop_stream`
- **接口方向**: 平台 -> 设备
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {
      "type": "stop_stream"
    }
  }
  ```

## 推流 Participant 命名约定

每路摄像头在 LiveKit 房间内是一个独立的 participant，由平台创建 Ingress 时固定：

| 字段 | 约定 | 示例 |
| ---- | ---- | ---- |
| participant_identity | `participant:device:{serial_number}:{component_name}` | `participant:device:RDU001:gimbal` |
| participant_name | 组件显示名 | `云台摄像头` |
| participant_metadata | JSON，`{"component_id": 106}` | — |

- `component_name` 为组件规范名（front / rear / left / right / top / bottom / gimbal）
- ⚠️ 多路不得共用同一 participant_identity（LiveKit 同 identity 会互踢）
- 观看端按 `participant_metadata.component_id` 识别视频轨属于哪路摄像头

## 设备端配合事项

- 设备只需向各路的 `whip_url` 推流，无需关心 track 命名
- 设备有哪些摄像头，通过 [心跳](./device.md#心跳) 的 `components` 字段告知平台；平台只会对已上报的摄像头下发推流
