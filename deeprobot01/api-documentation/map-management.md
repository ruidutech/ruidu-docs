# 地图管理功能

用于地图的编辑，切换至此状态会结束掉导航任务。

## 获取地图列表信息

**简要描述:**
获取地图列表以及地图基本信息

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/get_map_info?map_name=`

**请求方式:**
- GET 
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| map_name | 否 | string | 获取指定地图名称的信息，为空时返回所有地图图片信息 |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "maps": [
      {
        "mapId": "858ba7fb-00d1-407a-9354-0010e8ba2b8b",
        "originY": -2.456368,
        "gridWidth": 366,
        "originX": -9.871323,
        "mapname": "0071",
        "gridHeight": 86,
        "pngMD5": "fcd829313ba20efdaf5295e6eb2c022a",
        "maxZoom": 0,
        "resolution": 0.05,
        "minBoxSize": 366
      },
      {
        "mapId": "6c421468-111c-4f74-93fd-0482d9973e80",
        "originY": -194.234818,
        "gridWidth": 3179,
        "originX": -74.664909,
        "mapname": "0623",
        "gridHeight": 4303,
        "pngMD5": "b16fbc52013fda48c01ca2216c080959",
        "maxZoom": 2,
        "resolution": 0.05,
        "minBoxSize": 1076
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
  "msg": "successed",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| <nobr>参数名</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:-----|:-----|
| data | object | 储存地图数据 |
| maps | array | 储存地图列表信息 |
| mapname | string | 地图名称 |
| mapId | string | 作为地图唯一识别码 |
| gridWidth | int | 地图的宽度 |
| gridHeight | int | 地图的高度 |
| pngMD5 | string | 获取地图的图片png的md5码,用于校验远程地图是否修改 |
| originX | double | 地图原点x位置 |
| originY | double | 地图原点y位置 |
| resolution | double | 地图像素分辨率,代表每像素等于实际尺度多少米 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取地图图片

**简要描述:**
获取指定地图的png格式图片

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/maps_pngs?map_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| map_name | 是 | string | 需获取的地图名称 |

**返回示例:**

正确时返回:
返回地图图片(png格式)

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

## 获取瓦片地图(未启用)

**简要描述:**
获取指定地图分割缩放后的图片。对于过大的地图图片，某些情况下软件进行显示会出现加载过慢，或内存过大，为优化前端显示，将地图进行分割。

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-26 | 2020-9-26 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器⼈IP:端⼝号/robot/map_manage/tile_maps_pngs?map_name=&&x=&&y=&&z=`

**请求方式:**
- GET 
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| map_name | 是 | string | 需获取的地图名称 |
| z | 是 | int | zoom缩放等级，0级为压缩后的全图 |
| x | 是 | int | 坐标序列号，右手坐标系，原点左下角，x向右，y向上 |
| y | 是 | int | 坐标序列号，右手坐标系，原点左下角，x向右，y向上 |

**返回示例:**

正确时返回:
返回地图图片(png格式)

错误时返回:
```json
{
  "errorCode": 100,
  "msg": "",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
此接口暂未启用 
更多返回错误代码请看首页的错误代码描述

## 切换地图

**简要描述:**
切换到指定地图名称的地图

**接口版本:**
| <nobr>版本号</nobr> | <nobr>备注</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------|:--------:|
| 1.0.0  | 初次创建 | 2020-4-23 |
| 1.0.0  | 添加取消⾃动初始化功能 | 2020-7-14 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/load_map?map_name=?`

> 注: 如需要切换之后取消自动初始化功能，可在输入参数中加入 `map_name=${mapName}?delete_init_pose`,
>
> 例如切换到名为 test 的地图（取消自动初始化）时，URL为: `http://机器人IP:端口号/robot/map_manage/load_map?map_name=test?delete_init_pose`

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
  "data": {},
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

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取运行中地图信息

