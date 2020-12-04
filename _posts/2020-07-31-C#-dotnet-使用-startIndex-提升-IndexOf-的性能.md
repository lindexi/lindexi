---
title: "C# dotnet 使用 startIndex 提升 IndexOf 的性能"
author: lindexi
date: 2020-12-3 16:22:15 +0800
CreateTime: 2020/7/31 19:20:53
categories: dotnet C#
---

在代码审查 WPF 仓库的时候，小伙伴告诉我说使用 dotnet core 版本的 WPF 开了 ReadyToRun 的提升还不够大，他准备开始一大波业务无关的优化，其中就包含了 xaml 中的字符串相关优化。我在 davidwrighton 大大的优化代码和 pentp 大大的代码审查里面学到了使用 startIndex 提升 IndexOf 的性能，本文就来和大家分享一下

<!--more-->


<!-- CreateTime:2020/7/31 19:20:53 -->



假定只有一个字符的匹配，例如从字符串里面找到 `:` 属于第几个字符，可以如何写？最简单的是如下面代码

```csharp
int colonIdx = uriInput.IndexOf(":");
```

上面代码是 WPF 的源代码，优化之前的代码 [Baml2006Reader.cs ae1790531](https://github.com/davidwrighton/wpf/blob/ae1790531c3b993b56eba8b1f0dd395a3ed7de75/src/Microsoft.DotNet.Wpf/src/PresentationFramework/System/Windows/Markup/Baml2006/Baml2006Reader.cs#L2068) 在 [Use faster char based overload of String.IndexOf](https://github.com/davidwrighton/wpf/commit/00a26a27b8e1e939f4011bf0bcdd8c7f969f1176 ) 优化之后的代码是 [Baml2006Reader.cs 00a26a27](https://github.com/davidwrighton/wpf/blob/00a26a27b8e1e939f4011bf0bcdd8c7f969f1176/src/Microsoft.DotNet.Wpf/src/PresentationFramework/System/Windows/Markup/Baml2006/Baml2006Reader.cs#L2068) 可以看到优化就是将只有一个字符的字符串替换为字符

```csharp
int colonIdx = uriInput.IndexOf(':');
```

这样写能提升不少的性能，为什么呢？答案是显然的，我就不多说了

而即使是这样的优化，在 [Pent Ploompuu](https://github.com/pentp) 大佬看起来依然有优化空间，那就是 startIndex 参数，从业务上，在这里进来的参数都是至少超过4个字符，这就是我为什么选用这个例子的原因

在业务上，会输入的 uri 合法的输入一定不会在第一个字符里面就包含了 `:` 一般都是在第 4 个字符。假定在第 4 个字符之前存在 `:` 那么也是不合法的

此时的优化就是添加 startIndex 进行更快速的寻找

当然，这必须需要了解业务才能这样做的哦，不然就是挖坑了

例如输入是以下代码

```csharp
a:bc:a
```

此时如果加上 startIndex 跳过了 4 个字符，那么刚好返回以为预期的值，但事实上的输入是不合法的

