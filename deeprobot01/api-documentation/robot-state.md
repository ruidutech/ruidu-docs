# 机器人状态相关功能

控制和获取机器人当前运行状态。

## 切换机器人状态

**简要描述:**
大多数接口有状态限制，如建图状态时无法调用定位初始化功能等，所以需要根据当前接口同步界面状态，跳转到指定页面。该接口可以切换机器人当前状态，选择打开的模块。

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-6-10 | 2020-6-10 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/change_robot_state?state=`

**请求方式:**
- GET 
- POST

**请求头:**

| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| state | 是 | string | 发送需要切换的机器人状态，"Idle"，"Mapping"，"RunningTask"，"Localization"，"Sleep"，"FollowTarget" |

**机器人的状态切换如下图所示:**

![状态切换图](/images/deeprobot01/development-guide/status-transition.png)

**特别注意:** 不要在导航过程中进行地图管理、虚拟墙相关的功能的操作，以防止调用的过程占用机器的计算资源导致导航失效

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "",
  "data": "",
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 100,
  "msg": "successed",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |
| state_initialized | bool | 是否初始化 |
| state_operation | string | 状态字符串: "Idle":空闲状态，"Mapping":建图模块开启，"RunningTask":导航模块开启 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取机器人状态

**简要描述:**
大多数接口有状态限制，如建图状态时无法调用定位初始化功能等，所以需要根据当前接口同步界面状态，跳转到指定页面。

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/get_robot_state`

**请求方式:**
- GET 
- POST

**请求头:**

| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|

**请求参数:**

| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|

**请求参数:** 无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "state_initialized": true,
    "state_operation": "Idle"
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
| state_initialized | bool | 是否初始化 |
| state_operation | string | 状态字符串: "Idle":空闲状态，"Mapping":建图模块开启，"RunningTask":导航模块开启 |

**备注:**
更多返回错误代码请看首页的错误代码描述 
