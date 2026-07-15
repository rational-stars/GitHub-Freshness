---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "GitHub Freshness"
  text: "通过颜色高亮的方式"
  tagline: 帮助你快速判断一个 GitHub 仓库更新了那些文件。
  image:
    src: /img/branch-clock.png
    alt: GitHub Freshness
  actions:
    - theme: brand
      text: GitHub Freshness 是什么
      link: /what-is-GitHubFreshness
    - theme: alt
      text: 快速开始
      link: /getting-started
    - theme: brand
      text: 预览
      link: /preview

features:
  - title: 兼容多种浏览器
    icon: 🌐
    details: 提供单独发布的 Chrome 扩展版和开源 Tampermonkey 脚本版，支持 Chrome、Firefox、Edge 等常见浏览器。
  - title: 设置导入与导出
    icon: 💾
    details: 使用 JSON 文件备份和恢复主题、颜色、新鲜期限、排序与语言设置，AWESOME token 始终只保留在本地。
  - title: 中英文界面兼容
    icon: 🌏
    details: 设置面板、菜单和弹窗支持中文与英文显示，并兼容 GitHub 中文和英文界面下的更新时间解析。
  - title: 简洁、清新的用户界面
    icon: 🎨
    details: 采用适合长时间使用的设计，减少视觉疲劳。同时，提供对暗色主题的适配，保证在不同光线条件下都能获得良好的阅读体验。
  - title: 仓库更新时间颜色标记
    icon: 🕒
    details: 根据仓库的最后更新时间使用不同的颜色进行标记，帮助用户快速识别项目的活跃度。支持自定义颜色设置，包括文件夹、背景、文件图标和字体的颜色。
  - title: Awesome-xxx 列表项目
    icon: ⭐
    details: 排除年久失修的项目，实时显示仓库的星标数和最新更新时间，确保用户获得最新的项目状态信息。
  - title: 文件排序
    icon: 🔄
    details: 对项目中文件的更新时间进行升序或降序，使用户能够更加直观地查看项目更新情况，便于管理和比较。
  - title: 时间格式化
    icon: 🗓️
    details: 对仓库更新时间进行统一格式化（yyyy-MM-dd），并在设置项右侧展示当前使用的日期格式。
---
