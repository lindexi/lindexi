---
title: "win10 uwp 如何给 DropDownButton 一个很小的宽度"
author: lindexi
date: 2020-3-11 8:30:33 +0800
CreateTime: 2020/3/11 8:29:59
categories: Win10 UWP
---

在 UWP 的 Microsoft.UI.Xaml 提供了一个带下箭头的按钮，这就是 DropDownButton 这个按钮继承 Button 按钮，基本表现相同，但是如果给这个按钮一个很小的宽度，将会看不到下箭头图片

<!--more-->


<!-- CreateTime:2020/3/11 8:29:59 -->

<!-- 发布 -->

原因是如果最小宽度那么下箭头将没有足够空间显示，虽然左边依然有空白地方，但是空白地方有最小宽度要求

解决方法是通过 Padding 属性，让整个按钮的内容移动，让空白地方移动到按钮外，让下箭头移动到可以显示的地方

```xml
<DropDownButton Margin="10,10,10,10" Width="17" Height="30" Padding="-15,0,0,0"></DropDownButton>
```

上面代码核心就是 `Padding="-15,0,0,0"` 通过 Padding 可以设置按钮的左上右下各个内容边距的值

现在看起来的效果如下图

![](https://i.stack.imgur.com/uSccD.png)

更多关于 DropDownButton 请看 [DropDownButton Class - Windows UWP applications](https://docs.microsoft.com/en-us/uwp/api/microsoft.ui.xaml.controls.dropdownbutton?view=winui-2.3 )

这是在堆栈网小伙伴问的问题，请看 [c# - Change the width of DropDownButton in UWP - Stack Overflow](https://stackoverflow.com/a/60612482/6116637 )

本文源代码放在[github](https://github.com/lindexi/lindexi_gd/tree/15af922b55e564c853842238be4a682f66b6fe6f/LeceaberheafeKeacafiwhajaibaiwhi) 欢迎小伙伴访问

