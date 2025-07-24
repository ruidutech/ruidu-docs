import type { DefaultTheme } from 'vitepress'

export const orbitcontrolSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '使用手册',
    collapsed: false,
    items: [
      { text: '实况', link: '/orbitcontrol/user-guide/live-control' },
    ]
  },
  {
    text: '接口文档',
    collapsed: false,
    items: [
      { text: '设备相关', link: '/orbitcontrol/tech-spec/api/device' },
      { text: '导航相关', link: '/orbitcontrol/tech-spec/api/navigation' },
      { text: '枚举字典', link: '/orbitcontrol/tech-spec/api/dict' },
      { text: '错误响应', link: '/orbitcontrol/tech-spec/api/errors' },
    ]
  }
] 