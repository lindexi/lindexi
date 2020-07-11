---
title: "C# 如何给 ValueTuple 返回值添加注释"
author: lindexi
date: 2020-3-5 12:33:10 +0800
CreateTime: 2019/8/31 16:55:58
categories: C#
---

在 C# 7.0 可以在一个方法的返回，返回多个参数，通过 ValueTuple 的方法，但是和单个参数返回不同的是，如何对多个参数返回每个参数进行单独的注释？

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


如使用下面的代码，我尝试在一个方法返回两个不同的概念的值，在之前，如果通过 out 的返回，我可以单独给每个参数做注释

```csharp
static (int s, int t) F(int x, int y)
{
    return (x + y, x - y);
}
```

我找了很多博客，发现可以使用的方法是在返回值注释里面使用 para 分割多个参数

```csharp

/// <returns>
/// <para>
/// 注释 s 参数
/// </para>
/// <para>
/// 注释 t 参数
/// </para>
/// </returns>
static (int s, int t) F(int x, int y)
{
    return (x + y, x - y);
}
```

现在 [Proposal: multiple returns tags and name attributes in doc comments for a tuple return value · Issue #145 · dotnet/csharplang](https://github.com/dotnet/csharplang/issues/145 ) 还在想如何给多个参数返回值添加文档注释

如果你有好想法，欢迎在这个[帖子](https://github.com/dotnet/csharplang/issues/145) 回复

