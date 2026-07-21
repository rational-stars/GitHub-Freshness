# GitHub Freshness 是什么？

![GitHub Freshness](./img/github-freshness-marquee.png)

GitHub Freshness 是用于 GitHub 网页的活跃度辅助工具，提供 Chrome 扩展版和 Tampermonkey 油猴脚本版。它读取当前页面中可见的更新时间，并通过颜色、日期格式和排序帮助你快速判断仓库及文件是否仍在维护。

## 为什么需要它？

高 Star 并不代表项目仍在维护。GitHub 默认展示的信息分散在仓库文件列表、提交记录和搜索结果中，GitHub Freshness 将更新时间直接转化为易于扫描的新鲜或过期颜色，让你在进入代码之前先判断项目活跃度。

## 可以处理哪些页面？

### 仓库文件列表

根据每个文件或目录的更新时间设置背景、文字和文件图标颜色，也可以格式化日期并按更新时间排序。

![仓库文件列表](./img/screenshots/repository-overview-light.png)

### 仓库目录树

进入子目录后继续处理左侧目录树和当前文件列表，兼容 GitHub 当前的目录浏览界面。

### GitHub 搜索结果

整张仓库结果卡片会根据新鲜期限着色，帮助你在大量搜索结果中优先发现近期仍在维护的项目。

### Awesome-xxx 项目

可选的 AWESOME 功能会读取列表中仓库的公开元数据，展示 Star 数量和最近更新时间。

## 个性化设置

- 分别配置浅色和深色主题。
- 使用日、周、月或年设置新鲜期限。
- 自定义新鲜及过期状态的背景、文字和文件图标颜色。
- 格式化日期并排序文件。
- 切换中文、英文或自动语言。
- 通过 JSON 备份和恢复设置，不导出 AWESOME token。

完整效果请查看[效果预览](./preview.md)，配置说明请查看[功能设置](./diy-settings/index.md)。

## 版本与源码范围

Chrome 扩展已经在 Chrome Web Store 正式上架，可从 [Chrome Web Store 安装 GitHub Freshness](https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj)。公开仓库包含源码可用的油猴脚本和项目文档；Chrome 扩展独立发布，其源码不在本仓库公开。

项目遵循“不跟踪、不投放广告、不向作者服务器上传用户配置”的原则，详情请查看[隐私政策](./privacy/)。
