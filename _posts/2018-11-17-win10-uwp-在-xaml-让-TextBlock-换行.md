---
title: "win10 uwp 在 xaml 让 TextBlock 换行"
author: lindexi
date: 2024-8-6 20:43:37 +0800
CreateTime: 2018/11/17 16:02:29
categories: Win10 UWP
---

本文告诉大家几个方法在 xaml 的 TextBlock 的 Text 换行

<!--more-->


<!-- CreateTime:2018/11/17 16:02:29 -->

<!-- csdn -->

在 xaml 可以使用 `&#x0a;` 表示换行，所以最简单的方法是在 Text 里面输入 `&#x0a;` 换行

如显示下面的图片，可以使用下面代码

<!-- ![](image/win10 uwp 在 xaml 让 TextBlock 换行/win10 uwp 在 xaml 让 TextBlock 换行0.png) -->

![](http://cdn.lindexi.site/lindexi%2F20181117153856312)

```xml
        <TextBlock Text="换行的最简单方法&#x0a;欢迎访问我博客 lindexi.gitee.io 里面有大量 UWP WPF 博客
" 
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center" />
```

如果换行需要使用 `\r\n` 可以在 xaml 使用 `&#x0d;&#x0a;` 替换

如果是在 WPF 可以通过 `LineBreak` 的方法换行

```csharp
        <TextBlock HorizontalAlignment="Center"
                   VerticalAlignment="Center">
            <TextBlock.Text>
                换行的最简单方法
                <LineBreak/>
                欢迎访问我博客 lindexi.gitee.io 里面有大量 UWP WPF 博客
            </TextBlock.Text>
        </TextBlock>
```

但是上面的方法无法在 UWP 使用

好在可以使用`xml:space="preserve"`直接输入换行

```csharp
        <TextBlock xml:space="preserve">
            <TextBlock.Text>
                换行的最简单方法
                欢迎访问我博客 lindexi.gitee.io 里面有大量 UWP WPF 博客
            </TextBlock.Text>
        </TextBlock>
```

添加了 `space` 就可以在换行的时候自动换行

如果担心在 元素 上添加 `xml:space="preserve"` 会让其他的功能不好用，可以使用资源的方法，请看代码

```csharp
        <Grid.Resources>
            <x:String x:Key="str" xml:space="preserve">
                换行的最简单方法
                欢迎访问我博客 lindexi.gitee.io 里面有大量 UWP WPF 博客
            </x:String>
        </Grid.Resources>
        <TextBlock HorizontalAlignment="Center" 
                   VerticalAlignment="Center" Text="{StaticResource str}">
         
        </TextBlock>
```

使用了 `xml:space="preserve"` 会将行前的空格也加上

<!-- ![](image/win10 uwp 在 xaml 让 TextBlock 换行/win10 uwp 在 xaml 让 TextBlock 换行1.png) -->

![](http://cdn.lindexi.site/lindexi%2F2018111716224687)

