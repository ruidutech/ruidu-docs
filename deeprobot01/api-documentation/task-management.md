# 任务相关功能

任务功能，属于导航模块。

## 执行导航至点任务

**简要描述:**
快速执行导航到点的匿名任务

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/move_to?pose_name=?`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| pose_name | 是 | string | 点的名字 |

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

## 执行跟随路径任务

**简要描述:**
快速执行跟随路径的匿名任务

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/follow_path?path_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| path_name | 是 | string | 路径的名称 |

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

## 创建任务队列

**简要描述:**
创建一个自定义任务队列

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 备注 |
|:-------|:--------:|:--------:|:-----|
| 1.0.0 | 2020-4-23 | 2020-4-23 | 初次创建 |
| 1.0.1 | 2021-8-25 | 2021-8-25 | 修复action中等待动作的字段错误，将~~waitTime~~修改为wait_time |
| 1.0.2 | 2021-10-13 | 2021-10-13 | 添加了顶升动作，以及顶升对应的param |
| 1.0.3 | 2021-11-1 | 2021-11-1 | 添加动作执行的时间状态 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/save_task_queue`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| name | 是 | string | 任务名称 |
| tasks | 是 | array | 任务列表 |
| tasks-name | 是 | enum | [PlayPathTask,NavigationTask] PlayPathTask: 为跑路径，NavigationTask为跑点 |
| tasks-param | 是 | object | 子任务参数 |
| tasks-path_name | 否 | string | 当tasks-name为**PlayPathTask**，传入路径名称 |
| tasks-point_name | 否 | string | 当tasks-name为**NavigationTask**为跑点，传入点名称 |
| tasks-actions | 否 | array | 配置动作列表，具体动作类型参考下文 |
| tasks-actions-type | 否 | string | 动作的类型 |
| tasks-actions-actionTime | 否 | int | 动作的时间状态,0是跑任务前,1是跑任务完成时 |
| tasks-actions-param | 否 | string | 动作参数 |

**请求发送json:**
```json
{
  "name": "aaa", 
  "tasks": [
    {
      "name": "PlayPathTask", 
      "param": {
        "path_name": "MANUAL_test" 
      },
      "actions": [
        {
          "type": "WAIT",
          "actionTime": 0,
          "param": {
            "wait_time": 10
          }
        }
      ]
    },
    {
      "name": "NavigationTask", 
      "param": {
        "point_name": "test1" 
      },
      "actions": [
        {
          "type": "PTZ_MOVE",
          "actionTime": 1,
          "param": {
            "yaw": 10,
            "pitch": 15
          }
        },
        {
          "type": "LIFT",
          "actionTime": 1,
          "param": {
            "lift_act": 1,
            "wait_time": 3
          }
        }
      ]
    }
  ]
}
```

**Action的类型:**

**原地等待:**
```json
{
  "type": "WAIT",
  "actionTime": 0,
  "param": {
    "wait_time": 10.0 
  }
}
```
> wait_time: 等待时间（单位: 秒）

**云台转置指定角度:**
```json
{
  "type": "PTZ_MOVE",
  "actionTime": 1,
  "param": {
    "yaw": 10,
    "pitch": 15
  }
}
```
> yaw: 云台航向角  
> pitch: 云台俯仰角

**举升动作:**
```json
{
  "type": "LIFT",
  "actionTime": 1,
  "param": {
    "lift_act": 1,
    "wait_time": 3
  }
}
```
> lift_act: 举升动作，0: 降平台，1: 升平台  
> wait_time: 等待时间(单位：秒)

