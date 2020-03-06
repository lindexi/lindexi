---
title: "UWP How to custom RichTextBlock right click menu"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/3/20 9:54:54
categories: UWP
---

We can find the default RichTextBlock will show the `copy` and the `select all` menu when we right click it.
If you think the default menu is too boring, try customizing the RichTextBlock right click menu.

<!--more-->


<!-- CreateTime:2019/3/20 9:54:54 -->

<!-- csdn -->

We can use ContextFlyout to custom RichTextBlock right click menu.

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

Run the code and you can see this image.

<!-- ![](image/UWP How to custom RichTextBlock right click menu/How can I change the right click menu of a RichTextBlock in UWP.gif) -->

![](http://image.acmx.xyz/lindexi%2F201932094724277)

All code is in [github](https://github.com/lindexi/lindexi_gd/tree/7a716887868435aab72683997806c9e7133722b4/LekaryusijefowHirgemsterevepalltrallxay)

[c# - How can I change the right click menu of a RichTextBlock in UWP - Stack Overflow](https://stackoverflow.com/a/55252373/6116637 )


