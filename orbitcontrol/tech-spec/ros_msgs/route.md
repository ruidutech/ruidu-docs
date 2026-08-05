# 路网相关

> 路网（Route Graph）指导导航系统按虚拟路径移动：节点（waypoint/充电点/电梯点/
> 停靠点）+ 有向边（行进方向/限速/几何形状）+ 区域（禁行区/缓行区）。
>
> 消息命名说明：本定义的 RouteNode/RouteEdge 与 nav2_msgs 同名消息是**不同包下
> 的独立定义**（命名空间天然区分），字段为项目定制（方向、几何、限速等）。

## 设计参考

本接口设计参考了以下系统，后续扩展（新节点类型、新区域类型、新边属性）时
建议先对照参考系统的既有做法，保持延续性：

| 参考系统 | 借鉴内容 |
| -------- | -------- |
| [nav2_msgs Route](https://github.com/ros-navigation/navigation2/tree/main/nav2_msgs)（ROS2 导航） | Route/RouteNode/RouteEdge 核心拓扑（seq/位置/端点）；SpeedLimit 的 `percentage + value` 语义（0 为不限速） |
| [Open-RMF building map](https://github.com/open-rmf/rmf_traffic)（多机器人调度） | 节点类型化（charger/dock/holding point）、边方向（bidirectional/orientation）、lane speed_limit、电梯（lift）概念 |
| [MAVLink fence](https://mavlink.io/en/services/fence.html)（无人机地理围栏） | 区域几何模型：polygon / circle 两种形状 |
| [nav2 costmap filters](https://docs.nav2.org/configuration/packages/costmap-plugins/filters.html) | 区域语义：KeepoutFilter（禁行区）、SpeedFilter（缓行区） |

## Interface Definitions

| 名称              | 类型    | 数据定义                      | 描述                             |
| ----------------- | ------- | ----------------------------- | -------------------------------- |
| /set_route_graph  | service | [SetRouteGraph](#setroutegraph) | 下发路网（全量覆盖设备当前图）  |

## Service Definitions

### SetRouteGraph

```
RouteGraph graph
---
bool success
string message
```

- 平台在「下发路网」操作（`POST /route_graphs/{id}/deploy`）时调用
- 设备应以接收到的图**全量覆盖**当前使用中的路网
- 坐标均为 local map 坐标（米/弧度），与当前加载地图一致
- 设备校验 `graph.map_id` 与当前加载地图一致，不一致返回
  `success = false` 并在 `message` 中说明（路网坐标系以所属地图为准）

## Message Definitions

### RouteGraph

```
string name
string map_id           # 路网所属地图（设备校验与当前加载地图一致）
RouteNode[] nodes
RouteEdge[] edges
RouteZone[] zones
```

### RouteNode

```
uint16 seq              # 图内序号（图内唯一）
string node_type        # waypoint | charger | elevator | dock
float64 x               # local map 坐标（米）
float64 y
float64 yaw             # 朝向（弧度）；0 表示无朝向要求（纯路经点）
string metadata_json    # 扩展属性（JSON 字符串，无扩展时为空串）
```

- `node_type`：
  - `waypoint`：普通路经点
  - `charger`：充电点（yaw 为入位朝向）
  - `elevator`：电梯点（本轮仅标记位置，楼层映射等经 metadata_json 扩展）
  - `dock`：停靠点（yaw 为停靠朝向）

### RouteEdge

```
uint16 seq                  # 图内序号
uint16 start_node_seq       # 起点节点 seq
uint16 end_node_seq         # 终点节点 seq
string direction            # forward | backward | bidirectional
string geometry_type        # line | bezier
float64[] control_points    # bezier 控制点（扁平 [c1x,c1y,c2x,c2y]；line 时为空）
float64 speed_limit         # 限速值；0 表示不限速
bool speed_limit_percentage # true=百分比（相对设备最大速度），false=绝对值 m/s
float64 cost                # 额外通行代价；0 表示无
bool blocked                # 封禁（规划时跳过）
string metadata_json        # 扩展属性（JSON 字符串）
```

- `direction`：以 start → end 为正向；`backward` 表示仅允许 end → start；
  `bidirectional` 双向通行
- 任意复杂曲线走向通过增加中间 waypoint 节点 + 多段边表达

### RouteZone

```
string zone_type            # keepout | slow_down
string shape                # polygon | circle
float64[] points            # polygon 顶点（扁平 [x1,y1,x2,y2,...]）；circle 圆心 [x,y]
float64 radius              # circle 半径（米）；polygon 时为 0
float64 speed_limit         # 仅 slow_down：限速值
bool speed_limit_percentage # 仅 slow_down
string metadata_json        # 扩展属性（JSON 字符串）
```

- `keepout`：禁行区，规划与行驶均不得进入；设备端栅格化进 costmap
- `slow_down`：缓行区，区内按 speed_limit 限速
