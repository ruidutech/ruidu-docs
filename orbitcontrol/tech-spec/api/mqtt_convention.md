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
  "timestamp": "2025-07-18T03:15:00Z",  // 时间戳
  "data": {                             // 业务数据
    "device_id": "001",
    "battery": 89,
    "gps": [30.5, 114.3],
    "status": "OK"
  }
}
```

