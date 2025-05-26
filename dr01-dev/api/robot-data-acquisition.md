# 机器人数据采集

## 功能说明
获取机器人各种状态数据

## 简要描述
机器人数据采集相关功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [获取固件版本](#获取固件版本)
- [获取原始速度数据](#获取原始速度数据)
- [获取机器人位置数据](#获取机器人位置数据)
- [获取原始里程计数据](#获取原始里程计数据)
- [获取机器人电量信息](#获取机器人电量信息)
- [获取防撞条数据](#获取防撞条数据)
- [获取超声波数据](#获取超声波数据)
- [获取红外线数据](#获取红外线数据)
- [获取底盘状态数据](#获取底盘状态数据)
- [获取环境传感器数据](#获取环境传感器数据)
- [获取GPS数据信息](#获取gps数据信息)
- [获取栅格化GPS数据](#获取栅格化gps数据)
- [获取原始IMU数据](#获取原始imu数据)
- [获取系统状态](#获取系统状态)
- [获取加密狗状态](#获取加密狗状态)

## 接口详情

### 获取固件版本

**简要描述:**
获取机器人固件版本信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/version`

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
    "version": "1.0.0",
    "build_time": "2022-09-11 10:20:30"
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
| version | string | 固件版本号 |
| build_time | string | 构建时间 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取原始速度数据

**简要描述:**
获取机器人原始速度数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/velocity`

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
    "linear_x": 0.5,
    "linear_y": 0.0,
    "angular_z": 0.1
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
| linear_x | double | x方向线速度，单位m/s |
| linear_y | double | y方向线速度，单位m/s |
| angular_z | double | z方向角速度，单位rad/s |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取机器人位置数据

**简要描述:**
获取机器人当前位置数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/position`

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
| position | object | 位置信息 |
| x | double | x坐标，单位m |
| y | double | y坐标，单位m |
| z | double | z坐标，单位m |
| orientation | object | 方向信息（四元数） |
| x | double | 四元数x分量 |
| y | double | 四元数y分量 |
| z | double | 四元数z分量 |
| w | double | 四元数w分量 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取原始里程计数据

**简要描述:**
获取机器人原始里程计数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/odom`

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
    "linear_velocity": {
      "x": 0.5,
      "y": 0.0,
      "z": 0.0
    },
    "angular_velocity": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.1
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
| position | object | 位置信息 |
| orientation | object | 方向信息（四元数） |
| linear_velocity | object | 线速度信息 |
| angular_velocity | object | 角速度信息 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取机器人电量信息

**简要描述:**
获取机器人电池电量信息

### 获取防撞条数据

**简要描述:**
获取机器人防撞条状态数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/bumper`

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
    "bumpers": [
      {
        "id": 0,
        "state": 0
      },
      {
        "id": 1,
        "state": 1
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
| bumpers | array | 防撞条状态列表 |
| id | int | 防撞条ID |
| state | int | 防撞条状态：0-未触发，1-触发 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取超声波数据

**简要描述:**
获取机器人超声波传感器数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/ultrasonic`

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
    "ultrasonics": [
      {
        "id": 0,
        "distance": 1.23
      },
      {
        "id": 1,
        "distance": 0.56
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
| ultrasonics | array | 超声波传感器数据列表 |
| id | int | 传感器ID |
| distance | double | 距离值，单位m |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取红外线数据

**简要描述:**
获取机器人红外线传感器数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/infrared`

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
    "infrareds": [
      {
        "id": 0,
        "state": 0
      },
      {
        "id": 1,
        "state": 1
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
| infrareds | array | 红外线传感器数据列表 |
| id | int | 传感器ID |
| state | int | 状态：0-未触发，1-触发 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取底盘状态数据

**简要描述:**
获取机器人底盘状态数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/chassis_state`

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
    "motor_states": [
      {
        "id": 0,
        "temperature": 35.2,
        "current": 1.5,
        "speed": 100
      },
      {
        "id": 1,
        "temperature": 36.1,
        "current": 1.6,
        "speed": 100
      }
    ],
    "emergency_stop": false,
    "error_code": 0
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
| motor_states | array | 电机状态列表 |
| id | int | 电机ID |
| temperature | double | 电机温度，单位°C |
| current | double | 电机电流，单位A |
| speed | int | 电机转速，单位RPM |
| emergency_stop | boolean | 是否急停 |
| error_code | int | 底盘错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取环境传感器数据

**简要描述:**
获取机器人环境传感器数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/environment`

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
    "temperature": 25.3,
    "humidity": 45.6,
    "pressure": 1013.2,
    "air_quality": 80
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
| temperature | double | 环境温度，单位°C |
| humidity | double | 环境湿度，百分比 |
| pressure | double | 大气压力，单位hPa |
| air_quality | int | 空气质量指数 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取GPS数据信息

**简要描述:**
获取机器人GPS数据信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/gps`

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
    "latitude": 39.9123456,
    "longitude": 116.3901234,
    "altitude": 43.2,
    "orientation": 270.5,
    "speed": 0.5,
    "accuracy": 1.2,
    "satellites": 8
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
| latitude | double | 纬度 |
| longitude | double | 经度 |
| altitude | double | 海拔高度，单位m |
| orientation | double | 方向角，单位度 |
| speed | double | 速度，单位m/s |
| accuracy | double | 精度，单位m |
| satellites | int | 卫星数量 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取栅格化GPS数据

**简要描述:**
获取栅格化的GPS数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/grid_gps`

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
    "grid_x": 123,
    "grid_y": 456,
    "grid_resolution": 0.05
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
| grid_x | int | 栅格X坐标 |
| grid_y | int | 栅格Y坐标 |
| grid_resolution | double | 栅格分辨率，单位m/格 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取原始IMU数据

**简要描述:**
获取机器人原始IMU数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/imu`

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
    "orientation": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.7071,
      "w": 0.7071
    },
    "angular_velocity": {
      "x": 0.0,
      "y": 0.0,
      "z": 0.1
    },
    "linear_acceleration": {
      "x": 0.0,
      "y": 0.0,
      "z": 9.8
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
| orientation | object | 方向信息（四元数） |
| angular_velocity | object | 角速度，单位rad/s |
| linear_acceleration | object | 线性加速度，单位m/s² |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取系统状态

**简要描述:**
获取机器人系统状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/system_status`

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
    "cpu_usage": 35.2,
    "memory_usage": 45.6,
    "disk_usage": 23.4,
    "cpu_temperature": 42.1,
    "uptime": 3600
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
| cpu_usage | double | CPU使用率，百分比 |
| memory_usage | double | 内存使用率，百分比 |
| disk_usage | double | 磁盘使用率，百分比 |
| cpu_temperature | double | CPU温度，单位°C |
| uptime | int | 系统运行时间，单位秒 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 获取加密狗状态

**简要描述:**
获取机器人加密狗状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/get_data/dongle_status`

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
    "dongle_status": true,
    "license_info": {
      "type": "pro",
      "expire_date": "2023-12-31"
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
| dongle_status | boolean | 加密狗状态：true-正常，false-异常 |
| license_info | object | 许可证信息 |
| type | string | 许可证类型 |
| expire_date | string | 到期日期 |

**备注:**
更多返回错误代码请看首页的错误代码描述 