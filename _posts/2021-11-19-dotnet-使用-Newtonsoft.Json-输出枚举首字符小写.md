---
title: "dotnet 使用 Newtonsoft.Json 输出枚举首字符小写"
author: lindexi
date: 2021-11-20 8:28:21 +0800
CreateTime: 2021/11/19 19:05:42
categories: dotnet
---

本文告诉大家如何使用 Newtonsoft.Json 输出枚举首字符小写

<!--more-->


<!-- CreateTime:2021/11/19 19:05:42 -->

<!-- 发布 -->
<!-- 博客 -->

实现方法是加上 JsonConverterAttribute 特性，传入 StringEnumConverter 转换器，再加上参数设置首字符小写

如下面代码

```csharp
class F1
{
    [JsonConverter(typeof(StringEnumConverter), true)]
    public Foo Foo { get; set; }
}

enum Foo
{
    Axx,
    AxxBxx,
}
```

在使用 StringEnumConverter 时，可以通过构造传入参数，设置是否使用 camelCase 风格。传入参数时，可以在 JsonConverterAttribute 特性上，加上参数

