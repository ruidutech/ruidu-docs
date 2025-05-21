# RTK 开源导航协议

本协议是MQTT3.3的通信协议，以机器人端IP为服务器，1883为端口的通信，并在导航系统上配置了一个客户端，发布导航系统的各话题，且订阅了一个控制话题。总以实现导航系统与上位机或外部通信。

## 话题表

| 话题名 | 话题内容 | 备注 |
|:-----:|:------:|:----:|
| **机器人发布** | | |
| base_status | 基本状态话题 | 传感器状态、电压、速度、经纬度等 |
| trajectory_data | 轨迹数据话题 | 轨迹经纬度、航向角、坐标数据等 |
| feedback | 操作反馈话题 | 反馈操作结果 |
| **机器人订阅** | | |
| mqtt_control | 机器人控制话题 | |

## 机器人发布

### 状态反馈 base_status

- 反馈方式：主动反馈
- 反馈频率：10hz
- 示例：
```json
{
  "bms": {  // 电池信息
    "current": 0,    // 电流，单位：a
    "error": 0,      // 错误
    "remaining_capacity": 0,  // 剩余容量
    "soc": 0,        // 电量
    "status": 0,     // 状态
    "tem": 0,        // 温度，单位：摄氏度
    "voltage": 0     // 电压，单位：v
  },
  "nav": {  // 导航信息
    "locate": "LOCATE_UNINIT",  // 定位状态：LOCATE_UNINIT(定位未初始化)、LOCATE_TRUE(定位成功)、LOCATE_FALSE(定位丢失)
    "obstacle": false,          // 避障状态：false(无避障)、true(避障停车)
    "status": "NAV_FREE"        // 导航状态：NAV_FREE(空闲模式)、NAV_RUN(导航中)、NAV_SUCCESS(导航成功)、NAV_ERROR(导航失败)
  },
  "pose": {  // 位置信息
    "x": 0,    // x轴坐标，单位：m
    "y": 0,    // y轴坐标，单位：m
    "yaw": 0   // 角度信息，单位：rad
  },
  "robot": {  // 底盘信息
    "power": 68,           // 电压或者电量信息
    "robot_status": 8,     // 底盘状态信息
    "vx": 0,               // x轴线速度，单位：m/s
    "vy": 0,               // y轴线速度，单位：m/s
    "vz": 0.004363323129985824  // 角速度或者转向角，单位：rad/s
  },
  "rtk": {  // RTK信息
    "angle": 0,              // 航向角，单位：°
    "latitude": 23.1496524965,    // 纬度
    "longitude": 113.0196366456667,  // 经度
    "status": 1              // RTK定位状态：0(未定位)、1(单点定位)、2(伪距差分定位)、4(固定解)、5(浮点解)
  },
  "sensor": {  // 传感器状态
    "imu": true,    // 陀螺仪状态：true(正常)、false(不正常)
    "laser": false, // 雷达状态：true(正常)、false(不正常)
    "robot": true   // 底盘状态：true(正常)、false(不正常)
  }
}
```

### 轨迹反馈 trajectory_data

- 反馈方式：触发反馈(请看3.2 获得所有轨迹)
- 反馈频率：触发频率
- 示例：
```json
[{
  "data": [{  // 轨迹数组
    "angle": 30,               // 航向角，单位：°
    "latitude": 23.04934955,   // 纬度
    "longitude": 188.2222333,  // 经度
    "x": 322100,               // x轴坐标，单位：m
    "y": 45220,                // y轴坐标，单位：m
    "yaw": 230,                // 角度信息，单位：rad
    "z": 3.141592              // z轴坐标
  },
  {
    "angle": 30,               // 航向角，单位：°
    "latitude": 23.04934955,   // 纬度
    "longitude": 188.2222333,  // 经度
    "x": 322100,               // x轴坐标，单位：m
    "y": 45220,                // y轴坐标，单位：m
    "yaw": 230,                // 角度信息，单位：rad
    "z": 3.141592              // z轴坐标
  }
  ],
  "name": "test5"  // 轨迹名
}]
```

### 操作反馈 feedback

