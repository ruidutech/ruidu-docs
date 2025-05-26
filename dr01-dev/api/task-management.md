# 任务相关功能

## 功能说明
属于导航模块

## 简要描述
任务功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 状态限制
- Idle

## 状态跳转至
- RunningTask

## 接口列表
- [执行导航至点任务](#执行导航至点任务)
- [执行跟随路径任务](#执行跟随路径任务)
- [创建任务队列](#创建任务队列)
- [删除任务队列](#删除任务队列)
- [获取任务列表](#获取任务列表)
- [开始任务](#开始任务)
- [暂停任务](#暂停任务)
- [停止任务](#停止任务)
- [继续任务](#继续任务)
- [检查当前任务状态](#检查当前任务状态)

## 接口详情

### 执行导航至点任务

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

### 执行跟随路径任务

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

### 创建任务队列

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

### 删除任务队列

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

### 获取任务列表

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

[NavigationTask,PlayPathTask],如果为NavigationTask，

| param-name | enum | 表示该子任务为导航点任务，读取param-point_name 获取点名称，如果为PlayPathTask， |
|:-----------|:-----|:---------|

表示该子任务为跑路径任务，读取param-path_name 获取路径名称

param-image object 该子任务绑定的图片参数

param-point_name string 如果该子任务为NavigationTask ,该参数表示该点名称，通过获取点列表接口获取该点详细数据

param-path_name stirng 如果该子任务为PlayPathTask ,该参数表示该路径名称，通过获取路径信息获取该点详细数据

actions array该点完成后的动作列表，具体参数创建任务队列

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

### 开始任务

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

### 暂停任务

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

### 停止任务

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

### 继续任务

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

### 检查当前任务状态

**简要描述:**
检查当前任务状态

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