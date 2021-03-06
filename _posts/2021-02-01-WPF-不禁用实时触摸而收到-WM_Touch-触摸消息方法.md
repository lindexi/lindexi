---
title: "WPF 不禁用实时触摸而收到 WM_Touch 触摸消息方法"
author: lindexi
date: 2021-3-5 16:31:23 +0800
CreateTime: 2021/2/1 15:56:09
categories: WPF
---

在 WPF 中，触摸默认通过 RealTimeStylus 实时触摸进来，根据官方文档，这个机制将会和 WM_Touch 触摸消息在同一个 HWND 是互斥的。而在 WPF 中按照机制，在没有禁用实时触摸下是不支持在窗口内收到 WM_Touch 触摸消息。因此想要在不禁用 WPF 实时触摸的情况下，获取 WM_Touch 触摸消息的一个方法是通过 WinForms 窗口来获取

<!--more-->


<!-- CreateTime:2021/2/1 15:56:09 -->

<!-- 发布 -->

在不禁用 WPF 的 RealTimeStylus 实时触摸下，依然可以通过 WinForms 窗口获取触摸 WM_Touch 消息，只需要在 WinForms 窗口调用 RegisterTouchWindow 就可以

通过微软官方的 [WMTouchForm demo](https://github.com/microsoft/Windows-classic-samples/blob/fe45388171f3bfef7866f654cbac588fbb6c9f52/Samples/Win7Samples/Touch/MTScratchpadWMTouch/CS/WMTouchForm.cs) 代码，可以拿到一个用 WindowsForms 实现的接收 WM_Touch 触摸消息的简单窗口


请从 [github](https://github.com/lindexi/lindexi_gd/tree/f3fbf974/KeefemjurfuFallburjelwararcha) 或 [gitee](https://gitee.com/lindexi/lindexi_gd/tree/f3fbf974/KeefemjurfuFallburjelwararcha) 拉下来代码进行测试

运行一下 demo 就会发现，在 demo 里面新建的 WPF 窗口，即使调用了 RegisterTouchWindow 也收不到 WM_Touch 触摸消息。而 WinForms 窗口可以。如文档 [Disable the RealTimeStylus - WPF .NET Framework ](https://docs.microsoft.com/en-us/dotnet/desktop/wpf/advanced/disable-the-realtimestylus-for-wpf-applications?view=netframeworkdesktop-4.8&WT.mc_id=WD-MVP-5003260 ) 所说，在 WPF 中的 RealTimeStylus 实时触摸和 WM_Touch 在同一个 HWND 是互斥的，而 WinForms 默认一个控件就是一个 HWND 因此 WinForms 就能收到触摸消息

在 WPF 中，在不禁用实时触摸情况下，所有的 WPF 窗口是无法通过 RegisterTouchWindow 收到 WM_Touch 触摸消息。而在 WPF 中如果显示了一个 WinForms 窗口，同时这个 WinForms 窗口通过 RegisterTouchWindow 注册期望收到触摸消息，那么这个 WinForms 窗口是能收到触摸消息的

如果想要禁用 WPF 的实时触摸，请看 [WPF 禁用实时触摸](https://blog.lindexi.com/post/WPF-%E7%A6%81%E7%94%A8%E5%AE%9E%E6%97%B6%E8%A7%A6%E6%91%B8.html )

更多触摸请看 [WPF 触摸相关](https://blog.lindexi.com/post/WPF-%E8%A7%A6%E6%91%B8%E7%9B%B8%E5%85%B3.html )

