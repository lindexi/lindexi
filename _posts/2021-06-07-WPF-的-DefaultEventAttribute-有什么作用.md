---
title: "WPF 的 DefaultEventAttribute 有什么作用"
author: lindexi
date: 2021-6-7 8:53:41 +0800
CreateTime: 2021/6/7 8:50:52
categories: WPF
---

在自定义 WPF 控件库时，可以看到有一些控件会加上 DefaultEventAttribute 特性，通过这个特性可以告诉 XAML 编辑器，默认创建的事件是什么

<!--more-->


<!-- CreateTime:2021/6/7 8:50:52 -->


<!-- 发布 -->

如编写一个 UserControl1 的用户自定义控件，可以在 xaml.cs 代码加上此特性

```csharp
    [DefaultEvent("Foo")]
    public partial class UserControl1
    {
        public event EventHandler Foo;
    }
```

在 MainWindow 上添加 UserControl1 然后构建一下代码

```csharp
<local:UserControl1 />
```

在 XAML 编辑器双击一下 UserControl1 控件，可以看到自动生成如下代码

```csharp
<local:UserControl1 Foo="UserControl1_Foo"/>

        private void UserControl1_Foo(object sender, EventArgs e)
        {

        }
```

