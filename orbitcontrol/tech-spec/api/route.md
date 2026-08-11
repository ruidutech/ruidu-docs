# 路网相关

> 路网（Route Graph）指导导航系统按虚拟路径移动：节点（路经点/充电点/电梯点/
> 停靠点）+ 有向边（限速/代价/动作）+ 区域（禁行区/缓行区）。

## 分发模型

路网是**地图版本的配套 GeoJSON 文件**（`file_type=route_graph`），与 map_version
严格 1:1，**文件即真相**（云端不存路网关系表）。版本绑定、bump 规则、
`map/sync` 广播、`map/download/req` md5 差异下载等分发机制见
[map.md](./map.md)。

设备侧处理要求：

- 下载后校验文件 md5；解析 GeoJSON 并自检 `map_id`/`map_version`/`map_origin`/
  `map_resolution` 与当前加载地图一致，不一致不得激活
- 坐标均为 local map 坐标（米/弧度），文件不声明 crs

## 文件格式（route_graph，GeoJSON）

格式兼容 ROS2 Nav2 官方路网组件 nav2_route 的图文件加载插件
`nav2_route::GeoJsonGraphFileLoader`：满足本规范的文件可被 nav2_route 直接加载；
设备当前 ROS1 栈按本规范自解析，未来切换 nav2_route 零迁移。

### 顶层结构

```json
{
  "type": "FeatureCollection",
  "name": "route_graph",
  "schema_version": 1,
  "map_id": "uuid-map-id",
  "map_version": 3,
  "map_origin": [-10.5, 3.25, 1.5708],
  "map_resolution": 0.05,
  "features": []
}
```

| 字段 | 类型 | 说明 |
| ---- | ---- | ---- |
| `schema_version` | uint32 | 文件格式版本，当前为 1；格式演进时递增 |
| `map_id` | string | 所属地图（设备校验与当前加载地图一致） |
| `map_version` | int32 | 绑定的地图版本号 |
| `map_origin` | float64[3] | 绑定版本的 origin 快照 [x, y, yaw]（一致性自检） |
| `map_resolution` | float32 | 绑定版本的分辨率快照 |
| `features` | Feature[] | 节点/边/区域集合，按 `geometry.type` 分类（见下） |

### feature 分类规则

| `geometry.type` | 含义 |
| --------------- | ---- |
| `Point` | 节点 |
| `LineString` / `MultiLineString` | 边（严格有向，双向 = 两条边） |
| `Polygon` / `MultiPolygon` | 区域（nav2_route 加载时忽略） |

### 节点（Point）

```json
{
  "type": "Feature",
  "properties": {
    "id": 2,
    "frame": "map",
    "metadata": { "class": "charger", "yaw": 1.5708 },
    "operations": {
      "charge": { "type": "charge", "trigger": "NODE", "metadata": { "service_name": "/dock_charge" } }
    }
  },
  "geometry": { "type": "Point", "coordinates": [5.0, 2.0] }
}
```

| 字段 | 位置 | 说明 |
| ---- | ---- | ---- |
| `id` | properties | uint32，全文件唯一（含边/区域），必填 |
| `frame` | properties | 坐标系，可选，缺省为地图 frame |
| `coordinates` | geometry | `[x, y]` 或 `[x, y, z]`（z 为高度，无人机场景；地面机器人省略）。轴序恒为 x=东向、y=北向：本地栅格图为米制（ROS ENU）；wgs84 地图为 `[经度, 纬度]`（GeoJSON RFC 7946 顺序） |
| `metadata.class` | properties | 语义分类：`waypoint` / `charger` / `elevator` / `dock`，开放扩展 |
| `metadata.yaw` | properties | 朝向（弧度），可选；纯路经点省略。语义 yaw：0=东向，逆时针为正（即 atan2(dy, dx)），两个坐标帧通用 |
| `operations` | properties | 动作集，可选（见"operations 约定"） |

- `charger`：充电点（yaw 为入位朝向）
- `elevator`：电梯点（仅标记位置，楼层映射等经 metadata 扩展）
- `dock`：停靠点（yaw 为停靠朝向）

