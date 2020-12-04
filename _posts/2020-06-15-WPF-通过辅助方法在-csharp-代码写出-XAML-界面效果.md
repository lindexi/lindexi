---
title: "WPF 通过辅助方法在 csharp 代码写出 XAML 界面效果"
author: lindexi
date: 2020-12-3 16:22:26 +0800
CreateTime: 6/15/2020 6:01:13 PM
categories: WPF
---

我看到了 MUV 的写法，发现其实默认 WPF 也是支持了大部分了，小部分还不支持的需要改一下 WPF 框架，反正现在 WPF 框架也开源了，我也算是 WPF 框架的开发者，也能构建发布自己的版本

<!--more-->


<!-- CreateTime:6/15/2020 6:01:13 PM -->



本文的内容不需要使用德熙发布的版本，而是默认的 WPF 就可以支持了，写出的效果如下

```csharp
            var border = new Border()
            {
                Background = Brushes.Gray,
                Width = 100,
                Height = 100,
                Child = new Grid
                {
                    Children =
                    {
                        new StackPanel()
                        {
                            Orientation = Orientation.Horizontal,
                            VerticalAlignment = VerticalAlignment.Bottom,
                            Margin = new Thickness(10, 10, 10, 10),
                            Children =
                            {
                                new Button
                                {

                                }.Do(b => { b.Click += Foo_Click; })
                            }
                        }
                    }
                }
            };
```

在 C# 写界面代码的时候会遇到的问题是事件的监听等问题，本文主要是解决事件监听的问题，写法很简单，添加下面这个辅助方法

```csharp
    public static class UIInitExtensions
    {
        public static Button Do(this Button button, Action<Button> action)
        {
            action(button);
            return button;
        }
    }
```

注意的点是扩展方法需要返回自身，这样才能在后台代码写

