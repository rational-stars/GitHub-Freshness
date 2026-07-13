# GitHub Freshness Chrome Extension

这是 GitHub Freshness 的 Chrome 插件版本。

## 本地安装

1. 打开 Chrome 的 `chrome://extensions/`。
2. 开启右上角的「开发者模式」。
3. 点击「加载已解压的扩展程序」。
4. 选择本仓库下的 `extension` 文件夹。

安装后打开 GitHub 仓库页或搜索页即可自动高亮。点击浏览器工具栏里的 GitHub Freshness 插件按钮，可以打开设置面板。

## 导入与导出设置

设置面板支持将当前配置导出为 JSON 文件，也可以从 JSON 文件恢复配置。导入成功后页面会自动刷新并应用设置。

为避免泄露敏感信息，导出的 JSON 不包含 AWESOME token。导入设置时会忽略文件中的 token，并始终保留本地 AWESOME token。
