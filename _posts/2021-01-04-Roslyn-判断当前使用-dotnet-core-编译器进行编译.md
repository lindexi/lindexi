---
title: "Roslyn 判断当前使用 dotnet core 编译器进行编译"
author: lindexi
date: 2021-3-5 16:31:22 +0800
CreateTime: 2021/1/4 19:08:32
categories: Roslyn MSBuild 编译器
---

在写 msbuild 预编译或编译调度逻辑时，如何知道当前执行的编译器使用的是上古版本的 msbuild 还是用了 dotnet core 内核的 Roslyn 编译器？本文解决的问题是我期望在 Windows 系统使用 .NET Framework 版本的工具，而在非 Windows 系统上，使用 dotnet core 版本的工具。原因是 .NET Framework 在开发者设备上都会有，用起来简单。而 dotnet core 提供了跨平台，可以在其他平台上使用

<!--more-->


<!-- CreateTime:2021/1/4 19:08:32 -->

<!-- 标签：Roslyn,MSBuild,编译器 -->
<!-- 发布 -->

在 吕水大的 入门博客 [如何创建一个基于 MSBuild Task 的跨平台的 NuGet 工具包 - walterlv](https://blog.walterlv.com/post/create-a-cross-platform-msbuild-task-based-nuget-tool ) 其实有提到使用的方法

通过 MSBuildRuntimeType 就可以判断，如下面代码

```xml
  <PropertyGroup>
    <!-- 我们使用 $(MSBuildRuntimeType) 来判断编译器是 .NET Core 的还是 .NET Framework 的。
         然后选用对应的文件夹。-->
    <NuGetWalterlvTaskFolder Condition=" '$(MSBuildRuntimeType)' == 'Core'">$(MSBuildThisFileDirectory)..\tasks\netcoreapp2.0\</NuGetWalterlvTaskFolder>
    <NuGetWalterlvTaskFolder Condition=" '$(MSBuildRuntimeType)' != 'Core'">$(MSBuildThisFileDirectory)..\tasks\net47\</NuGetWalterlvTaskFolder>
  </PropertyGroup>

```

使用 `Condition=" '$(MSBuildRuntimeType)' == 'Core'"` 可以判断当前是否使用 dotnet core 版本的编译器

细节描述如下

The type of the runtime that is currently executing. Introduced in MSBuild 15. Value may be undefined (prior to MSBuild 15), Full indicating that MSBuild is running on the desktop .NET Framework, Core indicating that MSBuild is running on .NET Core (for example in dotnet build), or Mono indicating that MSBuild is running on Mono.

更多请看 [MSBuild Reserved and Well-known Properties - Visual Studio](https://docs.microsoft.com/en-us/visualstudio/msbuild/msbuild-reserved-and-well-known-properties?view=vs-2019&WT.mc_id=WD-MVP-5003260 )

更多编译相关请看[手把手教你写 Roslyn 修改编译](https://blog.lindexi.com/post/roslyn.html )

