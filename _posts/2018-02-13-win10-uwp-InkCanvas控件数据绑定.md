---
title: "win10 uwp InkCanvas控件数据绑定"
author: lindexi
date: 2024-5-20 16:22:6 +0800
CreateTime: 2018/2/13 17:23:03
categories: Win10 UWP
---

本文主要说如何绑定InkCanvas，让笔画变化的时候我们可以知道。

<!--more-->


<!-- CreateTime:2018/2/13 17:23:03 -->


<div id="toc"></div>

我们本来的InkCanvas没有提供笔画绑定，所以我们自己写

```csharp
using Windows.UI.Input.Inking;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

public static class InkCanvasBinder
{
    public static InkStrokeContainer GetInkStrokes(DependencyObject obj) => 
        obj.GetValue(InkStrokesProperty) as InkStrokeContainer;

    public static void SetInkStrokes(DependencyObject obj, InkStrokeContainer value) => 
        obj.SetValue(InkStrokesProperty, value);

    public static DependencyProperty InkStrokesProperty = DependencyProperty.RegisterAttached(
        "InkStrokes", typeof(InkStrokeContainer), typeof(InkCanvasBinder),
        new PropertyMetadata(null, InkStrokesProperty_PropertyChanged));

    private static void InkStrokesProperty_PropertyChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
    {
        var inkCanvas = d as InkCanvas;
        if (inkCanvas != null) inkCanvas.InkPresenter.StrokeContainer = e.NewValue as InkStrokeContainer;
    }
}
```

我们使用InkCanvas

```xml
<InkCanvas local:InkCanvasBinder.InkStrokes="{x:Bind AnInkStrokeContainer}" />
```

参见：https://github.com/Microsoft/Windows-task-snippets/blob/master/tasks/InkCanvas-data-binding.md


