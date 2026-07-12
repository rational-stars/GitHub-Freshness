import { defineConfig } from 'vitepress'

const zhThemeConfig = {
  nav: [
    { text: 'Home', link: 'https://home.rational-stars.top/' },
    { text: 'blog', link: 'https://rational-stars.top/' },
    { text: 'TG交流群', link: 'https://t.me/GitHubFreshness' },
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
}

const enThemeConfig = {
  nav: [
    { text: 'Home', link: 'https://home.rational-stars.top/' },
    { text: 'Blog', link: 'https://rational-stars.top/' },
    { text: 'Telegram', link: 'https://t.me/GitHubFreshness' },
  ],

  sidebar: [
    {
      text: 'Introduction',
      items: [
        { text: 'What is GitHub Freshness', link: '/en/what-is-GitHubFreshness.md' },
        { text: 'Preview', link: '/en/preview.md' },
        { text: 'Getting started', link: '/en/getting-started.md' },
      ]
    },
    {
      text: 'Settings',
      items: [
        { text: 'Feature settings', link: '/en/diy-settings/index.md' },
        { text: 'AWESOME token', link: '/en/diy-settings/awesome-xxx.md' },
      ]
    },
    {
      text: 'Release notes',
      items: [
        { text: 'Changelog', link: '/en/version-log.md' },
      ]
    }
  ],

  socialLinks: [
    { icon: 'github', link: 'https://github.com/rational-stars/GitHub-Freshness' }
  ]
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GitHub Freshness",
  description: "帮你快速判断一个 GitHub 仓库是否在更新。",
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'GitHub Freshness',
      description: '帮你快速判断一个 GitHub 仓库是否在更新。',
      themeConfig: zhThemeConfig
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'GitHub Freshness',
      description: 'Quickly identify active GitHub repositories by freshness.',
      themeConfig: enThemeConfig
    }
  },
})
