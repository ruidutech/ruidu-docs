import type { DefaultTheme } from 'vitepress'

export const deeprobot03Sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '产品介绍',
    collapsed: false,
    items: [
      { text: '产品简介', link: '/deeprobot03/specifications/introduction' },
      { text: '车体部件', link: '/deeprobot03/specifications/components' },
      { text: '操作说明', link: '/deeprobot03/specifications/operation' },
      { text: '通讯协议', link: '/deeprobot03/specifications/protocol' },
      { text: 'ROS通讯包使用说明', link: '/deeprobot03/specifications/ros' },
      { text: '注意事项', link: '/deeprobot03/specifications/notice' },
      { text: '常见问题', link: '/deeprobot03/specifications/faq' }
    ]
  },
  {
    text: '软件使用说明',
    collapsed: true,
    items: [
      { text: '使用须知', link: '/deeprobot03/software-guide/notices' },
      { text: '界面概述', link: '/deeprobot03/software-guide/overview' },
      { text: '连接设置', link: '/deeprobot03/software-guide/connection' },
      { text: '轨迹录制', link: '/deeprobot03/software-guide/recording' },
      { text: '导航功能', link: '/deeprobot03/software-guide/navigation' },
      { text: '开源导航协议', link: '/deeprobot03/software-guide/protocol' },
      { text: 'Mavlink 协议对照', link: '/deeprobot03/software-guide/mavlink-comparison' }
    ]
  }
] 