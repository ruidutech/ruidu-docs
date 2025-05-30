# MAVLink 协议对照关系

本文档详细说明当前基于 MQTT 的 RTK 开源导航协议与标准 MAVLink 协议之间的对照关系，便于协议转换和系统集成。

> Mavlink 协议的具体说明可参考：https://mavlink.io/en/messages/common.html

## 协议概述对比

| 项目 | RTK 导航协议 | MAVLink 协议 |
|:-----|:------------|:------------|
| **通信方式** | MQTT 3.3 | 点对点串行通信 |
| **传输介质** | TCP/IP (端口1883) | UART/UDP/TCP |
| **消息格式** | JSON | 二进制 |
| **消息确认** | MQTT QoS | 内置ACK机制 |
| **多系统支持** | MQTT主题订阅 | SystemID/ComponentID |
| **实时性** | 依赖网络延迟 | 低延迟 |

## 状态类消息对照表

| <nobr>消息类型</nobr> | RTK导航协议 | MAVLink协议 | <nobr>对照关系说明</nobr> |
|:------|:---------|:---------|:------------------|
| **系统状态** | `base_status` | `HEARTBEAT(0)` + `SYS_STATUS(1)` | <nobr>RTK单一消息包含多种状态，<br/>MAVLink分为心跳和系统状态两个消息</nobr> |
| **位置信息** | `base_status.pose` | `LOCAL_POSITION_NED(32)` | 本地坐标系位置信息 |
| **全球定位** | `base_status.rtk` | `GPS_RAW_INT(24)` + `GLOBAL_POSITION_INT(33)` | RTK定位对应GPS原始数据和全球位置 |
| **姿态信息** | `base_status.pose.yaw` | `ATTITUDE(30)` + `ATTITUDE_QUATERNION(31)` | 姿态角度信息，MAVLink支持欧拉角和四元数 |
| **速度信息** | `base_status.robot.vx/vy/vz` | `LOCAL_POSITION_NED(32).vx/vy/vz` | 三轴速度信息直接对应 |
| **电池状态** | `base_status.bms` | `BATTERY_STATUS(147)` | 电池相关信息对应 |
| <nobr>**传感器状态**</nobr> | `base_status.sensor` | `SYS_STATUS(1)` 传感器位掩码 | 传感器健康状态对应 |

## 控制命令类消息对照表

| <nobr>消息类型</nobr> | RTK导航协议 | MAVLink协议 | <nobr>对照关系说明</nobr> |
|:--------|:-----------|:-----------|:-----------|
| **轨迹管理** | `trajectory_control` | `MISSION_*` 系列消息 | <nobr>轨迹管理对应任务管理</nobr> |
| **任务控制** | `task_control` | `COMMAND_LONG(76)` + `COMMAND_INT(75)` | 任务命令对应MAVLink命令协议 |
| **速度控制** | `manual_control.cmd_vel` | `MANUAL_CONTROL(69)` | 手动速度控制直接对应 |
| **急停控制** | `manual_control.terminate` | `MAV_CMD_DO_FLIGHTTERMINATION` | 急停对应飞行终止命令 |

### 轨迹管理

| 功能 | RTK导航协议 | MAVLink协议 | 对照关系说明 |
|:-----|:-----------|:-----------|:-----------|
| <nobr>**获取轨迹列表**</nobr> | `get_all_trajectory` | `MISSION_REQUEST_LIST(43)` | 请求任务列表 |
| **保存轨迹** | `save_trajectory` | `MISSION_COUNT(44)` + `MISSION_ITEM_INT(73)` | 上传任务序列 |
| **删除轨迹** | `delete_trajectory` | `MISSION_CLEAR_ALL(45)` | 清除任务 |
| **轨迹反馈** | `trajectory_data` | `MISSION_ITEM_INT(73)` 数组 | <nobr>轨迹点数据对应任务项</nobr> |

### 任务控制

| 功能 | RTK导航协议 | MAVLink协议 | 对照关系说明 |
|:-----|:-----------|:-----------|:-----------|
| **启动循迹** | `start_task` | `MISSION_SET_CURRENT(41)` + `MAV_CMD_MISSION_START` | 开始执行任务 |
| **取消循迹** | `cancel_task` | `MAV_CMD_DO_PAUSE_CONTINUE` | <nobr>暂停/继续任务</nobr> |
| <nobr>**RTK归零**</nobr> | `init_rtk_data` | `MAV_CMD_DO_SET_HOME` | 设置Home点 |

