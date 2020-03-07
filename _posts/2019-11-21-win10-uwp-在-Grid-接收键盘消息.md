---
title: "win10 uwp 在 Grid 接收键盘消息"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/11/21 8:51:51
categories: Win10 UWP
---

小伙伴问我为什么他的选中的 Grid 无法接收到键盘消息，原因是在 UWP 中只有 Control 类才可以拿到键盘焦点，而 Grid 是 Panel 没有继承 Control 类所以 Grid 无法拿到焦点。需要在容器里面放一个继承 Control 的类，这个类可以接收键盘事件，通过路由事件让容器拿到键盘

<!--more-->


<!-- CreateTime:2019/11/21 8:51:51 -->

<!-- csdn -->

在 UWP 中所有的 Panel 都没有继承 Control 类，而只有在 Control 才能获取焦点，在获取焦点的方法里面有设置当前获取的是什么焦点，可以选的有 Pointer 的焦点相当于鼠标焦点，和键盘焦点逻辑焦点。只有键盘焦点才能收到键盘事件，也就是让 Grid 能接收 KeyDown 事件需要在 Grid 里面的元素拿到焦点

在 UWP 的所有 Control 都可以调用 [Control.Focus](https://docs.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.control.focus ) 方法获取焦点，所以可以让 Grid 在点击的时候设置 Grid 里面的控件焦点，这样在 Grid 里面的控件收到键盘事件时，可以通过路由事件让 Grid 收到键盘事件

定义一个空白的 Control 类，这个类主要是收到焦点

```csharp
class Foo : Control
{
    protected override void OnKeyDown(KeyRoutedEventArgs e)
    {
        Debug.WriteLine("Foo key down");
    }
}
```

在需要接收键盘消息的 Grid 里面放这个控件

```csharp
    <Grid x:Name="Grid2" Margin="10,10,10,10" Width="100" Background="#565656" HorizontalAlignment="Right" 
          KeyDown="Grid2_OnKeyDown">
        <local:Foo x:Name="Foo"></local:Foo>
    </Grid>
```

此时在 Foo 有焦点的时候，让 Grid2 收到消息，如果需要在 Grid 点击之后，让 Grid 可以收到键盘事件，需要在 Grid 里面添加 PointerRelease 方法，请看下面代码

```csharp
    private async void Grid2_OnPointerReleased(object sender, PointerRoutedEventArgs e)
    {
        await Dispatcher.RunAsync(CoreDispatcherPriority.Normal, () => { Foo.Focus(FocusState.Keyboard); });
    }
```

现在点击 Grid 会键盘在 Foo 输入，这样通过路由事件就可以让 Grid 拿到键盘事件

那么为什么上面的代码需要在 Dispatcher 里面才让 Foo 拿到键盘焦点？原因是在鼠标点击时，不仅会让 Grid 拿到鼠标焦点，此时的焦点将会在窗口的 ScrollViewer 也就是在 UWP 中窗口的滚动条里面，此时的键盘焦点也不再 Grid 里面。如果在点击时设置焦点在 Foo 那么在鼠标抬起时，将会路由到上层的 ScrollViewer 也就是在 ScrollViewer 拿到焦点。通过 Dispatcher 可以在路由完成之后延迟设置 Foo 焦点

[https://stackoverflow.com/a/58916534/6116637](https://stackoverflow.com/a/58916534/6116637)

