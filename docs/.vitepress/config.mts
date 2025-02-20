import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GitHub Freshness",
  description: "帮你快速判断一个 GitHub 仓库是否在更新。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: 'https://home.rational-stars.top/' },
      { text: 'blog', link: 'https://rational-stars.top/' }
    ],

    sidebar: [
      {
        text: '简介',
        items: [
          { text: 'GitHub Freshness 是什么', link: '/what-is-GitHubFreshness.md' },
          { text: '预览', link: '/preview.md' },
          { text: '快速开始', link: '/getting-started.md' },
        ]
      },
      {
        text: '自定义设置',
        items: [
          { text: '功能设置', link: '/diy-settings/index.md' },
          { text: 'AWESOME token', link: '/diy-settings/awesome-xxx.md' },
        ]
      },
      {
        text: '版本更新',
        items: [
          { text: '日志', link: '/version-log.md' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/rational-stars/GitHub-Freshness' }
    ]
  },
})
