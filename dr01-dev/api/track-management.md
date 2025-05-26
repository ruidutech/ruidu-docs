# 轨道相关功能

## 功能说明
轨道管理

## 简要描述
轨道功能

## 接口版本
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-10-11 | 2022-10-11 |

## 接口列表
- [更新轨道图](#更新轨道图)
- [获取轨道图](#获取轨道图)
- [恢复默认轨道](#恢复默认轨道)

## 接口详情

### 更新轨道图

**简要描述:**
创建或更新当前地图轨道

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/track_manage/add_track_graph`

**请求方式:**
- GET

**请求参数:** 无

**请求发送json:**
```json
{
  "Edges": [
    {
      "bidirectional": true,
      "end": "1",
      "radius": 0,
      "start": "0"
    },
    {
      "bidirectional": true,
      "end": "2", 
      "radius": 10,
      "start": "1"
    }
  ],
  "Nodes": [
    {
      "gridPosition": {
        "x": 101,
        "y": 68
      },
      "RecordName": null,
      "name": "0"
    },
    {
      "gridPosition": {
        "x": 0,
        "y": 0
      },
      "RecordName": "Jzzj",
      "name": "1"
    },
    {
      "gridPosition": {
        "x": 0,
        "y": 0
      },
      "RecordName": "Origin",
      "name": "2"
    }
  ]
}
```

**参数说明:**
- Edges: 轨道的边，链接轨道的节点
  - bidirectional: 是否为双向通行轨道，如果为false，则只能从起点方向至终点方向
  - end: Node节点名称，表示该边的终点
  - radius: 圆弧的弧度，用于设置该边的弧度，弧度为(弦长/)
  - start: Node节点名称，表示该边的起点
- Nodes: 轨道的节点
  - gridPosition: 设置该点的像素坐标，如果RecordName部位null时，使用该像素坐标作为节点
  - RecordName: 如果该键不为空，则使用已录制的点（选中的点名）作为节点
  - name: 设置节点的名称，不要重复

关于弧度计算参考开始的弧度计算

**返回示例:**

正确时返回:
```json
{
  "errorCode": 0,
  "msg": "successed",
  "data": "",
  "successed": true
}
```

错误时返回:
```json
{
  "errorCode": 102,
  "msg": "Failed read file",
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

### 获取轨道图

**简要描述:**
获取当前地图轨道

**接口版本:**
| 版本号 | 说明 | 修订日期 |
|:-------|:-----|:--------:|
| 1.0.0  | 创建接口 | 2020-4-23 |
| 1.1.0  | 新增filled参数 | 2022-5-17 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/track_manage/get_track_graph?filled="true"`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| filled | 否 | 字符串 | 只要不为"true"都视为无效或不存在。若为"true"返回经过填充的轨道json |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "Edges": [
      {
        "bidirectional": true,
        "end": "1",
        "radius": 0,
        "start": "0"
      },
      {
        "bidirectional": true,
        "end": "2",
        "radius": 10,
        "start": "1"
      }
    ],
    "Nodes": [
      {
        "gridPosition": {
          "x": 101,
          "y": 68
        },
        "RecordName": null,
        "name": "0"
      },
      {
        "gridPosition": {
          "x": 0,
          "y": 0
        },
        "RecordName": "Jzzj",
        "name": "1"
      },
      {
        "gridPosition": {
          "x": 0,
          "y": 0
        },
        "RecordName": "Origin",
        "name": "2"
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

### 恢复默认轨道

**简要描述:**
恢复默认轨道

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2022-3-29 | 2022-3-29 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/track_manage/restore_default_track`

**请求方式:**
- GET

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