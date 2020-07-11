---
title: "C# 如何引用 WshShell 类"
author: lindexi
date: 2020-3-5 12:33:10 +0800
CreateTime: 2019/8/31 16:55:58
categories: C#
---

如果想要创建快捷方式等，很多使用都需要引用 WshShell 类，这个类需要通过 COM 的方法引用

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


引用 WshShell 不是在一个程序集，而是 Windows Script Host Object Model 一个 COM 组件，通过下面步骤可以引用

创建一个控制台项目，右击引用，添加 COM 请看下图

<!-- ![](image/C# 如何引用 WshShell 类/C# 如何引用 WshShell 类0.png) -->

![](http://image.acmx.xyz/lindexi%2F2019319102415818)

添加命名空间 `using IWshRuntimeLibrary;` 就可以使用了

参见 [使用 C# 代码创建快捷方式文件 - walterlv](https://blog.walterlv.com/post/create-shortcut-file-using-csharp.html )

[Windows Script Host: Scripting; Management Services](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/cc784547(v%3dws.10) )

