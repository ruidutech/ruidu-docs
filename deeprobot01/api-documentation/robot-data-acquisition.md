# 获取机器人数据

获取数据功能。

## 获取固件版本

**简要描述:**
获取硬件版本信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/get_product_version`

**请求方式:**
- GET

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "version": "SmartDonkeyV1.1.11.13.1"
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
| errorCode | int | 错误代码 |
| version | string | 固件版本 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取原始速度数据

**简要描述:**
获取原始速度数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/raw_velocity`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "device_type": "motor_vel",
    "device_id": 1,
    "device_data": {
      "linear_vel": 0,
      "linear_y": 0,
      "angular_rotate": 0
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
| errorCode | int | 错误代码 |
| linear_vel | double | 前进/后退速度 |
| angular_rotate | double | 旋转速度 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取机器人位置数据

**简要描述:**
获取机器人位置数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/robot_pose_grid`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "nav_status_type": "robot_pose",
    "robot_id": "1",
    "worldPose": {
      "position": {
        "y": 0.027344112849991272,
        "x": -0.13367524441632958,
        "theta": -0.007225303706825474
      }
    },
    "nav_status_data": { // 栅格数据
      "angle": -0.007225303706825474,
      "gridPosition": {
        "y": 32,
        "x": 283
      },
      "mapinfo": {
        "originY": -1.586968,
        "gridWidth": 433,
        "originX": -14.29386,
        "mapname": "localmap",
        "gridHeight": 195,
        "resolution": 0.05000000074505806
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取原始里程计数据

**简要描述:**
获取相对于开机后的原始的里程计的位置

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/raw_odom`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "header": {
      "frame_id": "base_odom",
      "stamp": 848461584
    },
    "pose": {
      "orientation": {
        "w": 1,
        "x": 0,
        "y": 0,
        "z": 0
      },
      "position": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    },
    "twist": {
      "angular": {
        "x": 0,
        "y": 0,
        "z": 0
      },
      "linear": {
        "x": 0,
        "y": 0,
        "z": 0
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取机器人电量信息

**简要描述:**
机器人电量

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/battery`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "battery_24voltage": 0,
    "battery_12voltage": 0,
    "battery_capacity_percentage": 4, // 电量百分⽐,如95就是95%电量
    "battery_temperature": 2, // 电池温度
    "battery_current": 3, // 电池电流，正在充电时为正值，未充电时为负值
    "battery_voltage": 1, // 电池电压
    "battery_12current": 0,
    "battery_power": 0,
    "battery_24current": 0
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取防撞条数据

**简要描述:**
获取防撞条数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/bumper`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": "001",
  "successed": true
}
```

从右至左数据依次为急停开关,前防撞条,后防撞条,左防撞条(未使用),右防撞条(未使用)

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

## 获取超声波数据

**简要描述:**
获取超声波数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/raw_ultrasonic`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": [ // 数据的个数为超声波收到的信息个数
    {
      "angle": 0.5200000000000001,
      "range": 0.20000000298023224,
      "originY": 0.1,
      "originX": 0.33,
      "frameid": "ultrasound1"
    },
    {
      "angle": 0,
      "range": 0,
      "originY": 0,
      "originX": 0.33,
      "frameid": "ultrasound2"
    },
    {
      "angle": -0.5200000000000001,
      "range": 0.15000000596046448,
      "originY": -0.1,
      "originX": 0.33,
      "frameid": "ultrasound3"
    }
  ],
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

## 获取红外线数据

**简要描述:**
获取红外线数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/raw_irsensor`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": [ // 数据的个数为红外线收到的信息个数
    {
      "angle": 0.5200000000000001,
      "range": 0.20000000298023224,
      "originY": 0.1,
      "originX": 0.33,
      "frameid": "irsensor1"
    },
    {
      "angle": 0,
      "range": 0,
      "originY": 0,
      "originX": 0.33,
      "frameid": "irsensor2"
    },
    {
      "angle": -0.5200000000000001,
      "range": 0.15000000596046448,
      "originY": -0.1,
      "originX": 0.33,
      "frameid": "irsensor3"
    }
  ],
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

## 获取底盘状态数据

**简要描述:**
获取底盘状态数据(底盘型号DR210专用)

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/chassis_state`

**请求方式:**
- GET 
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "Laser": 1, // 激光雷达状态 0为正常，1为异常
    "Infrared": 2, // 红外线状态,请将其转换为2进制类型后,以位的⽅式计算,如:2 = (⼆进制)0010 ,从右向左,表⽰第⼀个红外线正常,第⼆个红外线异常,第三个红外线正常
    "Ultrasonic": 2, // 超声波状态,同上
    "Right_Motor": 1, // 右电机状态(差分两轮)
    "Left_Motor": 0, // 左电机状态(差分两轮)
    "Engine_Motor": 0, // 后驱动电机状态(阿克曼轮)
    "Steering_Motor": 0, // 前转向电机驱动状态(阿克曼轮)
    "E_stop": 1, // 急停开关状态
    "ChargingState": 0, // 如果为1,表⽰当前正在充电
    "ChargedState": 0 // 如果为0,表⽰充电已完成
  },
  "successed": true
}
```

状态返回0时为设备正常，状态返回其他值时为异常

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

## 获取环境传感器数据

**简要描述:**
获取环境传感器数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 修改内容 |
|:-------|:--------:|:--------:|:---------|
| 1.0.0  | 2020-4-23 | 2020-4-23 | 初次提交 |
| 1.0.1  | 2020-8-13 | 2020-8-13 | 增加NO2,CH4,CO,pm1.0.pm2.5,SO2,NO,光照强度，噪音数据 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/meteorology`

