# 激光消息

## 功能说明
激光管理，可用来获取激光的原始数据

## 简要描述
激光雷达消息获取

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [获取2D激光数量](#获取2d激光数量)
- [获取原始激光数据](#获取原始激光数据)
- [获取2D激光数据](#获取2d激光数据)
- [获取栅格化激光数据](#获取栅格化激光数据)
- [3D激光消息推送](#3d激光消息推送)

## 接口详情

### 获取2D激光数量

**简要描述:**
获取2D激光的个数

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2021-11-15 | 2021-11-15 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/get_scan_grid_sum`

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
    "scan_count": 2
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
| scan_count | int | 2D激光数量 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取原始激光数据

**简要描述:**
获取原始激光数据

**接口版本:**
| 版本号 | 修订说明 | 修订日期 |
|:-------|:---------|:--------:|
| 1.0.0  | 初次创建 | 2020-4-23 |
| 1.1.0  | 该接口即将废弃 | 2022-5-28 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/raw_scan`

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
    "header": {
      "stamp": 14321212,
      "frame_id": "laser"
    },
    "angle_min": -2.3,
    "angle_max": 2.3,
    "angle_increment": 0.0058171823620796204,
    "range_min": 0.05000000074505806,
    "range_max": 10,
    "ranges": [4.941999912261963, 4.9710001945495605, "...(省略)", 2.4079999923706055],
    "intensities": [0.0, 284.0, 282.0, 286.0, 284.0, 283.0, 284.0, "...(省略)", 230.0, 0.0, 0.0]
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
| header | object | 消息头信息 |
| angle_min | float | 数据开始角度，单位弧度 |
| angle_max | float | 数据结束角度，单位弧度 |
| angle_increment | float | 角度步长，单位弧度 |
| range_min | float | 激光最小范围，单位米 |
| range_max | float | 激光最大范围，单位米 |
| ranges | array | 距离数据数组 |
| intensities | array | 强度数据数组 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取2D激光数据

**简要描述:**
获取2D激光数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2021-11-9 | 2021-11-9 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/scan_grid01`

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
    "scan_data": "激光数据"
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
| scan_data | string | 2D激光数据 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取栅格化激光数据

**简要描述:**
获取栅格化后激光数据，即激光在当前地图上的位置

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/scan_grid`

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
    "sensor_type": "laser_scan_grid",
    "sensor_id": 1,
    "sensor_data": {
      "header": {
        "seq": "value",
        "stamp": "value",
        "frame_id": "laser"
      },
      "angle_min": "value",
      "angle_max": "value",
      "angle_increment": "value",
      "time_increment": "value",
      "scan_time": "value",
      "range_min": "value",
      "range_max": "value",
      "points": [
        {
          "x": "value",
          "y": "value",
          "z": "value"
        }
      ],
      "gridpoint": [
        {
          "x": 0,
          "y": 0
        }
      ],
      "intensities": [],
      "mapinfo": {
        "mapname": "value",
        "gridWidth": "value",
        "gridHeight": "value",
        "originX": "value",
        "originY": "value",
        "resolution": "value"
      }
    }
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
| sensor_type | string | 传感器类型 |
| sensor_id | int | 传感器ID |
| sensor_data | object | 传感器数据对象 |
| header | object | 消息头信息 |
| angle_min | string | 最小角度 |
| angle_max | string | 最大角度 |
| angle_increment | string | 角度增量 |
| time_increment | string | 时间增量 |
| scan_time | string | 扫描时间 |
| range_min | string | 最小距离 |
| range_max | string | 最大距离 |
| points | array | 3D点云数据 |
| gridpoint | array | 栅格点数据 |
| intensities | array | 强度数据 |
| mapinfo | object | 地图信息 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 3D激光消息推送

**简要描述:**
获取3D激光数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-5-30 | 2022-5-30 |

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
    "scan_3d_data": "3D激光数据"
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
| scan_3d_data | string | 3D激光数据 |

**备注:**
更多返回错误代码请看首页的错误代码描述 