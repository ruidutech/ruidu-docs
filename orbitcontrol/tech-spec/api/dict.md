# 枚举字典

## 设备类型

device_type

| value | name               | desc         |
| ----- | ------------------ | ------------ |
| 0     | GENERIC            | 通用飞行器   |
| 1     | GROUND_ROVER       | 地面无人车   |
| 2     | SURFACE_BOAT       | 水面无人船   |
| 3     | GIMBAL             | 云台         |
| 4     | ONBOARD_CONTROLLER | 智能从属设备 |

## 设备当前控制模式

base_mode

| value | name         | desc                               |
| ----- | ------------ | ---------------------------------- |
| 0     | MANUAL_INPUT | 手动控制                           |
| 1     | GUIDED       | 任务执行模式（接收地面站控制指令） |
| 2     | AUTO         | 自动模式（根据上传航点自动执行）   |

## 设备状态

vehicle_state

| value | name      | desc                            |
| ----- | --------- | ------------------------------- |
| 0     | UNINIT    | 系统未初始化（刚上电）          |
| 1     | BOOT      | 正在启动                        |
| 2     | STANDBY   | 就绪                            |
| 3     | ACTIVE    | 运行中                          |
| 4     | CRITICAL  | 出现严重异常                    |
| 5     | EMERGENCY | 严重故障（进入 fail-safe 模式） |
| 6     | POWEROFF  | 正在断电或关闭系统              |

## 电池状态

charge_status

| value | name     | desc   |
| ----- | -------- | ------ |
| 0     | OK       | 正常   |
| 1     | LOW      | 低电量 |
| 2     | CRITICAL | 故障   |

## 传感器状态

sensors_status

| value | name        | desc   |
| ----- | ----------- | ------ |
| 0     | NOT_PRESENT | 不存在 |
| 1     | OK          | 正常   |
| 2     | EMERGENCY   | 故障   |

## 云台控制模式

gimbal_flag

| value | name  | desc     |
| ----- | ----- | -------- |
| 0     | SPEED | 速度模式 |
| 1     | ANGLE | 角度目标 |

## 调焦模式

zoom_type

| value | name                 | desc               |
| ----- | -------------------- | ------------------ |
| 0     | ZOOM_TYPE_STEP       | 调整指定步长       |
| 1     | ZOOM_TYPE_CONTINUOUS | 连续调焦，默认方式 |

## 对焦模式

focus_flag

| value | name                  | desc               |
| ----- | --------------------- | ------------------ |
| 0     | FOCUS_TYPE_STEP       | 按指定步长         |
| 1     | FOCUS_TYPE_CONTINUOUS | 连续调整，默认方式 |
| 4     | FOCUS_TYPE_AUTO       | 自动               |
