# 枚举字典

## 设备类型 device_type

| 枚举值             | 描述         |
| ------------------ | ------------ |
| GENERIC            | 通用飞行器   |
| GROUND_ROVER       | 地面无人车   |
| SURFACE_BOAT       | 水面无人船   |
| GIMBAL             | 云台         |
| ONBOARD_CONTROLLER | 智能从属设备 |

## 设备当前控制模式 base_mode

| 枚举值       | 描述                               |
| ------------ | ---------------------------------- |
| MANUAL_INPUT | 手动控制                           |
| GUIDED       | 任务执行模式（接收地面站控制指令） |
| AUTO         | 自动模式（根据上传航点自动执行）   |

## 设备状态 vehicle state

| 枚举值    | 描述                            |
| --------- | ------------------------------- |
| UNINIT    | 系统未初始化（刚上电）          |
| BOOT      | 正在启动                        |
| STANDBY   | 就绪                            |
| ACTIVE    | 运行中                          |
| CRITICAL  | 出现严重异常                    |
| EMERGENCY | 严重故障（进入 fail-safe 模式） |
| POWEROFF  | 正在断电或关闭系统              |

## 电池状态 charge_status

| 枚举值   | 描述   |
| -------- | ------ |
| OK       | 正常   |
| LOW      | 低电量 |
| CRITICAL | 故障   |

## 传感器状态 sensors_status

| 枚举值      | 描述   |
| ----------- | ------ |
| NOT_PRESENT | 不存在 |
| OK          | 正常   |
| EMERGENCY   | 故障   |

## 云台控制模式 gimbal_flag

| 枚举值 | 描述     |
| ------ | -------- |
| LOCK   | 角度目标 |
| RATE   | 速度目标 |

## 对焦模式 focus_flag

| 枚举值 | 描述 |
| ------ | ---- |
| AUTO   | 自动 |
| MANUAL | 手动 |
