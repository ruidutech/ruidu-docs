# 导航相关

## Interface Definitions

| 名称              | 类型    | 数据定义                            | 描述                             |
| ----------------- | ------- | ----------------------------------- | -------------------------------- |
| /map/metadata     | topic   | [MapMetaData](#mapmetadata)         | 地图元数据                       |
| /map/compressed   | topic   | [CompressedImage](#compressedimage) | 地图数据压缩形式（PNG）          |
| /start_mapping    | service | [StartMapping](#startmapping)       | 开始建图                         |
| /stop_mapping     | service | [Trigger](#trigger)                 | 结束建图（不保存，回到导航模式） |
| /save_map         | service | [SaveMap](#savemap)                 | 完成建图（完成建图并保存）       |
| /navigate_to_pose | action  | [NavigateToPose](#navigatetopose)   | 导航到指定位置                   |
| /plan             | topic   | [Path](#path)                       | 全局规划路径                     |
| /set_initial_pose | service | [SetInitialPose](#setinitialpose)   | 设置初始位姿                     |

## Message Definitions

### MapMetaData

[nav_msgs/MapMetaData](https://docs.ros.org/en/humble/p/nav_msgs/msg/MapMetaData.html)

### CompressedImage

[sensor_msgs/CompressedImage](https://docs.ros.org/en/humble/p/sensor_msgs/msg/CompressedImage.html)

### Path

[nav_msgs/Path](https://docs.ros.org/en/humble/p/nav_msgs/msg/Path.html)

### PoseWithCovarianceStamped

[geometry_msgs/PoseWithCovarianceStamped](https://docs.ros.org/en/humble/p/geometry_msgs/msg/PoseWithCovarianceStamped.html)

## Service Definitions

### StartMapping

```
bool align_wgs84
---
bool success
string message
```

- `align_wgs84 = false`：普通建图
- `align_wgs84 = true`：带 WGS84 地理参考的建图，前置条件与设备义务：
  - 设备须处于 RTK fix 状态；不满足时返回 `success = false`，并在 `message` 中说明原因
  - 建图开始时记录当前 WGS84 坐标与航向，作为 local map 原点 (0, 0, 0) 的地理参考，
    保存地图时生成 [datum.yaml](#datum-yaml)

### SaveMap

```
string map_id
---
bool success
string message
```

平台调用该服务表示建图结果（地图元数据与预览图）已入库，设备应：

1. 将本次建图产物落盘保存（pgm、pcd 等；`align_wgs84` 建图时含 datum.yaml）
2. 按「地图上传」流程将文件上传至平台（见 [地图分发协议](../api/map.md)）

`map_id` 为平台侧地图标识，新建地图与更新已有地图（产生新版本）均通过该 ID 关联；
平台侧版本号在地图上传响应中告知设备。

### Trigger

[std_srvs/Trigger](https://docs.ros.org/en/humble/p/std_srvs/srv/Trigger.html)

### SetInitialPose

[nav2_msgs/srv/SetInitialPose](https://docs.ros.org/en/humble/p/nav2_msgs/srv/SetInitialPose.html)

## Action Definitions

### NavigateToPose

[nav2_msgs/action/NavigateToPose](https://docs.ros.org/en/humble/p/nav2_msgs/action/NavigateToPose.html)

## File Definitions

### datum.yaml

WGS84 坐标与本地地图坐标系原点的对应关系。仅 `align_wgs84 = true` 建图时由设备生成，
随地图文件包一并上传与分发。

```yaml
datum:
  latitude: 31.230416    # WGS84 纬度 (deg)
  longitude: 121.473701  # WGS84 经度 (deg)
  altitude: 4.2          # 海拔 (m)
  yaw_offset: 1.5708     # local map x 轴相对 ENU 东向的夹角 (rad，真北参考)
```

- 对应点固定为 local map 原点 (0, 0, 0)
- `yaw_offset` 命名对齐 navsat_transform 配置；不可省略：仅平移无旋转无法对齐
  local 坐标轴与 ENU
