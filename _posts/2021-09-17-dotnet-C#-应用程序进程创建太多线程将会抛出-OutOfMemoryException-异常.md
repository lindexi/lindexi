---
title: "dotnet C# 应用程序进程创建太多线程将会抛出 OutOfMemoryException 异常"
author: lindexi
date: 2021-9-18 8:44:14 +0800
CreateTime: 2021/9/17 19:37:42
categories: dotnet C#
---

本文记录一个 dotnet 的特性，在应用程序快速创建大量线程的时候，将会因为线程创建时没有足够的资源而创建失败，此时将会抛出 OutOfMemoryException 异常，但实际进程占用内存不多

<!--more-->


<!-- CreateTime:2021/9/17 19:37:42 -->

<!-- 发布 -->

如使用以下逗比代码进行线程的创建

```csharp
            while (true)
            {
                var thread = new Thread((_) =>
                {
                    Thread.Sleep(-1);
                });
                thread.Start();
            }
```

此时在运行时将会抛出 OutOfMemoryException 异常，在 x86 应用下，在我的设备上跑了大概 1000 个线程左右时将会炸掉，但是进程只占用了 60MB 左右的内存

[c# - Why Thread.Start can throw OutOfMemoryException - Stack Overflow](https://stackoverflow.com/questions/15789507/why-thread-start-can-throw-outofmemoryexception )



