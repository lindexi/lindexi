---
title: "dotnet 新 sdk style 项目格式 文件冲突"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/12/7 8:55:34
categories: dotnet
---

在使用 dotnet 的 sdk style 项目格式，会默认在项目上引用文件，此时如果是从旧格式迁移，那么会发现文件冲突。多次引用相同文件

<!--more-->


<!-- CreateTime:2019/12/7 8:55:34 -->

<!-- csdn -->

在 [从以前的项目格式迁移到 VS2017 新项目格式](https://blog.lindexi.com/post/%E4%BB%8E%E4%BB%A5%E5%89%8D%E7%9A%84%E9%A1%B9%E7%9B%AE%E6%A0%BC%E5%BC%8F%E8%BF%81%E7%A7%BB%E5%88%B0-VS2017-%E6%96%B0%E9%A1%B9%E7%9B%AE%E6%A0%BC%E5%BC%8F.html ) 告诉大家如何迁移，但是迁移完成会发现有文件冲突

如 cs 文件重复，默认的格式会引用所有的 `*.cs` 文件，如果此时在项目中因为有一些文件是排除文件，不能直接使用 `*.cs` 需要写引用的是哪个文件，在编译会发现文件被多次引用，此时可以在 PropertyGroup 添加下面代码

```csharp
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
```
	
如果提示嵌入的资源冲突了，也就是添加了默认的嵌入资源。默认添加的嵌入资源是按照文件后缀名添加，我的项目对这些后缀名的文件是不需要加入的，迁移项目格式就加入，编译的文件就比原来大。可以添加下面代码，不加入默认的文件

```csharp
    <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
```

对于 WPF 项目，默认的 Page 文件也会被加入，可以通过下面代码解决

```csharp
    <EnableDefaultPageItems>false</EnableDefaultPageItems>
```

大概的项目需要添加下面代码

```csharp
 <PropertyGroup>
    <TargetFramework>net47</TargetFramework>
    <OutputType>Library</OutputType>
    <RootNamespace>lindexi</RootNamespace>
    <AssemblyName>lindexi</AssemblyName>

    <GenerateAssemblyInfo>false</GenerateAssemblyInfo>
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
    <EnableDefaultPageItems>false</EnableDefaultPageItems>
    <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
  </PropertyGroup>
```

