# 消息推送

## 功能说明
消息推送，获取机器⼈的数据接⼝

## 简要描述
消息推送接⼝

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [ws-notification消息推送](#ws-notification消息推送)
- [定位推送消息获取（已弃⽤）](#定位推送消息获取（已弃⽤）)
- [所有消息推送(websocket)](#所有消息推送websocket)
- [激光消息推送(websocket)](#激光消息推送websocket)
- [3D激光消息推送](#3d激光消息推送)

## 接口详情

### ws-notification消息推送

**简要描述:**
获得导航、设备、定位数据推送消息

**接口版本:**
| 版本号 | 制定日期 | 备注 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-09-05 | 初次创建 |

**状态限制:**
无

**状态跳转至:**
无

**WebSocket连接:** 
- `ws://机器人IP:端口号/robot/ws/notice`

**请求方式:**
- WebSocket

**请求参数:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "date": "2022-09-05 16:42:40",
    "device_notice": {
      "angular_rotate": 0.0,             // 机器人实时角度 往左为正值，往右为负值，单位是弧度
      "emergency_stop": false,           // 急停状态 false 为未触发，true 为触发
      "battery": 0.0,                    // 电池电量 单位为百分比
      "battery_voltage": 0.0,            // 电池电量 单位为V
      "bumper_front": false,             // 前防撞条状态 false 为未触发，true 为触发
      "battery_current": 0.0,            // 电池电流 正在充电时为正值，未充电时为负值，单位: 安培
      "bumper_back": false,              // 后防撞条状态 false 为未触发，true 为触发
      "current_speed": 0.0               // 机器人实时速度 单位m/s
    },
    "nav_notice": [
      {
        "target_pose": {                 // ⽬标姿势
          "position": {                  // 位置
            "y": -0.2799990000000001,
            "x": -0.19999900000000004,
            "z": 0.0
          },
          "orientation": {
            "y": 0.0,
            "x": 0.0,
            "z": -0.7482714447636114,
            "w": 0.6633926777945154
          }
        },
        "notice_level": "INFO",           // 通知等级：INFO 信息，ERROR 错误，WARN 警告，FATAL 致命的
        "target_name": "b",               // 目标名称：当前点，路径，区域的名字
        "nav_type": "NAV_POSE",           // 导航状态：NAV_POSE 跑点；FOLLOW_PATH 跑路径；CLEANAREA 跑区域
        "task_name": "NAVIGATION",        // 任务名称
        "message": "Reach target point"   // 导航推送的消息说明
      }
    ],
    "loc_notice": {
      "status": "normal",                 // 定位状态说明
      "initialized": true,
      "localization_score": 0.9489737749099731,      // 定位得分
      "avg_localization_score_on_map": 0.8634043335914612,
      "gridPosition": {                   // 像素坐标
        "y": 488.0,
        "x": 541.0
      },
      "worldPose": {                      // 世界坐标
        "position": {
          "y": -0.24400469863587393,
          "x": -0.18937980195106974,
          "z": 0.0
        },
        "theta": -1.712940846675072
      }
    }
  },
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 103,
  "msg": "NOT_RECIVED_MSG",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| date | string | 时间戳 |
| device_notice | object | 设备通知信息 |
| angular_rotate | double | 机器人实时角度，单位弧度 |
| emergency_stop | boolean | 急停状态 |
| battery | double | 电池电量百分比 |
| battery_voltage | double | 电池电压，单位V |
| battery_current | double | 电池电流，单位安培 |
| bumper_front | boolean | 前防撞条状态 |
| bumper_back | boolean | 后防撞条状态 |
| current_speed | double | 实时速度，单位m/s |
| nav_notice | array | 导航通知信息列表 |
| notice_level | string | 通知等级：INFO/ERROR/WARN/FATAL |
| target_name | string | 目标名称 |
| nav_type | string | 导航类型：NAV_POSE/FOLLOW_PATH/CLEANAREA |
| task_name | string | 任务名称 |
| message | string | 消息内容 |
| loc_notice | object | 定位通知信息 |
| status | string | 定位状态 |
| localization_score | double | 定位得分 |
| gridPosition | object | 像素坐标 |
| worldPose | object | 世界坐标 |

**定位状态说明:**
- `"normal"`: 已初始化完成，正常激光定位中
- `"uninitialized"`: 未初始化定位
- `"switching_map"`: 正在切换地图
- `"initializing"`: 正在初始化定位
- `"out_of_map"`: 表示机器人在地图范围外
- `"sensor_data_lost"`: 激光数据丢失
- `"laser_check_failed"`: 表示机器人检测失败

**导航推送消息说明:**
- `"Running to target point"`: 开始导航跑目标点
- `"Reach target point"`: 抵达目标点，机器人只是导航到点，没有完成动作
- `"Finish target point"`: 完成目标点，导航+动作都已完成
- `"UnReach target point"`: 没有抵达目标点
- `"UnReach target path"`: 没有抵达目标路径
- `"UnReach target clean_area"`: 没有抵达目标清洁区域

**备注:**
连接建立后服务器会自动推送相关类型的消息

### 定位推送消息获取（已弃⽤）

**简要描述:**
获取硬件版本信息（已弃用）

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2021-12-06 | 2021-12-06 |

**状态限制:**
- RunningTask
- Localization

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/notice/get_localization_notice`

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
    "status": "normal",                          // 可能的定位状态："normal"（已初始化完成，正常激光定位中）
                                                 // "uninitialized"（未初始化定位）
                                                 // "initializing"（正在初始化定位）
                                                 // "out_of_map"（机器人跑出地图外围）
    "localization_score": 0.85,                  // 0-1 之间
    "avg_localization_score_on_map": 0.65
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
| status | string | 定位状态 |
| localization_score | double | 定位得分，0-1之间 |
| avg_localization_score_on_map | double | 地图上平均定位得分 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 所有消息推送(websocket)

**简要描述:**
获得导航、设备、定位数据推送消息（包含所有类型数据）

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-04-01 | 2022-04-01 |

**状态限制:**
无

**状态跳转至:**
无

**WebSocket连接:** 
- `ws://机器人IP:端口号/robot/notification`

**请求方式:**
- WebSocket

**请求参数:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "angular_rotate": 0.0,                       // 机器人实时角度 往左为正值，往右为负值，单位是弧度
    "auto_mode": 1,                              // 当前的驾驶模式 0: 自动驾驶，1: 远程驾驶
    "status": "normal",                          // 定位状态说明
                                                 // normal: 已初始化完成，正常激光定位中
                                                 // uninitialized: 未初始化定位
                                                 // switching_map: 正在切换地图
                                                 // initializing: 正在初始化定位
                                                 // out_of_map: 表⽰机器⼈在地图范围外
                                                 // sensor_data_lost: 激光数据丢失
                                                 // laser_check_failed: 表⽰机器⼈检测失败
    "localization_score": 0.9489737749099731,    // 定位得分
    "emergency_stop": false,                     // 急停状态 false 为未触发，true 为触发
    "battery": 0.0,                              // 电池电量 单位为百分比
    "nav_status": [
      {
        "target_pose": {
          "position": {
            "y": -0.2799990000000001,
            "x": -0.19999900000000004,
            "z": 0.0
          },
          "orientation": {
            "y": 0.0,
            "x": 0.0,
            "z": -0.7482714447636114,
            "w": 0.6633926777945154
          }
        },
        "notice_level": "INFO",                  // 通知等级：INFO 信息，ERROR 错误，WARN 警告，FATAL 致命的
        "target_name": "b",                      // 目标名称：当前点，路径，区域的名字
        "nav_type": "NAV_POSE",                  // 导航状态：NAV_POSE 跑点；FOLLOW_PATH 跑路径；CLEANAREA 跑区域
        "task_name": "NAVIGATION",               // 任务名称
        "message": "Reach target point"          // 导航推送的消息说明
      }
    ],
    "battery_voltage": 0.0,                      // 电池电量 单位为V
    "worldPose": {                               // 世界坐标
      "position": {
        "y": -0.24400469863587393,
        "x": -0.18937980195106974,
        "theta": -1.712940846675072
      }
    },
    "device_status": "device_notice",
    "bumper_front": false,                       // 前防撞条状态 false 为未触发，true 为触发
    "navigate_status": "navigation_notice",
    "current_speed": 0.0,                        // 机器人实时速度 单位m/s
    "sensor_exception_event": {                  // 激光雷达连接异常雷达掉线
      "Info": "Laser disconnection, please check the laser!",
      "Sensor_id": [
        "scan_1",                                // 一号雷达
        "scan_2",                                // 二号雷达
        "scan_3",                                // 三号雷达
        "scan_4"                                 // 四号雷达
      ],
      "Level": 0                                 // 告警等级：0-INFO 1-WARN 2-ERROR
    },
    "initialized": true,
    "localization_status": "localization_notice",
    "gridPosition": {                            // 像素坐标
      "y": 488.0,
      "x": 541.0
    },
    "battery_current": 0.0,                      // 电池电流 正在充电时为正值，未充电时为负值，单位: 安培
    "bumper_back": false,                        // 后防撞条状态 false 为未触发，true 为触发
    "avg_localization_score_on_map": 0.8634043335914612
  },
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 103,
  "msg": "NOT_RECIVED_MSG",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| angular_rotate | double | 机器人实时角度，单位弧度 |
| auto_mode | int | 驾驶模式：0自动驾驶，1远程驾驶 |
| status | string | 定位状态 |
| localization_score | double | 定位得分 |
| emergency_stop | boolean | 急停状态 |
| battery | double | 电池电量百分比 |
| nav_status | array | 导航状态信息列表 |
| battery_voltage | double | 电池电压，单位V |
| worldPose | object | 世界坐标 |
| device_status | string | 设备状态 |
| bumper_front | boolean | 前防撞条状态 |
| navigate_status | string | 导航状态 |
| current_speed | double | 实时速度，单位m/s |
| sensor_exception_event | object | 传感器异常事件 |
| initialized | boolean | 初始化状态 |
| localization_status | string | 定位状态 |
| gridPosition | object | 像素坐标 |
| battery_current | double | 电池电流，单位安培 |
| bumper_back | boolean | 后防撞条状态 |
| avg_localization_score_on_map | double | 地图上平均定位得分 |

**导航推送消息说明:**
- `"Running to target point"`: 开始导航跑目标点
- `"Reach target point"`: 抵达目标点，机器人只是导航到点，没有完成动作
- `"Finish target point"`: 完成目标点，导航+动作都已完成
- `"UnReach target point"`: 没有抵达目标点
- `"UnReach target path"`: 没有抵达目标路径
- `"UnReach target clean_area"`: 没有抵达目标清洁区域
- `"Obstacle waiting"`: 遇到障碍物等待中
- `"Obstacle In car"`: 小车可能卡在障碍物里需要手动操作

**备注:**
连接建立后服务器会自动推送相关类型的消息

### 激光消息推送(websocket)

**简要描述:**
所有激光消息推送，包括3D激光

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 备注 |
|:-------|:--------:|:--------:|:-----|
| 1.1.0  | 2022-09-02 | 2022-09-02 | 新增设置参数 |
| 1.0.0  | 2022-04-01 | 2022-04-01 | 初始创建 |

**状态限制:**
无

**状态跳转至:**
无

**WebSocket连接:** 
- `ws://机器人IP:端口号/robot/notification/sensor_scan`

**请求方式:**
- WebSocket

**发送数据示例:**

设置websocket推送的参数，可以只包含希望设置的字段:
```json
{
  "sensor_interval": 1,                          // 设置websocket推送的频率，单位：秒
  "req_scan_id": ["scan_grid", "scan_grid00"]   // 设置推送的内容，scan_grid 即为设置 scan_grid_3d 字段
}
```

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "scan_grid_3d": {                            // 3d激光数据
      "sensor_type": "laser_scan_grid",
      "sensor_id": "1",
      "sensor_data": {
        "angle_min": -2.356194496154785,
        "mapinfo": {
          "originY": -14.400001,
          "gridWidth": 415,
          "originX": -16.0,
          "mapname": "85",
          "gridHeight": 543,
          "resolution": 0.05
        },
        "range_min": 0.05000000074505806,
        "scan_time": 0.0,
        "range_max": 20.0,
        "angle_increment": 0.0073746307753026485,
        "angle_max": 2.356194496154785,
        "header": {
          "stamp": 25243.55,
          "frame_id": "laser",
          "seq": 187
        },
        "points": [
          {
            "y": -2.8956832885742188,
            "x": 3.6997084617614746,
            "z": 0.0
          },
          {
            "y": -10.6650390625,
            "x": -4.958622455596924,
            "z": 0.0
          }
        ],
        "intensities": [1.0, 1.0],
        "time_increment": 0.0,
        "gridpoint": [
          {
            "y": 230,
            "x": 394
          },
          {
            "y": 75,
            "x": 221
          }
        ]
      }
    },
    "scan_grid01": {                             // 2d_01激光数据，安装多个2d激光，按scan_grid02,scan_grid03等等，最多scan_grid05
      "header": {
        "seq": 9,
        "stamp": {
          "secs": 0,
          "nsecs": 0
        },
        "frame_id": ""
      },
      "angle_min": 0.0,
      "angle_max": 0.0,
      "angle_increment": 0.0,
      "time_increment": 0.0,
      "scan_time": 0.0,
      "range_min": 0.0,
      "range_max": 0.0,
      "points": [
        {
          "y": 0.0,
          "x": 0.0,
          "z": 0.0
        }
      ],
      "gridpoint": [
        {
          "y": 0,
          "x": 0
        }
      ],
      "intensities": [0.0],
      "mapinfo": {
        "mapname": "",
        "mapId": "",
        "directory": "",
        "obstacleFileName": "",
        "gridWidth": 0,
        "gridHeight": 0,
        "originX": 0.0,
        "originY": 0.0,
        "resolution": 0.0,
        "pngMD5": "",
        "max_zoom": 0
      }
    }
  },
  "successed": true
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| scan_grid_3d | object | 3D激光数据 |
| scan_grid01-05 | object | 2D激光数据（多个传感器） |
| sensor_type | string | 传感器类型 |
| sensor_id | string | 传感器ID |
| angle_min | double | 最小角度，单位弧度 |
| angle_max | double | 最大角度，单位弧度 |
| angle_increment | double | 角度增量，单位弧度 |
| range_min | double | 最小测距，单位米 |
| range_max | double | 最大测距，单位米 |
| points | array | 点云数据 |
| intensities | array | 强度数据 |
| gridpoint | array | 栅格点数据 |
| mapinfo | object | 地图信息 |

**备注:**
连接建立后服务器会自动推送相关类型的消息

### 3D激光消息推送

**简要描述:**
获取3D激光数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-05-30 | 2022-05-30 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/scan_grid3d`

**请求方式:**
- GET

**请求参数:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed", 
  "data": {
    // 3D激光点云数据结构与激光消息推送中的scan_grid_3d字段相同
  },
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 103,
  "msg": "NOT_RECIVED_MSG",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |
| data | object | 3D激光数据 |

**备注:**
更多返回错误代码请看首页的错误代码描述 