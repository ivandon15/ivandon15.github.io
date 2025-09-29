---
title: Black and Flake8 让代码更规范
description: >-
  git commit 时用 pre-commit 自动运行 black 和 flake8，让代码保持整洁
author: 
   - ivan 
   - chatgpt
date: '2025-09-29 10:52:19 +0800'
categories: [Tutorial]
tags: [skill]
pin: false
media_subpath: '/assets/img/posts/tutorial/2025-09-29-code-format'
---

## 前言

在日常 Python 开发中，团队成员常常因为 **代码格式** 和 **PEP8 规范** 在 Code Review 上耗费大量精力。比如：

* 不断提醒「这里要两个空行」
* 发现行尾空格或过长行
* 容易陷入「形式」而忽略「逻辑」

为了解决这些问题，我们可以利用 **Git hooks** ——特别是 **pre-commit hook**，在提交代码前自动执行格式化和静态检查：

* **Black**：自动格式化代码，保证风格统一
* **Flake8**：检查 PEP8 合规性和潜在错误
* **pre-commit 框架**：统一管理这些检查任务

这样，提交前代码就能自动「体检」，让开发者把更多精力放在逻辑实现上，而不是格式争论。

---

## 项目集成流程

### 1. 安装 pre-commit

```bash
pip install pre-commit
```

同时把它写入 `requirements-dev.txt` 或 `pyproject.toml` 的 `[project.optional-dependencies]` 中，以便团队成员统一依赖。

### 2. 配置 `.pre-commit-config.yaml`

在项目根目录创建 `.pre-commit-config.yaml` 文件：

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: stable
    hooks:
      - id: black

  - repo: https://github.com/pycqa/flake8
    rev: 3.9.2
    hooks:
      - id: flake8
```

解释：

* `repo`: 指定 hook 来源（black 来自官方 psf，flake8 来自 pycqa）。
* `rev`: 对应工具的版本，推荐写死版本号而不是 `master`。
* `id`: 要启用的 hook 名称。
* `language_version`: 指定 Python 版本（防止环境冲突），可选，但是 python 3.12.5 会报错，尽量避免用这个版本的python。

安装 hook：

```bash
pre-commit install
```

之后，每次执行 `git commit` 时，都会先运行 black 和 flake8。

---

## Black 配置

Black 是一个「有主见」的代码格式化工具。它会统一风格，比如：

* 默认行宽 88（而非 PEP8 的 79）
* 字符串用双引号
* 函数参数过多时自动换行

如果需要定制，可以在 `pyproject.toml` 里配置：

```toml
[tool.black]
line-length = 79
include = '\.pyi?$'
exclude = '''
/(
  \.git
  | \.mypy_cache
  | \.tox
  | build
  | dist
)/
'''
```

说明：

* `line-length`: 控制最大行宽（比如改成 79）。
* `include`: 要处理的文件类型。
* `exclude`: 排除不需要格式化的目录。

---

## Flake8 配置

Flake8 主要用于 **静态检查** 和 **PEP8 合规**。为了避免和 black 产生冲突，我们需要忽略一些规则。

配置通常写在 `.flake8` 或 `setup.cfg`：

```ini
[flake8]
ignore = E203, E266, E501, W503, F403, F401
max-line-length = 79
max-complexity = 18
select = B,C,E,F,W,T4,B9
```

逐项解释：

* **ignore**

  * `E203`: 与冒号前空格相关（black 和 PEP8 有分歧）
  * `E266`: 注释过多 `#`
  * `E501`: 行过长（交给 black 控制）
  * `W503`: 换行前的运算符（新版 PEP8 推荐忽略）
  * `F403`: `import *` 检查
  * `F401`: 未使用的导入

* **max-line-length**：最大行宽，保持与 black 一致（79 或 88）。

* **max-complexity**：函数圈复杂度 ≤ 18，避免过于复杂的函数。

* **select**：启用的规则范围（bugbear、comprehensions 插件等）。

---

## 手动运行 pre-commit

即使没有安装 hook，也可以手动运行所有检查：

```bash
pre-commit run --all-files
```

这样能一次性检查并格式化整个代码库，尤其适合在提交前或 CI 流程中使用。

---

## 总结

1. 用 `pre-commit` 管理 Git hook。
2. 用 `black` 自动格式化代码。
3. 用 `flake8` 检查规范与错误。
4. 配置完成之后按照之前 git commit 完之后会执行检查，避免问题流入代码库。
5. ![alt text](pipeline.png)

这样的工作流已经成为许多开源项目的标准实践，你完全可以在自己的项目里立即应用。
---
