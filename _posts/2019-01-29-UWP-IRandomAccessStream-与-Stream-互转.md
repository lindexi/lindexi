---
title: "UWP IRandomAccessStream 与 Stream 互转"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/1/29 16:33:30
categories: UWP
---

本文告诉大家如何将 IRandomAccessStream 和 Stream 互转

<!--more-->


<!-- CreateTime:2019/1/29 16:33:30 -->


<div id="toc"></div>

如果在使用网络传输文件的时候，在 UWP 经常使用将 IRandomAccessStream 和 Stream 互转。

因为在 UWP 使用打开文件作为流的最简单代码如下

```csharp
IRandomAccessStream randomAccessStream = await File.OpenAsync(FileAccessMode.Read)
```

这时通过 `using System.IO;` 可以使用扩展方法将 IRandomAccessStream 转 Stream 请看下面代码

```csharp
using System.IO;

var stream = randomAccessStream.AsStream();
```

如果需要反过来将 stream 转 IRandomAccessStream 也是同样需要引用 `using System.IO;` 来让代码可以写出扩展方法

```csharp
using System.IO;

IRandomAccessStream randomAccessStream = stream.AsRandomAccessStream();
```

https://stackoverflow.com/a/33221178/6116637