### 边（LineString）

```json
{
  "type": "Feature",
  "properties": {
    "id": 10,
    "startid": 1,
    "endid": 2,
    "cost": 6.0,
    "overridable": false,
    "metadata": { "speed_limit": 50 },
    "operations": {
      "open_door": { "type": "open_door", "trigger": "ON_ENTER", "metadata": { "door_id": 54, "service_name": "/open_door" } }
    }
  },
  "geometry": { "type": "LineString", "coordinates": [[1.0, 2.0], [5.0, 2.0]] }
}
```

| 字段 | 位置 | 说明 |
| ---- | ---- | ---- |
| `id` | properties | uint32，全文件唯一，必填 |
| `startid` / `endid` | properties | 起点/终点节点 id（端点不得相同），必填 |
| `cost` | float32 | 固定通行代价，可选 |
| `overridable` | bool | 是否允许规划器覆盖 cost，可选 |
| `metadata.speed_limit` | properties | 限速百分比 0–100（缺省 100 = 不限速） |
| `metadata.abs_speed_limit` | properties | 绝对限速 m/s；与 speed_limit 二选一 |
| `metadata.geometry_type` | properties | `line` / `bezier`，可选（缺省 line） |
| `metadata.control_points` | properties | bezier 控制点（扁平 [c1x,c1y,c2x,c2y]） |
| `metadata.blocked` | properties | 封禁标记（规划时跳过），可选 |
| `coordinates` | geometry | `[start, end]` 端点（或 bezier 采样折线），仅供可视化 |

- 边**严格有向**（startid → endid）；双向通行写两条反向边
- 任意复杂曲线走向优先通过增加中间 waypoint 节点 + 多段边表达

### 区域（Polygon）

```json
{
  "type": "Feature",
  "properties": { "id": 20, "zone_type": "keepout", "metadata": {} },
  "geometry": { "type": "Polygon", "coordinates": [[[8.0, 8.0], [9.0, 8.0], [9.0, 9.0], [8.0, 9.0], [8.0, 8.0]]] }
}
```

| 字段 | 位置 | 说明 |
| ---- | ---- | ---- |
| `id` | properties | uint32，全文件唯一 |
| `zone_type` | properties | `keepout` / `slow_down` |
| `speed_limit` | properties | 仅 slow_down：`{ "percentage": true, "value": 50 }`（percentage=true 为相对最大速度百分比，false 为绝对值 m/s） |
| `metadata` | properties | 扩展属性 |
| `coordinates` | geometry | Polygon 环（首尾闭合，顶点数 ≥ 4） |

- `keepout`：禁行区，规划与行驶均不得进入；设备端栅格化进 costmap
- `slow_down`：缓行区，区内按 speed_limit 限速
- 圆形区域不落文件：编辑端多边形化（32 顶点）写入，原始参数存
  `metadata: { "shape": "circle", "center": [x, y], "radius": r }` 供回读还原

### operations 约定

```json
"<操作名>": {
  "type": "<动作类型>",
  "trigger": "NODE | ON_ENTER | ON_EXIT",
  "metadata": { "service_name": "/xxx", "...": "..." }
}
```

| 字段 | 说明 |
| ---- | ---- |
| `type` | 动作类型，开放扩展（`charge` / `open_door` / `stop` / `take_picture` / ...），设备端按 type 分发执行 |
| `trigger` | 触发时机：`NODE`（到达节点，仅节点）/ `ON_ENTER`（进入边）/ `ON_EXIT`（离开边） |
| `metadata.service_name` | 触发调用的服务名（推荐提供） |
| 其余 `metadata.*` | 动作参数，任意嵌套 |

### metadata 标准 key

