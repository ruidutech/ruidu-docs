# 警报上报

## 消息格式

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/alarm`
- **QoS**: 1（AtLeastOnce，警报不可丢）
- **请求参数**
  ```json
  {
    "msg_id": "uuid-801",
    "timestamp": 1757403900, // Unix 时间戳
    "serial_number": "sn-191", // 设备序列号
    "data": {
      "alarm_type": "person_fallen", // 警报类型（必填，开放词表）
      "confidence": 0.87, // 算法置信度 [0,1]（可选）
      "media_id": "uuid-xxx" // 识别截图媒体 ID（可选）
    }
  }
  ```

## 字段说明

| 字段 | 必填 | 说明 |
| ---- | ---- | ---- |
| `alarm_type` | 是 | 警报类型，开放词表：上报预设类型之外的新类型原样上报，平台原样存储展示 |
| `confidence` | 否 | 识别算法置信度，取值 [0,1]，超出范围消息被拒绝 |
| `media_id` | 否 | 关联的识别截图（媒体上传流程完成后分配的 ID） |
| 其他字段 | 否 | 原样保留进警报上下文（如上游事件号 `external_event_id`） |

## 预设类型词表

| alarm_type | 中文 | 默认严重度 |
| ---------- | ---- | ---------- |
| `fire_lane_blocked` | 消防占道 | warning |
| `access_anomaly` | 门禁异常 | warning |
| `person_fallen` | 人员倒地 | critical |

## 平台处理规则

- **站点归属**：警报归属于设备绑定的站点，设备须已在平台注册并绑定站点，否则消息被忽略
- **去重冷却**：同站点同类型 60 秒窗口内重复上报只产生一条警报（多设备同时识别同一事件时自动抑制）
- **瞬时事件**：识别即上报，无恢复信号；处置（resolve）由平台侧人工完成
- **位置**：警报位置取设备最新上报的 GPS，无需在消息中携带

## 与 event 通道的分界

安防警报不走 `device/:serial_number/event`（该通道仅承载设备健康告警，见 [events.md](./events.md)），不占用 event code 区段。

第三方系统（火警主机/门禁控制器等）不走本 MQTT 通道，经平台告警源 token 走 HTTP 上报（`POST /alarms/report`），与本文共用同一上报信封，见开放平台文档「警报上报」。
