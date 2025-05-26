# 系统设置

## 功能说明
用于获取和设置机器人系统参数

## 简要描述
系统设置相关功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [获取充电桩](#获取充电桩)
- [修改充电桩](#修改充电桩)
- [获取参数列表](#获取参数列表)
- [参数更新](#参数更新)
- [参数解释](#参数解释)
- [获取系统参数列表](#获取系统参数列表)
- [系统参数更新](#系统参数更新)
- [参数重置](#参数重置)

## 接口详情

### 获取充电桩

**简要描述:**
获取机器人充电桩信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/get_charge_station`

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
    "pose_id": "charge_station_1",
    "position": {
      "x": 1.23,
      "y": 4.56
    },
    "orientation": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.7071,
      "w": 0.7071
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
| pose_id | string | 充电桩ID |
| position | object | 位置信息 |
| orientation | object | 方向信息（四元数） |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 修改充电桩

**简要描述:**
修改机器人充电桩信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/set_charge_station`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| pose_id | 是 | string | 充电桩ID |
| position_x | 是 | double | X坐标位置 |
| position_y | 是 | double | Y坐标位置 |
| orientation_z | 是 | double | 方向四元数z分量 |
| orientation_w | 是 | double | 方向四元数w分量 |

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

### 获取参数列表

**简要描述:**
获取机器人导航参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/get_params`

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
    "params": [
      {
        "name": "max_velocity",
        "value": "0.5",
        "type": "double"
      },
      {
        "name": "use_infrared",
        "value": "1",
        "type": "int"
      }
    ]
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
| params | array | 参数列表 |
| name | string | 参数名称 |
| value | string | 参数值 |
| type | string | 参数类型 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 参数更新

**简要描述:**
更新机器人导航参数

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/update_params`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| params | 是 | string | 参数信息，JSON字符串 |

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

### 参数解释

**简要描述:**
获取参数解释信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/params_description`

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
    "descriptions": [
      {
        "name": "max_velocity",
        "description": "机器人最大线速度，单位m/s"
      },
      {
        "name": "use_infrared",
        "description": "是否启用红外传感器，1启用，0禁用"
      }
    ]
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
| descriptions | array | 参数解释列表 |
| name | string | 参数名称 |
| description | string | 参数解释 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取系统参数列表

**简要描述:**
获取机器人系统参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/get_system_params`

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
    "params": [
      {
        "name": "wifi_ssid",
        "value": "robot_wifi",
        "type": "string"
      },
      {
        "name": "auto_update",
        "value": "1",
        "type": "int"
      }
    ]
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
| params | array | 参数列表 |
| name | string | 参数名称 |
| value | string | 参数值 |
| type | string | 参数类型 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 系统参数更新

**简要描述:**
更新机器人系统参数

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/update_system_params`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| params | 是 | string | 参数信息，JSON字符串 |

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

### 参数重置

**简要描述:**
重置机器人参数至出厂设置

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/settings/reset_params`

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