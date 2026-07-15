# Chrome 扩展版

GitHub Freshness 同时提供 Chrome 扩展版和油猴脚本版。Chrome 扩展版不需要安装 Tampermonkey，功能和设置与油猴脚本保持一致。

## 获取与安装

Chrome 扩展由作者通过官方渠道单独发布。公开的 [GitHub Freshness 仓库](https://github.com/rational-stars/GitHub-Freshness) 仅提供油猴脚本和项目文档，不包含 Chrome 扩展源码或用于“加载已解压的扩展程序”的 `extension` 目录。

正式安装地址发布后会在本页面更新。请勿从非官方来源安装扩展文件。

安装完成后，打开任意 GitHub 仓库页或搜索页即可自动应用新鲜度高亮。点击浏览器工具栏中的 GitHub Freshness 图标可以打开设置面板。

进入仓库或切换项目时，扩展会保留 GitHub 原生 Skeleton 加载状态，并在真实文件列表首次绘制前完成颜色、日期和排序处理，不会隐藏内容或二次显示。仓库页 Code 按钮后的 branch-clock 图标也可以直接打开设置面板。

设置面板底部提供文档、GitHub 仓库、个人主页和 Telegram 交流群四个图标入口，面板最下方保留轻量 Star 提醒；所有链接都会在新标签打开。

## 更新扩展

通过官方渠道安装的 Chrome 扩展将按对应发行平台的方式更新，已经保存的设置会保留。

## 设置备份

设置面板支持通过 JSON 文件导入和导出设置。导出的文件包括主题、颜色、新鲜期限、排序和语言配置，但不会包含 AWESOME token。

导入设置时，即使旧备份中存在 token 字段，扩展也会忽略该字段并保留本地 AWESOME token，避免敏感信息被意外覆盖或泄露。
