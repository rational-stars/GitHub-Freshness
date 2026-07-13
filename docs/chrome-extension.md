# Chrome 扩展安装

GitHub Freshness 同时提供 Chrome 扩展版和油猴脚本版。Chrome 扩展版不需要安装 Tampermonkey，功能和设置与油猴脚本保持一致。

## 本地安装

1. 下载或克隆 [GitHub Freshness 仓库](https://github.com/rational-stars/GitHub-Freshness)。
2. 在 Chrome 地址栏打开 `chrome://extensions/`。
3. 开启右上角的 **开发者模式**。
4. 点击 **加载已解压的扩展程序**。
5. 选择仓库中的 `extension` 文件夹。

安装完成后，打开任意 GitHub 仓库页或搜索页即可自动应用新鲜度高亮。点击浏览器工具栏中的 GitHub Freshness 图标可以打开设置面板。

## 更新扩展

拉取或下载最新代码后，在 `chrome://extensions/` 中找到 GitHub Freshness，然后点击刷新按钮。已经保存的设置会保留。

## 设置备份

设置面板支持通过 JSON 文件导入和导出设置。导出的文件包括主题、颜色、时间阈值、排序和语言配置，但不会包含 AWESOME token。

导入设置时，即使旧备份中存在 token 字段，扩展也会忽略该字段并保留本地 AWESOME token，避免敏感信息被意外覆盖或泄露。
