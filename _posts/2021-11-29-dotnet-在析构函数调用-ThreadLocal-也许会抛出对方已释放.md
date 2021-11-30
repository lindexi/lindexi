---
title: "dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放"
author: lindexi
date: 2021-11-29 20:30:44 +0800
CreateTime: 2021/11/29 20:27:00
categories: dotnet
---

我在不自量力做一个数组池，就是为了减少使用 System.Buffers.dll 程序集，然而在数组池里面，所用的 ThreadLocal 类型，在我对象析构函数进行归还数组时，抛出了无法访问已释放对象

<!--more-->


<!-- CreateTime:2021/11/29 20:27:00 -->

<!-- 发布 -->

先来看第一个张图，亮点在于线程是 GC 终结器线程

<!-- ![](image/dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放/dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放0.png) -->

![](http://image.acmx.xyz/lindexi%2F202111292027212000.jpg)

调用堆栈是 `~ByteListMessageStream` 函数，也就是 ByteListMessageStream 的 析构函数。代码如下

```csharp
        ~ByteListMessageStream()
        {
            _sharedArrayPool.Return(Buffer);
        }
```

<!-- ![](image/dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放/dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放2.png) -->

![](http://image.acmx.xyz/lindexi%2F202111292029373046.jpg)

在进行数组归还的时候，因为 ThreadLocal 已被释放，所在的线程也不存在。此时的访问将失败，如下图

<!-- ![](image/dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放/dotnet 在析构函数调用 ThreadLocal 也许会抛出对方已释放1.png) -->

![](http://image.acmx.xyz/lindexi%2F20211129202922896.jpg)

请大家不要重复踩入此坑

