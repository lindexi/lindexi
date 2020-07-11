---
title: "dot net double 数组转 float 数组"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2018/12/25 9:27:46
categories: C# dotnet
---

本文告诉大家如果遇到 double 数组转 float 数组千万不要使用 Cast ，一般都使用 select 强转。

<!--more-->


<!-- CreateTime:2018/12/25 9:27:46 -->
 

<!-- 标签：C#,dotnet -->

最近在开发[Avalonia](https://github.com/AvaloniaUI/Avalonia ) ，有大神告诉我，下面的代码可以这样写

```csharp
dashes = pen.DashStyle.Dashes.Select(x => (float)x).ToArray();

```

修改为

```csharp
dashes = pen.DashStyle.Dashes.Cast<float>.ToArray()
```

[Improve tiny performance](https://github.com/AvaloniaUI/Avalonia/pull/1472 )

但是实际上不能这样写，因为 cast 无法转换 float 和 double 因为不存在一个类同时继承 float 和 double ，所以如果使用这个方法转换，就无法运行

```csharp
System.InvalidCastException:“Unable to cast object of type 'System.Double' to type 'System.Single'.”
```

所以建议的方法是使用 select ，在里面强转。

尝试运行下面代码

```csharp
            List<double> titHruxvrvaa = new List<double>()
            {
                1d,
                2d,
                3d
            };

            var traStqjq = titHruxvrvaa.Cast<float>().ToArray();//System.InvalidCastException:“Unable to cast object of type 'System.Double' to type 'System.Single'.”

            foreach (var temp in traStqjq)
            {
                Console.WriteLine(temp);
            }
```

