---
title: "C# dotnet Thread.GetCurrentProcessorId 和 CurrentProcess.Id 的区别"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 6/28/2020 10:25:07 AM
categories: dotnet C#
---

使用 Thread.GetCurrentProcessorId 可以获取当前线程处理器的 Id 是哪个，而通过 Process.GetCurrentProcess().Id 可以获取当前进程的 Id 号，这两个的差别从上面描述就能看出

<!--more-->


<!-- CreateTime:6/28/2020 10:25:07 AM -->



更进一步的 Thread.GetCurrentProcessorId() 方法将会缓存处理器的 Id 因此前后两次线程如果处理器切换，此时拿到的值是不对的。在官方文档里面说了使用代码不得依赖于其正确性，因此这个值基本上只在 DUMP 使用

而 Process.GetCurrentProcess().Id 是一个不需要 win32 的支持的方法，获取速度特别快，详细请看 [.NET 中 GetProcess 相关方法的性能 - walterlv](https://blog.walterlv.com/post/performance-of-get-process.html )

获取速度如下

```csharp
// 100 次执行耗时

    Process.GetProcesses()
        00:00:00.7254688
    Process.GetProcessById(id)
        00:00:01.3660640（实际数值取决于当前进程数）
    Process.GetProcessesByName("Walterlv.Demo")
        00:00:00.5604279
    Process.GetCurrentProcess()
        00:00:00.0000546

```

