---
title: "dotnet C# 使用 EqualityComparer 提升泛型值类型相等判断性能"
author: lindexi
date: 2021-6-26 8:29:35 +0800
CreateTime: 2021/6/25 19:30:39
categories: dotnet C#
---

本文也叫跟着 Stephen Toub 大佬学性能优化系列，这是我从 Stephen Toub 大佬给 WPF 框架做性能优化学到的知识，通过 EqualityComparer 静态类的相等方法来优化值类型相等判断性能

<!--more-->


<!-- CreateTime:2021/6/25 19:30:39 -->

<!-- 发布 -->

在一些泛型类型里面，需要进行值相等判断，此时默认就是使用 Equals 方法，如下面代码

```csharp
public override bool Contains(T value)
{
    return _loneEntry.Equals(value);
}
```

还请忽略上面代码的 `_loneEntry` 字段，但是以上的代码调用的 Equals 方法的参数是 object 类型，也就是调用 Equals 方法将会装箱。根据 C# 基础知识，如果有装箱那就有对象分配

也就是每调用一次如上的方法，将会有一次内存对象的分配

可以通过 EqualityComparer 方法来优化性能，使用 EqualityComparer 可以继续使用泛型判断，可以减少内存分配

```csharp
public override bool Contains(T value)
{
    return EqualityComparer<T>.Default.Equals(_loneEntry, value);
}
```

本文的优化的例子代码请看 [Avoid boxing in FrugalList by stephentoub · Pull Request #4724 · dotnet/wpf](https://github.com/dotnet/wpf/pull/4724 )

更多请看 [【.net 深呼吸】EqualityComparer——自定义相等比较 - 东邪独孤 - 博客园](https://www.cnblogs.com/tcjiaan/p/5700192.html )

