---
title: "WPF 内部的5个窗口之 MediaContextNotificationWindow"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2018/11/3 11:16:19
categories: WPF 渲染
---

本文告诉大家在 WPF 内部的5个窗口的 MediaContextNotificationWindow 是做什么的

<!--more-->


<!-- CreateTime:2018/11/3 11:16:19 -->

<!-- csdn -->
<!-- 标签：WPF，渲染 -->

在本文开始之前，希望大家先看下面的博客

[WPF的消息机制（一）- 让应用程序动起来](http://www.cnblogs.com/powertoolsteam/archive/2010/12/30/1921426.html )

[WPF的消息机制（二）- WPF内部的5个窗口之隐藏消息窗口](https://www.cnblogs.com/powertoolsteam/archive/2010/12/31/1922794.html )

[WPF的消息机制（三）- WPF内部的5个窗口之处理激活和关闭的消息窗口以及系统资源通知窗口](https://www.cnblogs.com/powertoolsteam/archive/2011/01/12/1933896.html )

而 MediaContextNotificationWindow 是在 MediaContext 的构造函数创建的，用来提供给创建他的 MediaContext 可以有接收和转发向顶级窗口广播的窗口消息的能力

在 MediaContextNotificationWindow 的代码核心是

```csharp
            HwndWrapper hwndNotification;
            hwndNotification = new HwndWrapper(0, NativeMethods.WS_POPUP, 0, 0, 0, 0, 0, "MediaContextNotificationWindow", IntPtr.Zero, null);
 
            _hwndNotificationHook = new HwndWrapperHook(MessageFilter);
 
            hwndNotification.AddHook(_hwndNotificationHook);
```

这里代码是创建在最顶层的窗口，这个窗口是不可见的，这样就可以接受到 `WM_DWMCOMPOSITIONCHANGED` 和其他的 DWM 通知。因为 DWM 通知只是广播给最顶层的窗口。

通过这个方式就可以让 WPF 的 MediaContext 接收到最顶层窗口的消息

代码请看 https://referencesource.microsoft.com/#PresentationCore/Core/CSharp/System/Windows/Media/MediaContextNotificationWindow.cs,969a2072bf29a084

