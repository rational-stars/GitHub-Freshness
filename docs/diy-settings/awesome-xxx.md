# Awesome-xxx

**Awesome-xxx** 列表项目是一个非常流行的开源项目格式，它旨在收集与特定领域相关的优质资源（如工具、库、教程、文档等）。这些列表通常由开发者社区共同维护和更新，目的是让其他开发者可以轻松找到与某个特定主题相关的高质量资源。

**Awesome**列表项目的命名方式遵循以下格式：Awesome-[主题]

- Awesome JavaScript：收集与 JavaScript 相关的工具、库、教程等资源。
- Awesome Python：收集与 Python 相关的资源。
- Awesome Web Development：收集与前端和后端开发相关的优质资源。

**Awesome-xxx**列表项目通常是一个 GitHub 仓库，其中包含一个有组织的 README 文件，列出所有经过筛选的资源，并按类别进行分组。开发者可以贡献自己找到的好资源，或者修正和更新已有条目。

**Awesome-xxx列表项目支持**：
  - 现在Awesome-xxx项目可以在列表中直接展示该项目的 star 数量和最近更新日期。
  - star和更新日期需要请求 github api。 
  - GitHub 对未认证的用户（即没有使用令牌或授权的用户）对 API 请求数量设定了限制。如果你频繁地进行请求，会超出这个限制

## 解决方案：

    使用 个人访问令牌（Personal Access Token） 可以显著提高请求限制。
    未认证的用户每小时最大请求次数为 60 次，而认证的用户每小时最大请求次数为 5000 次。

## AWESOME token

  **如何使用个人访问令牌：**

  1.登录 Github，访问[个人访问令牌](https://github.com/settings/tokens)生成页面。https://github.com/settings/tokens

  2.点击 Generate new token，选择适当的权限（你可以选择默认权限），然后生成一个新的令牌。
  
  3.复制刚刚生成的令牌到GitHub-Freshness设置页面的--AWESOME token--配置后面的输入框内并勾选复选框☑️就OK了。

  4.[声明](../what-is-GitHubFreshness.md#声明)