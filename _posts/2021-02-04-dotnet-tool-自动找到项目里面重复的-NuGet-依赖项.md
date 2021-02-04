---
title: "dotnet tool 自动找到项目里面重复的 NuGet 依赖项"
author: lindexi
date: 2021-2-4 8:46:28 +0800
CreateTime: 2021-2-4 8:44:58 +0800
categories: dotnet
---

使用新的 SDK 风格的 csproj 的时候，允许 NuGet 包进行依赖传递。意思是如果我 A 项目安装了库 L 那么如果有 B 项目引用 A 项目，那么自动 B 项目也就安装了库 L 而不需要项目 B 再次手动安装。也就是如果此时的 B 项目里面也加上了 L 库的安装，那么这个安装就是多余的。本文安利大家一个工具，可以自动了解有哪些项目的哪些库是多余安装的，通过依赖传递就能安装上，不需要手动安装，可以删除

<!--more-->


<!-- 发布 -->

这是一个 dotnet tool 工具，在使用之前需要使用如下命令进行安装

```
dotnet tool install -g snitch
```

在自己的项目分析有哪些项目的哪些库是可以删除的，可以通过如下命令分析

```
snitch Foo.sln
```

请将 Foo.sln 替换为你自己的项目文件

通过此工具分析之后，就可以了解具体项目上有哪些库可以删除

在删除掉多余的库之后，就能减少 NuGet 的版本的冲突，也让 csproj 的内容更少，在修改 csproj 的时候的冲突也会更少

此工具在 [GitHub](https://github.com/spectresystems/snitch ) 完全开源，请看 [spectresystems/snitch: A tool that help you find duplicate transitive package references.](https://github.com/spectresystems/snitch )

更多好用的工具请看 [一些好用的 dotnet tool 工具](https://blog.lindexi.com/post/%E4%B8%80%E4%BA%9B%E5%A5%BD%E7%94%A8%E7%9A%84-dotnet-tool-%E5%B7%A5%E5%85%B7.html )

