---
title: "VisualStudio 各版本 msbuild 路径"
author: lindexi
date: 2022-1-7 20:18:4 +0800
CreateTime: 2020/1/16 19:45:51
categories: VisualStudio
---

本文收藏各个版本的 MSBuild 文件默认所在的路径

<!--more-->


<!-- CreateTime:2020/1/16 19:45:51 -->


通过 vswhere.exe 工具找到路径，可以解决多个版本的 vs 不知道使用哪个的问题。其调用方法如下

```
"C:\Program Files (x86)\Microsoft Visual Studio\Installer\vswhere.exe" -latest -prerelease -products * -requires Microsoft.Component.MSBuild -find MSBuild\**\Bin\MSBuild.exe
```

VisualStudio 2022 企业版

```
C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Msbuild\Current\Bin\MSBuild.exe
```

VisualStudio 2022 专业版

```
C:\Program Files\Microsoft Visual Studio\2022\Professional\Msbuild\Current\Bin\MSBuild.exe
```

VisualStudio 2022 社区版

```
C:\Program Files\Microsoft Visual Studio\2022\Community\Msbuild\Current\Bin\MSBuild.exe
```

VisualStudio 2019 企业版

```
C:\Program Files (x86)\Microsoft Visual Studio\2019\Enterprise\MSBuild\Current\Bin\MSBuild.exe
```

VisualStudio 2019 专业版

```
C:\Program Files (x86)\Microsoft Visual Studio\2019\Professional\MSBuild\Current\Bin\MSBuild.exe
```

VisualStudio 2019 社区版

```
C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\MSBuild\Current\Bin\MSBuild.exe
```


