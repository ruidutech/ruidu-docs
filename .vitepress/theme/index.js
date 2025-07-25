// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './custom.css'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // Layout slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance
    enhanceAppWithTabs(app)
  }
} 