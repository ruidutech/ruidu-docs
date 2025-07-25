# 导航相关

## 建图

### 开始建图

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/start_mapping`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

### 开始建图 ACK

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/start_mapping/ack`
- **请求参数**

  成功

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "success": true,
    "data": {}
  }
  ```

  失败

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "success": false,
    "code": 3001,
    "message": "已在建图中"
  }
  ```

### 结束建图

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/stop_mapping`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 与开始建图的 msg_id 保持一致
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {}
  }
  ```

### 结束建图 ACK

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/stop_mapping/ack`
- **请求参数**

  成功

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "filename": "uuid-3301.yaml"
    }
  }
  ```

## 导航

### 使用地图

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/use_map`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      // 地图文件唯一，如果设备本地无地图，需要从平台侧下载
      "filename": "uuid-3301.yaml"
    }
  }
  ```

### 静态地图信息

- **协议类型**: WebSocket/ROS2 Topic
- **接口地址**: `/map`
- **请求参数**: [nav_msgs/msg/OccupancyGrid](https://docs.ros.org/en/noetic/api/nav_msgs/html/msg/OccupancyGrid.html)

### 激光雷达扫描数据

- **协议类型**: WebSocket/ROS2 Topic
- **接口地址**: `/scan`
- **请求参数**: [sensor_msgs/msg/LaserScan](https://docs.ros.org/en/noetic/api/sensor_msgs/html/msg/LaserScan.html)

### 全局规划路径

- **协议类型**: WebSocket/ROS2 Topic
- **接口地址**: `/plan`
- **请求参数**: [nav_msgs/msg/Path](https://docs.ros.org/en/noetic/api/nav_msgs/html/msg/Path.html)

### 机器人位置

- **协议类型**: WebSocket/ROS2 Topic
- **接口地址**:
  - 建图时: `/pose`
  - 导航时: `/amcl_pose`
- **请求参数**: [geometry_msgs/msg/PoseWithCovarianceStamped](https://docs.ros.org/en/noetic/api/geometry_msgs/html/msg/PoseWithCovarianceStamped.html)

### 目标点位置

- **协议类型**: WebSocket/ROS2 Topic
- **接口地址**: `/goal_pose`
- **请求参数**: [geometry_msgs/msg/PoseStamped](https://docs.ros.org/en/noetic/api/geometry_msgs/html/msg/PoseStamped.html)

### 导航到目标点

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/goal`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "data": {
      "x": 1.23, // x轴坐标
      "y": 4.56, // y轴坐标
      "z": 0.7071 // 按z轴旋转，表示yaw
    }
  }
  ```

### 导航到目标点 ACK

- **协议类型**: MQTT
- **接口地址**: `device/:device_id/goal/ack`
- **请求参数**

  完成

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "success": true
  }
  ```

  取消

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "success": false,
    "code": 3001
  }
  ```

  失败

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": "2025-07-18T03:15:00Z",
    "success": false,
    "code": 3002
  }
  ```
