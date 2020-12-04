---
title: "Xamarin Forms 4.7 支持更简化的 Grid 行列布局写法"
author: lindexi
date: 2020-12-3 20:36:13 +0800
CreateTime: 6/22/2020 8:26:10 AM
categories: Xamarin
---

尽管非官方提供的 Grid 行列简化版本特别多，但是在最近这样的简写方法才被合并到了主仓库。整个 Xamarin Forms 都是开源的，任何小伙伴都可以发布自己的私有版本。也因此有很多有趣的小伙伴说，我这么好的功能就是不想放在官方，我只是用的爽就可以了。不过，也有很多小伙伴十分慷慨，我就是要放在官方，让更多的小伙伴用的爽。本文要和大家介绍的是一个用起来爽的功能

<!--more-->


<!-- CreateTime:6/22/2020 8:26:10 AM -->
<!-- 标签：Xamarin -->



我的小伙伴 [Morten Nielsen](https://github.com/dotMorten) 和我吹水说他有一个提议被合并到了 Xamarin 的官方主仓库里面，可以让 Grid 的行列定义更加简单

让咱先看看原先版本的行列定义是怎样的

```xml
    <Grid>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="1*" />
            <ColumnDefinition Width="2*" />
            <ColumnDefinition Width="Auto" />
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="300" />
        </Grid.ColumnDefinitions>
        <Grid.RowDefinitions>
            <RowDefinition Height="1*" />
            <RowDefinition Height="Auto" />
            <RowDefinition Height="25" />
            <RowDefinition Height= "14" />
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>
        <!-- 忽略代码 -->
    </Grid>
```

这是标准版本的 Grid 行列布局定义，上面代码将定义了一个网格，可以看到代码量还是比较多的

而简化之后的版本，可以使用如下定义

```xml
<Grid ColumnDefinitions="1*, 2*, Auto, *, 300"
      RowDefinitions="1*, Auto, 25, 14, 20">
        <!-- 忽略代码 -->
</Grid>
```

是不是觉得瞬间代码就变少了

这个功能其实已经存在很久了，只是都没有合并到官方项目里面，毕竟这个写法还是有一定的争议的

看起来这个写法不错，那么接下来我要在 WPF 官方开源项目里面顶一下 [Morten Nielsen](https://github.com/dotMorten) 看看能不能将这样的代码也合并到 WPF 官方开源项目里面

如果能赶上的话，大概可以在 WPF 的 .NET 5 发布，也就是 WPF 5 的时候一起上



