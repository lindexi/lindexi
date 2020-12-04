---
title: "C# dotnet TypeForwarding 的用法"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 5/21/2020 2:15:43 PM
categories: dotnet C#
---

在 CLR 中提供这样的支持，某个类从程序集 A 放到了程序集 B 里面，可以通过一些黑科技让类型就像原本就在程序集 A 一样。用这个方法可以比较好的解决兼容性的问题

<!--more-->


<!-- CreateTime:5/21/2020 2:15:43 PM -->



例如我写了一个程序集 A 里面有一个 Foo 类，后续我发现这个类其实应该放在程序集 B 里面

如果我直接移动到程序集 B 里面，那么将会让原本在程序集 A 里面寻找的代码跑不过。例如有很多项目都是引用 A 程序集而不知道存在 B 程序集，而一次性更改这么多项目也不靠谱

一个解决方法是将类型从程序集 A 放到程序集 B 里面，但是注意命名空间和类名等都需要保持相同。然后通过在程序集 A 里面添加 TypeForwarding 特定，然后将程序集 A 引用程序集 B 这样就能做到让原本引用程序集 A 的项目依然能从程序集 A 里面找到类型

```csharp
// 程序集 A 将原本代码去掉，替换为 TypeForwardedTo 引用程序集 B 相同命名空间的类
[assembly:TypeForwardedTo(typeof(Xx.Foo))]

// namespace Xx
// {
// 	public class Foo
// 	{

// 	}
// }
```

而根据 NuGet 的做法，高版本可以覆盖低版本，也就是我在很多项目里面虽然引用的是旧版本的 A 程序集，但是在入口项目，也就是最终输出的项目里面是引用了最新版本的 A 程序集。这个最新版本的 A 程序集将会引用 B 程序集，同时使用上面方法引用了 B 程序集的类型

本文代码是小伙伴提供的代码，请看 [ikriv-samples/TypeForwardingTest: CLR has a feature to forward type implementation to another assembly](https://github.com/ikriv-samples/TypeForwardingTest )

[微软官方的 NuGet 包是如何做到同时兼容新旧框架的？例如 System.ValueTuple 是如何做到在新旧版本的框架都能使用的？ - walterlv](https://blog.walterlv.com/post/microsoft-dotnet-packages-use-typeforwarded-to-keep-compatibility.html?tdsourcetag=s_pcqq_aiomsg )

