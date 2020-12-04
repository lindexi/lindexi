---
title: "dotnet 构建 SourceRoot items must include at least one top-level item when DeterministicSourcePaths is true 失败"
author: lindexi
date: 2020-12-3 16:22:23 +0800
CreateTime: 2020/10/9 9:41:31
categories: dotnet
---

在使用 dotnet 构建的时候提示 error : SourceRoot items must include at least one top-level (not nested) item when DeterministicSourcePaths is true 构建失败

<!--more-->


<!-- CreateTime:2020/10/9 9:41:31 -->



我在库里使用了 SourceLink 这个库，用来关联代码，详细请看 [dotnet 使用 SourceLink 将 NuGet 链接源代码到 GitHub 等仓库](https://blog.lindexi.com/post/dotnet-%E4%BD%BF%E7%94%A8-SourceLink-%E5%B0%86-NuGet-%E9%93%BE%E6%8E%A5%E6%BA%90%E4%BB%A3%E7%A0%81%E5%88%B0-GitHub-%E7%AD%89%E4%BB%93%E5%BA%93.html )

此时在构建时候有如下提示

```
C:\Users\runneradmin\AppData\Local\Microsoft\dotnet\sdk\3.1.300\Roslyn\Microsoft.Managed.Core.targets(104,5): error : SourceRoot items must include at least one top-level (not nested) item when DeterministicSourcePaths is true [D:\a\dotnetCampus.Ipc\dotnetCampus.Ipc\src\dotnetCampus.Ipc.Abstractions\dotnetCampus.Ipc.Abstractions.csproj]
```

解决方法就是在 csproj 等定义 SourceRoot 这个属性的值，这个值需要表示当前的源代码的最顶层路径

```xml
<ItemGroup>
  <SourceRoot Include="../"/>
</ItemGroup>
```

下面是整个 csproj 的定义代码，方便大家了解上面代码写在哪

```xml
    <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>netcoreapp3.1</TargetFramework>
        <Nullable>enable</Nullable>
    </PropertyGroup>

    <ItemGroup>
        <SourceRoot Include="../"/>
    </ItemGroup>
```

上面代码使用的是相对的路径，而一个比较好的方法是写在 Directory.Build.props 文件里，关于  Directory.Build.props 文件，请看 [Roslyn 使用 Directory.Build.props 文件定义编译](https://blog.lindexi.com/post/Roslyn-%E4%BD%BF%E7%94%A8-Directory.Build.props-%E6%96%87%E4%BB%B6%E5%AE%9A%E4%B9%89%E7%BC%96%E8%AF%91.html )

在 Directory.Build.props 文件添加如下代码就可以

```xml
<ItemGroup>
  <SourceRoot Include="$(MSBuildThisFileDirectory)/"/>
</ItemGroup>
```

上面代码的 `$(MSBuildThisFileDirectory)` 表示的是当前文件所在的文件夹，这是构建时的常量，更多常量请看 [项目文件中的已知属性（知道了这些，就不会随便在 csproj 中写死常量啦） - walterlv](https://blog.walterlv.com/post/known-properties-in-csproj.html )

本文的解决方法是在 [DeterministicSourcePaths can break building if source control information not available · Issue #37379 · dotnet/roslyn](https://github.com/dotnet/roslyn/issues/37379 ) 找到的

