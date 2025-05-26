# 消息推送

## 功能说明
用于机器人状态和事件的实时消息推送

## 简要描述
消息推送相关功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [ws-notification消息推送](#ws-notification消息推送)
- [定位推送消息获取(已弃用)](#定位推送消息获取已弃用)
- [所有消息推送(websocket)](#所有消息推送websocket)
- [激光消息推送(websocket)](#激光消息推送websocket)

## 接口详情

### ws-notification消息推送

**简要描述:**
通过WebSocket方式获取机器人通知消息推送

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `ws://机器人IP:端口号/robot/message/ws-notification`

**请求方式:**
- WebSocket

**请求参数:**
无

**返回示例:**

消息格式:
```json
{
  "type": "notification",
  "data": {
    "id": "123456",
    "level": "info",
    "message": "任务已完成",
    "timestamp": "2022-09-11 10:20:30"
  }
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| type | string | 消息类型 |
| data | object | 消息数据 |
| id | string | 消息ID |
| level | string | 消息级别：info, warning, error |
| message | string | 消息内容 |
| timestamp | string | 时间戳 |

**备注:**
连接建立后服务器会自动推送相关类型的消息

### 定位推送消息获取(已弃用)

**简要描述:**
获取机器人位置信息推送（已弃用，请使用WebSocket方式）

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2022-10-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/message/get_localization`

**请求方式:**
- GET 
- POST

**请求参数:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "position": {
      "x": 1.23,
      "y": 4.56,
      "z": 0.0
    },
    "orientation": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.7071,
      "w": 0.7071
    },
    "timestamp": "2022-09-11 10:20:30"
  },
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 100,
  "msg": "",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| position | object | 位置信息 |
| orientation | object | 方向信息（四元数） |
| timestamp | string | 时间戳 |

**备注:**
此接口已弃用，请使用WebSocket方式获取位置信息推送

### 所有消息推送(websocket)

**简要描述:**
通过WebSocket方式获取机器人所有类型消息推送

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `ws://机器人IP:端口号/robot/message/ws-all`

**请求方式:**
- WebSocket

**请求参数:**
无

**返回示例:**

消息格式:
```json
{
  "type": "position",
  "data": {
    "position": {
      "x": 1.23,
      "y": 4.56,
      "z": 0.0
    },
    "orientation": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.7071,
      "w": 0.7071
    },
    "timestamp": "2022-09-11 10:20:30"
  }
}
```

```json
{
  "type": "battery",
  "data": {
    "percentage": 75.5,
    "is_charging": false,
    "timestamp": "2022-09-11 10:20:30"
  }
}
```

```json
{
  "type": "task_status",
  "data": {
    "task_id": "12345",
    "status": "running",
    "progress": 50,
    "timestamp": "2022-09-11 10:20:30"
  }
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| type | string | 消息类型：position, battery, task_status等 |
| data | object | 消息数据 |
| timestamp | string | 时间戳 |

**备注:**
连接建立后服务器会自动推送相关类型的消息

### 激光消息推送(websocket)

**简要描述:**
通过WebSocket方式获取机器人激光数据推送

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `ws://机器人IP:端口号/robot/message/ws-laser`

**请求方式:**
- WebSocket

**请求参数:**
无

**返回示例:**

消息格式:
```json
{
  "angle_min": -3.14159,
  "angle_max": 3.14159,
  "angle_increment": 0.01745,
  "time_increment": 0.0,
  "scan_time": 0.1,
  "range_min": 0.45,
  "range_max": 10.0,
  "ranges": [1.0, 1.5, 2.0, 2.5, ...],
  "intensities": [100, 150, 200, ...],
  "timestamp": "2022-09-11 10:20:30"
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| angle_min | double | 起始角度，单位rad |
| angle_max | double | 结束角度，单位rad |
| angle_increment | double | 角度增量，单位rad |
| time_increment | double | 时间增量，单位s |
| scan_time | double | 扫描时间，单位s |
| range_min | double | 最小测量距离，单位m |
| range_max | double | 最大测量距离，单位m |
| ranges | array | 距离数据列表，单位m |
| intensities | array | 强度数据列表 |
| timestamp | string | 时间戳 |

**备注:**
连接建立后服务器会自动推送相关类型的消息 