**拍一拍:**
```json
{
  "type": "CHECK_TO_START",
  "actionTime": 0,
  "param": {}
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

**备注:**
更多返回错误代码请看首页的错误代码描述

## 删除任务队列

**简要描述:**
删除一个自定义任务队列

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/delete_task_queue?task_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| task_name | 是 | string | 任务的名称 |

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

## 获取任务列表

**简要描述:**
获取当前地图所有任务列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/get_task_queue?task_name=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| task_name | 否 | string | 任务的名称,若输入为空,则返回所有任务详情 |

**返回示例:**

正确时返回:

tasks中的name分为:[NavigationTask,PlayPathTask]

NavigationTask: 导航至记录的坐标点输入参数: point_name: 目标点的名称

PlayPathTask: 沿记录的路径开始寻迹, 输入参数: path_name:记录的路径名称

| 字段名称 | 类型 | 字段解释 |
|:---------|:-----|:---------|
| data | array | 存放任务列表数组 |
| mapName | string | 该任务所属的地图名称 |
| tasks | array | 该任务中的顺序子任务 |
| param | object | 子任务中的参数值 |
| param-name | enum | [NavigationTask,PlayPathTask],如果为NavigationTask，表示该子任务为导航点任务，读取param-point_name 获取点名称，如果为PlayPathTask，表示该子任务为跑路径任务，读取param-path_name 获取路径名称 |
| param-image | object | 该子任务绑定的图片参数 |
| param-point_name | string | 如果该子任务为NavigationTask，该参数表示该点名称，通过获取点列表接口获取该点详细数据 |
| param-path_name | string | 如果该子任务为PlayPathTask，该参数表示该路径名称，通过获取路径信息获取该点详细数据 |
| actions | array | 该点完成后的动作列表，具体参数创建任务队列 |

```json
{
  "errorCode": "",
  "msg": "successed",
  "data": [
    {
      "mapName": "0623",
      "tasks": [
        {
          "param": {
            "image": {
              "width": 649,
              "name": "2021-03-04 15-41-45 屏幕截图.png",
              "height": 173
            },
            "point_name": "origin"
          },
          "name": "NavigationTask",
          "actions": []
        },
        {
          "param": {
            "image": {
              "width": 160,
              "name": "2021-03-05 11-43-44 屏幕截图.png",
              "height": 91
            },
            "point_name": "04"
          },
          "name": "NavigationTask",
          "actions": []
        },
        {
          "param": {
            "image": {
              "width": 723,
              "name": "2021-02-01 19-23-29 屏幕截图.png",
              "height": 910
            },
            "point_name": "charge"
          },
          "name": "NavigationTask",
          "actions": []
        }
      ],
      "mapId": "6c421468-111c-4f74-93fd-0482d9973e80",
      "name": "bba"
    },
    {
      "mapName": "0623",
      "tasks": [
        {
          "param": {
            "image": {
              "width": 1589,
              "name": "2021-04-06 15-19-19 屏幕截图.png",
              "height": 41
            },
            "point_name": "02"
          },
          "name": "NavigationTask",
          "actions": [
            {
              "type": "WAIT",
              "param": {
                "wait_time": 0
              }
            },
            {
              "type": "PTZ_MOVE",
              "param": {
                "yaw": 5,
                "pitch": 6
              }
            }
          ]
        },
        {
          "param": {
            "path_name": "bba"
          },
          "name": "PlayPathTask",
          "actions": []
        }
      ],
      "mapId": "6c421468-111c-4f74-93fd-0482d9973e80",
      "name": "test"
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

## 开始任务

**简要描述:**
开始执行已保存的任务

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/start_task_queue`

**请求方式:**
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "name": "yu",
  "loop": false,
  "loop_time": 0
}
```

| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| name | 是 | string | 任务名称 |
| loop | 是 | bool | 是否循环重复执行任务 |
| loop_time | 是 | int | 重复次数,如果为0则为无限循环 |

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

## 暂停任务

**简要描述:**
暂停正在运行的任务

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/pause_task_queue`

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

## 停止任务

**简要描述:**
停止正在运行的任务

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/stop_task_queue`

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

## 继续任务

**简要描述:**
继续暂停的任务

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/resume_task_queue`

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

## 检查当前任务状态

**简要描述:**
检查当前任务的状态,是否正在运行,剩余循环次数等

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/get_task_status`

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
  "data": {
    "remainingLoopTime": 0,
    "task": {
      "mapName": "0623",
      "tasks": [
        {
          "param": {
            "path_name": "666"
          },
          "name": "PlayPathTask",
          "actions": []
        },
        {
          "param": {
            "image": {
              "width": 0,
              "name": "",
              "height": 0
            },
            "point_name": "14"
          },
          "name": "NavigationTask",
          "actions": []
        }
      ],
      "mapId": "6c421468-111c-4f74-93fd-0482d9973e80",
      "name": "asdasd"
    },
    "currentTask": {
      "param": {
        "path_name": "666"
      },
      "name": "PlayPathTask",
      "actions": []
    },
    "finished": false,
    "statusMessage": "successed",
    "statusCode": 1
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

## 获取自动充电状态（未启用）

**简要描述:**
获取自动充电的状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/get_autocharge_status`

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
  "data": {
    "ChargeState": "WAITTING",
    "AutoChargeSwitch": false,
    "PointName": "211"
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

ChargeState：

| 状态字符串值 | 意义 |
|:-------------|:-----|
| WAITTING | 等待开启 |
| WATHCING | 开启监控中 |
| RUNNING | 正在进⾏⾃动充电任务 |
| CHARIGING | 正在⾃动充电 |
| FINISHCHARIGING | 完成⾃动充电 |
| FAILED | 自动充电任务失败 |
| UNDEFINE | 未知状态 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 设置自动充电状态（未启用）

**简要描述:**
设置自动充电的状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/set_autocharge_status`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "AutoChargeSwitch": false,
  "PositionName": "211"
}
```

| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| AutoChargeSwitch | 是 | bool | 设置自动充电开关 |
| PositionName | 是 | string | 设置充电点 |

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

ChargeState：

| 状态字符串值 | 意义 |
|:-------------|:-----|
| WAITTING | 等待开启 |
| WATHCING | 开启监控中 |
| RUNNING | 正在进行自动充电任务 |
| CHARIGING | 正在自动充电 |
| FINISHCHARIGING | 完成自动充电 |
| FAILED | 自动充电任务失败 |
| UNDEFINE | 未知状态 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取导航状态

**简要描述:**
获取当前导航状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/get_navigator_status`

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
  "data": {
    "nav_status_type": "idle",
    "nav_status_data": {
      "finished": "false",
      "information": "NO_PATH"
    },
    "process": {
      "path_name": "DEFAULT",
      "index": "563",
      "total_milleage": "5.786121",
      "total_time": "16.072559",
      "remaining_milleage": "0.000000",
      "remaining_time": "0.000000",
      "index": "0",
      "passed_points": "[]",
      "total_milleage": "5285626.000000",
      "total_time": "1.732350",
      "next_point": ""
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
| nav_status_type | idle<br>paused<br>follow_path<br>navigation<br>UNKNOWN | idle: 空闲状态<br>paused: 暂停状态<br>follow_path: 寻路状态<br>navigation: 导航至点状态<br>UNKNOWN: 未知 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取实时规划路线

**简要描述:**
获取实时导航规划路线

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/get_realtime_path`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "",
  "data": {
    "mapInfo": {
      "gridWidth": 150,
      "gridHeight": 200,
      "originX": 15,
      "originY": 30,
      "resolution": 0.050000000456
    },
    "grid_points": [
      {
        "x": 20,
        "y": 30
      },
      {
        "x": 21,
        "y": 33
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取任务报告

**简要描述:**
获取任务报告

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-11-26 | 2020-11-26 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/get_task_report`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| start_time | 是 | int32 | 时间段起始时间 |
| end_time | 是 | int32 | 时间段结束时间 |
| current_page | 否 | int | 当前页码,默认为1，从1开始 |
| page_size | 否 | int | 分页大小，默认为50 |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "max_page": 1, // 最大页码
    "current_page": 1, // 当前页码
    "reports": [
      {
        "task": {
          "mapName": "test_costmap", // 任务地图名
          "tasks": [
            {
              "param": {
                "image": {
                  "width": 0,
                  "name": "",
                  "height": 0
                },
                "point_name": "origin"
              },
              "name": "NavigationTask", // 任务类型，NavigationTask为跑点
              "actions": []
            }
          ],
          "mapId": "94149087-c643-462d-8d25-21ef4fc57989",
          "name": "NAVIGATION" // 任务名
        },
        "loopCount": 0, // 循环次数
        "endBattery": 0, // 开始电量
        "isLoop": false, // 是否循环任务
        "startTime": 1606394699, // 开始时间
        "pdfGenerated": false, // 是否已生成PDF
        "endTime": 1606394781, // 结束时间
        "id": "950ca85b-834f-4fc0-b421-5d7b9ee60341", // 任务ID
        "startBattery": 0 // 开始电量
      }
    ],
    "page_size": 50 //分页⼤⼩
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

## 获取任务快照

**简要描述:**
获取指定地图的png格式图片

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/get_report_image`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| id | 是 | string | 任务id号 |

**返回示例:**

正确时返回:
返回快照图片(png格式)

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

## 下载任务报告PDF(未启用)

**简要描述:**
下载所需要的任务报告,为.pdf的文件

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-11-22 | 2020-11-22 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/download_report?task_id=`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| task_id | 是 | string | 任务ID |

**返回示例:**

正确时返回:
文件流,文件为.pdf

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

## 下载任务报告PDF

**简要描述:**
下载任务报告PDF

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2021-11-23 | 2021-11-23 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/get_pdf_report?task_id=`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| task_id | 是 | string | 任务ID |

**返回示例:**

正确时返回:
文件流,文件为.pdf

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

## 任务进度

**简要描述:**
获取任务进度

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-3-29 | 2022-3-29 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/follow_task_progress`

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
  "data": {
    "path_name": "",
    "index": "0",
    "passed_points": "[]",
    "total_milleage": "5285626.000000",
    "total_time": "1.732350",
    "next_point": ""
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

## 编辑任务

**简要描述:**
修改一个自定义任务队列

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 备注 |
|:-------|:--------:|:--------:|:-----|
| 1.0.0 | 2022-4-12 | 2022-4-12 | 初次创建 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/task_manager/update_task_queue`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| name | 是 | string | 任务名称 |
| tasks | 是 | array | 任务列表 |
| tasks-name | 是 | enum | [PlayPathTask,NavigationTask] PlayPathTask: 为跑路径，NavigationTask为跑点 |
| tasks-param | 是 | object | 子任务参数 |
| tasks-path_name | 否 | string | 当tasks-name为**PlayPathTask**，传入路径名称 |
| tasks-point_name | 否 | string | 当tasks-name为**NavigationTask**为跑点，传入点名称 |
| tasks-actions | 否 | array | 配置动作列表，具体动作类型参考下文 |
| tasks-actions-type | 否 | string | 动作的类型 |
| tasks-actions-actionTime | 否 | int | 动作的时间状态,0是跑任务前,1是跑任务完成时 |
| tasks-actions-param | 否 | string | 动作参数 |

**请求发送json:**
```json
{
  "name": "aaa", // 任务名称
  "tasks": [
    {
      "name": "PlayPathTask", // 跟随路径
      "param": {
        "path_name": "MANUAL_test" // 路径名称
      },
      "actions": [
        {
          "type": "WAIT",
          "actionTime": 0,
          "param": {
            "wait_time": 10
          }
        },
        {
          "type": "PTZ_MOVE",
          "actionTime": 1,
          "param": {
            "yaw": 10,
            "pitch": 15
          }
        },
        {
          "type": "LIFT",
          "actionTime": 1,
          "param": {
            "lift_act": 1,
            "wait_time": 3
          }
        }
      ]
    },
    {
      "name": "NavigationTask", // 导航点任务
      "param": {
        "point_name": "test1" // 点名称
      },
      "actions": []
    }
  ]
}
```

**Action的类型：**
```json
// 原地等待
{
  "type": "WAIT",
  "actionTime":0, // 跑任务前
  "param": {
    "wait_time": 10.0 //等待时间（单位: 秒）
  }
}
// 云台转置指定角度
{
  "type": "PTZ_MOVE",
  "actionTime":1,
  "param": {
    "yaw": 10, //云台航向角
    "pitch": 15 //云台俯仰角
  }
}
// 举升动作
{
  "type": "LIFT",
  "actionTime": 1, // 跑任务完成时
  "param": {
    "lift_act": 1, //举升动作， 0: 降平台， 1: 升平台
    "wait_time": 3 //等待时间 (单位：秒)
  }
}
// 拍一拍
{
  "type":"CHECK_TO_START",
  "actionTime":0,
  "param":{
  }
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
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获得定时任务列表

**简要描述:**
获取当前机器人日程列表，日程是指定时任务下发

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-6-29 | 2022-6-29 |
| 1.1.0  | 2022-6-29 | 2022-11-16 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/get_time_task`

**请求方式:**
- GET

**请求参数:** 无

**返回示例:**

正确时返回:

| 字段名称 | 类型 | 字段解释 |
|:---------|:-----|:---------|
| scheduleList | array | 存放日程列表数组 |
| sw | bool | 该日程的开关状态 |
| param | dict | 任务中的参数值 |
| param-mapName | string | 地图名称 |
| param-mapId | string | 地图id |
| param-name | string | 地图名称 |
| cronString | string | cron表达式，时间 |
| id | string | 日程id |

```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "scheduleList": [
      {
        "name": "test",
        "sw": true,
        "param": {
          "mapName": "85",
          "mapId": "222b1e50-0221-47a0-bf40-ba9f1b08f9b5",
          "name": "123456"
        },
        "cronString": "0 30 2 * * 1",
        "type": "TaskTimer",
        "id": "a6c3734a-6771-4d0e-a13e-1c5d116e1273"
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
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 新增定时任务

**简要描述:**
新增当前机器人日程，日程是指定时任务下发

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-6-29 | 2022-6-29 |
| 1.1.0  | 2022-6-29 | 2022-11-16 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/add_time_task`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| name | 非必须 | string | 自定义的日程名称,可重复,非识别标示 |
| taskName | 必须 | string | 任务名称,要求任务（当任务为跑点任务，点必须为导航点) |
| cronString | 必须 | string | cron表达式，本接口对于cron表达式不读取年份,故参数应为6位 不允许发送每秒/每分钟任务，任务到时间执行频率过高可能导致卡死 表达式生成参考cron表达式规则 cron表达式生成 |
| repeat | 非必须 | string | 是否重复，枚举: 0,1枚举备注: 0: 只执行一次后就删除 1:执行完成后不删除，仍起作用 |
| force | 非必须 | string | 是否强制执行，枚举: 0,1枚举备注: 0: 不中断当前任务1:中断当前所有任务强制执行 |

**请求发送json:**
```json
{
  "name": "test",
  "taskName": "123456",
  "cronString": "0 30 2 * * 1",
  "repeat": 1,
  "force": 1
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
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 删除定时任务

**简要描述:**
删除当前机器人日程，日程是指定时任务下发

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-6-29 | 2022-6-29 |
| 1.1.0  | 2022-6-29 | 2022-11-16 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/delete_time_task?id=`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| id | 必须 | string | 日程id |

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

## 软拍一拍

**简要描述:**
软拍一拍

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-6-29 | 2022-6-29 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/beat_button`

**请求方式:**
- GET

**请求参数:** 无

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

## 设置自动驾驶模式

**简要描述:**
设置自动驾驶模式

**接口版本:**
| 版本号 | 制定日期 | 备注 |
|:-------|:--------:|:-----|
| 1.0.0  | 2022-09-17 | 初次创建 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/navigate/set_auto_mode?mode=1`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| mode | 是 | int | 设置自动驾驶模式：0=自动驾驶;1=远程驾驶 |

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
  "errorCode": 204,
  "msg": "param is invalid",
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