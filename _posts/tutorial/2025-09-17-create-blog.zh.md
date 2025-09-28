---
title: First Post! 🚀 在 Windows 上使用 Jekyll + GitHub Pages 搭建个人博客
description: >-
  My first blog, trying to record how I built a personal blog based on Github Pages and Chirpy.
author: ivan
date: '2025-09-17 18:31:17 +0800'
categories: [Tutorial]
tags: [blogs]
pin: false
media_subpath: '/assets/img/posts/tutorial/2025-09-17-create-blog'
---


## 为什么选择 Jekyll？

目前有很多静态博客生成器（Hugo、Hexo、VuePress、Docusaurus 等），我最终选择 **Jekyll** 的原因有几点：

* **GitHub Pages 原生支持**：推送到 GitHub 仓库后，自动帮你生成网页，不需要额外配置部署。
* **生态成熟**：Jekyll 是最早的一批静态博客生成器之一，有大量的主题、插件和社区教程。
* **简洁稳定**：只需要写 Markdown 文件，就能快速生成文章，适合个人博客和技术笔记。

---

## 搭建博客的几种方式

常见方式包括：

1. **GitHub Pages + Jekyll**（本文介绍的方法）

   * 优点：GitHub Pages 原生支持，无需额外服务器。
   * 缺点：需要安装 Ruby 环境。

2. **GitHub Pages + Hugo/Hexo**

   * 优点：社区大、主题丰富、构建速度快。
   * 缺点：需要手动配置 GitHub Actions 进行构建。

3. **Notion / Obsidian + 静态站点生成工具（比如 NotionNext）**

   * 优点：编辑体验更好，适合轻量化写作。
   * 缺点：可定制性较差。

4. **自建服务器 + 静态网站生成器**

   * 优点：完全可控。
   * 缺点：需要额外的服务器和运维成本。

---

## 核心工具介绍

### Git

* 版本控制工具，用来管理博客源代码。
* 本地写完文章后，用 `git add/commit/push` 推到 GitHub，GitHub Pages 就能渲染出网站。

👉 类比：**快递员**（帮你把代码送到 GitHub）。

---

### Ruby

