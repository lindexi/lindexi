---
title: "制作的 dotnet tool 运行失败提示依赖缺失"
author: lindexi
date: 2020-12-3 16:22:27 +0800
CreateTime: 2020/7/10 20:00:43
categories: dotnet
---

小伙伴做了一个很好用的 dotnet tool 工具，但是这个工具仅在他的设备上能运行，在我的设备上运行就会退出提示 An assembly specified in the application dependencies manifest (LindexiDoubi.deps.json) was not found 找不到依赖

<!--more-->


<!-- CreateTime:2020/7/10 20:00:43 -->



默认选择 dotnet tool 的 NuGet 包是会带上所有依赖的，和其他的 NuGet 库不相同

但是在系统日志里面看到下面代码

```csharp
Description: A .NET Core application failed.
Application: Lindexi.exe
Path: C:\Users\linde\.dotnet\tools\Lindexi.exe
Message: Error:
  An assembly specified in the application dependencies manifest (LindexiDoubi.deps.json) was not found:
    package: 'System.Globalization.Extensions', version: '4.3.0'
    path: 'runtimes/win/lib/netstandard1.3/System.Globalization.Extensions.dll'
```

也就是存在几个 dll 没有被带上，在看到小伙伴的 csproj 的库引用可以找到下面代码

```xml
<Project Sdk="Microsoft.NET.Sdk.WindowsDesktop">

  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <UseWPF>true</UseWPF>
    <RootNamespace>LindexiDoubi</RootNamespace>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <PackageId>LindexiDoubi</PackageId>
    <PackAsTool>true</PackAsTool>
    <ToolCommandName>Lindexi</ToolCommandName>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Walterlv.Themes.FluentDesign" Version="5.6.0" />
    <PackageReference Include="Walterlv.Windows.Framework" Version="5.6.0" />
    <PackageReference Include="Microsoft.CodeAnalysis.Analyzers" Version="3.0.0" PrivateAssets="all" />
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp.Workspaces" Version="3.6.0" PrivateAssets="all" />
    <PackageReference Include="System.Globalization.Extensions" Version="4.3.0"  />
  </ItemGroup>
</Project>
```

其实坑就是 `Microsoft.CodeAnalysis.Analyzers` 这几个库，因为这几个库被设置 `PrivateAssets="all"` 因此打包的时候会忽略这些库的 dll 因此找不到依赖

解决方法就是去掉 dotnet tool 项目的库的 `PrivateAssets="all"` 就可以

一开始以为是 WPF 项目不支持，实际上 WPF 项目也是可以作为 dotnet tool 包的

