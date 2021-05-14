---
title: "WPF 适合入门阅读的开源项目 SeeGit 图形化 Git 历史记录"
author: lindexi
date: 2021-5-13 8:46:18 +0800
CreateTime: 2021/5/13 8:45:14
categories: WPF git
---

本文来安利大家一个不错的开源项目，这个开源项目整体写的不错，也有用到 MVVM 框架，项目组织以及命名等都还行，功能也实现完全，适合入门级阅读

<!--more-->


<!-- CreateTime:2021/5/13 8:45:14 -->

<!-- 发布 -->

这是一个在 GitHub 上完全开源的项目，请看 [haacked/seegit: SeeGit - The Git Repository Visualizer](https://github.com/haacked/seegit)

运行界面如 GitHub 首页所示

这个仓库使用了 QuikGraph 和 GraphShape 作为 Git 的 commit 历史记录图展示，整体代码量不多。在一些 XAML 上也有用到 Behaviors 库，逻辑分离做的还行

仓库的项目层次划分还行，看过去就能了解各个文件夹的作用，入手的难度很低

但是部分 XAML 的命名有点拉跨，而且项目也没有升级到 .NET Core 版本，还请大家取精华去糟粕