* Jekyll 是用 Ruby 写的，所以必须先安装 Ruby。
* Windows 下推荐用 [RubyInstaller](https://rubyinstaller.org/downloads/)。

👉 类比：**操作系统**（让 Jekyll 可以跑起来）。

---

### Bundler

* Ruby 的包管理工具，类似于 npm 或 yarn。
* 管理 Jekyll 和主题的依赖，确保本地和 GitHub Pages 的环境一致。

👉 类比：**管家**（管理 Jekyll 的依赖）。

---

### Jekyll

* 静态网站生成器，把 Markdown 博文 + 模板生成 HTML/CSS。
* GitHub Pages 原生支持，不需要额外配置。

👉 类比：**工厂**（把 Markdown 转成网页）。

---

## 安装与配置步骤（Windows）

1. **安装 Git**

   * [下载 Git](https://git-scm.com/downloads)，安装完成后在命令行运行：

     ```bash
     git --version
     ```

     如果能看到版本号说明安装成功。

2. **安装 Ruby**

   * [下载 RubyInstaller](https://rubyinstaller.org/downloads/)，安装时记得勾选 **ridk install** 并安装 **MSYS2/MINGW** 工具链。
   ![alt text](/rubyinstall.png)
   * 安装完成后，在开始菜单中打开 `Start Command Prompt with Ruby`。
   ![alt text](/rubyprompt.png)
3. **安装 Jekyll 和 Bundler**

   ```bash
   gem install jekyll bundler
   jekyll -v
   ```
   ![alt text](jekylldownloading.png)

   ![alt text](jekyllsuccess.png)

4. **新建 GitHub Pages 仓库**

   * 仓库名必须是：`<username>.github.io`。
   * 本地初始化一个 Jekyll 项目：

     ```bash
     jekyll new myblog
     cd myblog
     ```

5. **修改 Gemfile**

   * 注释掉 `gem "jekyll"`
   * 添加：

     ```ruby
     gem "github-pages", "~> 232", group: :jekyll_plugins
     ```

6. **安装依赖**

   ```bash
   bundle install --verbose
   ```
   这里最好加上 --verbose，我最开始装的时候因为网络在这里卡了好久，我以为没运行上。

7. **本地启动**

   ```bash
   bundle exec jekyll serve
   ```

   打开 [http://localhost:4000](http://localhost:4000) 查看效果。

---

## 理解 Jekyll 的目录结构

运行 `jekyll new myblog` 后生成的目录：

```
myblog/
├── _config.yml      # 配置文件
├── _posts/          # 博文目录
├── _site/           # 生成的静态文件
├── Gemfile          # 依赖配置
├── about.markdown   # 示例页面
├── index.markdown   # 首页
```

📌 核心要点：

* `_config.yml` → 控制网站配置
* `_posts/` → 存放博文（命名必须是 `YYYY-MM-DD-title.md`）
* `_site/` → 生成的静态网页（不要提交到 GitHub）

---

## 使用现成主题（以 Chirpy 为例）

如果不想用默认模板，可以用 [Jekyll Themes](http://jekyllthemes.org/) 下载主题，比如 **[Chirpy](http://jekyllthemes.org/themes/jekyll-theme-chirpy/)**。

步骤：

1. 我参考了 [Getting start](https://chirpy.cotes.page/posts/getting-started/)，先去这个文章中提到的仓库，直接点击右上角的使用主题的模板（Use this template），然后选择仓库创建，新仓库的名称必须设置成 `<username>.github.io` 。
2. 在 GitHub Pages 的设置里切换到 **GitHub Actions** 部署。
   ![alt text](githubaction.png)
3. Clone 到本地后运行：

   ```bash
   bundle install --verbose
   bundle lock --add-platform x86_64-linux   # 如果本地机器不是linux的话，运行这句话
   bundle exec jekyll serve
   ```
4. 修改 `_config.yml`，设置网站名、作者、URL。
5. Push 到 GitHub，等待 GitHub Actions 构建完成。

---

## 个性化配置

### 更换图标 Favicon

1. 上传图标到 [RealFaviconGenerator](https://realfavicongenerator.net/)。\
   ![alt text](FaviconGenerator.png){: width="500px" style="height:auto;" }
   ![alt text](assets.png)
2. 下载并解压，只保留 `.png` 和 `.ico` 文件。
3. 复制到 `/assets/img/favicons/`，并在 `_config.yml` 中对应修改。

---

### 更换头像

在 `_config.yml` 中修改：

```yaml
avatar: /assets/img/avatar.png
```
对应的位置上放上自己的头像
---

### 写文章与作者信息

1. 在 `_posts/` 下新建 Markdown 文件。
   命名规则：`YYYY-MM-DD-title.md`。

2. 推荐安装 [jekyll-compose](https://github.com/jekyll/jekyll-compose)：
   把下方代码加入Gemfile中，然后命令行进行 `bundle`
   ```ruby
   gem 'jekyll-compose', group: [:jekyll_plugins]
   ```

   安装后，可以直接生成新文章：

   ```bash
   bundle exec jekyll post "My New Post" --timestamp-format "%Y-%m-%d %H:%M:%S %z"
   ```
   这会自动在post下面创建对应的md。

3. 作者信息：
   在 `_data/authors.yml` 中添加：

   ```yaml
   ivan:
     name: Ivan
     url: https://github.com/ivandon15
   ```
   
   在文章头部写：

   ```yaml
   author: ivan
   ```
   这样就可以在blog中的头部显示该篇文章是谁写，并且有一个可点击的链接。

4. 添加图片：
   文章开头还可以添加以下参数，这个记录了当前文章中媒体的路径（比如图片），比这篇文章我就放在了
   ```yaml
   media_subpath: /assets/img/posts/tutorial/2025-09-17-create-blog
   ```
   这样文章中的图片路径直接写图片名称即可。

# Bug
1. 之前一直出现local可以正常显示网页，但是部署到github上就只有index.html，也不知道是啥情况一直没搞好，结果最后重新跟着 chirpy start 走了一遍，就好了...
2. 这篇文章中包含了不少 http 链接而不是 https，这导致commit之后在Action的时候出错了！我直接在pages-deploy.yml把整个Test site给注释了...
# Final
差不多就这样了！折腾了小一天时间了，终于算了却了一桩想做但很一直没做的事情。