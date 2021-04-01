---
title: "如何让 Gitlab 的 Runner 在构建时拉取 Git Submodules 仓库"
author: lindexi
date: 2021-3-31 18:50:52 +0800
CreateTime: 2021/3/30 16:42:37
categories: git
---

默认的 GitLab 的 Runner 在构建时不会去拉取 Git Submodules 仓库，将会提示 Skipping Git submodules setup 跳过初始化 Git Submodule 仓库

<!--more-->


<!-- CreateTime:2021/3/30 16:42:37 -->

<!-- 发布 -->

如[官方文档](https://docs.gitlab.com/ee/ci/git_submodules.html) 的描述，只需要加上以下代码在 `.gitlab-ci.yml` 文件即可

```yml
variables:
  GIT_SUBMODULE_STRATEGY: recursive # 拉取 Submodule 内容
```

加入的逻辑和 stages 是同级，如下面例子

```yml
stages:
  - build
  - test
  - publish
# 上面代码定义了打包步骤，定义编译需要两个 job 分别是编译测试和发布，注意不同的 job 是在完全空白的项目，不会用到上一个job编译的文件

variables:
  GIT_SUBMODULE_STRATEGY: recursive # 拉取 Submodule 内容
```

设置之后可以在 GitLab 的 Runner 构建时看到如下输出

```csharp
Updating/initializing submodules recursively
```

也就是说将会自动拉取 submodules 内容

