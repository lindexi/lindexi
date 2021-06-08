---
title: "WPF 在窗口的 Deactivated 使用 Mouse 的 Capture 将会让进程失去交互"
author: lindexi
date: 2021-6-7 8:53:37 +0800
CreateTime: 2021/6/7 8:50:52
categories: WPF
---

如果在某个窗口的 Deactivated 事件里面，使用 Mouse.Capture 方法，让这个窗口重新捕获鼠标，那么将会让进程的所有窗口都失去鼠标交互，点击无效，只有在切换到其他进程的窗口之后，才能让窗口继续交互

<!--more-->


<!-- CreateTime:2021/6/7 8:50:52 -->


<!-- 发布 -->

实现这个坑的逻辑很简单，假定有两个窗口，分别是 MainWindow 和 Window1 两个窗口，在 Window1 的 Deactivated 事件里面，使用 Mouse.Capture 方法，让这个窗口重新捕获鼠标

```csharp
        public Window1()
        {
            InitializeComponent();

            Deactivated += Window1_Deactivated;
        }

        private void Window1_Deactivated(object sender, EventArgs e)
        {
            Mouse.Capture(this);
        }
```

先点击 Window1 激活，然后点击 MainWindow 的空白，切换到 MainWindow 窗口。接着点击任何的窗口或窗口的按钮等，都没有响应

在 WPF 发现鼠标点击失效，或者触摸失效等时，可以全局搜一下 Mouse.Capture 方法，看是否在窗口的 Deactivated 事件里面调用

本来还想聊聊为什么这样做就会失去鼠标焦点的，然而 10 点多了