**请求方式:**
- GET

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "air_hiumidity": 0, // 空⽓湿度，单位：百分⽐
    "CO": 0, // ⼀氧化碳，单位：0.1ppm
    "pm10": 0, // pm10，单位：ug/m3
    "NO": 0, // ⼀氧化氮, 单位：ppm
    "pm2dot5": 0, // pm2.5，单位ug/m3
    "enc_illumination": 0, // 光照强度，单位：Lx
    "pm1dot0": 0, // pm1.0，单位：ug/m3
    "SO2": 0, // ⼆氧化硫，单位：ppm
    "CH4": 0, // 甲烷，单位：ppm
    "air_temperature": 0, // 空⽓温度，单位：摄⽒度
    "enc_noise": 0, // 环境噪⾳，单位：分贝
    "NO2": 0 // 二氧化氮，单位：ppm
  },
  "successed": true
}
```

状态返回0时为设备正常，状态返回其他值时为异常

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

## 获取GPS数据信息

**简要描述:**
获取GPS数据信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 修改内容 |
|:-------|:--------:|:--------:|:---------|
| 1.0.0  | 2020-8-21 | 2020-8-21 | 初次提交 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/gps_data`

**请求方式:**
- GET

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "latitude": 10.011, // 纬度
    "altitude": 0, // 海拔
    "quality": 0, // 质量
    "longitude": 11.2323 // 经度
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取栅格化GPS数据

**简要描述:**
获取GPS栅格坐标位置

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-11-27 | 2020-11-27 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/grid_gps_data`

**请求方式:**
- GET
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "header": {
      "stamp": 0,
      "frame_id": ""
    },
    "type": 0, // 数据取值【0,1,2】越小越准
    "grid_point": {
      "y": 0, // 栅格坐标y
      "x": 0 // 栅格坐标x
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取原始IMU数据

**简要描述:**
获取实时原始IMU数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-10-24 | 2020-10-24 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/raw_imu`

**请求方式:**
- GET
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "header": {
      "stamp": 169861.728,
      "frame_id": "imu_link"
    },
    "angular_velocity": {
      "y": 0.00000010964278899766174,
      "x": 5.586846137219476e-10,
      "z": 0.000015791117557191532
    },
    "orientation": {
      "y": 0.002335815965079566,
      "x": -0.0015096750851293606,
      "z": -0.5428240579970882,
      "w": -0.8398418344572318
    },
    "linear_acceleration": {
      "y": -9.710372425807096e-7,
      "x": 0.05451096983066276,
      "z": 9.79984895405097
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取系统状态

**简要描述:**
获取系统

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-10-19 | 2020-10-19 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/get_system_info`

**请求方式:**
- GET
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "total_disk": 375967, // 总共硬盘大小 MB
    "memery_buffer_cache": 5810, // 内存缓存大小 MB
    "cpu_utilization": 52.5, // cpu利用率 %
    "memery_total": 15953, // 内存总大小 MB
    "memery_used_percent": 48, // 内存使用百分比 %
    "hd_serial": "WD-WCC6Y6HY2XL7", // 硬盘序列号
    "free_disk": 150286, // 硬盘空闲大小 MB
    "memery_available": 8255 // 可用内存大小 MB
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取加密狗状态

**简要描述:**
获取加密狗状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-12-9 | 2020-12-9 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/sensor_data/dongle_state`

**请求方式:**
- GET
- POST

**请求头:**
无

**请求参数:**
无

**请求发送json:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "dongle_state": false // 加密狗状态失败
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述