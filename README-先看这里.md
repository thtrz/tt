# Personal Space｜个人展示网站

这是你的第二个独立项目，与 ImageGrab 插件仓库分开。网页首页、三份作业文档、博客都已经生成，不需要 Cursor 额度、后端或数据库。

## 1. 先核对资料

网站暂时使用 GitHub 昵称 **thtrz**。个人介绍、学习方向属于可编辑的学习者文案。没有填造学历、工作经历、真实姓名或邮箱。上传公开仓库之前请先检查这段介绍是否符合你自己。

- 首页个人文案与项目卡片：index.html
- 主要样式、颜色和排版：assets/style.css 顶部 :root
- 博客原文：content/posts/*.md
- 三份作业文档：PRD.md、TECH_DESIGN.md、AGENTS.md
- 文档截图页：project-docs.html

双击 index.html 可以先预览首页；双击 project-docs.html 可以依次看三份文档。

## 2. 上传到你新建的 thtrz/tt 仓库

你已经打开了 GitHub 的上传页面。下载并完整解压“PersonalSite-完整项目.zip”，打开里面的 PersonalSite 文件夹。应直接看到 index.html、PRD.md、TECH_DESIGN.md、AGENTS.md、assets、content、tools 等文件。

按 Ctrl+A 全选**该文件夹里面的内容**，拖入 GitHub 页面中间的“Drag files here”区域。等待上传列表出现并完成，再点击底部绿色“Commit changes”。

要保留 assets、content、tools 等文件夹的层级。不要只上传 ZIP，也不要把整个 PersonalSite 外层文件夹拖进去，否则 GitHub Pages 在根目录找不到 index.html。

GitHub 网页的文件选择框一般不能直接选文件夹；使用拖拽方法。automation 文件夹是可选自动部署方案的模版，不影响最简单的根目录发布。

## 3. 和上次一样部署 GitHub Pages

1. 在 thtrz/tt 仓库打开 Settings → Pages。
2. Source 选择 Deploy from a branch。
3. Branch 选择 main，旁边目录选择 **/ (root)**，点击 Save。这里不要选 /docs；这个项目的 index.html 放在根目录。
4. 等待部署完成，打开 Pages 实际显示的网址。预计是 https://thtrz.github.io/tt/ ，请以实际显示及访问成功为准。
5. 在作业“03 个人网站域名”中填可访问的网址，不要填 https://github.com/thtrz/tt.git 这样的代码克隆地址。

若访问后显示 404，检查是否误把文件放进 PersonalSite 外层目录，是否选择 main + / (root)，以及 Pages 是否已部署完成。

## 4. 作业截图

- **04 三份文档截图**：打开 project-docs.html，在 PRD.md、TECH_DESIGN.md、AGENTS.md 三个标签分别截图。截图里保留标题、文件名和主要内容。也可以在 GitHub 打开真实 .md 文件截图。截图页展示的是同名文档正文，并非虚构材料。
- **05 个人网页截图**：打开线上 https://thtrz.github.io/tt/ （以实际网址为准），截到浏览器地址栏、首页标题、星空主题。可再截一张项目展示和博客区域。
- **03 个人网站域名**：填写刚才成功打开的线上地址。
- 本次表单 01、02 项未显示，提交前应另外核对。

## 5. 博客以后怎么更新

原始文章存于 content/posts，每篇 .md 顶部是一段 JSON 元数据。新建文章后，用 Node 运行 node tools/build-blog.mjs，它会自动汇总全部文章到 assets/posts.js，然后再把修改后的文件上传 GitHub。

初始三篇已经预生成，所以只想完成当前作业时完全不用运行脚本。普通的“main + / (root)”部署模式不会自行运行生成脚本；新增文章时须先在本地运行脚本。

如果以后需要“每次向 GitHub 上传 Markdown 就自动更新网页”，可将 automation/pages.yml 复制到仓库路径 .github/workflows/pages.yml，之后把 Settings → Pages 的 Source 改为 GitHub Actions。这个可选流程会在每次推送时运行 Node 脚本并部署，不需要数据库或 npm 安装。当前作业建议先用上面更简单的分支发布方式。

## 6. 已知边界

- 这是个人展示网站，未提供后台管理、登录、邮箱发送或数据库。
- 博客支持常见标题、列表、引用、代码段和链接，但不是完整 Markdown 语法实现。
- ImageGrab 的项目文字明确区分“已证实能提取与预览”与“下载功能仍需实际验证”。
- 星空为轻量绘制，关闭动态效果时保持静态；后续如加入照片，应使用本人允许公开的图片。
- 《验证说明.md》记录程序化验证范围。真实浏览器显示和 GitHub Pages 最终上线需要在你的电脑与仓库中检查。
