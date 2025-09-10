# 枚举字典

## 设备相关

### 设备准入状态

admission_status

| value    | name     | desc               |
| -------- | -------- | ------------------ |
| pending  | PENDING  | 待确认             |
| approved | APPROVED | 准入通过           |
| rejected | REJECTED | 不予准入，拒绝接入 |

### 设备类型

device_type

| value              | name               | desc         |
| ------------------ | ------------------ | ------------ |
| generic            | GENERIC            | 通用飞行器   |
| ground_rover       | GROUND_ROVER       | 地面无人车   |
| surfaceboat        | SURFACE_BOAT       | 水面无人船   |
| gimbal             | GIMBAL             | 云台         |
| onboard_controller | ONBOARD_CONTROLLER | 智能从属设备 |

### 设备当前控制模式

base_mode

| value        | name         | desc                               |
| ------------ | ------------ | ---------------------------------- |
| manual_input | MANUAL_INPUT | 手动控制                           |
| guided       | GUIDED       | 任务执行模式（接收地面站控制指令） |
| auto         | AUTO         | 自动模式（根据上传航点自动执行）   |

### 设备状态

device_state

| value     | name      | desc                            |
| --------- | --------- | ------------------------------- |
| uninit    | UNINIT    | 系统未初始化（刚上电）          |
| boot      | BOOT      | 正在启动                        |
| standby   | STANDBY   | 就绪                            |
| active    | ACTIVE    | 运行中                          |
| critical  | CRITICAL  | 出现严重异常                    |
| emergency | EMERGENCY | 严重故障（进入 fail-safe 模式） |
| poweroff  | POWEROFF  | 正在断电或关闭系统              |

### 电池状态

charge_status

| value    | name     | desc   |
| -------- | -------- | ------ |
| ok       | OK       | 正常   |
| low      | LOW      | 低电量 |
| critical | CRITICAL | 故障   |

## 传感器相关

### 传感器类型

| value          | name           | desc             |
| -------------- | -------------- | ---------------- |
| gps            | GPS            | GPS 传感器       |
| camera         | CAMERA         | 摄像头           |
| lidar          | LIDAR          | 激光雷达         |
| imu            | IMU            | 惯性测量单元     |
| ultrasonic     | ULTRASONIC     | 超声波传感器     |
| temperature    | TEMPERATURE    | 温度传感器       |
| humidity       | HUMIDITY       | 湿度传感器       |
| custom_sensors | CUSTOM_SENSORS | 自定义传感器列表 |

### 传感器状态

sensors_status

| value       | name        | desc   |
| ----------- | ----------- | ------ |
| not_present | NOT_PRESENT | 不存在 |
| ok          | OK          | 正常   |
| emergency   | EMERGENCY   | 故障   |

## 云台相关

### 云台控制模式

gimbal_flag

| value | name  | desc     |
| ----- | ----- | -------- |
| speed | SPEED | 速度模式 |
| angle | ANGLE | 角度目标 |

### 调焦模式

zoom_type

| value                | name                 | desc               |
| -------------------- | -------------------- | ------------------ |
| zoom_type_step       | ZOOM_TYPE_STEP       | 调整指定步长       |
| zoom_type_continuous | ZOOM_TYPE_CONTINUOUS | 连续调焦，默认方式 |

### 对焦模式

focus_flag

| value                 | name                  | desc               |
| --------------------- | --------------------- | ------------------ |
| focus_type_step       | FOCUS_TYPE_STEP       | 按指定步长         |
| focus_type_continuous | FOCUS_TYPE_CONTINUOUS | 连续调整，默认方式 |
| focus_type_auto       | FOCUS_TYPE_AUTO       | 自动               |
