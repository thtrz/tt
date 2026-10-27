# 个人展示网站｜技术设计文档

版本：1.0.0  日期：2026-10-27

## 1. 技术选型
- 前端：HTML5 + CSS3 + 原生 JavaScript。
- 背景：Canvas 2D 少量星点；主要星球与项目示意图使用 CSS/SVG。
- 数据：Markdown 文章源文件 + 生成的 assets/posts.js，不存私人数据。
- 后端与数据库：首版不需要。
- 部署：GitHub Pages；普通分支发布可以直接使用，自动博客发布可以改用附带 Actions 工作流。

选择纯静态实现是为了延续用户已经完成的 GitHub 网页上传流程。教程中的 React / TypeScript 是示例技术方案；当前需求不依赖组件框架，不需要用户安装依赖或购买 AI 额度。

## 2. 目录结构
~~~text
PersonalSite/
  index.html              公开首页
  project-docs.html       文档阅读与截图页
  PRD.md                  产品需求
  TECH_DESIGN.md          技术设计
  AGENTS.md               AI 项目开发约定
  assets/
    style.css             响应式样式
    app.js                星空、菜单、项目、博客与复制
    posts.js              预生成的文章列表与正文
    favicon.svg           本地图标
  content/posts/*.md      博客原文
  tools/build-blog.mjs    零依赖文章构建脚本
  automation/pages.yml（启用时复制为 .github/workflows/pages.yml）  可选自动构建与发布
  README-先看这里.md       上传、部署与截图说明
~~~

## 3. 数据模型
Post：id、title、date（YYYY-MM-DD）、summary、tags（字符串数组）、body（Markdown）。

文章文件顶部使用一段 JSON 作为元信息，两端由 --- 分隔。构建脚本读取 content/posts 的全部 .md 文件，校验字段、按日期排序后写入 assets/posts.js。初始文章已预生成，file:// 下也能运行。

个人资料和项目卡片直接维护于 index.html，项目详细说明位于 app.js 的 projectNotes。无需编辑数据库。

## 4. 页面交互
- 导航通过锚点跳转；IntersectionObserver 更新当前区块状态。
- 菜单以 aria-expanded 维护展开状态，点击链接或 Escape 可收起。
- 博客列表以标题、摘要、标签筛选，不发起网络搜索请求。
- 原生 dialog 提供阅读与项目详情；关闭时恢复原焦点。
- Markdown 支持标题、段落、无序/有序列表、引用、粗体、行内代码、围栏代码块和 HTTP/HTTPS 链接。不实现完整 CommonMark 规范。
- 使用 DOM textContent / 文本节点渲染文章，不执行原始 HTML。正文不支持任意嵌入脚本。
- 代码块仅轻量着色，不等同于完整语法解析器。

## 5. 性能与可访问性
- 桌面 76 个星点，手机 38 个，设备像素比上限 1.5。
- 约 22 帧/秒更新星空绘制；不对手机实际帧率作未经测试的承诺。
- document.hidden 时暂停动画；reduced-motion 下仅绘制静态星空。
- 正文最大宽度 1160 px，手机单列；无外部图片、字体 CDN 或前端包下载。
- 保留键盘焦点边框、跳到主要内容入口、搜索名称与弹窗关闭按钮。

## 6. 部署方案
方案 A：Settings → Pages → Deploy from a branch → main → / (root) → Save。适合本次上传后直接交作业。页面入口在根目录，不能选 /docs。

方案 B：上传隐藏的 automation/pages.yml（启用时复制为 .github/workflows/pages.yml），并把 Pages 的 Source 改为 GitHub Actions。工作流调用 Node 构建文章，将允许列表内的公开页面与资源上传为站点，再部署。新增或修改 Markdown 后自动触发。该方案不执行 npm install，无第三方应用依赖。

预计站点为 https://thtrz.github.io/tt/，以 Pages 实际提供并且访问成功的网址为准。

## 7. 安全与边界
- 不存账号密码、不调用 AI API、不采集统计或登录信息。
- 未提供真实邮箱，不设置会误导用户的联系表单。
- 外链使用 noopener noreferrer。
- 项目原始 .md 文件用于公开作业，不包含凭据或私人资料。
- 个人简介在发布前由用户核对；修改时同步更新 PRD。
- 项目示意图标注为示意，不充当真实功能测试截图。
