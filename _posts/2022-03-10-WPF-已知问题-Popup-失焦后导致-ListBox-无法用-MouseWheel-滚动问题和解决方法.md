---
title: "WPF 已知问题 Popup 失焦后导致 ListBox 无法用 MouseWheel 滚动问题和解决方法"
author: lindexi
date: 2022-3-11 8:25:16 +0800
CreateTime: 2022/3/10 12:09:08
categories: WPF
---

本文记录在 Popup 失焦后导致 ListBox 无法用 MouseWheel 滚动问题

<!--more-->


<!-- CreateTime:2022/3/10 12:09:08 -->

<!-- 发布 -->
<!-- 博客 -->

原因：

Popup虽然是个完整独立的窗体，但它的激活要靠它的“父窗口”间接来激活，这里之所以说是“父窗口”，是因为它本身并没有真正的“父窗口”，它只是从“父窗口”里产生的一个游离的“子窗口”，也就是说它没记住它的“父亲”，但是它的“父亲”倒是记住它了，在“父亲”被激活的时候，“父亲”会去主动激活它这个不肖的“儿子”。

所以问题解决就从激活“父窗口”开始，在Popup窗体的PreviewMouseDown事件处理函数中，直接激活“父窗口”就可以了。写成伪代码如下：

```csharp
        popup.PreviewMouseDown += DialogPopup_PreviewMouseDown;

        private void DialogPopup_PreviewMouseDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {

            this.Activate();//this为其理论上的父窗口，还请替换为你的实际代码。另外，根据代码规范，不要写 this. 哦

            this.Focus();
        }
```

