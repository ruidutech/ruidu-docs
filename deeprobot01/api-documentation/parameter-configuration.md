# 参数配置

参数配置功能，用于调整参数来适配环境和实现机器人功能。

## 获取参数列表

**简要描述:**
获取参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/param/get_param`

**请求方式:**
- GET
- POST

**请求参数:** 无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": [
    {
      "isArray": false, // 是否为数组类型
      "type": "int", // 数据类型
      "namespace": "/devices/battery/auto_charge_percentage", // 参数名称
      "value": "41" // 参数值
    },
    {
      "isArray": false,
      "type": "double",
      "namespace": "/devices/battery/empty_voltage",
      "value": "22.000000"
    },
    {
      "isArray": false,
      "type": "double",
      "namespace": "/devices/battery/full_voltage",
      "value": "39.300000"
    },
    {
      "isArray": false,
      "type": "bool",
      "namespace": "/devices/battery/restart_task_fullbattery",
      "value": "true"
    },
    {
      "isArray": false,
      "type": "bool",
      "namespace": "/devices/camera/switch_camera",
      "value": "false"
    },
    {
      "isArray": true,
      "type": "double",
      "namespace": "/devices/fallprevention/max_range_fallprevention",
      "value": [
        "0.300000",
        "0.300000",
        "0.300000",
        "0.300000"
      ]
    },
    {
      "isArray": true,
      "type": "double",
      "namespace": "/devices/fallprevention/min_range_fallprevention",
      "value": [
        "0.500000",
        "0.500000",
        "0.500000",
        "0.500000"
      ]
    },
    {
      "isArray": true,
      "type": "bool",
      "namespace": "/devices/fallprevention/switch_fallprevention",
      "value": [
        "false",
        "false",
        "false",
        "false"
      ]
    },
    {
      "isArray": true,
      "type": "double",
      "namespace": "/devices/ultrasonic/max_range_ultrasound",
      "value": [
        "1.100000",
        "0.600000",
        "0.600000",
        "0.600000",
        "0.600000",
        "0.600000",
        "0.600000",
        "0.600000",
        "0.600000",
        "0.600000"
      ]
    },
    {
      "isArray": true,
      "type": "double",
      "namespace": "/devices/ultrasonic/min_range_ultrasound",
      "value": [
        "0.100000",
        "0.050000",
        "0.050000",
        "0.050000",
        "0.050000",
        "0.050000",
        "0.050000",
        "0.050000",
        "0.050000",
        "0.050000"
      ]
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
|:-------|:----:|:-----|
| type | string | 获取参数的类型[int,double,bool] |
| namespace | string | 获取参数名称 |
| value | string | 参数的值,请用字符串形式传输 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 参数更新

**简要描述:**
获取参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/param/update_param`

**请求方式:**
- GET
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "params": [
    {
      "type": "double",
      "namespace": "/devices/battery/empty_voltage",
      "value": "22.000000"
    },
    {
      "type": "double",
      "namespace": "/devices/battery/full_voltage",
      "value": "28.000000"
    },
    {
      "type": "double",
      "namespace": "/devices/irsensor/irsensor1_max_range",
      "value": "0.150000"
    }
  ]
}
```

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
|:-------|:----:|:-----|
| type | string | 获取参数的类型[int,double,bool] |
| namespace | string | 获取参数名称 |
| value | string | 参数的值,请用字符串形式传输 |

**备注:**
只需发送需要改动的参数数值即可修改对应参数，不需要全部发送

更多返回错误代码请看首页的错误代码描述

## 获取系统参数列表

**简要描述:**
获取参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-6-3 | 2020-6-3 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/param/get_system_param`

**请求方式:**
- GET
- POST

