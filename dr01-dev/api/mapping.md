# 建图相关功能

## 功能说明
切换到此状态会自动结束掉导航任务

## 简要描述
建图功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [开始建图](#开始建图)
- [取消建图](#取消建图)
- [实时建图数据](#实时建图数据)
- [实时建图数据（新）](#实时建图数据新)
- [结束并保存地图](#结束并保存地图)
- [继续建图](#继续建图)
- [建图时录制初始点](#建图时录制初始点)
- [结束并保存激光](#结束并保存激光)

## 接口详情

### 开始建图

**简要描述:**
开始建图

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle

**状态跳转至:**
- Mapping

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/start_scan_map`

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
  "msg": "successed",
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

### 取消建图

**简要描述:**
取消建图

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Mapping
- RestartMapping

**状态跳转至:**
- Idle

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/cancel_scan_map`

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
  "msg": "successed",
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

### 实时建图数据

**简要描述:**
建图时地图数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 修改内容 |
|:-------|:--------:|:--------:|:---------|
| 1.0.0 | 2020-4-23 | 2020-4-23 | 初次提交 |
| 1.0.1 | 2020-10-27 | 2020-10-27 | 增加轨迹数据 |

**状态限制:**
- Mapping
- RestartMapping

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/scan_map_png`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**返回示例:**

正确时返回:
```json
{
  "trajectory": [
    {
      "data": [
        24672
      ],
      "type": 1,
      "id": 0
    }
  ],
  "data": [
    359,
    360,
    361,
    362,
    412,
    413,
    414,
    415,
    ...,
    6068
  ],
  "mapInfo": {
    "gridHeight": 100,
    "gridWidth": 64
  }
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
| data | int | 存放地图障碍数据的坐标序列号,计算方式为y*gridWidth+x,可根据mapInfo中的信息反推得到坐标x,y数据.如y = floor(data/gridWidth) x=data%gridWidth |
| mapInfo | object | 存放当前地图尺寸数据 |
| gridHeight | int | 存放地图高度数据 |
| gridWidth | int | 存放地图宽度数据 |

**备注:**
更多返回错误代码请看首页的错误代码描述

### 实时建图数据（新）

**简要描述:**
建图时地图数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 | 修改内容 |
|:-------|:--------:|:--------:|:---------|
| 1.0.0 | 2021-4-25 | 2021-4-25 | 初次提交,老式接口数据未正常封装与返回格式中，该版本修改接口格式 |

**状态限制:**
- Mapping
- RestartMapping

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/scan_map_grid`

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
    "trajectory": [
      {
        "data": [
          30784,
          30784
        ],
        "type": 1,
        "id": 0
      }
    ],
    "mapInfo": {
      "width": 319,
      "height": 191
    },
    "mapData": [
      23738,
      25006,
      26032,
      26677
    ]
  }
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
| data | object | 接口返回的数据 |
| trajectory | array | 轨迹数据 |
| mapInfo | object | 地图信息 |
| mapData | array | 地图数据 |

**备注:**
更多返回错误代码请看首页的错误代码描述 

### 结束并保存地图

**简要描述:**
结束并保存地图数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Mapping
- RestartMapping

**状态跳转至:**
- Idle

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/stop_scan_map?map_name=chartest&?rotation_angle=0.0`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:-----|:-----|
| map_name | 是 | string | 传入要保存的地图名称 |
| rotation_angle | 是 | float | 可以将地图旋转一定角度后保存，右旋为负，左旋为正，单位为弧度 |

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
  "msg": "successed",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

### 继续建图

**简要描述:**
将当前地图进行拓展

**开启要求步骤:**
1. 开启导航至RuningTask状态
2. 选择需要拓展的地图
3. 完成定位
4. 调用该接口进行地图拓展
5. 扫描完成后调用结束并保存地图接口

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:**
- RestartMapping

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/restart_scan_map`

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
  "msg": "successed",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

### 建图时录制初始点

**简要描述:**
建图时记录机器人当前点，目前只限定3D建图使用

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-7-24 | 2020-7-24 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/record_mapping_pose?pose_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:-----|:-----|
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
  "msg": "successed",
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

### 结束并保存激光

**简要描述:**
结束并保存校准激光数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-3-30 | 2022-3-30 |

**状态限制:**
- Mapping
- RestartMapping

**状态跳转至:**
- Idle

**请求URL:** 
- `http://机器人IP:端口号/robot/mapping/stop_calibration_laser`

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
  "errorCode": 211,
  "msg": "SERVICE RETURN FAILED:",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述 