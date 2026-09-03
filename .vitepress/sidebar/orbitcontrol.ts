import type { DefaultTheme } from "vitepress";

export const orbitcontrolSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "产品介绍",
    collapsed: false,
    items: [
      { text: "概述", link: "/orbitcontrol/" },
      { text: "产品介绍", link: "/orbitcontrol/introduction/whatis.md" },
    ],
  },
  {
    text: "使用手册",
    collapsed: false,
    items: [
      { text: "概述", link: "/orbitcontrol/user-guide/" },
      {
        text: "开始使用",
        collapsed: false,
        items: [
          { text: "快速开始", link: "/orbitcontrol/user-guide/quick-start" },
          { text: "平台总览", link: "/orbitcontrol/user-guide/platform" },
          { text: "地图操作", link: "/orbitcontrol/user-guide/map" },
          { text: "角色与权限", link: "/orbitcontrol/user-guide/roles" },
        ],
      },
      {
        text: "实况",
        collapsed: false,
        items: [
          { text: "设备控制", link: "/orbitcontrol/user-guide/live-control" },
          { text: "视频墙", link: "/orbitcontrol/user-guide/video-wall" },
        ],
      },
      {
        text: "任务规划",
        collapsed: false,
        items: [
          { text: "任务", link: "/orbitcontrol/user-guide/missions" },
          { text: "计划", link: "/orbitcontrol/user-guide/schedules" },
          { text: "自动化流程", link: "/orbitcontrol/user-guide/flows" },
          { text: "标注", link: "/orbitcontrol/user-guide/annotations" },
          { text: "路网", link: "/orbitcontrol/user-guide/route-graph" },
        ],
      },
      {
        text: "数据中心",
        collapsed: false,
        items: [
          { text: "语音库", link: "/orbitcontrol/user-guide/voices" },
          { text: "运行日志", link: "/orbitcontrol/user-guide/executions" },
          { text: "画廊", link: "/orbitcontrol/user-guide/gallery" },
          { text: "回放", link: "/orbitcontrol/user-guide/replay" },
        ],
      },
      {
        text: "管理",
        collapsed: false,
        items: [
          { text: "站点管理", link: "/orbitcontrol/user-guide/sites" },
          { text: "设备管理", link: "/orbitcontrol/user-guide/devices" },
          { text: "地图管理", link: "/orbitcontrol/user-guide/maps" },
          { text: "用户管理", link: "/orbitcontrol/user-guide/users" },
          { text: "应用管理", link: "/orbitcontrol/user-guide/integrations" },
          { text: "企业管理", link: "/orbitcontrol/user-guide/tenant" },
        ],
      },
    ],
  },
  {
    text: "开放平台",
    collapsed: false,
    items: [{ text: "API 文档", link: "/orbitcontrol/open-platform/" }],
  },
  {
    text: "设备端API",
    collapsed: false,
    items: [
      {
        text: "MQTT 协议规范",
        link: "/orbitcontrol/tech-spec/api/mqtt_convention",
      },
      { text: "通用 API", link: "/orbitcontrol/tech-spec/api/common" },
      { text: "设备控制与状态", link: "/orbitcontrol/tech-spec/api/device" },
      { text: "云台相关", link: "/orbitcontrol/tech-spec/api/gimbal" },
      { text: "视频流相关", link: "/orbitcontrol/tech-spec/api/stream" },
      { text: "语音对讲相关", link: "/orbitcontrol/tech-spec/api/intercom" },
      { text: "机械臂相关", link: "/orbitcontrol/tech-spec/api/manipulator" },
      { text: "地图相关", link: "/orbitcontrol/tech-spec/api/map" },
      { text: "路网相关", link: "/orbitcontrol/tech-spec/api/route" },
      { text: "任务执行相关", link: "/orbitcontrol/tech-spec/api/mission" },
      { text: "语音播报相关", link: "/orbitcontrol/tech-spec/api/voice" },
      { text: "事件上报", link: "/orbitcontrol/tech-spec/api/events" },
    ],
  },
  {
    text: "设备端API(ROS2)",
    collapsed: false,
    items: [
      { text: "导航相关", link: "/orbitcontrol/tech-spec/ros_msgs/navigation" },
    ],
  },
  {
    text: "外围设备",
    collapsed: false,
    items: [{ text: "机巢", link: "/orbitcontrol/tech-spec/peripherals/dock" }],
  },
];
