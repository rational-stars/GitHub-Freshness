# Chrome 商店上线与非商业许可更新设计

## 状态

- 设计日期：2026-07-20
- 用户确认：已确认
- 实施范围：项目公开仓库中的 README、双语文档和许可证文件

## 背景

GitHub Freshness Chrome 扩展已经通过审核并在 Chrome Web Store 正式上线。项目当前 README 和文档仍显示“等待审核”，且公开仓库仍使用允许商业使用的 MIT License。需要同步发布状态，并将公开仓库改为允许个人、教育和非商业使用、禁止未经授权商业使用的许可证。

官方 Chrome Web Store 地址：

<https://chromewebstore.google.com/detail/github-freshness/eelkgplabammohbgakcoehekeefgahoj>

## Chrome 商店上线信息

### README

更新 `README.md` 和 `README_EN.md`：

- 删除 Chrome 扩展“正在等待审核”的说明。
- 在项目介绍和 Chrome 扩展安装区域加入官方商店链接。
- 明确扩展已经正式上线，可通过 Chrome Web Store 安装和自动更新。
- 保留 Chrome 扩展源码不包含在公开仓库中的说明。
- 保留 Tampermonkey 和 Greasy Fork 的现有安装方式。

### 双语文档

同步更新以下中文及英文页面：

- 文档首页
- 快速开始
- Chrome 扩展安装页
- 项目介绍
- `v2.0.0` 版本日志

版本日志直接将原有“已提交并等待审核”更新为“已通过审核并正式上架”，不新增版本号。

## 许可证设计

### 许可证选择

公开仓库采用未经改写的 `PolyForm Noncommercial License 1.0.0`。商业用途通过作者单独签发的书面许可证授权。

该许可证允许：

- 个人学习、研究、实验和非商业项目使用。
- 教育机构及其他符合标准条款的非商业组织使用。
- 为非商业目的修改代码和创建衍生作品。
- 非商业发布和重新分发原版或修改版，但必须保留许可证及必要声明。

以下用途必须事先获得商业授权：

- 公司、商业组织或营利性组织使用。
- 公司内部使用，即使软件本身没有被出售或重新分发。
- 与营利活动、收费产品或商业服务有关的其他使用。

商业授权联系方式：`rational.stars127@gmail.com`。

### LICENSE 文件

用 PolyForm Noncommercial License 1.0.0 官方完整文本替换 MIT License，不改写其标准条款。项目声明使用以下内容：

```text
Required Notice: Copyright (c) 2026 rational-stars
Required Notice: Commercial licensing inquiries: rational.stars127@gmail.com
```

### README 和文档表述

中英文 README 增加简明许可证摘要，并链接到 `LICENSE`：

- 中文使用“源码可用”或“源码公开供个人、教育和非商业使用”。
- 英文使用 `source-available`。
- 不再将本项目称为 OSI 定义下的“开源软件”。
- 明确非商业修改及再发布需要保留版权和许可证声明。
- 明确任何商业使用均需联系作者获得授权。

同步处理 README、项目介绍和隐私政策中现有的 MIT、`open-source` 与“开源”表述。许可证主要覆盖本公开仓库中的油猴脚本、公开源码和文档；Chrome 扩展仍通过 Chrome Web Store 单独分发，其源码不在本仓库公开。

## 验证

- 全仓搜索并确认用户可见文档中不再存在“等待审核”或 `under review`。
- 全仓搜索并确认不再将公开内容标为 MIT License。
- 检查所有新增 Chrome Web Store 链接完全一致且可访问。
- 检查中英文 README 和对应文档表达一致。
- 运行项目现有文档构建命令，确认 VitePress 页面可以正常生成。
- 确认提交不包含 `.DS_Store`、扩展源码、扩展压缩包或其他无关文件。

## 不在本次范围内

- 不修改扩展功能、脚本逻辑、界面或截图。
- 不修改 `v2.0.0` 版本号。
- 不公开或提交 Chrome 扩展源码。
- 不创建通用商业许可证模板；具体商业授权由作者与申请方另行书面约定。

## 说明

PolyForm Noncommercial License 属于非商业源码可用许可证，不是 OSI 认可的开源许可证。本设计用于准确表达项目授权意图，不构成法律意见；正式商业授权条款如涉及重要交易，应由专业法律人士审核。
