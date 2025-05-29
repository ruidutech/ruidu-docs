# 路径相关功能

路径功能，属于导航模块。

## 开始录制路径

**简要描述:**
开启录制一条路径用于后续跟随

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/start_record_path`

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
错误代码：
- 1101：正在录制路径
- 更多返回错误代码请看首页的错误代码描述

## 保存录制路径

**简要描述:**
保存录制的路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/save_record_path?path_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| path_name | 是 | string | 需要保存的路径名称 |

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
错误代码：
- 1000：输入参数为空
- 1100：路径录制未运行
- 1102：路径无法保存，结束录制路径（可能由于路径太短）
- 1103：路径已存在
- 更多返回错误代码请看首页的错误代码描述

## 取消录制路径

**简要描述:**
取消当前录制路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/cancel_record_path`

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
错误代码：
- 1100：路径录制未运行
- 更多返回错误代码请看首页的错误代码描述

## 获取录制路径状态

**简要描述:**
获取当前录制路径状态

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/get_record_status`

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
    "status": 0
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
| status | int | 0为未录制,1为正在录制路径 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取路径列表

**简要描述:**
获取当前地图的所有的路径列表,手绘路径与录制路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/get_path_list`

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
    "paths": [
      {
        "mapname": "0623",
        "pointCount": 0,
        "createtime": "",
        "name": "111",
        "filename": "d4b1680f-d6b7-4134-80fd-b9eaa2c68b11.path"
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
| paths | array | 路径列表 |
| mapname | string | 地图名称 |
| pointCount | int | 路径点数量 |
| createtime | string | 创建时间 |
| name | string | 路径名称 |
| filename | string | 文件名 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取路径信息

**简要描述:**
获取当前地图指定的路径信息

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/get_path?path_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| path_name | 是 | string | 需获取路径的名称 |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "path": {
      "name": "MANUAL_test",
      "pointCount": 18,
      "filename": "MANUAL_test",
      "mapName": "localmap"
    },
    "data": [
      {
        "y": 1,
        "x": 1
      },
      {
        "y": 8,
        "x": 8
      },
      {
        "y": 8,
        "x": 8
      },
      {
        "y": 11,
        "x": 11
      }
    ],
    "mapInfo": {
      "gridHeight": 195,
      "gridWidth": 433
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
- data中信息为路径所有点所在的栅格点坐标

错误代码：
- 1104：路径不存在
- 1007：无法读取路径信息
- 更多返回错误代码请看首页的错误代码描述

## 删除路径

**简要描述:**
删除指定路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/delete_path?path_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| path_name | 是 | string | 需要删除的路径名称 |

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
错误代码：
- 1000：输入参数为空
- 1104：路径不存在
- 更多返回错误代码请看首页的错误代码描述

## 生成手绘路径

**简要描述:**
创建手绘路径,路径上两点需要验证是否能够生成路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/generate_path`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "name": "testpath",
  "points": [
    {
      "name": "p1",
      "gridPosition": {
        "x": 10,
        "y": 20
      },
      "actions": [
        {
          "type": "pause",
          "param": {
            "millisecond": 500
          }
        }
      ]
    },
    {
      "name": "p2",
      "gridPosition": {
        "x": 15,
        "y": 20
      },
      "actions": []
    },
    {
      "name": "p3",
      "gridPosition": {
        "x": 15,
        "y": 20
      },
      "actions": []
    }
  ],
  "lines": [
    {
      "name": "0_1",
      "start": "p0",
      "end": "p1",
      "radius": 0
    },
    {
      "name": "1_2",
      "start": "p1",
      "end": "p2",
      "radius": 0
    },
    {
      "name": "2_3",
      "start": "p2",
      "end": "p3",
      "radius": 0
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
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**备注:**
关于弧度计算参考开始的弧度计算

错误代码：
- 1000：输入参数为空
- 1001：输入参数格式错误
- 1104：路径不存在
- 1105：路径名为空
- 1006：无法生成路径
- 1007：路径不安全
- 更多返回错误代码请看首页的错误代码描述

## 验证两点间是否可以生成路径

**简要描述:**
验证两点间是否可以生成路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/verify_path_line`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "start": {
    "x": 157,
    "y": 117
  },
  "end": {
    "x": 136,
    "y": 78
  },
  "radius": 24.113682
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
- 1000：输⼊参数为空
- 1001：输⼊参数格式错误
- 1003：没有运⾏的地图
- 1104：路径不存在
- 1105：路径名为空
- 1006：⽆法⽣成路径
- 1007：路径不安全
- 更多返回错误代码请看⾸页的错误代码描述

## 获取手绘路径列表

**简要描述:**
获取当前地图所有手绘路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/get_manual_path`

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
    "paths": [
      {
        "action": null,
        "points": [
          {
            "worldPosition": {
              "y": -129.45981799999998,
              "x": 60.060091
            },
            "gridPosition": {
              "y": 1295,
              "x": 2694
            },
            "actions": [],
            "name": "0"
          },
          {
            "worldPosition": {
              "y": -120.20981799999998,
              "x": 61.26009100000002
            },
            "gridPosition": {
              "y": 1480,
              "x": 2718
            },
            "actions": [],
            "name": "1"
          }
        ],
        "lines": [
          {
            "radius": 0,
            "end": "1",
            "name": "0_1",
            "start": "0"
          }
        ],
        "name": "bba",
        "point": []
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

## 更新手绘路径

**简要描述:**
更新已有的手绘路径,不可更新录制路径

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/path_manage/update_path`

**请求方式:**
- GET 
- POST

**请求参数:** 无

**请求发送json:**
```json
{
  "name": "testpath", #需更新路径名称
  "points": [
    {
      "name": "p1", #路径连接点
      "gridPosition": {
        "x": 10,
        "y": 20
      },
      "actions": [
        {
          "type": "pause",
          "param": {
            "millisecond": 500
          }
        }
      ]
    },
    {
      "name": "p2",
      "gridPosition": {
        "x": 15,
        "y": 20
      },
      "actions": []
    },
    {
      "name": "p3",
      "gridPosition": {
        "x": 15,
        "y": 20
      },
      "actions": []
    }
  ],
  "lines": [ #路径链接线,将上述点以直线或曲线⽅式链接
    {
      "name": "0_1",
      "start": "p0",
      "end": "p1",
      "radius": 0
    },
    {
      "name": "1_2",
      "start": "p1",
      "end": "p2",
      "radius": 0
    },
    {
      "name": "2_3",
      "start": "p2",
      "end": "p3",
      "radius": 0
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
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**备注:**
关于弧度计算参考开始的弧度计算

错误代码：
- 1000：输入参数为空
- 1001：输入参数格式错误
- 1104：路径不存在
- 1105：路径名为空
- 1006：无法生成路径
- 1007：路径不安全
- 更多返回错误代码请看首页的错误代码描述 