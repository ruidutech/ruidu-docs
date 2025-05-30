# 点位相关功能

点功能，属于导航模块。

## 记录指定点坐标

**简要描述:**
记录一个点用于导航使用

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/pose_manage/add_pose`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "position": {
    "point": {
      "x": 10,
      "y": 23.4
    },
    "angle": 1.57
  },
  "name": "testpoint",
  "type": 0
}
```

| 参数 | 类型 | 说明 |
|:-----|:-----|:-----|
| position | object | 指定坐标与方向 |
| name | string | 点的名称 |
| type | int | 点的类型,0:初始点,1:充电点,2:导航点,3:暂留,4:巡检点(导航至巡检点时规划路径会尽量沿轨道运行) |

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

## 记录当前点坐标

**简要描述:**
记录机器人当前点于导航使用,必须定位好

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/pose_manage/add_cur_pose?pose_name=?pose_type=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| pose_name | 是 | string | 点的名字 |
| pose_type | 是 | int | 点的类型,0:初始点,1:充电点,2:导航点,3:暂留,4:巡检点(导航至巡检点时规划路径会尽量沿轨道运行) |

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

## 编辑点

**简要描述:**
记录机器人当前点于导航使用,必须定位好

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/pose_manage/edit_pose?pose_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| pose_name | 是 | string | 点的名字 |

**请求发送json:**
```json
{
  "position":{
    "point":{
      "x": 10,
      "y": 23
    },
    "angle": 1.57
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

## 获取点列表

**简要描述:**
获取当前地图所有点/指定点列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/pose_manage/get_pose?pose_name=`

**请求方式:**
- GET 
- POST

**请求头:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| pose_name | 否 | string | pose_name为空时,返回所有pose信息,否则为指定点信息 |

**返回示例:**

正确时返回:
```json
{
  "mapInfo": {
    "gridHeight": 1153,
    "gridWidth": 830
  },
  "errorCode": 0,
  "msg": "successed",
  "PoseList": [
    {
      "angle": 2.654693365097046,
      "name": "A",
      "image": {
        "width": 0,
        "name": "",
        "height": 0
      },
      "gridY": 257,
      "gridX": 278,
      "poseId": "de64abb9-fa64-408c-8fb7-7b305783cc11",
      "world": {
        "position": {
          "y": -19.32601380852008,
          "x": -10.851930792873858,
          "z": 0
        },
        "orientation": {
          "y": 0,
          "x": 0,
          "z": 0.9705122075034638,
          "w": 0.2410519759030273
        }
      },
      "type": 2
    }
  ]
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| mapInfo | object | 地图信息 |
| gridHeight | int | 地图高度 |
| gridWidth | int | 地图宽度 |
| PoseList | array | 点位列表 |
| angle | float | 点相对于x轴角度 |
| name | string | 点名 |
| image | object | 点绑定图片的信息 |
| gridY | int | 像素坐标Y,左下角为坐标原点 |
| gridX | int | 像素坐标x |
| poseId | string | 点唯一ID - uuid |
| world | object | 世界坐标系,相对于地图origin(并非像素坐标的原点)的距离,单位米 |
| position | object | 位置信息 |
| orientation | object | 表示方向的四元数 |
| type | int | 点类型(0:初始化点,1:充电点,2:导航点,3:直线点(已废弃),4:巡检点(巡检机器人)) |

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

## 删除点

**简要描述:**
删除记录的点

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/pose_manage/delete_pose?pose_name=`

**请求方式:**
- GET 
- POST

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

## ⾃定义初始化

**简要描述:**
进⾏定位初始化功能

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器⼈IP:端⼝号/robot/pose_manage/initialize_customized?point_name=test1&turning=false`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| point_name | 否 | string | 点的名字,如果为空,则需要传⼊指定点的坐标 |
| turning | 否 | string | 输⼊['true'/'false'] 字符串类型 |

**请求发送json:**

在point_name为空,即未传⼊点名的情况下,需要指定坐标进⾏初始化

```json
{
  "point": {
    "angle": 3.14,
    "position": {
      "x": 0,
      "y": 0
    }
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

## 点绑定图片

**简要描述:**
将点与⼀个图⽚进⾏绑定

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-5-16 | 2020-5-16 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器⼈IP:端⼝号/robot/pose_manage/bind_image?point_name=A&image_name=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| point_name | 是 | string | 点的名字 |
| image_name | 否 | string | 绑定图⽚的名字，如果不传或者传为空，则是将点绑定的图⽚清空 |

**请求发送json:** 无

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