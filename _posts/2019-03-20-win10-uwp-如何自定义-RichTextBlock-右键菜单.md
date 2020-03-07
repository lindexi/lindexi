---
title: "win10 uwp 如何自定义 RichTextBlock 右键菜单"
author: lindexi
date: 2020-3-5 12:33:14 +0800
CreateTime: 2019/3/20 9:54:09
categories: Win10 UWP
---

默认的 RichTextBlock 的邮件菜单是包含复制和全选，如果想要自定义菜单可以添加 ContextFlyout 属性

<!--more-->


<!-- CreateTime:2019/3/20 9:54:09 -->

<!-- cdsn -->

通过下面代码可以让右击菜单自定义，请将内容替换为你需要的，触发点击事件可以通过 Click 方法

```csharp
        <RichTextBlock HorizontalAlignment="Center" VerticalAlignment="Center">
            <RichTextBlock.ContextFlyout>
                <MenuFlyout>
                    <MenuFlyoutItem Text="1" />
                    <MenuFlyoutItem Text="2" />
                </MenuFlyout>
            </RichTextBlock.ContextFlyout>
            <Paragraph>Welcome to my blog http://blog.lindexi.com I write some UWP blogs</Paragraph>
        </RichTextBlock>
```

运行上面代码可以看到这个图片

![](http://image.acmx.xyz/lindexi%2F201932094724277)

代码在 [github](https://github.com/lindexi/lindexi_gd/tree/7a716887868435aab72683997806c9e7133722b4/LekaryusijefowHirgemsterevepalltrallxay)

[c# - How can I change the right click menu of a RichTextBlock in UWP - Stack Overflow](https://stackoverflow.com/a/55252373/6116637 )