**请求参数:** 无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": [
    {
      "type": "double",
      "namespace": "/devices/battery/empty_voltage",
      "value": "22.000000"
    },
    {
      "type": "double",
      "namespace": "/devices/battery/full_voltage",
      "value": "28.000000"
    },
    {
      "type": "double",
      "namespace": "/devices/irsensor/irsensor1_max_range",
      "value": "0.150000"
    },
    {
      "type": "double",
      "namespace": "/devices/irsensor/irsensor1_min_range",
      "value": "0.050000"
    },
    {
      "type": "bool",
      "namespace": "/devices/irsensor/irsensor1_switch",
      "value": "true"
    },
    {
      "type": "double",
      "namespace": "/devices/ultrasonic/ultrasound1_max_range",
      "value": "0.400000"
    },
    {
      "type": "double",
      "namespace": "/devices/ultrasonic/ultrasound1_min_range",
      "value": "0.200000"
    },
    {
      "type": "bool",
      "namespace": "/devices/ultrasonic/ultrasound1_switch",
      "value": "true"
    },
    {
      "type": "double",
      "namespace": "/navigation/charger/backward_dis",
      "value": "0.500000"
    },
    {
      "type": "double",
      "namespace": "/navigation/charger/backward_velocity",
      "value": "0.100000"
    },
    {
      "type": "double",
      "namespace": "/navigation/follow/front_safe_check_dis",
      "value": "2.000000"
    },
    {
      "namespace": "/navigation/follow/speed_level",
      "limit": {
        "lower_bound": "0",
        "upper_bound": "2"
      },
      "value": "1",
      "type": "int"
    },
    {
      "type": "double",
      "namespace": "/navigation/nav/find_next_goal_duration",
      "value": "2.000000"
    },
    {
      "type": "double",
      "namespace": "/navigation/nav/goal_unsafe_quit_duration",
      "value": "8.000000"
    },
    {
      "namespace": "/navigation/nav/speed_level",
      "limit": {
        "lower_bound": "0",
        "upper_bound": "2"
      },
      "value": "1",
      "type": "int"
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
|:-------|:----:|:-----|
| type | string | 获取参数的类型[int,double,bool] |
| namespace | string | 获取参数名称 |
| value | string | 参数的值,请用字符串形式传输 |
| limit | object | 参数限制范围(仅部分参数有) |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 系统参数更新

**简要描述:**
获取参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/param/update_system_param`

**请求方式:**
- GET
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "params": [
    {
      "type": "double",
      "namespace": "/devices/battery/empty_voltage",
      "value": "22.000000"
    },
    {
      "type": "double",
      "namespace": "/devices/battery/full_voltage",
      "value": "28.000000"
    },
    {
      "type": "double",
      "namespace": "/devices/irsensor/irsensor1_max_range",
      "value": "0.150000"
    }
  ]
}
```

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
|:-------|:----:|:-----|
| type | string | 获取参数的类型[int,double,bool] |
| namespace | string | 获取参数名称 |
| value | string | 参数的值,请用字符串形式传输 |

**备注:**
只需发送需要改动的参数数值即可修改对应参数，不需要全部发送

更多返回错误代码请看首页的错误代码描述

## 参数重置

**简要描述:**
获取参数列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-7-23 | 2020-7-23 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/param/reset_param?type=`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| type | 是 | string | 设置为[user,system], 当为user时, 设置为重置用户参数，设置为system时, 为重置系统参数 |

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

**备注:**
更多返回错误代码请看首页的错误代码描述 

## 参数解释

**ChangeLog:**
2020-7-13：删除超声波红外单参数配置，修改为数组形式
2020-8-17: 增加⾃主导航的避障开关
2020-8-21: 增加双⽬摄像头避障开关

**Parameter List:**
```yaml
# 导航设置-任务-开始前检查
- namespace: /navigation/task/check_to_start
  type: bool

# 导航设置-跟随路径-避障开关(开启或关闭跟随路径时是否选择进⾏避障)
- namespace: /navigation/follow/avoid_obstacle
  type: bool

# 导航设置-跟随路径-安全检测距离(检测前⽅障碍物距离)
- namespace: /navigation/follow/front_safe_check_dis
  type: double

# 导航设置-跟随路径-速度设置(跟随路径时的速度)
- namespace: /navigation/follow/speed_level
  type: int

# 导航设置-⾃主导航-等待⽬标点空闲最⼤时间()
- namespace: /navigation/nav/goal_unsafe_quit_duration
  type: double

# 导航设置-⾃主导航-避障重规划路径最⼤时间()
- namespace: /navigation/nav/find_next_goal_duration
  type: double

# 导航设置-⾃主导航-避障开关(开启或关闭是否选择进⾏避障)
- namespace: /navigation/nav/avoid_obstacle
  type: bool

# 导航设置-⾃主导航-速度设置(⾃主导航速度)
- namespace: /navigation/nav/speed_level
  type: int

# 导航设置-充电动作-后退距离
- namespace: /navigation/charger/backward_dis
  type: double

# 导航设置-充电动作-后退速度
- namespace: /navigation/charger/backward_velocity
  type: double

# 导航设置-充电动作-充电完成后前进距离
- namespace: /navigation/charger/going_forward_offset_dis
  type: double

# 导航设置-充电动作-充电角度偏差
- namespace: /navigation/charger/rotate_yaw_tolerance
  type: double

# 导航设置-充电动作-导航⾄充电点前距离
- namespace: /navigation/charger/goal_offset_dis
  type: double

# 设备设置-电池电量-空电量电压
- namespace: /devices/battery/empty_voltage
  type: double

# 设备设置-电池电量-满电量电压
- namespace: /devices/battery/full_voltage
  type: double

# 设备设置-电池电量-⾃动充电低电量
- namespace: /devices/battery/auto_charge_percentage
  type: int

# 设备设置-电池电量-完成充电重回任务
- namespace: /devices/battery/restart_task_fullbattery
  type: bool

# 设备设置-超声波配置-超声波开关
- namespace: /devices/ultrasonic/switch_ultrasound
  type: bool
  isArray: true

# 设备设置-超声波配置-超声波最⼤距离
- namespace: /devices/ultrasonic/max_range_ultrasound
  type: double
  isArray: true

# 设备设置-超声波配置-超声波最⼩距离
- namespace: /devices/ultrasonic/min_range_ultrasound
  type: double
  isArray: true

# 设备设置-防跌落配置-防跌落开关
- namespace: /devices/fallprevention/switch_fallprevention
  type: bool
  isArray: true

# 设备设置-防跌落配置-防跌落最⼤距离
- namespace: /devices/fallprevention/max_range_fallprevention
  type: double
  isArray: true

# 设备设置-防跌落配置-防跌落最⼩距离
- namespace: /devices/fallprevention/min_range_fallprevention
  type: double
  isArray: true

# 设备设置-舵机设置-电机起始位左前
- namespace: /devices/steering/left_front_positionOn
  type: int

# 设备设置-舵机设置-电机起始位左后
- namespace: /devices/steering/left_rear_positionOn
  type: int

# 设备设置-舵机设置-电机起始位右前
- namespace: /devices/steering/right_front_positionOn
  type: int

# 设备设置-舵机设置-电机起始位右后
- namespace: /devices/steering/right_rear_positionOn
  type: int

# 设备设置-舵机设置-电机停⽌位左前
- namespace: /devices/steering/left_front_positionOff
  type: int

# 设备设置-舵机设置-电机停⽌位左后
- namespace: /devices/steering/left_rear_positionOff
  type: int

# 设备设置-舵机设置-电机停⽌位右前
- namespace: /devices/steering/right_front_positionOff
  type: int

# 设备设置-舵机设置-电机停⽌位右后
- namespace: /devices/steering/right_rear_positionOff
  type: int

# 设备设置-双⽬摄像头-摄像头避障开关
- namespace: /devices/camera/switch_camera
  type: bool

# 建图设置-场景配置
- namespace: /mapping/scenario
  type: int

# 系统参数
# 底盘设置-底盘配置-底盘参数开关
- namespace: /chassis/chassis_cfg/cfg_chassis_params_switch
  type: bool

# 底盘设置-底盘配置-底盘类型
- namespace: /chassis/chassis_cfg/cfg_chassis_type
  type: int

# 底盘设置-底盘配置-超声波类型
- namespace: /chassis/chassis_cfg/cfg_chassis_ultrasound_type
  type: int

# 底盘设置-底盘配置-电池类型
- namespace: /chassis/chassis_cfg/cfg_chassis_battery_type
  type: int

# 底盘设置-底盘配置-imu类型
- namespace: /chassis/chassis_cfg/cfg_chassis_imu_type
  type: int

# 底盘设置-底盘配置-看⻔狗开关
- namespace: /chassis/chassis_cfg/cfg_chassis_watchdog_switch
  type: int

# 底盘设置-底盘配置-看⻔狗喂狗频率
- namespace: /chassis/chassis_cfg/cfg_chassis_watchdog_threshold
  type: int

# 底盘设置-底盘配置-直⾏每圈脉冲数
- namespace: /chassis/chassis_cfg/cfg_chassis_linear_signals_per_circle
  type: int

# 底盘设置-底盘配置-转向范围脉冲数
- namespace: /chassis/chassis_cfg/cfg_chassis_angular_signals_per_range
  type: int

# 底盘设置-底盘配置-电机减速⽐
- namespace: /chassis/chassis_cfg/cfg_chassis_motor_decelebration_rate
  type: int

# 底盘设置-底盘配置-底盘预留参数1
- namespace: /chassis/chassis_cfg/cfg_chassis_param1
  type: int

# 底盘设置-底盘配置-底盘预留参数2
- namespace: /chassis/chassis_cfg/cfg_chassis_param2
  type: int

# 底盘设置-底盘配置-底盘预留参数3
- namespace: /chassis/chassis_cfg/cfg_chassis_param3
  type: int

# 底盘设置-底盘配置-底盘预留参数4
- namespace: /chassis/chassis_cfg/cfg_chassis_param4
  type: double

# 底盘设置-底盘配置-底盘预留参数5
- namespace: /chassis/chassis_cfg/cfg_chassis_param5
  type: double

# 底盘设置-底盘配置-底盘轮⼦直径
- namespace: /chassis/chassis_cfg/cfg_chassis_wheel_diameter
  type: double

# 底盘设置-底盘配置-底盘轮距
- namespace: /chassis/chassis_cfg/cfg_chassis_wheel_track
  type: double

# 底盘设置-底盘配置-底盘轴距
- namespace: /chassis/chassis_cfg/cfg_chassis_wheel_base
  type: double

# 底盘设置-底盘配置-底盘轮⼦最⼤rpm
- namespace: /chassis/chassis_cfg/cfg_chassis_maximum_rpm
  type: double
```