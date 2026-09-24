# 视频流相关 API

设备摄像头实时视频流基于 WebRTC（LiveKit）：设备以 LiveKit SDK participant 身份直接发布 H264 码流进房间，无需解码重编码。视频媒体流不经过 MQTT，MQTT 仅用于推流信令（统一 command / command_ack 通道）。

> 2026-09 推流链路由 WHIP Ingress 迁移为 LiveKit SDK 直推（设备端免转码、与[语音对讲](./intercom.md)统一技术栈与命令链路）。旧 WHIP 专属 topic 接口过渡期保留，见[旧接口（WHIP，已弃用）](#旧接口whip已弃用)。

## 总体流程

1. 平台确保 LiveKit 房间存在（房间名 = 设备序列号），并为每路摄像头签发推流专用 token（participant identity / metadata / 发布权限均已内含）
2. 平台通过 MQTT 统一命令通道下发 [开始推流](#开始推流)，携带各路摄像头的 LiveKit 连接地址与推流 token
3. 设备回执 `command_ack`（受理语义），随后逐路以独立 participant 身份加入房间，经 LiveKit SDK 发布 H264 预编码视频轨
4. 观看端使用平台签发的 token 直连 LiveKit 订阅视频轨
5. 房间内无观看者时，平台下发 [结束推流](#结束推流) 并清理房间

## 开始推流

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = start_stream`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {
      "type": "start_stream",
      "streams": [
        { "component_id": 106, "url": "wss://livekit.example.com/rtc", "token": "<推流 JWT>" },
        { "component_id": 100, "url": "wss://livekit.example.com/rtc", "token": "<推流 JWT>" }
      ]
    }
  }
  ```

- **字段说明**
  - `streams`: 平台期望的**当前推流全量集合**，每路自包含一条连接描述符
    - `component_id`: 摄像头组件 ID，遵循 [Component ID 分配规范](../design/component-id.md)（100 前 / 101 后 / 102 左 / 103 右 / 104 顶 / 105 底 / 106 云台）
    - `url`: LiveKit 信令（WebSocket）地址，设备以此连接房间（各路同值）
    - `token`: 该路推流 JWT，已含房间名、participant identity、participant metadata（`{"component_id": N}`）与仅发布视频的权限，有效期 6 小时；设备无需解析，仅透传给 LiveKit SDK

- **回执**: `device/:serial_number/command_ack`（`msg_id` 回显，格式见 [MQTT 协议规范](./mqtt_convention.md)的 command_ack 章节）

  | result        | 设备侧场景                                                    |
  | ------------- | -------------------------------------------------------------- |
  | accepted      | 本地校验通过（摄像头存在、取流与编码链路可用），将异步逐路开播   |
  | temp_rejected | 推流资源暂时被占用（如编码管线忙），可重试                      |
  | denied        | 当前设备状态不允许推流                                         |
  | failed        | 摄像头不存在 / 取流链路初始化失败（message 携带原因）           |
  | unsupported   | 固件不支持该推流方式（旧固件兼容）                              |

- **接口说明（全量集合语义）**

  设备收到后与本地推流状态 diff：

  | 情况 | 设备行为 |
  | ---- | -------- |
  | 集合中新增的 component_id | 以该路 url + token 开播 |
  | 集合中消失的 component_id | 停播该路（断开该路连接） |
  | 已存在且 token 未变 | 保持不变（幂等） |
  | 已存在但 token 变化 | 静默更新本地保存的该路 token，当前连接**不动** |

  - 单路开关 = 平台重发新的全量集合（如关闭左路 = 集合中去掉 102）
  - 消息可能重复投递（QoS 1），设备端必须幂等处理
  - token 仅在**建立或重连**连接时使用，在线连接不受其变化/过期影响；token 临期时平台会以新 token 重发全量集合，设备静默更新即可，推流零中断
  - 断线重连始终使用**最新收到**的 token（SDK 内部重连复用旧 token 且已过期失败时，为该路重建连接）
  - 设备重启或消息丢失后，以下一次收到的 `start_stream` 为准恢复一致

## 结束推流

停止全部推流路。

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = stop_stream`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": { "type": "stop_stream" }
  }
  ```

- **接口说明**
  - 幂等：未在推流中收到 `stop_stream` 仍回执 `accepted`
  - 设备断开全部推流连接并释放取流/编码资源
  - 房间被平台删除导致连接断开时，设备应等效于收到本命令：自动断开收摊，等待平台重新下发

## 推流 Participant 命名约定

每路摄像头在 LiveKit 房间内是一个独立的 participant，identity、显示名与 metadata 均由平台签发 token 时固定，设备透传 token 即生效、无需自行设置：

| 字段 | 约定 | 示例 |
| ---- | ---- | ---- |
| participant_identity | `participant:device:{serial_number}:{component_name}` | `participant:device:RDU001:gimbal` |
| participant_name | 组件显示名 | `云台摄像头` |
| participant_metadata | JSON，`{"component_id": 106}` | — |

- `component_name` 为组件规范名（front / rear / left / right / top / bottom / gimbal）
- ⚠️ 多路不得共用同一 participant_identity（LiveKit 同 identity 会互踢）
- 观看端按 `participant_metadata.component_id` 识别视频轨属于哪路摄像头

## 设备端配合事项

- **LiveKit SDK**：与[语音对讲](./intercom.md)同一 SDK（推荐官方 C++ SDK），版本要求 **≥ v1.11.0**（预编码发布 `EncodedVideoSource` 自该版本引入）；对讲已在用旧版本的需升级
- **每路一条 Room 连接**：多路摄像头 = 一个进程内多个 Room 实例并发（每路一个 participant、一条连接），互不共用
- **预编码发布要点**（不解码重编码）：
  - RTSP 取流的 H264 还原为 **Annex-B access unit** 后直接经 `EncodedVideoSource` 喂入，SDK 内部完成 Annex-B → RTP 打包
  - 每个关键帧（IDR access unit）须携带 SPS/PPS（新订阅者初始化解码器依赖）
  - 不支持 simulcast，单空间层发布即可
  - keyframe 请求（PLI/FIR/新订阅者）经 SDK feedback 轮询（`takeFeedback()`）感知，设备据此驱动取流源尽快输出 IDR（源不支持主动请求时，等待下一个 GOP 内的 IDR）
- **订阅范围**：每路连接关闭 auto_subscribe（仅发布不订阅，节省设备下行带宽）
- **断线重连**：SDK 自动重连；房间删除导致的断开不重连，直接收摊等下一次 `start_stream`
- **与对讲共存**：对讲模块为独立 participant（identity 尾段 `intercom`）、进程内额外一条 Room 连接，互不影响
- 设备有哪些摄像头，通过 [心跳](./device.md#心跳) 的 `components` 字段告知平台；平台只会对已上报的摄像头下发推流

## 旧接口（WHIP，已弃用）

> 过渡期保留接口定义，新固件直接实现统一命令通道版本（上文），云端切换后本节删除。

- **开始推流**：专属 topic `device/:serial_number/start_stream`，载荷与统一通道版本同构，`streams` 各路为 `{ "component_id": 106, "whip_url": "https://livekit.example.com/whip/xxx" }`，设备向各路 `whip_url` 推流（WHIP 客户端），无回执
- **结束推流**：专属 topic `device/:serial_number/stop_stream`，载荷 `{ "type": "stop_stream" }`，无回执
