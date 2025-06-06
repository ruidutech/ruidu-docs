# 数据包录制

主要可用于获取调试信息。

## 开始录制bag

**简要描述:**
开始录制bag包

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/start_record_bag?bag_name=&record_type=`

**请求方式:**
- GET
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| bag_name | 是 | string | 要录制的bag名称,会自动在bag文件添加时间后缀名 |
| record_type | 是 | string | 录制的bag类型,输入["default","mapping","mapping2","running","running2","localization",] |

**参数说明:**
- default: 默认模式，录制所有信息
- mapping: 2d建图模式
- mapping2: 3d建图模式
- running: 差分轮导航模式
- running2: 阿克曼轮导航模式
- localization: 3d定位模式

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

## 停止录制bag

**简要描述:**
停止录制bag包

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/stop_record_bag`

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

## 获取bag列表

**简要描述:**
获取bag列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/get_bag_list`

**请求方式:**
- GET

**请求参数:** 无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "",
  "data": {
    "baglist": [
      {
        "name": "bagname1",
        "size": 2000
      },
      {
        "name": "bagname2",
        "size": 1000
      },
      {
        "name": "bagname2",
        "size": 1000
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
| name | string | 包名 |
| size | double | 包的大小,单位为mb |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 删除bag文件

**简要描述:**
删除录制bag包

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/delete_bag?bag_name=`

**请求方式:**
- GET
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| bag_name | 是 | string | 要删除的bag名称 |

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

## 下载bag

**简要描述:**
下载的bag包

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/download_bag?bag_name=`

**请求方式:**
- GET
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| bag_name | 是 | string | 要删除的bag名称 |

**返回示例:**

正确时返回:
返回文件

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

## 判断是否正在录制bag

**简要描述:**
判断当前是否正在录制bag

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:** 
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/cmd/is_bag_recording`

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
    "state": false,
    "name": ""
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
| state | bool | 正在录制则为true,否则为false |
| name | string | 录制的bag输⼊名称 |

**备注:**
更多返回错误代码请看首页的错误代码描述 