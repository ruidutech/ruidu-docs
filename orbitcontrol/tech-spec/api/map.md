# 导航相关

## 地图

### 地图更新通知

- **协议类型**: MQTT
- **接口地址**: `site/:site_id/map/update`
- **接口方向**: 平台 -> 设备
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      "map_id": "uuid-map-id", // 和本地地图比对，无/或者版本号不一致，都需要更新
      "map_version": "1", // int 递增
      "download_url": "http://minio/maps/v2.0.tar.gz",
      // 默认 false
      // 在地图改动影响当前设备运行时为 true，表示强制停止运行，立即更新
      "force_update": false
    }
  }
  ```

### 使用地图

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/map/use`
- **接口方向**: 平台 -> 设备
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      // 地图 ID + VERSION 唯一，如果设备本地无地图，需要从平台侧下载
      "map_id": "uuid-map-id",
      "map_version": "1"
    }
  }
  ```

### 地图下载请求

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/map/download/req`
- **接口方向**: 设备 -> 平台
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      // 地图 ID + VERSION 唯一，如果设备本地无地图，需要从平台侧下载
      "map_id": "uuid-map-id",
      "map_version?": "1" // version 可为空，表示下载最新版本
    }
  }
  ```

### 地图下载响应

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/map/download/resp`
- **接口方向**: 平台 -> 设备
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      "map_id": "uuid-map-id", 
      "map_version": "1", // rep 中为空则提供最新版本
      "download_url": "http://minio/maps/v2.0.tar.gz",
      "md5": "a1b2c3d4...",
    }
  }
  ```
