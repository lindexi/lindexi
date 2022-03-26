---
title: "dotnet 5 的 bin 文件夹下的 ref 文件夹是做什么用的"
author: lindexi
date: 2022-3-24 21:4:48 +0800
CreateTime: 2022/3/23 19:56:40
categories: dotnet
---

本文来和大家聊聊在 dotnet 5 和 dotnet 6 或更高版本的 dotnet 构建完成，在 bin 文件夹下，输出的 ref 文件夹。在此文件夹里面，将会包含项目程序集同名的 dll 文件，但是此 dll 文件的大小却很小，那这个文件夹是用来做什么的

<!--more-->


<!-- CreateTime:2022/3/23 19:56:40 -->

<!-- 发布 -->
<!-- 博客 -->

在使用 dotnet 5 或更高版本的 dotnet 的项目时，将会发现在项目的输出路径，将多了一个叫 ref 的文件夹，大概路径如下 `bin\Release\net6.0-windows\ref\` 此文件夹里面只包含了项目程序集同名的 dll 文件。而且此文件夹的删除不会影响到项目的执行

放在 ref 这里的程序集其实叫仅引用程序集，从 [官方文档 Reference assemblies Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/standard/assembly/reference-assemblies?WT.mc_id=WD-MVP-5003260 ) 可以看到，这里的程序集 dll 文件，其实只是包含公开的成员。例如公开的类型和公开的方法和属性等，而不包括实际的实现逻辑

在 dotnet 5 添加 ref 文件夹的一个用途是为了解决增量构建的问题，在很多大项目上，项目之间有很多引用，如果引用关系里面较底层的某个项目的代码被更改，如果没有一个好的增量构建机，最差情况下，需要将被更改的项目的上层项目全部重新构建。重新构建项目将让开发者进行摸鱼

在 dotnet 5 添加的 ref 文件夹将记录项目里的公开成员，大家都知道，如果公开的成员没有变更，那就是不需要重新构建引用项目，运行代码是兼容的，只是代码的行为变更。这就是 ref 文件夹的重要功能，用来提升开发速度，减少重新构建

那如果自己的项目本来就是不考虑被其他项目所引用的，或者说不想再加一个 ref 文件夹，可以在 csproj 上添加如下代码，添加下面代码，将在构建的时候，不会生成 ref 文件夹和不会生成仅引用程序集

```xml
<PropertyGroup>
     <ProduceReferenceAssembly>false</ProduceReferenceAssembly>
</PropertyGroup>
```

以上代码将禁用创建仅引用程序集文件，也就是将不会生成 ref 文件夹

除了修改 csproj 还可以更改 msbuild 命令，在命令加上 `/p:ProduceReferenceAssembly=false` 参数也可以

更多请看：

[Reference assemblies Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/standard/assembly/reference-assemblies?WT.mc_id=WD-MVP-5003260 )

