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
      { text: "实时控制", link: "/orbitcontrol/user-guide/live-control" },
      { text: "任务计划", link: "/orbitcontrol/user-guide/planning" },
    ],
  },
  {
    text: "设备端 API",
    collapsed: false,
    items: [
      { text: "状态与控制", link: "/orbitcontrol/tech-spec/api/device" },
      { text: "导航相关", link: "/orbitcontrol/tech-spec/api/navigation" },
      { text: "枚举字典", link: "/orbitcontrol/tech-spec/api/dict" },
      { text: "错误响应", link: "/orbitcontrol/tech-spec/api/errors" },
    ],
  },
];
