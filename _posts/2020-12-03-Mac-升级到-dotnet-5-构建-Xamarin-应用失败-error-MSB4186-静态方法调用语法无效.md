---
title: "Mac 升级到 dotnet 5 构建 Xamarin 应用失败 error MSB4186 静态方法调用语法无效"
author: lindexi
date: 2020-12-3 17:9:54 +0800
CreateTime: 2020/12/3 9:55:35
categories: dotnet
---

我昨天将 Mac 构建机器也升级到了 dontet 5 最新版。但是在升级之后，所有的 Xamarin 项目都在 Mac 版本的 VisualStudio 构建不通过，提示  error MSB4186: 静态方法调用语法无效。解决方法就是将 VisualStudio 更新到最新版本

<!--more-->


<!-- CreateTime:2020/12/3 9:55:35 -->

在升级到 dotnet 5 之后，在 Mac 设备上使用 Mac 版本的 VisualStudio 构建 Xamarin 项目将提示如下代码

/usr/local/share/dotnet/sdk/5.0.100/Sdks/Microsoft.NET.Sdk/targets/Microsoft.NET.TargetFrameworkInference.targets(54,5): error MSB4186: 静态方法调用语法无效:“[MSBuild]::GetTargetFrameworkIdentifier('$(TargetFramework)')”。Method '[MSBuild]::GetTargetFrameworkIdentifier' not found. 静态方法调用应采用以下形式:$([FullTypeName]::Method())，例如 $([System.IO.Path]::Combine(`a`, `b`))。请检查确保所有参数均已定义、其类型正确无误，并且按正确的顺序指定

解决方法就是将 VisualStudio 更新到最新版本

<!-- ![](image/Mac 升级到 dotnet 5 构建 Xamarin 应用失败 error MSB4186 静态方法调用语法无效/Mac 升级到 dotnet 5 构建 Xamarin 应用失败 error MSB4186 静态方法调用语法无效0.png) -->

![](http://image.acmx.xyz/lindexi%2F2020123955448402.jpg)

