---
title: "wpf VisualBrush 已知问题"
author: lindexi
date: 2020-9-29 11:4:53 +0800
CreateTime: 2019/7/12 21:07:41
categories: WPF
---

本文告诉大家，visualBrush 已知 bug ，希望大家使用 VisualBrush 时可以知道

<!--more-->


<!-- CreateTime:2019/7/12 21:07:41 -->

<!-- csdn -->

1. 如果把 VisualBrush 绑定的是在元素加入到视觉树前，那么在元素加入到视觉树之后移除视觉树，VisualBrush 就不会自动刷新

1. 如果把没有加入视觉树的元素加入到 VisualBrush 绑定，之后把元素加入视觉树，再移除，再加入，这时可能 VisualBrush 不再刷新

1. 如果在 VisualBrush 获取到元素之后，设置元素的 visibility 为 Collapsed 那么 VisualBrush 不会更新布局，详细请看[The VisualBrush only refresh the visual but not the layout when the Visual visibility changes](https://github.com/dotnet/wpf/issues/1241 )

1. 如果元素绑定 VisualBrush 然后对元素使用 RenderTargetBitmap 就会让 VisualBrush 无法使用。

解决方法，设置 VisualBrush 的 Visual 为空再设置元素

```csharp
var visual = visualBrush.Visual;
visualBrush.Visual = null;
visualBrush.Visual = visual;
```

参见：[https://stackoverflow.com/a/3073378/6116637](https://stackoverflow.com/a/3073378/6116637)

[https://stackoverflow.com/a/13182210/6116637](https://stackoverflow.com/a/13182210/6116637)

[WPF 如何处理VisualBrush停止更新问题](https://huchengv5.gitee.io/post/WPF-%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86VisualBrush%E5%81%9C%E6%AD%A2%E6%9B%B4%E6%96%B0%E9%97%AE%E9%A2%98.html )

