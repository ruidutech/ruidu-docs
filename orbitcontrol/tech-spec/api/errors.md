# 失败响应

## 消息格式

示例：

```json
{
  "msg_id": "uuid-789",
  "timestamp": 1757403776, // Unix 时间戳
  "success": false,
  "code": 2001,
  "message": "云台异常"
}
```

## 错误码区间规划

| 错误码区间  | 适用模块                      |
| ----------- | ----------------------------- |
| 1001 - 1999 | 设备相关，手动控制/设备状态等 |
| 2001 - 2999 | 云台相关                      |
| 3001 - 3999 | 导航相关                      |
| 4000 -      | 预留                          |

## 具体错误码说明

根据需求和开发进度持续维护。

::: tip 提示
表格中的的 `message 参考` 仅为示例，同一个错误码可以承接多个错误。例如：**1002 模式不匹配**

- 既可以是：cannot execute mission in manual mode
- 也可以是：cannot set mode to manual in mission executing

:::

### 通用

| 错误码 | 描述         | message 参考                          |
| ------ | ------------ | ------------------------------------- |
| 1001   | 请求参数错误 | mission_id is missing                 |
| 1002   | 模式不匹配   | cannot execute mission in manual mode |

### 设备相关

| 错误码 | 描述                   | message 参考                          |
| ------ | ---------------------- | ------------------------------------- |
| 1101   | 推流服务异常           | Streaming service unavailable         |
| 1102   | 设备状态不支持当前指令 | Cannot execute mission while charging |

### 云台相关

| 错误码 | 描述             | message 参考                           |
| ------ | ---------------- | -------------------------------------- |
| 2001   | 云台不在线       | gimbal is not_present or not_connected |
| 2002   | 云台指令执行失败 | Failed to start recording              |

### 导航相关

| 错误码 | 描述             | message 参考               |
| ------ | ---------------- | -------------------------- |
| 3001   | 导航任务执行失败 | Navigation recovery failed |

### 系统

| 错误码 | 描述         | message 参考                     |
| ------ | ------------ | -------------------------------- |
| 9001   | 未知内部错误 | Caught unexpected exception: ... |
