# 导航相关

## Interface Definitions

| 名称              | 类型    | 数据定义                            | 描述                    |
| ----------------- | ------- | ----------------------------------- | ----------------------- |
| /map/metadata     | topic   | [MapMetaData](#mapmetadata)         | 地图元数据              |
| /map/compressed   | topic   | [CompressedImage](#compressedimage) | 地图数据压缩形式（PNG） |
| /start_mapping    | service | [Trigger](#trigger)                 | 开始建图                |
| /stop_mapping     | service | [Trigger](#trigger)                 | 结束建图                |
| /navigate_to_pose | action  | [NavigateToPose](#navigatetopose)   | 导航到指定位置          |
| /plan             | topic   | [Path](#path)                       | 全局规划路径            |
| /set_initial_pose | service | [SetInitialPose](#setinitialpose)   | 设置初始位姿            |

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

### Trigger

[std_srvs/Trigger](https://docs.ros.org/en/humble/p/std_srvs/srv/Trigger.html)

### SetInitialPose

[nav2_msgs/srv/SetInitialPose](https://docs.ros.org/en/humble/p/nav2_msgs/srv/SetInitialPose.html)

## Action Definitions

### NavigateToPose

[nav2_msgs/action/NavigateToPose](https://docs.ros.org/en/humble/p/nav2_msgs/action/NavigateToPose.html)
