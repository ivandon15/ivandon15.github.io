---
title: First Post! 🚀 Setting Up a Personal Blog on Windows with Jekyll + GitHub Pages
description: >-
  My first blog, trying to record how I built a personal blog based on Github Pages and Chirpy.
author: ivan
date: '2025-09-17 18:31:17 +0800'
categories: [Tutorial]
tags: [blogs]
pin: false
media_subpath: '/assets/img/posts/tutorial/2025-09-17-create-blog'
---


## Why Choose Jekyll?

There are many static blog generators available today (Hugo, Hexo, VuePress, Docusaurus, etc.). I ultimately chose **Jekyll** for a few reasons:

  * **Native GitHub Pages Support**: After pushing to a GitHub repository, it automatically generates your website for you, no extra deployment configuration needed.
  * **Mature Ecosystem**: Jekyll is one of the earliest static blog generators, with a vast number of themes, plugins, and community tutorials.
  * **Simple and Stable**: You only need to write Markdown files to quickly generate articles, making it ideal for personal blogs and technical notes.

-----

## Different Ways to Build a Blog

Common methods include:

1.  **GitHub Pages + Jekyll** (The method introduced in this article)

      * Pros: Natively supported by GitHub Pages, no extra server required.
      * Cons: Requires a Ruby environment installation.

2.  **GitHub Pages + Hugo/Hexo**

      * Pros: Large community, rich selection of themes, fast build speeds.
      * Cons: Requires manual configuration of GitHub Actions for building.

3.  **Notion / Obsidian + Static Site Generation Tools (like NotionNext)**

      * Pros: Better editing experience, suitable for lightweight writing.
      * Cons: Less customizable.

4.  **Self-hosted Server + Static Site Generator**

      * Pros: Complete control.
      * Cons: Requires an additional server and maintenance costs.

-----

## Introduction to Core Tools

### Git

  * A version control tool used to manage the blog's source code.
  * After writing an article locally, use `git add/commit/push` to push it to GitHub, and GitHub Pages will render the website.

👉 Analogy: A **courier** (helps deliver your code to GitHub).

-----

### Ruby

  * Jekyll is written in Ruby, so you must install Ruby first.
  * On Windows, it's recommended to use [RubyInstaller](https://rubyinstaller.org/downloads/).

👉 Analogy: An **operating system** (allows Jekyll to run).

-----

### Bundler

  * A package manager for Ruby, similar to npm or yarn.
  * Manages dependencies for Jekyll and its themes, ensuring consistency between your local environment and GitHub Pages.

