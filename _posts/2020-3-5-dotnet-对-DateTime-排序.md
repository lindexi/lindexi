---
title: "dotnet 对 DateTime 排序"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/9/29 14:55:49
categories: dotnet
---

在写 DateTime 排序时，按照时间的先后，离现在过去越远的越小。按照从小到大排序，将会先排最过去的时间，最后的值的时间是最大的。将时间按照从1970开始计算秒数，可以算出数值，数值代表值大小

<!--more-->


<!-- CreateTime:2019/9/29 14:55:49 -->

<!-- csdn -->

通过 List 的 OrderBy 是从时间从小到大升序排列，也就是最之前的时间排在最前，如下面的测试代码

```csharp
            var dateTimeList = new List<DateTime>()
            {
                DateTime.Now,
                DateTime.Now.AddHours(1),
                DateTime.Now.AddHours(2),
            };
```

此时用下面代码进行排序

```csharp
            foreach (var dateTime in dateTimeList.OrderBy(temp => temp))
            {
                Console.WriteLine(dateTime);
            }
```

可以看到输出，最 15 点开始

```csharp
2019/9/29 15:00:00
2019/9/29 16:00:00
2019/9/29 17:00:00
```

反过来，按照从未来到过去的顺序，从大到小排列，可以使用 OrderByDescending 方法

```csharp
            foreach (var dateTime in dateTimeList.OrderByDescending(temp => temp))
            {
                Console.WriteLine(dateTime);
            }
```

如果列表里面某个类，那么按照时间排序可以传入对应属性

其实在开始写的过程，有点无法理解时间排序，问了小伙伴说按照从1970到现在秒数排列就可以，此时就知道从小到大排序是按照从过去到现在的时间，这篇文章有些水

本文代码放在 [github](https://github.com/lindexi/lindexi_gd/blob/65637abed6e0d5268eb34e3df7457ffdad5c9172/LabairliwoKelluyewhidee) 欢迎小伙伴下载

