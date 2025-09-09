import type { DefaultTheme } from "vitepress";

export const orbitcontrolSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "平台简介",
    collapsed: false,
    items: [
      { text: "什么是OrbitControl", link: "/orbitcontrol/introduction/whatis" },
      { text: "OrbitControl的优势", link: "/orbitcontrol/introduction/advantage" },
    ],
  },
  {
    text: "使用手册",
    collapsed: false,
    items: [
      { text: "页面导航", link: "/orbitcontrol/user-guide/platform-navigation" },
      { text: "站点管理", link: "/orbitcontrol/user-guide/sites" },
      { text: "设备管理", link: "/orbitcontrol/user-guide/device" },
      { text: "地图管理", link: "/orbitcontrol/user-guide/mapping" },
      { text: "任务设置和调度", link: "/orbitcontrol/user-guide/planning" },
      { text: "实时控制", link: "/orbitcontrol/user-guide/live-control" },
      {
        text: "数据中心",
        collapsed: false,
        items: [
          { text: "运行日志", link: "/orbitcontrol/user-guide/mission-log" },
          { text: "画廊", link: "/orbitcontrol/user-guide/gallery" },
        ],
      },
    ],
  },
  {
    text: "设备端 API",
    collapsed: false,
    items: [
      { text: "通用 API", link: "/orbitcontrol/tech-spec/api/common" },
      { text: "状态与控制", link: "/orbitcontrol/tech-spec/api/device" },
      { text: "导航相关", link: "/orbitcontrol/tech-spec/api/navigation" },
      { text: "任务执行相关", link: "/orbitcontrol/tech-spec/api/mission" },
      { text: "枚举字典", link: "/orbitcontrol/tech-spec/api/dict" },
      { text: "错误响应", link: "/orbitcontrol/tech-spec/api/errors" },
    ],
  },
];
