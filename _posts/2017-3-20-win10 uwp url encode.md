---
layout: post
title:  win10 uwp url encode 
category: uwp 
---

有时候需要向网络传一些中文或其他不支持的东西，这时需要 url encode

<!--more-->
<!-- csdn -->

可以使用


```csharp
    Uri.EscapeDataString(str) 
```

转回来

```csharp
    Uri.UnescapeDataString(str)
```

<!-- 还可以使用


```csharp
     System.Web.HttpUtility.UrlEncode
```

但是两个得到是不同的 -->


  
