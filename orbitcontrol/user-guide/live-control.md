# 设备实时控制

## 设备列表

点击 `菜单栏` 中的 `选择设备` 后，会从页面左侧以抽屉面板的形式弹出设备选择列表：

![](/images/orbitcontrol/user-guide/live-control-devices.png)

1. **搜索框**：根据设备名称进行模糊搜索。
2. **排序**：根据设备名称排序，可切换正序/倒序。
3. **过滤条件**：根据所属站点、设备类型进行过滤筛选。
4. **设备卡片**：显示设备概要信息
   - 设备图标的绿色/灰色表示在线状态
   - 剩余电量
   - 距离 `HOME` 的距离
   - 所属站点名称
   - 传感器状态
   - 最近活动时间，表示最后一次执行任务或者手动控制的时间
   - 点击 `更多` 图标，可显示更详细信息 // TODO 目前暂未开放

## 手动控制

在设备列表中选中`设备`后，会在屏幕显示各控制面板：

![](/images/orbitcontrol/user-guide/live-control-panels.png)

### 设备控制面板

处于页面底部中间位置的是 `设备控制面板`：

1. **到达指定目标点**：点击 ![](/images/orbitcontrol/user-guide/live-control-button-gtl.png){.inline} 图标，然后在地图上选择目标，可以导航到指定地点
2. **执行任务**：点击 ![](/images/orbitcontrol/user-guide/live-control-button-mission.png){.inline} 图标，在弹出的对话框中选择一个任务，由当前设备执行
3. **手动控制**：点击 ![](/images/orbitcontrol/user-guide/live-control-button-manual.png){.inline} 图标，将会获取设备控制权限，并通过键盘或者手柄进行远程遥控
4. **返航（RTH）**：点击 ![](/images/orbitcontrol/user-guide/live-control-button-rth.png){.inline} 图标，返回到 `Home` 点

### 通知和告警

位于顶部的这块区域，即为 `告警面板`，点击面板右侧图标，可显示更详细的 `告警` 信息。

![](/images/orbitcontrol/user-guide/live-control-panel-alert.png) 

关于 `告警` 的定义及与 `通知` 的主要区别，参考：[通知与告警](./notification.md)

### FPV ( First Person View )

页面右上角区域为 `FPV面板`，为简易期间，保留英文 FPV 的使用，为第一人称视角实时视频流。

![](/images/orbitcontrol/user-guide/live-control-panel-fpv.png) 

其中，面板顶部操作栏的图标，依次为：

- `载荷设备控制面板` 显示
- `地图` 与 `FPV面板` 切换
- `FPV面板` 隐藏

### 载荷设备控制

点击 `FPV面板` 中的 `显示载荷控制面板` 图标后显示：

![](/images/orbitcontrol/user-guide/live-control-panel-payload.png) 

目前可控制的设备主要是云台设备，功能依次为：

- 云台控制（俯仰角 Pitch、偏航角 Yaw、恢复预置位）
- 开始/结束抓拍、开始/结束录像
- 变焦（Zoom in、Zoom out）
- 手动对焦（Focus+、Focus-）

## 视频墙 ( Video Wall )

点击 `菜单栏` -> `视频墙` 进入：

![](/images/orbitcontrol/user-guide/live-control-video-wall.png) 

视频墙的功能比较简单，仅支持 `站点` 和常用布局（ ![](/icons/layout-grid.svg) ）的选择。

点击图像窗格中的 ![](/icons/circle-plus.svg)  按钮，可以选择指定 `站点` 下的 `设备` 上墙。

:::tip
区别于 [画廊](./gallery.md)，`视频墙` 旨在集中观看多个实时视频，以“矩阵”、“大屏”布局呈现。

多用于安防监控人员、指挥中心调度人员等，统一监管多个视角。
:::