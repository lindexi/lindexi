---
title: "C# 为什么不建议对任意的 IEnumerable 反转"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 4/7/2020 7:31:49 PM
categories: C#
---

我想要反转一个枚举，但是代码审查没过，这是为什么

<!--more-->


<!-- CreateTime:4/7/2020 7:31:49 PM -->



在 C# 里面可以使用 IEnumerable 表示枚举值，而我提供了一个库给小伙伴用，这个库包含了这个方法，需要在某个不知道从哪里来的枚举值进行反转然后处理业务

小伙伴说代码审查没过，原因是在他的设备上一运行就占用了 100G 的内存

我写的代码也很简单

```csharp
        private static void Foo(IEnumerable<int> list)
        {
            foreach (var temp in list.Reverse())
            {
                // 业务
            }
        }
```

上面的代码有什么坑

虽然反转一个枚举可以使用 Reverse 方法，很方便，但是这个方法需要先将值进行 ToArray 然后再反转

而小伙伴可以通过下面代码写出一个有无限大的数组请看代码

```csharp
        private static IEnumerable<int> WarellereleKeneaberecembe()
        {
            while (true)
            {
                yield return 0;
            }
        }
```

反转是需要知道这个值的最后一个是什么，按照上面的代码，对于一个有无限大的容量的数组，求最大的元素是哪个，其实就是无限大，刚好无限大在内存是无法表示的，所以就会不断申请内存计算

```csharp
        static void Main(string[] args)
        {
            foreach (var temp in WarellereleKeneaberecembe().Reverse())
            {
                
            }
        }

        private static IEnumerable<int> WarellereleKeneaberecembe()
        {
            while (true)
            {
                yield return 0;
            }
        }
```

在想要写出 IEnumerable 反转之前，请先想一下上面的代码。特别是在做库的时候，小伙伴会传入的值会挖坑，所以我推荐反转需要知道这是有限数组

