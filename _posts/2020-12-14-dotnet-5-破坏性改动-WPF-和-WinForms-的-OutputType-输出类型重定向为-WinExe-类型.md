---
title: "dotnet 5 破坏性改动 WPF 和 WinForms 的 OutputType 输出类型重定向为 WinExe 类型"
author: lindexi
date: 2021-4-24 11:47:50 +0800
CreateTime: 2020/12/14 8:36:58
categories: WPF dotnet
---

官方团队为了防逗比，默认将 OutputType 输出类型重定向为 WinExe 类型，这样能解决很多新手遇到的 WPF 项目显示出黑框控制台界面问题。而对于一些老司机来说，这个特点反而有点迷，特别是在尝试打开控制台调试的时候

<!--more-->


<!-- CreateTime:2020/12/14 8:36:58 -->

<!-- 发布 -->

在开始之前，先复习一下 OutputType 这个属性的作用，这个属性告诉了 SDK 程序集输出的文件是什么。可以选的值是 Library 类库和 Exe 控制台程序以及 WinExe 带界面的程序

而 Exe 和 WinExe 的差别对于 WPF 和 WinForms 程序来说就是是否在启动的时候显示出控制台出来。而在 dotnet 5 的时候，只要引用了 WPF 或 WinForms 的 SDK 内容，那么 SDK 默认将会重定向 OutputType 为 WinExe 类型

这个行为也能说明为什么引用了 WPF 之后，运行程序之后啥都没发生。因为如果原先是控制台程序，引用了 WPF 之后不显示控制台了，但是项目原先又没有显示如任何的窗口，就好像应用啥都不做一样

如果想要禁用这个默认的行为，只需要在 csproj 上添加 DisableWinExeOutputInference 属性修改为 true 就可以了，代码如下

```xml
    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <DisableWinExeOutputInference>true</DisableWinExeOutputInference>
        <TargetFramework>net5.0-windows</TargetFramework>
        <UseWPF>true</UseWPF>
    </PropertyGroup>
```

更多细节请看官方文档 [Breaking change: OutputType set to WinExe for WPF and WinForms apps](https://docs.microsoft.com/en-us/dotnet/core/compatibility/windows-forms/5.0/automatically-infer-winexe-output-type?WT.mc_id=WD-MVP-5003260)

