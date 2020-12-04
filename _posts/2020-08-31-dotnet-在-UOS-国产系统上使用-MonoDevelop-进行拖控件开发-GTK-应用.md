---
title: "dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 2020/8/31 20:33:41
categories: dotnet
---

先从一个 Hello World 应用开始，试试和古老的 WinForms 一样的拖控件式开发

<!--more-->


<!-- CreateTime:2020/8/31 20:33:41 -->



在创建完成一个 GTK# 2.0 应用之后，咱可以试试开始拖控件的开发，当然这个开发方式开发出来的应用界面有点古老。不过作为玩还是不错的

先拖入一个容器，和 WPF 一样，窗口里面的内容只允许一项，如果这一项是组件，那么意味着不能添加其他的元素，因此此时推荐使用是一个一个容器

接着拖入一个按钮和一个文本

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/拖控件.gif) -->

![](https://i.loli.net/2020/08/31/szJaTSQ5lVwqCnP.gif)

然后点击按钮的属性的 Label 修改按钮显示文本内容为 Click 如下图

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用0.png) -->

![](http://image.acmx.xyz/lindexi%2F20208312037516614.jpg)

选择文本，设置文本内容是空字符串

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用1.png) -->

![](http://image.acmx.xyz/lindexi%2F20208312038494826.jpg)

按钮点击的事件，可以在属性的信号里面找到点击事件

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用2.png) -->

![](http://image.acmx.xyz/lindexi%2F20208312039183956.jpg)

填写事件名，此时将会在 MainWindow.cs 文件创建方法

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用3.png) -->

![](http://image.acmx.xyz/lindexi%2F20208312039488826.jpg)

返回代码，在按钮点击方法里面设置文本内容

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用4.png) -->

![](http://image.acmx.xyz/lindexi%2F20208312040217849.jpg)

此时运行代码，可以看到如下界面

<!-- ![](image/dotnet 在 UOS 国产系统上使用 MonoDevelop 进行拖控件开发 GTK 应用/点击按钮.gif) -->

![](http://image.acmx.xyz/lindexi%2F%25E7%2582%25B9%25E5%2587%25BB%25E6%258C%2589%25E9%2592%25AE.gif)

这就是最简单的拖控件的方法

