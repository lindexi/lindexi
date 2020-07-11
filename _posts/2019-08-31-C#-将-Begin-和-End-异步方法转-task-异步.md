---
title: "C# 将 Begin 和 End 异步方法转 task 异步"
author: lindexi
date: 2020-3-5 12:33:10 +0800
CreateTime: 2019/8/31 16:55:58
categories: C#
---

在 .NET Framework 有两个不同的异步方法，一个是 Asynchronous Programming Model (APM) 另一个是 Task-based asynchronous pattern (TAP) 说 APM 和 TAP 估计大家都不认识。其实 APM 就是有成对的 Begin 和 End 方法的异步，而 TAP 就是使用 async 和 await 的异步

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


从代码上看，使用 async 和 await 的方法比较清真，那么如何从古老的 begin 和 end 异步方法转 task 的异步方法？

在 Task 的 Factory 提供了 FromAsync 方法让大家可以将 Begin 和 End 异步方法转 task 异步，但是这个方法参数很多

在 Begin 的方法里面一般都是这样写的

```csharp
IAsyncResult BeginFoo(参数 参数1, 参数 参数2..., AsyncCallback asyncCallback, object state)
```

在 End 的方法一般都是这样写的

```csharp
返回值 EndFoo (IAsyncResult asyncResult);
```

先调用 Begin 方法传入参数，拿到了 IAsyncResult 用于传入 EndFoo 作为参数，同时在 AsyncCallback 可以传入方法完成的方法

在 FromAsync 写起来是相反的，首先需要知道 End 方法的返回值，下面使用 FileStream 作为例子，如 EndRead 是返回 int 可以使用 `Task<int>` 的方法

```csharp
Task<int>.Factory.FromAsync
```

这样就可以拿到 EndRead 的返回值

在 FromAsync 的第一个参数传入的是 BeginRead 方法，第二个参数是 EndRead 方法，然后加上的 BeginRead 方法需要传入的参数，传入除了 AsyncCallback 之外的其他参数，请看下面代码

```csharp
var task = Task<int>.Factory.FromAsync(fileStream.BeginRead, fileStream.EndRead, buffer, 0, 1024, null);
```

也就是有 `IAsyncResult BeginFoo(参数 参数1, 参数 参数2..., AsyncCallback asyncCallback, object state)` 这个方法，那么在转 async 和 await 异步，可以使用下面代码

```csharp
Task<返回值参数>.Factory.FromAsync(foo.BeginFoo, foo.EndFoo, 参数1, 参数2 ..., state)
```

[C# 中 async/await 调用传统 Begin/End 异步方法 - dudu - 博客园](https://www.cnblogs.com/dudu/p/async_await_call_begin_end_method.html )

[Asynchronous Programming Model (APM)](https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/asynchronous-programming-model-apm?wt.mc_id=MVP )

[Task-based Asynchronous Pattern (TAP)](https://docs.microsoft.com/en-us/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap?wt.mc_id=MVP )

