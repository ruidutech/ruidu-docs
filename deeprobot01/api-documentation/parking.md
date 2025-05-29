# 停车位(开发中)

停车位功能，开发中...

## 添加停车位

**简要描述:**
添加停车位

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-3-27 | 2020-3-27 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/parking_manager/add_parkings`

**请求方式:**
- POST

**请求头:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| parkings | 是 | array | 停车位数组数据 |
| > id | 是 | string | 停车位唯一识别ID |
| > gridX | 是 | int | 栅格X |
| > gridY | 是 | int | 栅格Y |
| > width | 是 | int | x向宽 |
| > height | 是 | int | y向高 |

**请求发送json:**
```json
{
  "parkings": [
    {
      "id": "A1",
      "gridX": 200,
      "gridY": 100,
      "angle": 0,
      "width": 3.3,
      "height": 2.2
    },
    {
      "id": "A2",
      "gridX": 200,
      "gridY": 100,
      "angle": 0,
      "width": 3.3,
      "height": 2.2
    },
    {
      "id": "A3",
      "gridX": 200,
      "gridY": 100,
      "angle": 0,
      "width": 3.3,
      "height": 2.2
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
| errorCode | int | 错误代码 |
| version | string | 固件版本 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 更新停车位

**简要描述:**
更新停车位的内容数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-3-27 | 2020-3-27 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/parking_manager/update_parking`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| id | 是 | string | 要修改的停车位唯一识别ID |
| gridX | 是 | int | 栅格X |
| gridY | 是 | int | 栅格Y |
| width | 是 | int | x向宽 |
| height | 是 | int | y向高 |

**请求发送json:**
```json
{
  "id": "A1",
  "gridX": 200,
  "gridY": 100,
  "angle": 0,
  "width": 3.3,
  "height": 2.2
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
| errorCode | int | 错误代码 |
| version | string | 固件版本 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 删除停车位

**简要描述:**
删除停车位

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-3-27 | 2020-3-27 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/parking_manager/delete_parkings`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| id | 是 | array | 要删除的停车位唯一识别ID |

**请求发送json:**
```json
{
  "id": ["A1", "A2"]
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
| errorCode | int | 错误代码 |
| version | string | 固件版本 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取停车位

**简要描述:**
获取停车位数据

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2021-3-27 | 2021-3-27 |

**状态限制:**
无

**状态跳转至:**
无

**请求URL:** 
- `http://机器人IP:端口号/robot/parking_manager/query_parkings`

**请求方式:**
- POST

**请求参数:** 无

**请求发送json:**
```json
{}
```

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "parkings": [
      {
        "modifyAt": 1616722358,
        "angle": 0.0,
        "gridY": 3885,
        "gridX": 1493,
        "height": 2.200000047683716,
        "width": 0.5,
        "createAt": 1616722358,
        "id": "test2"
      },
      {
        "modifyAt": 1616722358,
        "angle": 0.0,
        "gridY": 3885,
        "gridX": 1493,
        "height": 2.200000047683716,
        "width": 0.800000011920929,
        "createAt": 1616722358,
        "id": "test3"
      },
      {
        "modifyAt": 1616722358,
        "angle": 0.0,
        "gridY": 3885,
        "gridX": 1493,
        "height": 2.200000047683716,
        "width": 0.800000011920929,
        "createAt": 1616722358,
        "id": "test7"
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
|:-------|:----:|:-----|
| errorCode | int | 错误代码 |
| version | string | 固件版本 |

**备注:**
更多返回错误代码请看首页的错误代码描述 