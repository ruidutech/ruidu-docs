# 充电相关 API

充电控制（平台 → 设备）基于 MQTT 统一命令通道（[command / command_ack](./mqtt_convention.md)），支持平台即时发起开始/停止充电。同一动作语义也可作为任务 waypoint 动作下发（见[任务执行](./mission.md)），线上格式同构。

## 总体流程

1. 平台校验设备在线，通过 `device/:serial_number/command` 下发 [开始充电](#开始充电)（可携带目标电量）
2. 设备本地校验（充电桩对接、当前状态）后回执 `command_ack`（受理语义），随后执行充电
3. 充电进度与状态经 [battery 状态上报](./device.md#电池)感知，不进回执
4. 到达 `target_soc` 后设备自动停止充电；平台也可随时下发 [停止充电](#停止充电)

## 开始充电

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = start_charging`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": {
      "type": "start_charging",
      "target_soc": 80 // 目标电量百分比（0-100），可选
    }
  }
  ```

- **字段说明**
  - `target_soc`: 目标电量（State of Charge，百分比 0-100），充至该值后设备自动停止充电。缺省表示持续充电、不自动退出（区别于 `100`：后者充满即自动停止）

- **回执**: `device/:serial_number/command_ack`（`msg_id` 回显，格式见 [MQTT 协议规范](./mqtt_convention.md)的 command_ack 章节）

  | result        | 设备侧场景                                       |
  | ------------- | ------------------------------------------------ |
  | accepted      | 校验通过（充电桩对接正常），开始充电              |
  | temp_rejected | 充电桩暂时不可用，可退避重试                      |
  | denied        | 当前状态不允许充电（如不在充电位）                |
  | failed        | 充电启动失败（message 携带原因）                  |
  | unsupported   | 固件不支持充电控制                                |

- **接口说明**

  - 回执为**受理**语义：`accepted` 不代表已充满，充电进度经 [battery 状态上报](./device.md#电池)感知
  - 幂等（QoS 1 可能重复投递）：已在充电中收到相同 `start_charging` → 忽略但**仍须回执** `accepted`
  - 参数语义与任务 waypoint 动作 `start_charging` 一致（见[任务执行](./mission.md)）

## 停止充电

- **协议类型**: MQTT（统一命令通道）
- **接口地址**: `device/:serial_number/command`（`data.type = stop_charging`）
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "DEVICE-001",
    "data": { "type": "stop_charging" }
  }
  ```

- **接口说明**

  - 幂等：未在充电中收到 `stop_charging` 仍回执 `accepted`
  - 设备停止充电并按自身策略决定后续动作（如保持原位待命）

## 与任务 waypoint 动作的关系

| 维度     | 本通道（独立命令）                     | 任务 waypoint 动作                       |
| -------- | -------------------------------------- | ---------------------------------------- |
| 触发方式 | 平台 API 即时下发                      | 任务执行到该 waypoint 时由设备触发        |
| 载荷格式 | `data.type = start_charging/stop_charging`（同构） | 同左                                     |
| 回执     | `command_ack`（平台等待受理，超时判失败） | 任务进度流（mission_current）            |

`stop_charging` 作为 waypoint 动作仍为预留（暂不接入任务配置），仅本通道可用。
