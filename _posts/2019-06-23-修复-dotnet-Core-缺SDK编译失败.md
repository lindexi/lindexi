---
title: "修复 dotnet Core 缺SDK编译失败"
author: lindexi
date: 2020-3-5 12:33:15 +0800
CreateTime: 2019/6/23 10:55:09
categories: dotnet
---

在打开一个 sln 项目包含 dotnet core 的时候，可能在打开的时候提示找不到 sdk 一般是没有在安装的时候安装对应的开发

<!--more-->


<!-- CreateTime:2019/6/23 10:55:09 -->


如果在导入一个 sln 文件的时候看到下面的提示

```
.NETCore SDK Not Found
```

![](http://image.acmx.xyz/5c82777e-6e2b-4d9b-a07f-5d83e2ae2cd7201612485939.jpg)

需要判断现在使用是Vs2015或VS2017版本

如果是2015，去 [https://github.com/aspnet/Tooling/blob/master/known-issues-vs2015.md](https://github.com/aspnet/Tooling/blob/master/known-issues-vs2015.md) 下载对应版本

如果是2017，去 [https://github.com/aspnet/Tooling/blob/master/known-issues-vs2017.md](https://github.com/aspnet/Tooling/blob/master/known-issues-vs2017.md)  下载

当然不想下载，修改`global.json`文件，将使用的版本号修改为当前你的设备已经安装的版本

```
{
  "projects": [ "src", "test" ],
  "sdk": 
  {
    "version": "1.0.0-preview2-003121"  你需要的版本
  }
}
```

