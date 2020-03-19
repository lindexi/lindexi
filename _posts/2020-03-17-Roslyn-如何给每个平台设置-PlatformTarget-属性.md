---
title: "Roslyn 如何给每个平台设置 PlatformTarget 属性"
author: lindexi
date: 2020-3-18 8:16:59 +0800
CreateTime: 2020/3/17 18:57:25
categories: 
---

在使用 csproj 格式，如果需要给不同的平台设置 PlatformTarget 对应平台的值，需要写比较多的代码，本文告诉大家一个简便的方法

<!--more-->


<!-- CreateTime:2020/3/17 18:57:25 -->

<!-- 发布 -->

使用三句话就完成了平台设置

```xml
<PropertyGroup>
    <PlatformTarget>$(Platform)</PlatformTarget>
</PropertyGroup>

```

上面代码和下面代码是相同的

```csharp
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|AnyCPU'">
    <PlatformTarget>AnyCPU</PlatformTarget>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x86'">
    <PlatformTarget>x86</PlatformTarget>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <PlatformTarget>x64</PlatformTarget>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|AnyCPU'">
    <PlatformTarget>AnyCPU</PlatformTarget>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x86'">
    <PlatformTarget>x86</PlatformTarget>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <PlatformTarget>x64</PlatformTarget>
  </PropertyGroup>
```

