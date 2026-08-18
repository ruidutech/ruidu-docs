# MQTT 协议规范

## Topic 命名规范

1. 使用层级结构，采用斜杠 `/` 分隔，层级表达逻辑关系：
    ```txt
    <实体类型>/<实体ID>/<消息类型>
    ```
2. 广播消息，使用 `scope` 进行区分，例如：
    - broadcast/all/update
    - broadcast/group-A/ota
3. 消息响应机制
    - MQTT 本身无响应机制，使用 `ack` 以示区分：`device/{device_id}/register/ack`
    - 消息中加入 `msg_id` 字段进行匹配：
        ```json
        {
          "msg_id": "uuid-456",
          "status": 0,                  // 错误时，提供具体错误码
          "message": "error message."
        }
        ```

例如：

| Topic 示例            | 描述               |
| -------------------- | ---------------- |
| `device/001/status`     | 设备 `001` 上报状态    |
| `device/001/telemetry`  | 设备 `001` 上报遥测数据  |
| `device/001/cmd`        | 平台向设备 `001` 下发命令 |
| `device/+/status`       | 平台订阅所有设备状态       |
| `broadcast/all/ota` | 平台广播信息           |

MQTT 标准 不支持 `{}` 占位符，需使用 `显式路径`， 通配符仅用于订阅：

| 通配符 | 用法    | 示例                 |
| --- | ----- | ------------------ |
| `+` | 匹配单层级 | `device/+/status` |
| `#` | 匹配多层级 | `device/#`        |

## 消息体格式

采用结构化 `JSON` 作为消息体，包含元信息字段：

```json
{
  "msg_id": "uuid-456",                 // 消息ID，仅使用与需要Ack的消息
  "timestamp": 1757403776, // Unix 时间戳  // 时间戳
  "data": {                             // 业务数据
    "device_id": "001",
    "battery": 89,
    "gps": [30.5, 114.3],
    "status": "OK"
  }
}
```

## 设备命令与回执（command / command_ack）

设备命令的统一通道与逐命令回执机制：

- **下发**：命令可经专属 topic（如 `device/:serial_number/set_mode`，由各命令接口文档定义）或统一命令 topic `device/:serial_number/command` 下发，两者并存，某命令采用哪种以该命令的接口文档为准
- **回执**：经统一 topic 下发的命令，设备**必须**回复 `device/:serial_number/command_ack`，以 `msg_id` 与命令关联

### 命令下发（command）

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/command`
- **接口方向**: 平台 -> 设备
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "type": "set_mode", // 命令标识，与专属 topic 末段一致
      "base_mode": "guided" // 命令参数平铺，不嵌套 params
    }
  }
  ```

- **接口说明**
  - `data` 采用 **type + 字段平铺**：设备读 `data.type` 分发命令，其余字段即命令参数
  - `msg_id` 为回执关联键，设备须在 `command_ack` 中原样回显
  - 设备端宜同时支持统一 topic 与专属 topic 两种解析，命令迁移期间两者并存

### 命令回执（command_ack）

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/command_ack`
- **接口方向**: 设备 -> 平台
- **QoS**: 1
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 被响应命令的 msg_id，原样回显
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191",
    "data": {
      "type": "set_mode", // 命令标识，与下行 data.type 一致
      "result": "accepted", // 受理结果，见 result 字典
      "progress": 0.5, // 可选，仅 result=in_progress 时携带，取值 [0,1]
      "message": "" // 可选，补充说明
    }
  }
  ```

- **接口说明**
  - 收到统一 topic 命令后应尽快回执，平台等待（默认 5s）超时即视为命令失败
  - 回执表达**受理**结果：执行进度与终态走既有状态流（如 `mission_current`），不进回执
  - `result` 未知取值、`progress` 超出 `[0,1]` 时平台丢弃该消息
  - `temp_rejected` 表示暂时性拒绝（如设备忙），平台可重试

### result 字典

command_ack_result

| value         | name           | desc                             |
| ------------- | -------------- | -------------------------------- |
| accepted      | ACCEPTED       | 已接受                           |
| in_progress   | IN_PROGRESS    | 执行中（附 progress）            |
| temp_rejected | TEMP_REJECTED  | 暂时拒绝（如忙碌），可重试       |
| denied        | DENIED         | 拒绝（状态/模式不满足或参数非法） |
| unsupported   | UNSUPPORTED    | 设备不支持该命令                 |
| failed        | FAILED         | 执行失败                         |
| canceled      | CANCELED       | 已取消                           |

- **Mavlink 参考**
  - [COMMAND_ACK](https://mavlink.io/en/messages/common.html#COMMAND_ACK)

