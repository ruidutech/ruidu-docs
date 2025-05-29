import type { DefaultTheme } from 'vitepress'

export const deeprobot01Sidebar: DefaultTheme.SidebarItem[] = [
  {
    text: '产品介绍',
    collapsed: false,
    items: [
      { text: '产品简介', link: '/deeprobot01/specifications/introduction' },
      { text: '车体部件', link: '/deeprobot01/specifications/components' },
      { text: '操作说明', link: '/deeprobot01/specifications/operation' },
      { text: '通讯协议', link: '/deeprobot01/specifications/protocol' },
      { text: '注意事项', link: '/deeprobot01/specifications/precautions' },
      { text: '常见问题', link: '/deeprobot01/specifications/faq' }
    ]
  },
  {
    text: '软件使用说明',
    collapsed: true,
    items: [
      { text: '注意事项', link: '/deeprobot01/software-guide/notices' },
      { text: '操作流程', link: '/deeprobot01/software-guide/process' },
      { text: '连接机器人', link: '/deeprobot01/software-guide/connection' },
      { text: '地图相关操作', link: '/deeprobot01/software-guide/map' },
      { text: '导航相关操作', link: '/deeprobot01/software-guide/navigation' },
      { text: '系统相关', link: '/deeprobot01/software-guide/system' },
      { text: '状态显示与控制', link: '/deeprobot01/software-guide/status' },
      { text: '常见故障分析', link: '/deeprobot01/software-guide/troubleshooting' }
    ]
  },
  {
    text: '开发指南',
    collapsed: true,
    items: [
      { text: '版本更新记录', link: '/deeprobot01/development-guide/version' },
      { text: '错误代码汇总', link: '/deeprobot01/development-guide/error-codes' },
      { text: '坐标计算相关', link: '/deeprobot01/development-guide/coordinate' },
      {
        text: '接口说明',
        items: [
          { text: '机器人状态相关', link: '/deeprobot01/api-documentation/robot-state' },
          { text: '用户管理相关', link: '/deeprobot01/api-documentation/user-management' },
          { text: '建图相关', link: '/deeprobot01/api-documentation/mapping' },
          { text: '地图管理', link: '/deeprobot01/api-documentation/map-management' },
          { text: '虚拟墙相关', link: '/deeprobot01/api-documentation/virtual-wall' },
          { text: '导航相关', link: '/deeprobot01/api-documentation/navigation' },
          { text: '点位相关', link: '/deeprobot01/api-documentation/point-management' },
          { text: '路径相关', link: '/deeprobot01/api-documentation/path-management' },
          { text: '任务相关', link: '/deeprobot01/api-documentation/task-management' },
          { text: '图片管理相关', link: '/deeprobot01/api-documentation/image-management' },
          { text: '音频管理', link: '/deeprobot01/api-documentation/audio-management' },
          { text: '轨道相关', link: '/deeprobot01/api-documentation/track-management' },
          { text: '控制命令', link: '/deeprobot01/api-documentation/control-commands' },
          { text: '数据包录制', link: '/deeprobot01/api-documentation/data-recording' },
          { text: '机器人数据获取', link: '/deeprobot01/api-documentation/robot-data-acquisition' },
          { text: '停车位管理', link: '/deeprobot01/api-documentation/parking' },
          { text: '参数配置', link: '/deeprobot01/api-documentation/parameter-configuration' },
          { text: '消息推送', link: '/deeprobot01/api-documentation/message-push' },
          { text: '系统设置', link: '/deeprobot01/api-documentation/system-settings' },
          { text: '激光消息', link: '/deeprobot01/api-documentation/laser-messages' },
          { text: '目标跟随', link: '/deeprobot01/api-documentation/target-following' },
          { text: '模式设置', link: '/deeprobot01/api-documentation/mode-settings' }
        ]
      }
    ]
  }
] 