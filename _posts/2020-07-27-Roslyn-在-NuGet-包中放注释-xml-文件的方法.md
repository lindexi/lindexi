---
title: "Roslyn 在 NuGet 包中放注释 xml 文件的方法"
author: lindexi
date: 2020-12-3 16:22:25 +0800
CreateTime: 2020/7/27 9:40:40
categories: Roslyn MSBuild 编译器
---

本文告诉大家如何在打出的 NuGet 包含代码的注释，这样安装了 NuGet 的小伙伴就可以在 VS 上看到对应的方法和类的注释

<!--more-->


<!-- CreateTime:2020/7/27 9:40:40 -->


<!-- 标签：Roslyn,MSBuild,编译器 -->

在使用 SDK Style 格式，可以使用下面一句话在输出的时候添加 xml 注释文件，在打包 NuGet 添加 xml 注释

```xml
<PropertyGroup>
      <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

上面代码在 csproj 中添加

另一个方法是指定 DocumentationFile 的路径

```xml
  <PropertyGroup>
    <DocumentationFile>bin\$(Configuration)\$(TargetFramework)\$(AssemblyName).xml</DocumentationFile>
  </PropertyGroup>
```

当然，上面这个方法需要指定路径

在 NuGet 包里面，按照规则，在对应的 xx.dll 或 xx.exe 存在对应的 xx.xml 文件，那么这个 xx.xml 文件将会被作为库的注释文件被 VS 使用

