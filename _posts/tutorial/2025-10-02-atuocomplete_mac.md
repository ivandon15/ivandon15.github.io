---
title: 在MacOS终端中使用自动补全功能
description: >-
  用终端一个一个敲真的太累了，配置自动补全功能吧
author: 
   - ivan 
   - chatgpt
date: '2025-10-02 13:17:31 +0800'
categories: [Tutorial]
tags: [skill]
pin: false
media_subpath: '/assets/img/posts/tutorial/2025-10-02-atuocomplete_mac'
---

## 提升 Zsh 使用体验：给终端加上自动建议和语法高亮

终端是一个非常强大的工具，它能完成很多任务，比如：

* 创建、复制、移动、删除文件
* 执行脚本、运行程序
* 管理开发环境和服务器

不过，默认情况下，终端往往显得“简陋”。没有提示、没有高亮，习惯了代码编辑器辅助功能的开发者会觉得不太友好。

幸运的是，我们可以通过简单配置，让 **Zsh 终端**变得更好用！本文将介绍两个非常实用的功能：

* **自动建议**：根据历史命令或常用命令给出提示
* **语法高亮**：区分有效/无效命令，输入时更直观

配置完成后，你会发现：终端不仅能帮你写代码，还能帮你“写命令”。

---

### 一、安装必要的插件

我们需要的插件是：

* [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
* [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)

使用 **Homebrew** 安装即可：

```bash
brew install zsh-autosuggestions
brew install zsh-syntax-highlighting
```

👉 这里假设你已经安装了 **Homebrew**。如果还没有，可以去 [Homebrew 官网](https://brew.sh/) 按照提示安装。

> 💡 除了这两个，Zsh 社区还有很多有用的插件，比如 [zsh-completions](https://github.com/zsh-users/zsh-completions)，有兴趣可以继续探索。

---

### 二、修改 `.zshrc` 文件

Zsh 的配置文件是 `~/.zshrc`，如果不存在，可以新建一个：

```bash
touch ~/.zshrc
```

然后编辑文件，在末尾加入以下内容，启用插件：

```bash
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source $(brew --prefix)/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```

保存后退出。

---

### 三、让配置生效

要让配置生效，有两种方式：

* 重启终端
* 或直接运行：

```bash
source ~/.zshrc
```

---

### 四、效果演示 🎉

1. **语法高亮**

   * 输入无效命令：

     ```bash
     m
     ```

     命令会显示为 **红色**。
   * 输入有效命令：

     ```bash
     mkdir
     ```

     颜色会变为 **绿色**，表示这是合法命令。

   ![命令高亮](741e1dd69f66416aa06e9725660f7d41.png)

2. **自动建议**

   * 执行过一次命令：

     ```bash
     mkdir test
     ```
   * 下一次只输入 `m` 时，右侧会自动灰色提示历史命令，按下 **→（右箭头）**即可补全。

   ![命令自动建议](532a236ed08b40d890939f4e3fd758d4.png)

---

### 五、总结

通过以上几步，你就能让终端：

* 更直观：命令输入时有语法高亮
* 更智能：自动记忆和提示常用命令
* 更高效：减少重复输入

这两个小功能虽然简单，但会大大提升日常开发效率。试试看吧，或许你再也离不开它们了！ 🚀

👉 如果想进一步美化 Zsh，可以考虑使用 [Oh My Zsh](https://ohmyz.sh/) 或 [Powerlevel10k](https://github.com/romkatv/powerlevel10k) 主题。

---

要不要我帮你在这篇文章里加上 **Oh My Zsh + Powerlevel10k** 的美化教程？这样这篇博客就能成为一篇 **终端优化全攻略** 🚀。
