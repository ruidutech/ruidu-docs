# 语音对讲相关 API

双向语音对讲（客户端 ↔ 设备）基于 WebRTC（LiveKit），与视频流共用同一房间。音频媒体流不经过 MQTT，MQTT 仅用于对讲信令（统一 command / command_ack 通道）。

## 总体流程

1. 平台确保 LiveKit 房间存在（与视频流同房间，房间名 = 设备序列号），并为设备签发对讲专用 token
2. 平台通过 MQTT 统一命令通道下发 [开始对讲](#开始对讲)，携带 LiveKit 连接地址与设备 token
3. 设备本地校验通过后回执 `command_ack`（受理语义），随后以独立 participant 身份加入房间：发布麦克风音频轨，并只订阅房间内音频轨播放到扬声器
4. 客户端在同一房间发布麦克风轨、订阅设备音频轨，全双工通话
5. 对讲结束：平台下发 [结束对讲](#结束对讲)（或房间清理时联动），设备离开房间并释放音频设备

## 开始对讲

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = start_intercom`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {
      "type": "start_intercom",
      "url": "wss://livekit.example.com/rtc",
      "token": "<设备对讲 JWT>"
    }
  }
  ```

- **字段说明**
  - `url`: LiveKit 信令（WebSocket）地址，设备以此连接房间
  - `token`: 设备对讲 JWT，已含房间名、participant identity 与发布/订阅权限，有效期 1 小时；设备无需解析，仅透传给 LiveKit SDK

- **回执**: `device/:serial_number/command_ack`（`msg_id` 回显，格式见 [MQTT 协议规范](./mqtt_convention.md)的 command_ack 章节）

  | result        | 设备侧场景                                                        |
  | ------------- | ----------------------------------------------------------------- |
  | accepted      | 本地校验通过（对讲模块健康、麦克风存在、音频设备可用），将异步加入房间 |
  | temp_rejected | 音频设备暂时被占用，可重试                                          |
  | denied        | 当前设备状态不允许对讲                                              |
  | failed        | 无麦克风 / 音频设备初始化失败（message 携带原因）                    |
  | unsupported   | 固件不支持对讲（旧固件兼容）                                        |

- **接口说明**

  - 回执为**受理**语义：`accepted` 不代表已加入房间，加入为异步动作，平台经 LiveKit 感知设备上线
  - 幂等（QoS 1 可能重复投递）：重复收到 `start_intercom` 且 token 相同 → 忽略但**仍须回执** `accepted`；token 不同 → 断开当前连接并以新 token 重连
  - token 过期后断线重连失败 → 设备回到 idle 状态，等待平台重新下发

## 结束对讲

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = stop_intercom`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": { "type": "stop_intercom" }
  }
  ```

- **接口说明**

  - 幂等：未在对讲中收到 `stop_intercom` 仍回执 `accepted`
  - 设备离开房间并**彻底释放**麦克风/扬声器设备
  - 房间被平台删除导致连接断开时，设备应等效于收到本命令：自动收摊并释放音频设备，回 idle

## 对讲 Participant 命名约定

设备对讲模块在 LiveKit 房间内是一个独立 participant，identity 由平台签发 token 时固定：

| 字段                 | 约定                                          | 示例                            |
| -------------------- | --------------------------------------------- | ------------------------------- |
| participant_identity | `participant:device:{serial_number}:intercom` | `participant:device:RDU001:intercom` |

- 与视频流各路摄像头 participant（`…:{component_name}`）同房间并存，前缀一致，**不得共用 identity**
- 客户端按 identity 中的 `intercom` 尾段识别设备麦克风轨

## 能力上报

设备是否具备对讲能力，通过[心跳](./device.md#心跳)的 `components` 字段告知平台：

```json
"components": {
  "audio.intercom": { "id": 26, "status": "ok" }
}
```

- key 为 `"{type}.{name}"` 点分复合键（见 [Component ID 分配规范](../design/component-id.md)）
- `audio.intercom`（id = 26）：语音对讲模块（麦克风 + 回声消除）
- 平台仅对已上报该组件的设备开启对讲，未上报的设备不会被调用（回执 `unsupported` 仅作兜底）

## 设备端配合事项

- **必须实现完整 LiveKit 客户端**（推荐官方 C++ SDK，或等价 WebRTC 实现）。⚠️ 对讲**不能**使用 WHIP：WHIP 仅支持向服务器发布媒体，无法订阅下行音频
- **音频参数**：采集/播放采样率 48kHz，编码 Opus（WebRTC 强制支持，无需能力协商）
- **订阅范围**：只订阅音频轨，不订阅视频轨（节省设备下行带宽）
- **回声消除（AEC）**：喇叭外放场景必须有；硬件 AEC 声卡或 SDK 软件 AEC 二选一，**不可双重处理**（双重 AEC 损伤双讲质量）
- **断线重连**：指数退避；房间删除导致的断开不重连，直接收摊回 idle
- **与[语音播报](./voice.md)共存**：建议 `play_voice` 播放与对讲输出使用同一声卡（播报内容进入回声消除参考，不会泄露到上行）
- **事件上报（可选）**：对讲连接异常可上报[事件](./events.md) `1104`，平台对设备在线状态的感知不依赖此事件
