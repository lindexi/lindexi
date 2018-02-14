---
title: "win10 uwp Fluent Design System 实践"
author: lindexi
date: 2018-2-13 17:23:3 +0800
CreateTime: 2018-2-14 10:5:57 +0800
categories: Win10, UWP
---

本文告诉大家我收集的一些 Fluent Design System 设计，希望能给大家一些帮助。
需要知道 Fluent Design System 是微软在最近提出的，有  Light、Depth、Motion、Material、Scale 几个理念，Fluent Design System的简称是 FDS。如何设计请看 [Build Amazing Apps with Fluent Design ](https://channel9.msdn.com/Events/Build/2017/B8034 )

<!--more-->


<!-- csdn -->

下面是我从系统收集的界面

## 设置

无边框的设计按钮在这里使用，可以看到无边框的按钮会在之后很多使用，如果大家在设计按钮的时候，试试直接使用。

![](http://7xqpl8.com1.z0.glb.clouddn.com/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F201812585415.jpg)

无边框按钮请看 [[UWP]使用Reveal - dino.c - 博客园](http://www.cnblogs.com/dino623/p/Reveal.html )，里面的代码直接拿就可以做出无边框的按钮，下面是 dino 大神做出的界面

![](https://images2017.cnblogs.com/blog/38937/201801/38937-20180118201118240-1586298023.gif )

需要知道 dino 大神的按钮使用的设计是 Reveal，Reveal 是光照效果，给应用带来深度的交互。更多关于Reveal，请到[Reveal highlight ](https://docs.microsoft.com/en-us/windows/uwp/design/style/reveal )

## 开始

在开始菜单也使用fds，主要是ListView 使用。

![](http://7xqpl8.com1.z0.glb.clouddn.com/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F201812591821.jpg)

如何在软件使用毛玻璃，请看 [win10 uwp 毛玻璃 - 林德熙](https://lindexi.oschina.io/lindexi/post/win10-uwp-%E6%AF%9B%E7%8E%BB%E7%92%83.html )

