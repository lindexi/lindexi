---
title: "VisualStudio 各版本 msbuild 路径"
author: lindexi
date: 2020-1-15 15:37:24 +0800
CreateTime: 2020-1-15 15:37:17 +0800
categories: VisualStudio
---

本文收藏 msbuild 所在路径

<!--more-->


<!-- 发布 -->

通过 vswhere.exe 工具找到路径，可以解决多个版本的 vs 不知道使用哪个

```
"C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe" -latest -prerelease -products * -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe
```

VisualStudio 2019 企业版

```
C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\MSBuild.exe
```

