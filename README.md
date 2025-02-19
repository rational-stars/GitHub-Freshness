# GitHub-Freshness
![image.png](https://cloud.rational-stars.top/file/1739870246994.png)
### 感谢以下用户提出宝贵意见![](https://cloud.rational-stars.top/file/1737871487056.png)
## 🌟 **新增功能**：
版本更新日志： v1.0.1 - 2025年2月18日
- **文件排序**：
  - 可以根据需求对文件进行排序，看项目的时间更快了呢。
- **Awesome类型项目支持**：
  - 现在Awesome项目可以在列表中直接展示该项目的 star 数量和最近更新日期。
  - Awesome需要请求 github api。 GitHub 对未认证的用户（即没有使用令牌或授权的用户）对 API 请求数量设定了限制。如果你频繁地进行请求，会超出这个限制
  解决方案：
	1.	使用认证请求：
	使用 个人访问令牌（Personal Access Token） 可以显著提高请求限制，未认证的用户每小时最大请求次数为 60 次，而认证的用户每小时最大请求次数为 5000 次。
	2.  如何使用个人访问令牌：
	1.登录 GitHub，访问 GitHub 个人访问令牌生成页面。https://github.com/settings/tokens
	2.点击 Generate new token，选择适当的权限（你可以选择默认权限），然后生成一个新的令牌。
	3.复制刚刚生成的令牌到GitHub-Freshness设置页面的--AWESOME token--配置后面的输入框内并勾选复选框☑️就 OK 了。
  4.[点击跳转到声明](#声明)


## 🌟 **新增功能**：
版本更新日志： v1.0.1 - 2025年2月14日
- **全新 UI 与逻辑**：
  - 彻底重构了旧版界面，提供更流畅、更直观的用户体验。

- **搜索界面优化**：
  - 现在在 GitHub 搜索界面也能享受高亮背景色和字体设置，带来更加舒适的浏览体验。

- **深色主题适配**：
  - 新增深色主题支持，可以自由切换浅色和深色主题，带来更丰富的视觉体验。
  - 引入主题自动切换功能，无需再为主题选择烦恼，设置中可启用自动切换。

- **时间阈值设置**：
  - 允许用户根据需求自定义时间阈值，支持选择单位为日、周、月或年，使项目展示更符合个人节奏。

- **文件夹颜色设置**：
  - 新增文件夹颜色功能开关，赋予 GitHub 页面更多个性化。
  - 现在可以自定义文件夹的高亮和灰色颜色，确保文件夹展示更加醒目。

- **时间格式化设置**：
  - 新增时间格式化开关，方便用户根据需求调整显示的时间格式，提升可读性。

- **当前主题设置**：
  - 在设置中自由选择当前主题：自动、浅色或深色主题，让 GitHub 的体验更加符合你的个人风格。

- **待开发项目功能**：
  - **awesome-xxx 项目功能待开发**，我们正在积极开发这一功能，敬请期待！

---

🎉 快来体验这些全新功能，让你的 GitHub 使用体验更加个性化、便捷与舒适！

# 预览效果图

![img](https://cloud.rational-stars.top/file/1739503803391.png)

![img](https://cloud.rational-stars.top/file/1739503710202.png)

# **背景：**

作为一个喜欢在 GitHub 上寻找 JavaScript 脚本的开发者，我经常发现那些高星标的项目已经好几年没有更新，完全没有得到维护，浪费了大量的时间。为了帮助自己快速判断一个仓库是否还在更新，并查看它的最新更新时间，我开发了这个油猴脚本。我相信，很多开发者和我一样，都会遇到这种烦恼，渴望更高效地发现那些仍然活跃的项目。

# **介绍：**

**GitHub Freshness** 是一个油猴脚本，通过颜色高亮的方式，帮助你快速判断一个 GitHub 仓库是否在更新。你可以通过设置面板来自定义颜色，并根据仓库的更新时间，轻松识别哪些项目仍在维护，哪些已经被遗弃。再也不用浪费时间在过时的项目上，寻找最新更新、活跃的资源更加高效！本项目脚本代码[开源地址](https://github.com/rational-stars/GitHub-Freshness)：https://github.com/rational-stars/GitHub-Freshness

使用教程

点击安装[油猴扩展](https://www.tampermonkey.net/index.php)插件：https://www.tampermonkey.net/index.php

点击链接安装[GitHub Freshness](https://greasyfork.org/zh-CN/scripts/524465-github-freshness)油猴脚本：https://greasyfork.org/zh-CN/scripts/524465-github-freshness

点击右上角扩展插件中的GitHub Freshness设置面板，然后设置喜欢的颜色和时间阈值即可 过于简单不再赘述。

![img](https://cloud.rational-stars.top/file/1737448340101.png)





![img](https://cloud.rational-stars.top/file/1739503908673.png)

# 声明

本脚本在任何支持油猴的浏览器皆可使用，并秉承「不作恶」的原则， 无需用户注册登录，不跟踪不记录任何用户信息，无需关注公众号，不添加广告。

本系列脚本功能皆为原创， 无任何隐藏、混淆和加密代码，所有代码开源可供用户查阅学习。 不需要的用户可以无视。 

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=rational-stars/GitHub-Freshness&type=Date)](https://star-history.com/#rational-stars/GitHub-Freshness&Date)