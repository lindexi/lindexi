---
title: "WPF 绑定继承的样式提示 只能根据带有基类型 IFrameworkInputElement 的目标类型的 Style 样式"
author: lindexi
date: 2020-12-3 20:27:51 +0800
CreateTime: 2020/7/20 17:58:20
categories: WPF
---

在 WPF 中，如果有一个样式是继承另一个样式，而样式没有使用 TargetType 那么在运行的时候会提示 只能根据带有基类型 IFrameworkInputElement 的目标类型的 Style 样式

<!--more-->


<!-- CreateTime:2020/7/20 17:58:20 -->



在界面添加下面代码

```xml
    <Window.Resources>
        <Style x:Key="Style1" TargetType="{x:Type ButtonBase}">
        </Style>
        <Style x:Key="ButtonStyle1" BasedOn="{StaticResource Style1}"></Style>
    </Window.Resources>

    <Grid>
        <ToggleButton Style="{StaticResource ButtonStyle1}"></ToggleButton>
    </Grid>
```

运行将会提示

```
只能根据带有基类型“IFrameworkInputElement”的目标类型的 Style。
```

调用的堆栈

```
   at System.Windows.Style.Seal()
   at System.Windows.StyleHelper.UpdateStyleCache(FrameworkElement fe, FrameworkContentElement fce, Style oldStyle, Style newStyle, Style& styleCache)
   at System.Windows.FrameworkElement.OnStyleChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
   at System.Windows.DependencyObject.OnPropertyChanged(DependencyPropertyChangedEventArgs e)
   at System.Windows.FrameworkElement.OnPropertyChanged(DependencyPropertyChangedEventArgs e)
   at System.Windows.DependencyObject.NotifyPropertyChange(DependencyPropertyChangedEventArgs args)
   at System.Windows.DependencyObject.UpdateEffectiveValue(EntryIndex entryIndex, DependencyProperty dp, PropertyMetadata metadata, EffectiveValueEntry oldEntry, EffectiveValueEntry& newEntry, Boolean coerceWithDeferredReference, Boolean coerceWithCurrentValue, OperationType operationType)
   at System.Windows.DependencyObject.SetValueCommon(DependencyProperty dp, Object value, PropertyMetadata metadata, Boolean coerceWithDeferredReference, Boolean coerceWithCurrentValue, OperationType operationType, Boolean isInternal)
   at System.Windows.DependencyObject.SetValue(DependencyProperty dp, Object value)
   at System.Windows.Baml2006.WpfKnownMemberInvoker.SetValue(Object instance, Object value)
   at MS.Internal.Xaml.Runtime.ClrObjectRuntime.SetValue(XamlMember member, Object obj, Object value)
   at MS.Internal.Xaml.Runtime.ClrObjectRuntime.SetValue(Object inst, XamlMember property, Object value)
```

原因是 ButtonStyle1 没有设置 TargetType 所以解决方法如下

```csharp
        <Style x:Key="ButtonStyle1" TargetType="{x:Type ButtonBase}" BasedOn="{StaticResource Style1}"></Style>
```

给 ButtonStyle1 添加 TargetType 属性

本文代码放在[github](https://github.com/lindexi/lindexi_gd/tree/42addec904d5736ef5db9e48cadcc7a3471c4eb8/QeakalharjerhallnuLikegowe)欢迎小伙伴访问