- 反馈方式：触发反馈
- 反馈频率：触发频率
- 示例：
```json
{
  "cmd": "delete_trajectory_success",  // 命令：删除轨迹成功
  "cmd_type": "feedback"               // 命令类型：操作反馈
}
```

#### 释义：命令解释

| 命令 | 命令解释 |
|:----|:------|
| get_all_trajectory_failse | 获取全部轨迹失败 |
| save_trajectory_success | 保存轨迹成功 |
| save_trajectory_failse | 保存轨迹失败 |
| delete_trajectory_success | 删除轨迹成功 |
| delete_trajectory_failse | 删除轨迹失败 |
| start_task_success | 启动任务成功 |
| start_task_failse | 启动任务失败 |
| cancel_task_success | 取消任务成功 |
| cancel_task_failse | 取消任务失败 |
| start_nav_success | 启动导航成功 |
| start_nav_failse | 启动导航失败 |
| init_rtk_data_success | Rtk位置归零成功 |
| init_rtk_data_failse | Rtk位置归零失败 |
| delete_all_trajectory_success | 删除全部轨迹成功 |
| delete_all_trajectory_failse | 删除全部轨迹失败 |

## 机器人订阅

### 控制命令表

控制命令皆向机器人订阅话题mqtt_control发送控制指令

| **cmd_type** | **cmd** | 释义 |
|:------------:|:-------:|:----:|
| trajectory_control | get_all_trajectory | 获得所有轨迹 |
|  | save_trajectory | 保存轨迹 |
|  | delete_trajectory | 删除轨迹 |
|  | delete_all_trajectory | 删除全部轨迹 |
| task_control | start_task | 启动循迹 |
|  | cancel_task | 取消循迹 |
|  | init_rtk_data | Rtk位置归零 |

### 获得所有轨迹 get_all_trajectory

示例：
```json
{
  "cmd_type": "trajectory_control",  // 命令类型
  "cmd": "get_all_trajectory"        // 命令：获得所有轨迹
}
```

### 保存轨迹 save_trajectory

示例：
```json
{
  "cmd_type": "trajectory_control",  // 命令类型
  "cmd": "save_trajectory",          // 命令：保存轨迹
  "data": {
    "name": "test1",                 // 轨迹名
    "data": [{
      "longitude": 188.2222333,      // 经度
      "latitude": 23.04934955,       // 纬度
      "angle": 230,                  // 航向角，单位：°
      "x": 322100.0,                 // x轴坐标，单位：m
      "y": 45220.0,                  // y轴坐标，单位：m
      "yaw": 3.141592                // 角度，单位：rad
    },
    {
      "longitude": 188.2222333,      // 经度
      "latitude": 23.04934955,       // 纬度
      "angle": 230,                  // 航向角，单位：°
      "x": 322100.0,                 // x轴坐标，单位：m
      "y": 45220.0,                  // y轴坐标，单位：m
      "yaw": 3.141592                // 角度，单位：rad
    }
    ]
  }
}
```

### 删除轨迹 delete_trajectory

示例：
```json
{
  "cmd_type": "trajectory_control",  // 命令类型
  "cmd": "delete_trajectory",        // 命令：删除轨迹
  "name": "test5"                    // 轨迹名
}
```

### 删除所有轨迹 delete_all_trajectory

示例：
```json
{
  "cmd_type": "trajectory_control",  // 命令类型
  "cmd": "delete_all_trajectory"     // 命令：删除所有轨迹
}
```

### 启动循迹 start_task

示例：
```json
{
  "cmd_type": "task_control",  // 命令类型
  "cmd": "start_task",         // 命令：启动循迹
  "name": "13",                // 轨迹名
  "id": 2,                     // 目标点id
  "speed": 0.2                 // 运行速度
}
```

### 取消循迹 cancel_task

示例：
```json
{
  "cmd_type": "task_control",  // 命令类型
  "cmd": "cancel_task"         // 命令：取消循迹
}
```

### RTK位置归零 init_rtk_data

示例：
```json
{
  "cmd_type": "task_control",  // 命令类型
  "cmd": "init_rtk_data"       // 命令：RTK位置归零
}
``` 
