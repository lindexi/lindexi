---
title: "dotnet 读 WPF 源代码笔记 wpfgfx_cor3.dll 是什么文件"
author: lindexi
date: 2020-12-21 9:7:59 +0800
CreateTime: 2020/12/21 9:04:51
categories: WPF WPF源代码
---

本文是我在读 WPF 源代码做的笔记

<!--more-->


<!-- CreateTime:2020/12/21 9:04:51 -->


<!-- 标签：WPF，WPF源代码 -->
<!-- 发布 -->

通过 WPF 的[架构文档](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/wpf-architecture)可以了解到在 WPF 里面的架构如下图


![](http://image.acmx.xyz/lindexi%2F202012201558111083.jpg)

这里有一层很重要的一层是 MilCore 层，这一层将会沟通 DirectX 和 托管层，而这一层在用户端的逻辑就放在 wpfgfx_cor3.dll 文件里面

这个文件的命名定义可以从 `src\Microsoft.DotNet.Wpf\src\Shared\RefAssemblyAttrs.cs` 的 DllImport 代码里面看到有如下代码

```csharp
    internal static class DllImport
    {
        internal const string PresentationNative = "PresentationNative" + BuildInfo.WCP_VERSION_SUFFIX + ".dll";
        internal const string PresentationCFFRasterizerNative = "PresentationCFFRasterizerNative" + BuildInfo.WCP_VERSION_SUFFIX + ".dll";
        internal const string MilCore = "wpfgfx" + BuildInfo.WCP_VERSION_SUFFIX + ".dll";

        // DLL's w/o version suffix
        internal const string UIAutomationCore = "UIAutomationCore.dll";
        internal const string Wininet = "Wininet.dll";
        internal const string WindowsCodecs = "WindowsCodecs.dll";
        internal const string WindowsCodecsExt = "WindowsCodecsExt.dll";
        internal const string Mscms = "mscms.dll";
        internal const string PrntvPt = "prntvpt.dll";
        internal const string Ole32 = "ole32.dll";
        internal const string User32 = "user32.dll";
        internal const string NInput = "ninput.dll";
        internal const string ApiSetWinRT = "api-ms-win-core-winrt-l1-1-0.dll";
        internal const string ApiSetWinRTString = "api-ms-win-core-winrt-string-l1-1-0.dll";
    }
```

而 BuildInfo.WCP_VERSION_SUFFIX 的定义如下

```csharp
    internal static class BuildInfo
    {
        internal const string WCP_VERSION_SUFFIX = "_cor3";
    }
```

也就是说 `wpfgfx_cor3.dll` 中的 `_core3` 是 `WCP_VERSION_SUFFIX` 版本定义的意思，就不知道后续还加不加到 .NET 5 了哈

而 WPF GFX 本身是一个很大的代码库，如下图

![](http://image.acmx.xyz/lindexi%2F20201220166193110.jpg)

当前的 WPF 在 [https://github.com/dotnet/wpf](https://github.com/dotnet/wpf) 完全开源，使用友好的 MIT 协议，意味着允许任何人任何组织和企业任意处置，包括使用，复制，修改，合并，发表，分发，再授权，或者销售。在仓库里面包含了完全的构建逻辑，只需要本地的网络足够好（因为需要下载一堆构建工具），即可进行本地构建

