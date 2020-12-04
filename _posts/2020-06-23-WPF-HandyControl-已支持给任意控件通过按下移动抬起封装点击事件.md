---
title: "WPF HandyControl 已支持给任意控件通过按下移动抬起封装点击事件"
author: lindexi
date: 2020-12-3 20:27:49 +0800
CreateTime: 6/23/2020 10:14:02 AM
categories: WPF
---

著名的 HandyControl 已经支持给任意控件通过按下移动抬起事件，封装点击事件

<!--more-->


<!-- CreateTime:6/23/2020 10:14:02 AM -->



在 [HandyControl](https://github.com/HandyOrg/HandyControl/pull/414) 的这个 [PR](https://github.com/HandyOrg/HandyControl/pull/414) 添加了 InputClickHelper 类，这个类提供了使用控件的按下移动抬起事件封装为点击事件

使用方法：

```csharp
Install-Package HandyControl
```

给任意控件 element 附加按下移动抬起封装点击事件，下面代码的 uiElement 是一个 UIElement 控件

```csharp
HandyControl.Tools.InputClickHelper.AttachMouseDownMoveUpToClick(uiElement, UIElement_OnClicked);

        private void UIElement_OnClicked(object sender, EventArgs e)
        {
            
        }
```

此外，在 AttachMouseDownMoveUpToClick 方法还提供了按下过程中，用户移动鼠标或触摸触发的点击事件打断作为拖拽事件。使用方法如下

```csharp
HandyControl.Tools.InputClickHelper.AttachMouseDownMoveUpToClick(uiElement, UIElement_OnClicked, UIElement_OnDragStarted);

        private void UIElement_OnDragStarted(object sender, EventArgs e)
        {
            
        }
```

