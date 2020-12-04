---
title: "WPF 漂亮的现代化控件 新 ModernWPF 界面库"
author: lindexi
date: 2020-12-3 16:22:28 +0800
CreateTime: 2020/9/10 20:01:15
categories: WPF
---

这是一个在 GitHub 上完全开源的库，有十分漂亮的界面，整个都是 Win10 风，界面部分和默认 UWP 相近

<!--more-->


<!-- CreateTime:2020/9/10 20:01:15 -->



这个库支持了 .NET Framework 4.5 和以上的版本，以及 .NET Core 3.0 和以上的版本，可以在 Windows Vista SP2 和以上的系统运行

界面如下

<!-- ![](image/WPF 漂亮的现代化控件 新 ModernWPF 界面库/WPF 漂亮的现代化控件 新 ModernWPF 界面库0.png) -->

![](http://image.acmx.xyz/lindexi%2F2020910202507110.jpg)

使用方法简单，从 NuGet 上安装 ModernWpfUI 库，然后打开 App.xaml 添加下面代码

```xml
<Application
    ...
    xmlns:ui="http://schemas.modernwpf.com/2019">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ui:ThemeResources />
                <ui:XamlControlsResources />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
```

更多请到 GitHub 的仓库：[Kinnara/ModernWpf: Modern styles and controls for your WPF applications](https://github.com/Kinnara/ModernWpf )