| key | 位置 | 说明 |
| --- | ---- | ---- |
| `speed_limit` | 边 | 限速百分比 0–100 |
| `abs_speed_limit` | 边 | 绝对限速 m/s |
| `penalty` | 节点/边 | 代价惩罚 |
| `class` | 节点 | 语义分类 |
| `yaw` | 节点 | 朝向（弧度） |
| `service_name` | operation | 触发服务名 |
| `geometry_type` / `control_points` | 边 | 曲线参数 |
| `blocked` | 边 | 封禁标记 |
| `shape` / `center` / `radius` | 区域 | 圆形区域原始参数 |

新增 metadata key 需登记入本表，避免语义冲突。

## 完整示例

```json
{
  "type": "FeatureCollection",
  "name": "route_graph",
  "schema_version": 1,
  "map_id": "3f6b2c1e-8a4d-4e5f-9b0a-1c2d3e4f5a6b",
  "map_version": 37,
  "map_origin": [-10.5, 3.25, 1.5708],
  "map_resolution": 0.05,
  "features": [
    {
      "type": "Feature",
      "properties": { "id": 1, "metadata": { "class": "waypoint" } },
      "geometry": { "type": "Point", "coordinates": [1.0, 2.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 2,
        "metadata": { "class": "charger", "yaw": 1.5708 },
        "operations": {
          "charge": { "type": "charge", "trigger": "NODE", "metadata": { "service_name": "/dock_charge" } }
        }
      },
      "geometry": { "type": "Point", "coordinates": [5.0, 2.0] }
    },
    {
      "type": "Feature",
      "properties": { "id": 3, "metadata": { "class": "waypoint" } },
      "geometry": { "type": "Point", "coordinates": [5.0, 8.0] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 10,
        "startid": 1,
        "endid": 2,
        "metadata": {
          "speed_limit": 50,
          "geometry_type": "bezier",
          "control_points": [2.0, 1.0, 4.0, 1.0]
        },
        "operations": {
          "open_door": { "type": "open_door", "trigger": "ON_ENTER", "metadata": { "door_id": 54, "service_name": "/open_door" } }
        }
      },
      "geometry": { "type": "LineString", "coordinates": [[1.0, 2.0], [5.0, 2.0]] }
    },
    {
      "type": "Feature",
      "properties": { "id": 11, "startid": 2, "endid": 1 },
      "geometry": { "type": "LineString", "coordinates": [[5.0, 2.0], [1.0, 2.0]] }
    },
    {
      "type": "Feature",
      "properties": { "id": 12, "startid": 2, "endid": 3, "cost": 6.0, "overridable": false },
      "geometry": { "type": "LineString", "coordinates": [[5.0, 2.0], [5.0, 8.0]] }
    },
    {
      "type": "Feature",
      "properties": { "id": 20, "zone_type": "keepout" },
      "geometry": { "type": "Polygon", "coordinates": [[[8.0, 8.0], [9.0, 8.0], [9.0, 9.0], [8.0, 9.0], [8.0, 8.0]]] }
    },
    {
      "type": "Feature",
      "properties": {
        "id": 21,
        "zone_type": "slow_down",
        "speed_limit": { "percentage": true, "value": 30 },
        "metadata": { "shape": "circle", "center": [3.0, 5.0], "radius": 1.5 }
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[4.5, 5.0], [4.39, 5.29], [4.06, 5.56], [3.6, 5.77], [3.0, 5.93], "...", [4.39, 4.71], [4.5, 5.0]]]
      }
    }
  ]
}
```

说明：

- 节点 1↔2 为双向通行（id 10 / 11 两条边），节点 2→3 为单向
- id 21 为圆形缓行区多边形化结果（顶点省略示意，实际 32 顶点闭合），
  原始圆参数在 metadata 中
- 上例可被 `nav2_route::GeoJsonGraphFileLoader` 直接加载（Polygon 区域与
  顶层扩展字段被忽略）

## 历史变更

- **2026-08**：路网由 ROS2 `set_route_graph` service 下发（CDR 消息，
  fire-and-forget）改为地图版本配套文件分发，ROS2 接口废弃；
  文件格式由自定义 JSON 重构为 GeoJSON（schema_version 保持 1，
  格式尚未与设备对接，无兼容包袱），兼容 nav2_route `GeoJsonGraphFileLoader`
