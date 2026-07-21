# GitHub Freshness 隐私政策

最后更新日期：2026-07-15

[English version](../en/privacy/)

GitHub Freshness 包含用于 GitHub 网页的源码可用油猴脚本和单独发布的浏览器扩展。浏览器扩展已在 [Chrome Web Store](https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj) 正式上架。它通过读取用户当前 GitHub 页面中可见的仓库及文件更新时间，并以颜色高亮、时间格式化、文件排序等方式帮助用户判断仓库活跃度。浏览器扩展源码不包含在公开仓库中。

我们重视用户隐私。本项目不会建立用户账号系统，不会投放广告，不会跟踪用户行为，也不会出售、出租或共享用户数据用于广告、画像或营销目的。

## 适用范围

本隐私政策适用于：

- GitHub Freshness 油猴脚本版本；
- GitHub Freshness 浏览器扩展版本；
- 本项目公开仓库中发布的油猴脚本和项目文档。

本隐私政策不适用于 GitHub、Tampermonkey、Greasy Fork、Chrome Web Store、CDN 服务商或其他第三方网站/服务。用户访问这些第三方服务时，应以对应服务的隐私政策为准。

## 我们处理哪些数据

GitHub Freshness 的主要逻辑在用户浏览器本地运行。为实现功能，本项目可能在浏览器本地处理以下数据：

1. 当前 GitHub 页面中用户可见的信息

   例如仓库链接、仓库名称、页面中展示的更新时间、文件更新时间、搜索结果中的更新时间等。这些信息来自用户正在访问且有权查看的 GitHub 页面，可能包括公开仓库或用户有权访问的私有仓库，仅用于在当前页面上进行高亮、排序和格式化显示。

2. 用户配置

   例如用户在设置面板中选择或填写的配置项，包括：

   - 主题设置，例如浅色、深色或自动；
   - 新鲜期限，例如 30 日、若干周、若干月或若干年；
   - 背景颜色、文字颜色、文件图标颜色及对应开关；
   - 时间格式化开关及日期格式；
   - 文件排序开关及排序方式；
   - Awesome 项目检测开关；
   - 当前主题、当前语言；
   - 用户主动导入或导出的设置 JSON。

   这些配置用于控制 GitHub Freshness 在 GitHub 页面上的展示效果和功能行为。

3. 可选的 GitHub token

   当用户手动启用 Awesome 项目检测并填写 GitHub token 时，本项目会把该 token 用于请求 GitHub API，以获取相关仓库的公开元数据并减少 GitHub API 速率限制影响。

   GitHub token 不是必填项。用户可以不填写 token，或随时在设置面板中删除 token。Token 会保存在油猴脚本或浏览器扩展的配置存储中；浏览器扩展使用 `chrome.storage.sync`，因此该 token 可能由浏览器厂商通过用户自己的浏览器账号进行同步。设置备份功能导出的配置 JSON 不包含用户已保存的 token。

4. 临时页面状态

   例如用于避免同一页面重复显示提示信息的 `sessionStorage` 标记。这类数据只用于当前浏览器会话中的界面控制。

## 数据如何存储

GitHub Freshness 不会把用户配置上传到本项目作者自建服务器。

- 油猴脚本版本使用 `GM_setValue` / `GM_getValue` 保存配置和可选的 GitHub token；
- 浏览器扩展版本使用 `chrome.storage.sync` 保存配置和可选的 GitHub token；
- 少量临时状态可能使用浏览器的 `sessionStorage`。

如果浏览器启用了同步功能，`chrome.storage.sync` 中的配置及可选的 GitHub token 可能会由浏览器厂商在用户自己的浏览器账号下进行同步。该同步行为由浏览器厂商提供和控制，不由本项目服务器处理。用户应同时参考所使用浏览器及账号同步服务的隐私政策。

设置面板中的导入/导出 JSON 功能仅用于用户自行备份和恢复配置。导出文件由用户的浏览器生成并保存到用户设备；导入时，用户选择的 JSON 内容会被写入本项目的本地配置存储。