👉 Analogy: A **housekeeper** (manages Jekyll's dependencies).

-----

### Jekyll

  * A static site generator that turns Markdown blog posts + templates into HTML/CSS.
  * Natively supported by GitHub Pages, no extra configuration needed.

👉 Analogy: A **factory** (converts Markdown into web pages).

-----

## Installation and Configuration Steps (Windows)

1.  **Install Git**

      * [Download Git](https://git-scm.com/downloads), and after installation, run the following in your command line:

        ```bash
        git --version
        ```

        If you see a version number, the installation was successful.

2.  **Install Ruby**

      * [Download RubyInstaller](https://rubyinstaller.org/downloads/), and during installation, remember to check **ridk install** and install the **MSYS2/MINGW** toolchain.
      * After installation is complete, open `Start Command Prompt with Ruby` from the Start Menu.

3.  **Install Jekyll and Bundler**

    ```bash
    gem install jekyll bundler
    jekyll -v
    ```

4.  **Create a New GitHub Pages Repository**

      * The repository name must be: `<username>.github.io`.

      * Initialize a Jekyll project locally:

        ```bash
        jekyll new myblog
        cd myblog
        ```

5.  **Modify the Gemfile**

      * Comment out `gem "jekyll"`

      * Add:

        ```ruby
        gem "github-pages", "~> 232", group: :jekyll_plugins
        ```

6.  **Install Dependencies**

    ```bash
    bundle install --verbose
    ```

    It's best to add `--verbose` here. When I was first installing, I got stuck here for a long time due to network issues and thought it wasn't running.

7.  **Start the Local Server**

    ```bash
    bundle exec jekyll serve
    ```

    Open [http://localhost:4000](https://www.google.com/search?q=http://localhost:4000) to see the result.

-----

## Understanding Jekyll's Directory Structure

The directory generated after running `jekyll new myblog`:

```
myblog/
├── _config.yml      # Configuration file
├── _posts/          # Blog post directory
├── _site/           # Generated static files
├── Gemfile          # Dependency configuration
├── about.markdown   # Example page
├── index.markdown   # Home page
```

📌 Key Points:

  * `_config.yml` → Controls website configuration
  * `_posts/` → Stores blog posts (must be named `YYYY-MM-DD-title.md`)
  * `_site/` → Generated static web pages (do not commit to GitHub)

-----

## Using a Pre-made Theme (Using Chirpy as an Example)

If you don't want to use the default template, you can download a theme from [Jekyll Themes](http://jekyllthemes.org/), such as **[Chirpy](http://jekyllthemes.org/themes/jekyll-theme-chirpy/)**.

Steps:

1.  I referred to the [Getting Started](https://chirpy.cotes.page/posts/getting-started/) guide. First, go to the repository mentioned in that article, click "Use this template" in the top right corner, then choose to create a repository. The new repository's name must be set to `<username>.github.io`.

2.  In the GitHub Pages settings, switch to deployment via **GitHub Actions**.

3.  After cloning it locally, run:

    ```bash
    bundle install --verbose
    bundle lock --add-platform x86_64-linux   # If your local machine is not Linux, run this line
    bundle exec jekyll serve
    ```

4.  Modify `_config.yml` to set the website name, author, and URL.

5.  Push to GitHub and wait for the GitHub Actions build to complete.

-----

## Personalization

### Changing the Favicon

1.  Upload your icon to [RealFaviconGenerator](https://realfavicongenerator.net/).  
    {: width="500px" style="height:auto;" }
2.  Download and unzip the files, keeping only the `.png` and `.ico` files.
3.  Copy them to `/assets/img/favicons/` and modify the corresponding entry in `_config.yml`.

-----

### Changing the Avatar

Modify in `_config.yml`:

```yaml
avatar: /assets/img/avatar.png
```

## Place your own avatar at the corresponding location.

### Writing Posts and Author Information

1.  Create a new Markdown file under `_posts/`.
    Naming convention: `YYYY-MM-DD-title.md`.

2.  It is recommended to install [jekyll-compose](https://github.com/jekyll/jekyll-compose):
    Add the following line to your Gemfile, then run `bundle` in the command line.

    ```ruby
    gem 'jekyll-compose', group: [:jekyll_plugins]
    ```

    After installation, you can directly generate a new post:

    ```bash
    bundle exec jekyll post "My New Post" --timestamp-format "%Y-%m-%d %H:%M:%S %z"
    ```

    This will automatically create the corresponding `.md` file under `_posts/`.

3.  Author Information:
    Add the following to `_data/authors.yml`:

    ```yaml
    ivan:
      name: Ivan
      url: https://github.com/ivandon15
    ```

    Then, in the post's front matter, write:

    ```yaml
    author: ivan
    ```

    This will display who wrote the article at the top of the blog post, with a clickable link.

4.  Adding Images:
    You can also add the following parameter to the front matter, which records the path for media (like images) in the current post. For this article, I set it to:

    ```yaml
    media_subpath: /assets/img/posts/tutorial/2025-09-17-create-blog
    ```

    This way, you can just write the image name directly for image paths within the article.

# Bugs

1.  I kept running into an issue where the site would display correctly locally, but only the `index.html` would show up after deploying to GitHub. I couldn't figure it out for a long time, but in the end, I just followed the Chirpy "Getting Started" guide from scratch again, and it worked...
2.  This article contained a lot of `http` links instead of `https`, which caused an error during the GitHub Actions run after committing\! I ended up just commenting out the entire "Test site" step in `pages-deploy.yml`...

# Final

That's about it\! It took up a good part of the day, but I finally checked off something I've wanted to do for a long time.