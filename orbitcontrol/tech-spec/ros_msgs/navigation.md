# 导航相关

## Interface Definitions

| 名称              | 类型    | 数据定义                        | 描述                    |
| ----------------- | ------- | ------------------------------- | ----------------------- |
| /map/compressed   | topic   | [CompressedImage](#compressedimage)     | 地图数据压缩形式（PNG） |
| /start_mapping    | service | [Trigger](#trigger)                | 开始建图                |
| /stop_mapping     | service | [Trigger](#trigger)                | 结束建图                |
| /navigate_to_pose | action  | [NavigateToPose](#navigatetopose) | 导航到指定位置          |

## Message Definitions

### CompressedImage

[sensor_msgs/CompressedImage](https://docs.ros.org/en/noetic/api/sensor_msgs/html/msg/CompressedImage.html)

## Service Definitions

### Trigger

[std_srvs/Trigger](https://docs.ros.org/en/noetic/api/std_srvs/html/srv/Trigger.html)

## Action Definitions

### NavigateToPose

[nav2_msgs/action/NavigateToPose](https://docs.ros.org/en/iron/p/nav2_msgs/interfaces/action/NavigateToPose.html)
