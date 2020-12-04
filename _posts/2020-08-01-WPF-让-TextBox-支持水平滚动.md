---
title: "WPF 让 TextBox 支持水平滚动"
author: lindexi
date: 2020-12-3 16:22:27 +0800
CreateTime: 2020/8/1 11:32:15
categories: WPF
---

超级简单的方法，只需要设置 HorizontalScrollBarVisibility 可见就可以了

<!--more-->


<!-- CreateTime:2020/8/1 11:32:15 -->



但是为什么我设置了，没有水平滚动条呢？也许是设置了 TextWrapping 属性

```csharp
            <TextBox x:Name="Text" HorizontalScrollBarVisibility="Visible" Margin="10,10,10,10" TextWrapping="Wrap" AcceptsReturn="True"></TextBox>
```

因为 TextWrapping 设置为 Wrap 就会在超过框架自动换行，因此就不需要滚动条

所以看到 HorizontalScrollBarVisibility 设置了，但是滚动条不显示，就是 设置了 TextWrapping 的问题

代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/c5085f37e1867a9835c68993ed15aee168976805/HalujakenifawFarlurjibellerwa) 欢迎小伙伴访问

更复杂的方法请看 [WPF实现滚动显示的TextBlock - Hello——寻梦者！ - 博客园](https://www.cnblogs.com/seekdream/p/6293563.html )

