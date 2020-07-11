---
title: "dotnet 非泛型 类型 System.Collections.IEnumerable 不能与类型实参一起使用"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:59
categories: dotnet
---

如果在开发的时候遇到非泛型 类型“IEnumerable”不能与类型参数一起使用，那么就是变量的命名空间没弄对

<!--more-->


<!-- CreateTime:2019/8/31 16:55:59 -->


在 dotnet 里面有 `System.Collections.IEnumerable` 和 `System.Collections.Generic.IEnumerable<>` 两个不同的类，带泛型的需要在 `System.Collections.Generic` 命名空间找到

如果是写了 `System.Collections.IEnumerable<Foo>` 那么请修改代码里面的命名空间 `System.Collections.Generic.IEnumerable<Foo>` 就可以通过编译

如果是使用 `IEnumerable<Foo>` 提示 不能与类型实参一起使用，那么只需要添加 using 就可以

```csharp
using System.Collections.Generic;
```

除了 IEnumerable 对于 IEnumerator 也一样，如果遇到非泛型 类型“System.Collections.IEnumerator”不能与类型实参一起使用，那么看代码里面是通过 `System.Collections.IEnumerator<Foo>` 还是 `IEnumerator<Foo>` 可以选择添加命名空间还是修改

![](https://i.loli.net/2019/04/14/5cb29f897d199.jpg)