**简要描述:**
获取当前运行中地图信息

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |
| 1.0.0  | 2020-9-26 | 2020-9-26 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/current_map_info`

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
    "name": "0623",
    "mapId": "6c421468-111c-4f74-93fd-0482d9973e80",
    "originY": -194.234818,
    "originX": -74.664909,
    "gridWidth": 3179,
    "gridHeight": 4303,
    "pngMD5": "b16fbc52013fda48c01ca2216c080959",
    "maxZoom": 2,
    "resolution": 0.05000000074505806,
    "minBoxSize": 1076
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
| <nobr>参数名</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:-----|:-----|
| name | string | 当前运行中的地图名称 |
| gridHeight | int | 当前运行中地图的高度 |
| gridWidth | int | 当前运行中地图的宽度 |

**备注:**
更多返回错误代码请看首页的错误代码描述

## 删除地图

**简要描述:**
删除指定的地图文件

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/delete_map?map_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| map_name | 是 | string | 需删除的地图名称 |

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

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

## 下载地图

**简要描述:**
下载指定的地图文件

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/download_map?map_name=?`

**请求方式:**
- GET 
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| map_name | 是 | string | 需下载的地图名称 |

**返回示例:**

正确时返回:
返回一个zip格式的地图文件

错误时返回:
```json
{
  "errorCode": 100,
  "msg": "",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

## 编辑地图

**简要描述:**
编辑地图信息，注意状态限制，可以将进⾏地图编辑，如擦除障碍物，添加墙壁等功能（暂不⽀持3D）。

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/edit_map?operation_type=restore`

**请求方式:**
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| operation_type | 是 | string | 选择编辑的方式，四个选项：restore(恢复初始状态)，add(修改为墙壁障碍物(黑色墙壁))，remove(修改为空白区域)，unknown(修改为未知区域) |

**请求发送json:**
```json
{
  "map_name": "test",
  "obstacles": {
    "polygons": [
      [
        {
          "x": 50,
          "y": 20
        },
        {
          "x": 50,
          "y": 100
        },
        {
          "x": 100,
          "y": 50
        }
      ]
    ]
  }
}
```

polygon列表中的点为png图⽚栅格x,y.点列表组成的闭环区域将被修改

**返回示例:**

正确时返回:
文件流,文件为zip格式压缩包

错误时返回:
```json
{
  "errorCode": 100,
  "msg": "",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

## 上传地图

**简要描述:**
上传地图文件

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-4-23 | 2020-4-23 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/upload_map?map_name=`

**请求方式:**
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| map_name | 是 | string | 上传地图压缩包的名字 |

上传数据:下载下来的zip压缩⽂件

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
  "msg": "",
  "data": "",
  "successed": false
}
```

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述

## 重命名地图

**简要描述:**
重命名指定地图

**接口版本:**
| <nobr>版本号</nobr> | <nobr>制定日期</nobr> | <nobr>修订日期</nobr> | <nobr>备注</nobr> |
|:-------|:--------:|:--------:|:-----|
| 1.0.0 | 2020-4-23 | 2020-4-23 | 初始创建 |
| 1.0.1 | 2020-4-23 | 2021-11-30 | 修订url错误 |

**状态限制:**
- Idle
- RuningTask

**状态跳转至:** 无

**请求URL:** 
- `http://机器人IP:端口号/robot/map_manage/rename_map?origin_map_name=&new_map_name=`

**请求方式:**
- GET 
- POST

**请求参数:**
| <nobr>参数名</nobr> | <nobr>是否必须</nobr> | <nobr>类型</nobr> | <nobr>说明</nobr> |
|:-------|:--------:|:----:|:-----|
| origin_map_name | 是 | string | 原地图名称 |
| new_map_name | 是 | string | 新地图名称 |

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "",
  "data": {},
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

**返回参数说明:** 无

**备注:**
更多返回错误代码请看首页的错误代码描述 