---
title: "dotnet core 和 .NET 5 不支持 Prefer32Bit 首选 32 位的功能"
author: lindexi
date: 2021-7-21 8:56:13 +0800
CreateTime: 2021/7/21 8:52:19
categories: dotnet
---

我尝试在 dotnet core 和 dotnet 5 的应用上，右击项目属性，在生成界面勾选首选 32 位的功能，然而在 x64 下没有生成 PE32+ 的应用

<!--more-->


<!-- CreateTime:2021/7/21 8:52:19 -->

<!-- 发布 -->

这是 .NET Core 以及以上版本不支持的功能，勾选了无效，在 csproj 上添加如下代码也无效

```xml
<PropertyGroup Condition="'$(Platform)'=='AnyCPU'">
  <PlatformTarget>AnyCPU</PlatformTarget>
  <Prefer32Bit>true</Prefer32Bit>
</PropertyGroup>
```

没有什么非常特别的理由，就是不支持而已

更多细节请看 

[.NET Assembly “Cross-Bitness” Loading – Mihai-Albert.com](https://mihai-albert.com/2019/03/10/net-assembly-cross-bitness-loading/ )

["Prefer32Bit" property remains true when PlatformTarget is x64, but checkbox is empty and disabled. · Issue #5933 · dotnet/project-system](https://github.com/dotnet/project-system/issues/5933 )

[Startup Sequence of a .NET Core App – Mihai-Albert.com](https://mihai-albert.com/2020/03/08/startup-sequence-of-a-dotnet-core-app/#bitness )

[c# - 'Prefer 32-bit' in Visual Studio Generates 64-bit Code Under Console App (.NET Core) - Stack Overflow](https://stackoverflow.com/questions/60324529/prefer-32-bit-in-visual-studio-generates-64-bit-code-under-console-app-net-c )

[Remove "Prefer 32bit" Property from .NET Core Projects · Issue #5074 · dotnet/project-system](https://github.com/dotnet/project-system/issues/5074 )

[dotnet 5 wpf did not respect "Prefer32Bit" setting · Issue #4872 · dotnet/wpf](https://github.com/dotnet/wpf/issues/4872 )

[WPF 编译为 AnyCPU 和 x86 有什么区别](https://blog.lindexi.com/post/WPF-%E7%BC%96%E8%AF%91%E4%B8%BA-AnyCPU-%E5%92%8C-x86-%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB.html )

