# 事件上报

## 消息格式

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/event`
- **请求参数**
  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "serial_number": "sn-191", // 设备序列号
    "data": {
      "id": 2001, // Event ID，参考错误码说明
      "log_levels": "" /* emergency, alert, critical, error, warning,
                          notice, info, debug, protocol, disabled */,
      // 可以传递多个参数，取决于 event_id
      "arguments": {
        "key1": "value1",
        "key2": "value2",
        …
      }
    }
  }
  ```

## 错误码区间规划

| 错误码区间  | 适用模块                      |
| ----------- | ----------------------------- |
| 1001 - 1999 | 设备相关，手动控制/设备状态等 |
| 2001 - 2999 | 云台相关                      |
| 3001 - 3999 | 导航相关                      |
| 4001 - 4999 | 任务相关                      |
| 5000 -      | 预留                          |

> 收录以设备端 `rit_event_code/event_codes.h` 为准。
> 「未上报」= 已定义但设备端当前无事件上报点。
> 安防警报（算法识别等）走独立 topic `device/:serial_number/alarm`，
> 不占用 event code 区段，见 [alarm.md](./alarm.md)。

## 参数键组约定

多数事件参数遵循以下键组，后文表格中直接引用：

- **admission 键组**（任务/导航受理拒绝）：`execution_type`, `failure_stage=admission`,
  `operation`, `reason`，另有 `mission_id?`/`goal_id?`, `detail?`，
  以及 base_mode 不匹配时的 `actual_base_mode?`, `required_base_mode?`
- **failure 键组**（任务/导航执行失败）：`execution_type`, `failure_stage`, `operation`,
  `reason`，另有 `mission_id?`/`goal_id?`, `detail?`, `task_state?`
- **detail 单键**（地图同步域统一风格）：`detail`
- 未标注键组的为无参或简单键

## 具体错误码说明

### error：操作失败、请求拒绝、资源异常与内部错误

#### 通用/设备控制（10xx）

| ID   | Text         | Log Level | Arguments                |
| ---- | ------------ | --------- | ------------------------ |
| 1001 | 请求参数错误 | error     | gateway 无参；mission/nav 为 admission 键组（部分点仅 `operation` + `mission_id?`）；map_sync 为 detail 单键 |
| 1002 | 模式不匹配   | error     | admission 键组（`reason=base_mode_mismatch` 时附 `actual_base_mode`, `required_base_mode`） |
| 1004 | 模式切换失败 | error     | `from`, `to`，另有 `failure_stage?`, `reason?` |

#### 设备状态（11xx）

| ID   | Text                   | Log Level | Arguments |
| ---- | ---------------------- | --------- | --------- |
| 1101 | 推流服务异常           | error     | 无参      |
| 1102 | 设备状态不支持当前指令 | error     | 无参      |

#### 注册（12xx）

| ID   | Text           | Log Level | Arguments |
| ---- | -------------- | --------- | --------- |
| 1202 | 设备注册失败   | error     | 无参      |

#### 电源（13xx）

| ID   | Text     | Log Level | Arguments          |
| ---- | -------- | --------- | ------------------ |
| 1302 | 电量过低 | warning   | `battery_remaining` |

#### 媒体（15xx）

| ID   | Text               | Log Level | Arguments                                                          |
| ---- | ------------------ | --------- | ------------------------------------------------------------------ |
| 1501 | 媒体文件上传失败   | error     | `filename`, `stage`, `reason`, `attempt_count?`, `max_attempts?`, `http_status?` |

#### 云台（20xx）

| ID   | Text               | Log Level | Arguments |
| ---- | ------------------ | --------- | --------- |
| 2001 | 云台不在线         | error     | 无参      |
| 2002 | 云台指令执行失败   | error     | 无参      |

#### 导航/定位/地图（30xx）

| ID   | Text             | Log Level | Arguments                                                    |
| ---- | ---------------- | --------- | ------------------------------------------------------------ |
| 3001 | 导航任务执行失败 | error     | failure 键组                                                  |
| 3002 | GPS定位异常      | error     | 未上报                                                        |
| 3003 | 地图切换失败     | error     | 未上报                                                        |
| 3004 | 地图上传失败     | error     | detail 单键                                                   |
| 3005 | 地图同步或下载失败 | error   | detail 单键                                                   |
| 3006 | 进入建图模式失败 | error     | `operation`, `failure_stage`, `reason`, `exit_mapping_result?`（RTK 锚点采样失败回退分支） |

#### 任务执行（40xx）

| ID   | Text                          | Log Level | Arguments                                    |
| ---- | ----------------------------- | --------- | -------------------------------------------- |
| 4002 | 任务执行失败                  | error     | failure 键组（`operation` 分支另有 `capability_stage?`, `capability_error?`） |
| 4003 | 任务动作执行失败              | error     | failure 键组（`mission_id?`/`action_id?`/`goal_id?` 按任务类型其一） |
| 4010 | 任务操作失败                  | error     | `operation`, `mission_id?`                   |
| 4011 | 任务服务繁忙，请稍后重试      | warning   | `operation`，另有 `mission_id?`/`action?`/`goal_id?`；admission 拒绝时为 admission 键组 |

#### 系统（90xx）

| ID   | Text         | Log Level | Arguments                                            |
| ---- | ------------ | --------- | ---------------------------------------------------- |
| 9001 | 未知内部错误 | error     | gateway 无参；mission/nav 为 admission/failure 键组；map_sync 为 detail 单键 |
| 9002 | 数据库无法连接 | error   | uploader：`service`, `key`, `stage`；map_sync：detail 单键；其余无参 |

### event：操作成功、状态变化与生命周期通知

| ID   | Text           | Log Level | Arguments                       |
| ---- | -------------- | --------- | ------------------------------- |
| 1003 | 模式切换成功   | info      | `from`, `to`                    |
| 1103 | 推流成功开启   | info      | `component_id`                  |
| 1104 | 推流成功停止   | info      | 无参                            |
| 1201 | 设备注册成功   | info      | `device_id`, `site_id`          |
| 1301 | 已开始充电     | info      | 无参                            |
| 4001 | 任务执行成功   | info      | `operation`, `mission_id`       |

### 备注

- **1302 电量过低**：设备端跨阈值单次上报（恢复安全区间后复位），云端告警另有 cooldown 双保险。
- **1301 已开始充电**：当前为占位实现（收到充电指令即上报，充电状态确认逻辑未实现）。
- **3002 / 3003**：仅被 `rit_map_runtime_manager` 借用 ID/文本组装服务响应，不经事件通道上报。
