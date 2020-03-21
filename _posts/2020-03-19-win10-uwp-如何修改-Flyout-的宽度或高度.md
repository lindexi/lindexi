---
title: "win10 uwp 如何修改 Flyout 的宽度或高度"
author: lindexi
date: 2020-3-20 9:19:52 +0800
CreateTime: 2020/3/19 19:04:05
categories: Win10 UWP
---

本文告诉大家如何修改 Flyout 的尺寸

<!--more-->


<!-- CreateTime:2020/3/19 19:04:05 -->

<!-- 发布 -->

在[堆栈](https://stackoverflow.com/q/60753124/6116637)有小伙伴问如何修改 Flyout 的宽度，他看到宽度会使用第一个元素的大小而不是最大的

```xml
<AppBarButton>
    <AppBarButton.Flyout>
        <Flyout>
            <ListView>
                <x:String>Short</x:String>
                <x:String>Very very very long</x:String>
                <x:String>Short</x:String>
                <x:String>Short</x:String>
                <x:String>Short</x:String>
                <x:String>Short</x:String>
                <x:String>Short</x:String>
                <x:String>Short</x:String>
            </ListView>
        </Flyout>
    </AppBarButton.Flyout>
</AppBarButton>
```

大概他的代码运行的界面如下

<!-- ![](image/win10 uwp 如何修改 Flyout 的宽度或高度/win10 uwp 如何修改 Flyout 的宽度或高度0.png) -->

![](http://image.acmx.xyz/lindexi%2F2020319195303952.jpg)

可以通过两个方法修改 Flyout 的宽度或高度

第一个方法是通过修改 Flyout 的里元素宽度和高度的方式，如下面代码

```xml
    <AppBarButton Margin="10,10,10,10">
        <AppBarButton.Flyout>
            <Flyout>
                <ListView Width="500">
                    <x:String>Short</x:String>
                    <x:String>Very very very long</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                </ListView>
            </Flyout>
        </AppBarButton.Flyout>
    </AppBarButton>
```

上面代码就是将 ListView 设置一个宽度，这样默认就会使用这个元素的宽度作为 Flyout 的宽度，我将代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/bf7171894bf89dffc9689b3e40a1c09e0a1a24f4/KaynufoherHukiwaybicika) 欢迎小伙伴访问

如果此时的窗口的大小变小了，那么 Flyout 也会自动修改自己的宽度和高度，可以使用FlyoutPresenterStyle属性修改

```xml
    <AppBarButton Margin="10,10,10,10">
        <AppBarButton.Flyout>
            <Flyout>
                <Flyout.FlyoutPresenterStyle>
                    <Style TargetType="FlyoutPresenter">
                        <Setter Property="MinWidth" Value="500"></Setter>
                    </Style>
                </Flyout.FlyoutPresenterStyle>
                <ListView >
                    <x:String>Short</x:String>
                    <x:String>Very very very long</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                    <x:String>Short</x:String>
                </ListView>
            </Flyout>
        </AppBarButton.Flyout>
    </AppBarButton>
```

上面代码通过 MinWidth 设置了最小需要的宽度，如果想要设置高度相信小伙伴也知道如何修改

上面代码有一个细节是需要设置 `TargetType="FlyoutPresenter"` 才可以

上面代码也放在 [github](https://github.com/lindexi/lindexi_gd/tree/e2a80dab9092a14fbfc42d283d72a6c773893f8a/KaynufoherHukiwaybicika) 欢迎小伙伴访问

如果是后台代码写的，也可以设置 FlyoutPresenter 的值

```csharp
private void Flyout_Opened(object sender, object e)
{         
    Flyout f = sender as Flyout;
    Style s = new Windows.UI.Xaml.Style { TargetType = typeof(FlyoutPresenter) };
    s.Setters.Add(new Setter(MinHeightProperty, "200"));        
    s.Setters.Add(new Setter(MinWidthProperty, "200"));
    f.FlyoutPresenterStyle = s;
}
```

我推荐使用 Flyout 这个控件解决了很多 Popup 的坑

