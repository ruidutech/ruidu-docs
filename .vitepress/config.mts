import { defineConfig } from 'vitepress'
import { sidebar } from './sidebar'

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
      { text: 'DeepRobot01', link: '/deeprobot01/' },
      { text: 'DeepRobot03', link: '/deeprobot03/' }
    ],

    search: {
      provider: 'local'
    },

    // 使用模块化的sidebar配置
    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ruidutech/ruidu-docs' }
    ],

    footer: {
      message: '技术支持由睿度智能科技提供',
      copyright: 'Copyright © 2025 Ruidu Intelligence Technology'
    }
  }
})
