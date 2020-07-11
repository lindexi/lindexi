---
title: "dotnet 列表 Linq 的 Take 用法"
author: lindexi
date: 2020-6-30 9:39:41 +0800
CreateTime: 2019/10/24 9:04:23
categories: dotnet
---

在 dotnet 可以使用 Take 获取指定数量的元素，获取顺序是从前向后，而获取到的数量是小于等于传入的指定数量。如数组中元素的数量小于传入的指定数量，则返回数组中的所有元素。如果数组中元素的数量大于等于传入的数量，则按照数组或列表顺序返回指定数量的元素

<!--more-->


<!-- CreateTime:2019/10/24 9:04:23 -->

<!-- csdn -->

在使用 Take 方法之前，请引用命名空间

```csharp
using System.Linq;
```

获取的时候通过在枚举类添加 Take 方法传入获取数量就可以返回小于或等于指定数量的元素

```csharp
            var list = new List<int>();
            for (int i = 0; i < 10; i++)
            {
                list.Add(i);
            }

            foreach (var temp in list.Take(100))
            {
                Console.WriteLine(temp);
            }
```

如上面代码，传入的获取数量是100而数组里面只有10个元素，那么将返回10个元素

一些细节如下：

如果传入的 Count 值小于等于 0 那么将会返回空列表

因为用的是延迟加载，所以没有枚举是不会执行逻辑

如果是列表将会返回 ListPartition 实例，但这是一个内部类 [ListPartition](https://github.com/dotnet/corefx/blob/fc89c884e99ef3fd920dbe75fbbaf797b02a944f/src/System.Linq/src/System/Linq/Partition.SpeedOpt.cs#L155)

更多请看 [Enumerable.Take](https://docs.microsoft.com/zh-cn/dotnet/api/system.linq.enumerable.take?view=netframework-4.8 ) 官方文档

源代码请看 [src/System.Linq/src/System/Linq/Take.cs](https://github.com/dotnet/corefx/blob/50fc80c8023060d61a826b01733a93840018fe92/src/System.Linq/src/System/Linq/Take.cs )

本文代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/230bef81356c0a666671be533adf2bdd25d96c6f/Gacwhecruinlkreeu) 欢迎小伙伴访问

