# 站点环境相关

## 站点

### 站定绑定

- **协议类型**: MQTT
- **接口地址**: `device/:serial_number/site/bind`
- **接口方向**: 平台 -> 设备
- **请求参数**

  ```json
  {
    "msg_id": "uuid-789",
    "timestamp": 1757403776, // Unix 时间戳
    "data": {
      "site_id": "uuid-site-id"
    }
  }
  ```
