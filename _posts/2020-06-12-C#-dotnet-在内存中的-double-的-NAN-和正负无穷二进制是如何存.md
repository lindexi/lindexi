---
title: "C# dotnet 在内存中的 double 的 NAN 和正负无穷二进制是如何存"
author: lindexi
date: 2020-12-3 16:22:28 +0800
CreateTime: 6/12/2020 8:52:44 AM
categories: dotnet C#
---

我就好奇无穷大和 NAN 在 C# 的二进制是如何表示的

<!--more-->


<!-- CreateTime:6/12/2020 8:52:44 AM -->



揭开谜底

NAN: 00,00,00,00,00,00,F8,FF

正无穷 PositiveInfinity : 00,00,00,00,00,00,F0,7F

负无穷 NegativeInfinity : 00,00,00,00,00,00,F0,FF

测试方法如下

```csharp
        static void Main(string[] args)
        {
            MemoryStream stream = new MemoryStream();
            BinaryWriter writer = new BinaryWriter(stream);

            double db = double.NaN;
            writer.Write(db);

            Console.WriteLine(string.Join(",", stream.ToArray().Select(b => b.ToString("X2"))));

            stream.Seek(0, SeekOrigin.Begin);
            db = double.PositiveInfinity;
            writer.Write(db);
            Console.WriteLine(string.Join(",", stream.ToArray().Select(b => b.ToString("X2"))));

            stream.Seek(0, SeekOrigin.Begin);
            db = double.NegativeInfinity;
            writer.Write(db);
            Console.WriteLine(string.Join(",", stream.ToArray().Select(b => b.ToString("X2"))));
        }
```

这个值不是乱存的，有标准，请看 [IEEE 754 - Wikipedia](https://en.wikipedia.org/wiki/IEEE_754 )

是不是还有更简单的方法拿到某个变量的内存里面的值存放方法？试试下面代码

```csharp
double d = double.NaN;
Span<byte> sp = new Span<byte>(&d, sizeof(double));
```

试试看下 sp 的值

感谢 `（￣▽￣）` 小伙伴提供的方法

