# 音频管理

音频相关功能的接口说明。

## 请求声音列表

**简要描述:**
请求预定制的声音列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/sound_manage/query_sound`

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
  "data": [
    {
      "state": 0,
      "name": "battery_low"
    },
    {
      "state": 0,
      "name": "excuse_me"
    },
    {
      "state": 0,
      "name": "excuse_me_multiple"
    },
    {
      "state": 0,
      "name": "full_load"
    },
    {
      "state": 0,
      "name": "mission_completed"
    },
    {
      "state": 0,
      "name": "mission_start"
    },
    {
      "state": 0,
      "name": "remove_obstruction"
    },
    {
      "state": 0,
      "name": "thank_you"
    },
    {
      "state": 0,
      "name": "use_service"
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
| state | int | 0为停止，1为正在播放，2为暂停 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 开始播放音频

**简要描述:**
播放预定义的音频

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/sound_manage/play_sound`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| sound | 是 | string | 声音名称 |
| loop | 否 | bool | 是否循环播放 |

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

## 停止播放音频

**简要描述:**
播放预定义的音频

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/sound_manage/stop_sound`

**请求方式:**
- GET

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| sound | 是 | string | 声音名称 |
| stop_all | 否 | bool | 是否停止所有音频 |

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

## 上传音频文件

**简要描述:**
上传音频文件

**接口版本:**
| 版本号 | 制定日期 | 备注 |
|:-------|:--------:|:-----|
| 1.0.0  | 2022-9-24 | 初次创建 |

**状态限制:** 无

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/sound_manage/upload_sound`

**请求方式:**
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| sound_name | 是 | string | 上传音频文件的名字 |

**上传数据:** 下载下来的zip压缩文件

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