---
title: "WPF UncommonField 类型是什么"
author: lindexi
date: 2018-3-8 16:16:23 +0800
CreateTime: 2018-3-8 16:9:20 +0800
categories: WPF .net framework .net源代码 源代码分析
---

本文告诉大家一个黑科技，这个黑科技在.net 框架外无法使用，这就是 UncommonField 。下面将会告诉大家这个类有什么用。

<!--more-->


<!-- csdn -->

<!-- 标签：WPF，.net framework,.net源代码,源代码分析 -->

如果大家有反编译 UIElement 那么就会看到下面的代码

```csharp
internal static readonly UncommonField<EventHandlersStore> EventHandlersStoreField = new UncommonField<EventHandlersStore>();
```

那么这个`UncommonField`是什么？这个类是解决`DependencyObject `使用很多内存。使用这个类可以作为轻量的`DependencyObject `因为他使用很少的内存。

因为使用了`DependencyObject `就会创建很多默认的值，无论使用的是`TextBox.Text`的依赖属性还是`Grid.Row`附加的，都会有很多不需要使用的值。但是在框架，需要使用很少的内存，所以就使用`UncommonField`。

如果使用`UncommonField`就会去掉很多元数据、校验、通知，`UncommonField`会使用和`DependencyObject `相同的机制，让他可以存放在`DependencyObject `中和其他存放的属性一样，在没有改变值的时候会使用上一级、默认的值。所以可以减少一些内存。

因为现在很少人会写出和框架一样的那么多使用依赖属性，所以就不需要使用这个功能。

参见：[https://stackoverflow.com/a/18280136/6116637](https://stackoverflow.com/a/18280136/6116637 )

[https://referencesource.microsoft.com/#WindowsBase/Base/System/Windows/UncommonField.cs](https://referencesource.microsoft.com/#WindowsBase/Base/System/Windows/UncommonField.cs )



