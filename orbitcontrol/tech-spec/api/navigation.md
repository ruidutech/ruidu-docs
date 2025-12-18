# 导航相关

## 建图

### 开始建图

- **协议类型**: ROS2 by Zenoh
- **接口地址**: `device/:serial_number/start_mapping`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {}
  }
  ```

### 地图上传

- **协议类型**: ROS2 by Zenoh
- **接口地址**: `device/:serial_number/map/compressed`
- **消息频率**: 1 Hz
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      // --- 核心元数据 (直接对应 YAML 字段) ---
      "resolution": 0.05, // 分辨率 (米/像素)
      "origin": [-10.5, -5.2, 0.0], // 原点 [x, y, yaw]，注意这是 YAML 的标准写法
      "occupied_thresh": 0.65, // 占用阈值
      "free_thresh": 0.196, // 空闲阈值
      "negate": 0, // 是否反转颜色 (通常为 0)
      "mode": "trinary", // 模式 (通常是 trinary 或 scale)

      // --- 辅助信息 (Web端渲染和校验用) ---
      "width": 2048, // 图片宽度
      "height": 2048, // 图片高度
      "map_name": "office_1f", // 地图名称 (用于生成文件名)

      // --- 数据本体 ---
      "image_format": "png", // 明确格式
      "base64": "iVBORw0KGgoAAA..." // 图片数据
    }
  }
  ```

### 结束建图

- **协议类型**: ROS2 by Zenoh
- **接口地址**: `device/:serial_number/stop_mapping`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789", // 与开始建图的 msg_id 保持一致
    "timestamp": 1757403776, // Unix 时间戳
    "data": {}
  }
  ```

## 导航

### 使用地图

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/use_map`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
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
- **接口地址**: `device/:serial_number/goal`
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      "frame_id": "earth",
      "x": 10.5, // 米 (东)
      "y": -5.0, // 米 (北)
      "z": 2.0, // 米 (高度/天)
      "r": 1.57 // 弧度 (偏航角 Yaw)
    }
  }
  ```

### 导航到目标点 ACK

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/goal/ack`
- **请求参数**

  完成

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "success": true
  }
  ```

  取消

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "success": false,
    "code": 3001
  }
  ```

  失败

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "success": false,
    "code": 3002
  }
  ```
