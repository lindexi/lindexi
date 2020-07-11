---
title: "WPF Frame 的 DataContext 不能被 Page 继承"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2018/6/11 10:48:24
categories: WPF
---

本文告诉大家在 Frame 的 DataContext 不能被 Page 继承如何解决。

<!--more-->


<!-- CreateTime:2018/6/11 10:48:24 -->

<!-- csdn -->

如果大家有研究 Frame 会发现一个诡异的现象。

假设 page 是在 Frame 里面的 Page ，通过下面的代码是可以拿到 DataContext ，而且假设 Frame 的 DataContext 就是一个定义的类 Foo 

```csharp
var frame = page.Parent as Frame;
// frame.DataContext == foo
```

但是如何直接拿 page 的 DataContext ，返回空。

原因是 Frame 是做了 Frame 里面的元素的 UI 隔离，也就是 DataContext 不能继承。

解决的方法是在 Frame 的 LoadCompleted 添加让里面元素知道 DataContext ，需要后台代码

```csharp
<Frame Name="frame"
       LoadCompleted="Frame_LoadCompleted"
       DataContextChanged="Frame_DataContextChanged"/>
```

```csharp
private void Frame_DataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
{
    UpdateFrameDataContext(sender, e);
}
private void Frame_LoadCompleted(object sender, NavigationEventArgs e)
{
    UpdateFrameDataContext(sender, e);
}
private void UpdateFrameDataContext(object sender, NavigationEventArgs e)
{
    var content = frame.Content as FrameworkElement;
    if (content == null)
    {
        return;
    }
    
    content.DataContext = frame.DataContext;
}
```

参见：[c# - page.DataContext not inherited from parent Frame? - Stack Overflow](https://stackoverflow.com/questions/3621424/page-datacontext-not-inherited-from-parent-frame )

