---
title: "Xamarin 和 WPF 的控件和属性的替换"
author: lindexi
date: 2020-2-3 11:9:1 +0800
CreateTime: 2020-2-3 11:8:52 +0800
categories: WPF
---

基本上 Xamarin 和 WPF 的技术是相同的，但是有一些小细节和属性不同，本文记录一些不同的点，方便小伙伴将 WPF 项目迁移为 Xamarin 项目

<!--more-->


<!-- 发布 -->

需要注意的是 Xamarin 原生支持作为 WPF 控件运行，支持在 WPF 运行，反过来不可以

也就是用 Xamarin.Forms 写的应用能作为 UWP 和 WPF 应用运行，也可以作为 Android 和 IOS 运行，也可以使用 GTK# 在 Linux 下运行。本文只是告诉大家如何从一个已有的 WPF 项目迁移到 Xamarin 上

## StackPanel

在 WPF 的 StackPanel 需要换 StackLayout 布局，以下是属性的更改

```csharp
HorizontalAlignment-HorizontalOptions
VerticalAlignment-VerticalOptions
MinWidth-MinimumWidthRequest
```

## TextBlock

用 Label 替换

## TextBox

用 Editor 替换

## Button

将 Click 事件替换为 Clicked 事件，后台代码替换

```csharp

从

        private void Button_OnClick(object sender, RoutedEventArgs e)
        {

        }

替换为

        private void Button_Clicked(object sender, EventArgs e)
        {

        }
```

