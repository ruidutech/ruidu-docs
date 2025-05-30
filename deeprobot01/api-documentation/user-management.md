# 用户管理相关功能

用户权限管理。

## 验证用户

**简要描述:**
验证账户名与密码

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/user_manage/verify_user?username=&&passwd=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| username | 是 | string | 用户名 |
| passwd | 是 | string | 用户名对应的密码 |

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
  "errorCode": 1704,
  "msg": "password error!",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**错误代码:**
- 1700: 用户不存在
- 1704: 密码错误

**备注:**
更多返回错误代码请看首页的错误代码描述

## 修改用户密码

**简要描述:**
验证账户名与密码

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/user_manage/update_passwd?username=&&passwd=&&new_passwd=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| username | 是 | string | 用户名 |
| passwd | 是 | string | 用户名对应的密码 |
| new_passwd | 是 | string | 用户新密码 |

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
  "errorCode": 1704,
  "msg": "password error!",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**错误代码:**
- 1700: 用户不存在
- 1704: 密码错误

**备注:**
更多返回错误代码请看首页的错误代码描述

## 获取用户列表

**简要描述:**
获取机器当前用户列表

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/user_manage/get_users`

**请求方式:**
- GET 
- POST

**请求参数:**
无

**返回示例:**

正确时返回:
```json
{
  "errorCode": "",
  "msg": "successed",
  "data": {
    "users": [
      {
        "UserName": "admin"
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

## 添加用户

**简要描述:**
添加用户

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/user_manage/add_user?username=&&passwd=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| username | 是 | string | 用户名 |
| passwd | 是 | string | 用户名对应的密码 |

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
  "errorCode": 1704,
  "msg": "password error!",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**错误代码:**
- 1700: 用户不存在
- 1704: 密码错误

**备注:**
更多返回错误代码请看首页的错误代码描述

## 删除用户

**简要描述:**
删除用户

**接口版本:**
| 版本号 | 制定日期 | 修订日期 |
|:-------|:--------:|:--------:|
| 1.0.0  | 2020-9-11 | 2020-9-11 |

**请求URL:** 
- `http://机器人IP:端口号/robot/user_manage/delete_user?username=`

**请求方式:**
- GET 
- POST

**请求参数:**
| 参数名 | 是否必须 | 类型 | 说明 |
|:-------|:--------:|:----:|:-----|
| username | 是 | string | 用户名 |
| passwd | 是 | string | 用户名对应的密码 |

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
  "errorCode": 1704,
  "msg": "password error!",
  "data": "",
  "successed": false
}
```

**返回参数说明:**
| 参数名 | 类型 | 说明 |
|:-------|:-----|:-----|
| errorCode | int | 错误代码 |

**错误代码:**
- 1700: 用户不存在
- 1704: 密码错误

**备注:**
更多返回错误代码请看首页的错误代码描述 