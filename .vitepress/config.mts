import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "睿度文档中心",
  description: "睿度智能产品技术文档",
  lang: 'zh-CN',
  base: '/ruidu-docs/',
  srcExclude: ['temp/**/*'],  // 忽略temp目录下的所有文件
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // 配置右侧导航以显示h2和h3级别标题
    outline: {
      level: [2, 3], // 显示h2和h3标题
      label: '本页目录'
    },
    
    nav: [
      { text: '首页', link: '/' },
      { text: 'DeepRobot01', link: '/dr01-spec/' },
      { text: 'DeepRobot01 APP', link: '/dr01-app/' },
      { text: 'DeepRobot01 API', link: '/dr01-dev/' },
      { text: 'DeepRobot03', link: '/dr03-spec/' },
      { text: 'DeepRobot03 APP', link: '/dr03-app/' }
    ],

    sidebar: {
      '/dr01-spec/': [
        {
          text: 'DeepRobot01 系列',
          items: [
            { text: '产品简介', link: '/dr01-spec/introduction' },
            { text: '车体部件', link: '/dr01-spec/components' },
            { text: '操作说明', link: '/dr01-spec/operation' },
            { text: '通讯协议', link: '/dr01-spec/protocol' },
            { text: '注意事项', link: '/dr01-spec/precautions' },
            { text: '常见问题', link: '/dr01-spec/faq' }
          ]
        }
      ],
      '/dr01-app/': [
        {
          text: 'DeepRobot01 配套软件',
          items: [
            { text: '注意事项', link: '/dr01-app/notices' },
            { text: '操作流程', link: '/dr01-app/process' },
            { text: '连接机器人', link: '/dr01-app/connection' },
            { text: '地图相关操作', link: '/dr01-app/map' },
            { text: '导航相关操作', link: '/dr01-app/navigation' },
            { text: '系统相关', link: '/dr01-app/system' },
            { text: '状态显示与控制', link: '/dr01-app/status' },
            { text: '常见故障分析', link: '/dr01-app/troubleshooting' }
          ]
        }
      ],
      '/dr01-dev/': [
        {
          text: 'DeepRobot01 开发文档',
          items: [
            { text: '开发文档介绍', link: '/dr01-dev/' },
            { text: '版本更新记录', link: '/dr01-dev/version' },
            { text: '错误代码汇总', link: '/dr01-dev/error-codes' },
            { text: '坐标计算相关', link: '/dr01-dev/coordinate' },
          ]
        },
        {
          text: 'API文档',
          items: [
            { text: '机器人状态相关', link: '/dr01-dev/api/robot-state' },
            { text: '用户管理相关', link: '/dr01-dev/api/user-management' },
            { text: '建图相关', link: '/dr01-dev/api/mapping' },
            { text: '地图管理', link: '/dr01-dev/api/map-management' },
            { text: '虚拟墙相关', link: '/dr01-dev/api/virtual-wall' },
            { text: '导航相关', link: '/dr01-dev/api/navigation' },
            { text: '点位相关', link: '/dr01-dev/api/point-management' },
            { text: '路径相关', link: '/dr01-dev/api/path-management' },
            { text: '任务相关', link: '/dr01-dev/api/task-management' },
            { text: '图片管理相关', link: '/dr01-dev/api/image-management' },
            { text: '音频管理', link: '/dr01-dev/api/audio-management' },
            { text: '轨道相关', link: '/dr01-dev/api/track-management' },
            { text: '控制命令', link: '/dr01-dev/api/control-commands' },
            { text: '数据包录制', link: '/dr01-dev/api/data-recording' },
            { text: '机器人数据获取', link: '/dr01-dev/api/robot-data-acquisition' },
            { text: '停车位管理', link: '/dr01-dev/api/parking' },
            { text: '参数配置', link: '/dr01-dev/api/parameter-configuration' },
            { text: '消息推送', link: '/dr01-dev/api/message-push' },
            { text: '系统设置', link: '/dr01-dev/api/system-settings' },
            { text: '激光消息', link: '/dr01-dev/api/laser-messages' },
            { text: '目标跟随', link: '/dr01-dev/api/target-following' },
            { text: '模式设置', link: '/dr01-dev/api/mode-settings' }
          ]
        }
      ],
      '/dr03-spec/': [
        {
          text: 'DeepRobot03 系列',
          items: [
            { text: '产品简介', link: '/dr03-spec/introduction' },
            { text: '车体部件', link: '/dr03-spec/components' },
            { text: '操作说明', link: '/dr03-spec/operation' },
            { text: '通讯协议', link: '/dr03-spec/protocol' },
            { text: 'ROS通讯包使用说明', link: '/dr03-spec/ros' },
            { text: '注意事项', link: '/dr03-spec/notice' },
            { text: '常见问题', link: '/dr03-spec/faq' }
          ]
        }
      ],
      '/dr03-app/': [
        {
          text: 'DeepRobot03 配套软件',
          items: [
            { text: '使用须知', link: '/dr03-app/notices' },
            { text: '界面概述', link: '/dr03-app/overview' },
            { text: '连接设置', link: '/dr03-app/connection' },
            { text: '轨迹录制', link: '/dr03-app/recording' },
            { text: '导航功能', link: '/dr03-app/navigation' },
            { text: '开源导航协议', link: '/dr03-app/protocol' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ruidutech/ruidu-docs' }
    ],

    footer: {
      message: '技术支持由睿度智能科技提供',
      copyright: 'Copyright © 2025 Ruidu Intelligence Technology'
    }
  }
})
