---
title: "dotnet 字典类找不到 TryAdd 方法"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 5/29/2020 10:29:45 AM
categories: dotnet
---

我在给 dotnet 的 runtime 仓库提PR时，小伙伴告诉我可以使用 TryAdd 方法减少判断，但是我修改这个代码发现 100 个自动化测试都失败了，都告诉我没有找到这个方法

<!--more-->


<!-- CreateTime:5/29/2020 10:29:45 AM -->



在这个更改 [https://github.com/dotnet/runtime/pull/37041](https://github.com/dotnet/runtime/pull/37041) 有小伙伴告诉我可以使用 TryAdd 方法减少判断，我添加之后发现差不多 100 个自动化测试都失败，提示下面代码


```
'Dictionary<string, string>' does not contain a definition for 'TryAdd' and no accessible extension method 'TryAdd' accepting a first argument of type
```

原因是 Microsoft.Extensions.Configuration.CommandLine 这个库使用了 dotnet standard 2.0 版本

```
  <PropertyGroup>
    <TargetFrameworks>netstandard2.0;</TargetFrameworks>
    <EnableDefaultItems>true</EnableDefaultItems>
  </PropertyGroup>
```

而 TryAdd 方法是在 .NET Standard 2.1 才添加的，也就是 2.0 是没有这个方法

[Dictionary<TKey,TValue>.TryAdd(TKey, TValue) Method (System.Collections.Generic)](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.tryadd )

