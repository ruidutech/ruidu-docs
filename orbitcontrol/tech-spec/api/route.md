# 路网相关

> 路网（Route Graph）指导导航系统按虚拟路径移动：节点（waypoint/充电点/电梯点/
> 停靠点）+ 有向边（行进方向/限速/几何形状）+ 区域（禁行区/缓行区）。

## 分发模型

路网是**地图版本的配套 JSON 文件**（`file_type=route_graph`），与 map_version
严格 1:1：

- **文件即真相**：云端不存路网关系表，JSON 文件是唯一 canonical state
- **版本绑定**：路网坐标基于所属地图版本的 origin/resolution；地图重新建图
  （新版本）后 origin 语义变化，旧版本路网不继承，需重新编辑
- **任何文件变更都 bump 地图版本**：编辑路网（含地图文件编辑）使地图版本号 +1，
  未变化的文件（如 pcd）新版本直接引用，不重复上传
- **分发复用地图链路**：站点 `map/sync` 版本清单广播 → 设备比对版本 →
  `map/download/req` 按 md5 差异下载（见 [map.md](./map.md)），无独立下发通道
- 删除路网 = bump 一个不含 route_graph 文件的新版本，设备同步到该版本后
  应停用本地路网

设备侧处理要求：

- 下载后校验文件 md5；解析 JSON 并自检 `map_id`/`map_version`/`map_origin`/
  `map_resolution` 与当前加载地图一致，不一致不得激活
- 坐标均为 local map 坐标（米/弧度）

## 云端编辑 API

| 方法 | 路径 | 说明 |
| ---- | ---- | ---- |
| GET | `/api/v1/maps/{id}/route_graph` | 查询当前版本路网（无则 404） |
| PUT | `/api/v1/maps/{id}/route_graph` | 全量保存（bump 地图版本） |
| DELETE | `/api/v1/maps/{id}/route_graph` | 删除（bump 地图版本） |

PUT 请求体为全量路网数据（不含文件头字段）：

```json
{
  "nodes": [ { "seq": 1, "node_type": "waypoint", "x": 1.0, "y": 2.0, "yaw": null, "metadata": null } ],
  "edges": [],
  "zones": []
}
```

## 文件格式（route_graph.json）

```json
{
  "schema_version": 1,
  "map_id": "uuid-map-id",
  "map_version": 3,
  "map_origin": [-10.5, 3.25, 1.5708],
  "map_resolution": 0.05,
  "nodes": [],
  "edges": [],
  "zones": []
}
```

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `schema_version` | uint32 | 文件格式版本，当前为 1；格式演进时递增 |
| `map_id` | string | 所属地图（设备校验与当前加载地图一致） |
| `map_version` | int32 | 绑定的地图版本号 |
| `map_origin` | float64[3] | 绑定版本的 origin 快照 [x, y, yaw]（一致性自检） |
| `map_resolution` | float32 | 绑定版本的分辨率快照 |
| `nodes` | RouteNode[] | 节点集合（见下） |
| `edges` | RouteEdge[] | 边集合 |
| `zones` | RouteZone[] | 区域集合 |

### RouteNode

```json
{ "seq": 1, "node_type": "waypoint", "x": 1.0, "y": 2.0, "yaw": 1.57, "metadata": null }
```

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `seq` | int32 | 图内序号（唯一，边通过 seq 引用节点） |
| `node_type` | string | `waypoint` / `charger` / `elevator` / `dock` |
| `x` / `y` | float64 | local map 坐标（米） |
| `yaw` | float64 \| null | 朝向（弧度）；null 表示无朝向要求（纯路经点） |
| `metadata` | object \| null | 扩展属性 |

- `charger`：充电点（yaw 为入位朝向）
- `elevator`：电梯点（仅标记位置，楼层映射等经 metadata 扩展）
- `dock`：停靠点（yaw 为停靠朝向）

### RouteEdge

```json
{
  "seq": 1, "start_node_seq": 1, "end_node_seq": 2,
  "direction": "bidirectional", "geometry_type": "line",
  "control_points": null, "speed_limit": null,
  "cost": null, "blocked": false, "metadata": null
}
```

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `seq` | int32 | 图内序号（唯一） |
| `start_node_seq` / `end_node_seq` | int32 | 起点/终点节点 seq（端点不得相同） |
| `direction` | string | `forward` / `backward` / `bidirectional`（以 start → end 为正向） |
| `geometry_type` | string | `line` / `bezier` |
| `control_points` | float64[] \| null | bezier 控制点（扁平 [c1x,c1y,c2x,c2y]；line 时为 null） |
| `speed_limit` | object \| null | 限速；null 表示不限速。结构：`{ "value": 0.8, "percentage": false }`，`percentage=true` 表示相对设备最大速度的百分比，`false` 为绝对值 m/s |
| `cost` | float32 \| null | 额外通行代价；null 表示无 |
| `blocked` | bool | 封禁（规划时跳过） |
| `metadata` | object \| null | 扩展属性 |

- 任意复杂曲线走向通过增加中间 waypoint 节点 + 多段边表达

### RouteZone

```json
{
  "zone_type": "keepout", "shape": "polygon",
  "points": [1.0, 1.0, 2.0, 1.0, 2.0, 2.0],
  "radius": null, "speed_limit": null, "metadata": null
}
```

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `zone_type` | string | `keepout` / `slow_down` |
| `shape` | string | `polygon` / `circle` |
| `points` | float64[] | polygon 顶点（扁平 [x1,y1,x2,y2,...]）；circle 圆心 [x,y] |
| `radius` | float64 \| null | circle 半径（米）；polygon 时为 null |
| `speed_limit` | object \| null | 仅 slow_down，结构同 RouteEdge |
| `metadata` | object \| null | 扩展属性 |

- `keepout`：禁行区，规划与行驶均不得进入；设备端栅格化进 costmap
- `slow_down`：缓行区，区内按 speed_limit 限速

## 设计参考

后续扩展（新节点类型、新区域类型、新边属性）时建议先对照参考系统的
既有做法，保持延续性：

| 参考系统 | 借鉴内容 |
| -------- | -------- |
| [nav2_msgs Route](https://github.com/ros-navigation/navigation2/tree/main/nav2_msgs)（ROS2 导航） | Route/RouteNode/RouteEdge 核心拓扑（seq/位置/端点）；SpeedLimit 的 `percentage + value` 语义 |
| [Open-RMF building map](https://github.com/open-rmf/rmf_traffic)（多机器人调度） | 节点类型化（charger/dock/holding point）、边方向、lane speed_limit、电梯（lift）概念 |
| [MAVLink fence](https://mavlink.io/en/services/fence.html)（无人机地理围栏） | 区域几何模型：polygon / circle 两种形状 |
| [nav2 costmap filters](https://docs.nav2.org/configuration/packages/costmap-plugins/filters.html) | 区域语义：KeepoutFilter（禁行区）、SpeedFilter（缓行区） |

## 历史变更

- **2026-08**：路网由 ROS2 `set_route_graph` service 下发（CDR 消息，
  fire-and-forget）改为地图版本配套 JSON 文件分发，ROS2 接口废弃；
  云端 API 由按图 ID 的多路网 CRUD 调整为按地图维度的单件端点
