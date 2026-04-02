import type { DefaultTheme } from "vitepress";

export const cemosSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: "运维手册",
    collapsed: false,
    items: [
      { text: "服务管理", link: "/cemos/dev/ops/services.md" },
      { text: "常见问题", link: "/cemos/dev/ops/faq.md" },
    ],
  },
];
