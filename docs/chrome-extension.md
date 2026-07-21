# Chrome 扩展版

GitHub Freshness Chrome 扩展不需要安装 Tampermonkey，功能与设置和油猴脚本保持一致。

## 官方安装

[从 Chrome Web Store 安装 GitHub Freshness](https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj)。

公开的 [GitHub Freshness 仓库](https://github.com/rational-stars/GitHub-Freshness) 仅提供源码可用的油猴脚本和项目文档，不包含 Chrome 扩展源码或用于本地加载的 `extension` 目录。请勿从非官方来源安装扩展文件。

## 支持的页面

- GitHub 仓库主页和文件列表。
- 仓库子目录及新版目录树视图。
- GitHub 仓库搜索结果。
- Awesome 风格的项目列表。

扩展会保留 GitHub 原生加载状态，并在实际内容首次显示前完成颜色、日期和排序处理，减少页面闪烁。

![Chrome 扩展仓库页效果](./img/screenshots/repository-overview-light.png)

## 设置入口

- 点击 Chrome 工具栏中的 GitHub Freshness 图标。
- 点击仓库页 Code 按钮后的 GitHub Freshness 图标。
- 点击搜索页排序操作区中的 GitHub Freshness 图标。

设置面板可以管理浅色和深色配色、新鲜期限、文字及文件图标颜色、日期格式、文件排序、语言和 JSON 备份。

![Chrome 扩展设置面板](./img/screenshots/settings-panel.png)

## 更新扩展

从 Chrome Web Store 安装后，扩展将按商店机制自动更新。更新不会主动清除已经保存的设置。

## 设置备份

设置面板支持通过 JSON 文件导入和导出设置。导出内容包括主题、颜色、新鲜期限、排序和语言配置，但不会包含 AWESOME token。

导入时会忽略备份文件中的 token，并保留本地已有的 AWESOME token。导入成功后页面会自动刷新。

## 权限与隐私

扩展仅申请实现核心功能所需的 GitHub 页面访问、GitHub API、当前标签页和设置存储权限。AWESOME token 是可选项，只会在启用相关功能时发送给 GitHub API，不会发送到项目作者的服务器。

详细的数据处理和同步存储说明请查看[隐私政策](./privacy/)。
