# 目标跟随功能

## 功能说明
用于目标跟随功能的控制和参数设置

## 简要描述
目标跟随相关功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [开始目标跟随](#开始目标跟随)
- [停止目标跟随](#停止目标跟随)
- [获取跟随状态](#获取跟随状态)
- [设置跟随参数](#设置跟随参数)
- [获取跟随参数](#获取跟随参数)

## 接口详情

### 开始目标跟随

**简要描述:**
开始跟随指定的目标

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/following/start?target_id=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| target_id | 是 | string | 目标ID |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": "",
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 100,
  "msg": "target not found",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 停止目标跟随

**简要描述:**
停止目标跟随

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/following/stop`

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
  "data": "",
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取跟随状态

**简要描述:**
获取当前目标跟随状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/following/status`

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
    "is_following": true,
    "target_id": "person_1",
    "target_distance": 1.5,
    "target_angle": 0.2,
    "status": "normal"
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
| is_following | boolean | 是否正在跟随 |
| target_id | string | 目标ID |
| target_distance | double | 与目标的距离，单位m |
| target_angle | double | 目标相对于机器人的角度，单位rad |
| status | string | 跟随状态：normal-正常跟随，lost-目标丢失，blocked-路径被阻挡 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 设置跟随参数

**简要描述:**
设置目标跟随的参数

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/following/set_params`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| max_speed | 否 | double | 最大跟随速度，单位m/s |
| min_distance | 否 | double | 最小跟随距离，单位m |
| max_distance | 否 | double | 最大跟随距离，单位m |
| tracking_timeout | 否 | int | 目标丢失超时时间，单位秒 |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": "",
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取跟随参数

**简要描述:**
获取目标跟随的参数

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/following/get_params`

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
    "max_speed": 0.8,
    "min_distance": 1.0,
    "max_distance": 3.0,
    "tracking_timeout": 5
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
| max_speed | double | 最大跟随速度，单位m/s |
| min_distance | double | 最小跟随距离，单位m |
| max_distance | double | 最大跟随距离，单位m |
| tracking_timeout | int | 目标丢失超时时间，单位秒 |

**备注:**
更多返回错误代码请看首页的错误代码描述 