## 网络请求和第三方服务

GitHub Freshness 可能产生以下网络请求：

1. GitHub 页面访问

   用户访问 GitHub 页面时，脚本/扩展会在 `https://github.com/*` 页面中运行，用于读取用户当前可见的页面内容并修改页面展示。

2. GitHub API 请求

   当 Awesome 项目检测功能启用时，本项目可能请求：

   `https://api.github.com/repos/{owner}/{repo}`

   该请求用于获取仓库元数据。如果用户填写了 GitHub token，请求中会包含该 token 的 `Authorization` 请求头。该 token 会发送给 GitHub，而不会发送给本项目作者自建服务器。

3. 脚本版本的第三方依赖加载

   油猴脚本版本可能通过 `@require` / `@resource` 从第三方 CDN 加载运行依赖，例如 jQuery、SweetAlert2、Pickr、Luxon 及样式资源。浏览器扩展版本则随扩展包内置相关依赖。

4. 项目相关链接

   设置面板或文档中可能包含 GitHub 项目地址、项目文档站点、作者主页等链接。只有当用户主动点击这些链接时，浏览器才会打开对应网站。

## 我们不会做什么

GitHub Freshness 不会：

- 收集用户姓名、邮箱、电话号码、地址等身份信息；
- 收集或分析用户的浏览历史用于广告、画像或营销；
- 将用户配置、GitHub token 或页面内容上传到本项目作者自建服务器；
- 出售、出租或转让用户数据；
- 在项目代码中加入隐藏、混淆或加密的跟踪逻辑。

## 权限说明

浏览器扩展版本请求以下主要权限：

- `activeTab`：用于用户点击扩展图标时，在当前 GitHub 标签页打开设置面板；
- `storage`：用于保存用户配置；
- `https://github.com/*`：用于在 GitHub 页面中读取公开页面信息并修改页面展示；
- `https://api.github.com/*`：用于在 Awesome 项目检测功能启用时请求 GitHub 仓库元数据。

这些权限仅用于 GitHub Freshness 的核心功能。

## GitHub token 安全建议

如果用户选择填写 GitHub token，建议：

- 优先使用 GitHub fine-grained personal access token；
- 只授予读取公开仓库元数据所需的最小权限；
- 设置合理的过期时间；
- 不要把 token 分享给他人；
- 如果怀疑 token 泄露，应立即在 GitHub 设置中撤销该 token。

## 数据删除

用户可以通过以下方式删除本项目保存的数据：

- 在 GitHub Freshness 设置面板中清空 GitHub token 并保存；
- 重置或修改设置面板中的配置；
- 删除用户自行导出的设置 JSON 文件；
- 在油猴管理器中删除脚本相关存储数据；
- 在浏览器扩展管理页面中清除扩展数据或卸载扩展。

卸载脚本或扩展后，浏览器或脚本管理器通常会删除对应的设备本地数据。通过 `chrome.storage.sync` 同步的数据可能受浏览器账号和同步服务的数据保留机制影响，具体行为以浏览器、脚本管理器及账号同步服务的规则为准。

## 儿童隐私

GitHub Freshness 面向开发者和 GitHub 用户，不面向儿童提供专门服务。我们不会有意收集儿童个人信息。

## 政策变更

如果本项目的数据处理方式发生实质变化，我们会更新本文件，并在项目仓库中保留最新版本。建议用户在安装或更新脚本/扩展时查看本隐私政策。

## 联系方式

如果你对本隐私政策或 GitHub Freshness 的数据处理方式有疑问，可以通过 GitHub Issues 联系我们：

https://github.com/rational-stars/GitHub-Freshness/issues

也可以加入 Telegram 交流群：

https://t.me/GitHubFreshness

## Limited Use 声明

GitHub Freshness 对用户数据的使用仅限于提供本项目核心功能，并遵守 Chrome Web Store 用户数据政策，包括 Limited Use 要求。我们不会将用户数据用于与本项目功能无关的目的，不会将用户数据出售或转让给第三方，也不会将用户数据用于广告投放、信用评估或用户画像。
