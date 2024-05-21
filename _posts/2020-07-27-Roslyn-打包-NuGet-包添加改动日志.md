---
title: "Roslyn 打包 NuGet 包添加改动日志"
author: lindexi
date: 2024-5-20 16:22:3 +0800
CreateTime: 2020/7/27 10:21:16
categories: Roslyn MSBuild 编译器
---

默认的 NuGet 包支持在 releaseNotes 中添加更改日志，用户可以通过更改日志了解各个版本更新的内容。在 SDK Style 格式的 csproj 文件，可以读取本地的文本文件的内容作为 NuGet 包的改动日志

<!--more-->


<!-- CreateTime:2020/7/27 10:21:16 -->


<!-- 标签：Roslyn,MSBuild,编译器 -->

在我的团队的 CBB 基础库项目的文件规范，要求每个项目都会包含 README.md 和 CHANGELOG.md 文件，其中的 CHANGELOG.md 文件就是记录 API 变更等的改动记录文件

在更改日志写的比较好的项目是 Office 团队的 [Open-XML-SDK 项目的 CHANGELOG.md 文件](https://github.com/OfficeDev/Open-XML-SDK/blob/5f91dbd7258b9906c265a33172b0b8d988e66f0c/CHANGELOG.md) 这个文件记录了每次 PR 包含的更改

在 SDK Style 里面让打包的 NuGet 添加改动日志的方法是设置 PackageReleaseNotes 属性的值，如下面代码

```xml
  <PropertyGroup>
    <PackageReleaseNotes># 1.0

  测试</PackageReleaseNotes>
  </PropertyGroup>
```

而在项目就包含了 CHANGELOG.md 文件

那么是否可以在 SDK Style 格式的项目文件里面读取项目的 CHANGELOG.md 或 RELEASE-NOTES.txt 的内容，作为 NuGet 包的 ReleaseNotes 内容？可以通过下面几个方法

```xml
  <PropertyGroup>
    <ChangeLogFile>$(MSBuildProjectDirectory)\CHANGELOG.md</ChangeLogFile>
    <PackageReleaseNotes>$([System.IO.File]::ReadAllText($(ChangeLogFile)))</PackageReleaseNotes>
  </PropertyGroup>
```

上面这个方法将会使用读取文件的方式，将 `ChangeLogFile` 的内容读取，然后将文本作为 PackageReleaseNotes 属性的内容。这里需要注意 ChangeLogFile 文件需要使用 Utf-8 编码

上面代码的 `$(MSBuildProjectDirectory)` 表示的是 csproj 项目文件所在的文件夹的路径，如果是期望获取当前的文件的文件夹，可以使用 `$(MSBuildThisFileDirectory)` 获取当前文件所在的文件夹。上面代码如果写在 csproj 文件，那么 `$(MSBuildThisFileDirectory)` 和 `$(MSBuildProjectDirectory)` 是相同的

另一个方法不是很靠谱，是通过 Target 读取文件的方式，这个方法不靠谱原因是 GenerateNuspec 不一定触发

```xml
<Target Name="PreparePackageReleaseNotesFromFile" BeforeTargets="GenerateNuspec">
  <ReadLinesFromFile File="../RELEASE-NOTES.txt" >
    <Output TaskParameter="Lines" ItemName="ReleaseNoteLines"/>
  </ReadLinesFromFile>
  <PropertyGroup>
    <PackageReleaseNotes>@(ReleaseNoteLines, '%0a')</PackageReleaseNotes>
  </PropertyGroup>
</Target>
```

上面代码读取 RELEASE-NOTES.txt 文件作为变更日志的内容

详细请看 [项目文件中的已知 NuGet 属性（使用这些属性，创建 NuGet 包就可以不需要 nuspec 文件啦](https://blog.csdn.net/WPwalter/article/details/80371265 )

[项目文件中的已知属性（知道了这些，就不会随便在 csproj 中写死常量啦） - walterlv](https://blog.walterlv.com/post/known-properties-in-csproj.html )

