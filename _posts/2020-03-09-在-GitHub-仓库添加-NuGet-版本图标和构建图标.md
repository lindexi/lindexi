---
title: "在 GitHub 仓库添加 NuGet 版本图标和构建图标"
author: lindexi
date: 2020-3-9 10:12:15 +0800
CreateTime: 2020/3/9 9:48:05
categories: git
---

其实这两篇博客我都写过，但是放在一起方便我新建项目的时候复制代码。在 GitHub 的首页上，很多开源项目都会写出当前构建是通过还是不通过，如果是提供 NuGet 包的还添加 NuGet 版本图标

<!--more-->


<!-- CreateTime:2020/3/9 9:48:05 -->

<!-- 发布 -->

我推荐在 Github 上使用 Action 构建，此时可以通过 [Github 添加 Action 编译图标](https://blog.lindexi.com/post/Github-%E6%B7%BB%E5%8A%A0-Action-%E7%BC%96%E8%AF%91%E5%9B%BE%E6%A0%87.html) 这个方法添加构建图标

写法是 `![](https://github.com/组织或个人/仓库/workflows/执行Action的Name注意转码/badge.svg)` 

而添加 NuGet 版本图标可以使用以下格式

```csharp
[![](https://img.shields.io/nuget/v/NuGet包的Id字符串.svg)](https://www.nuget.org/packages/NuGet包的Id字符)
```

看起来上面这个链接复杂的原因是包含了图片和图片点击跳转的链接

仅图片代码是 `![](https://img.shields.io/nuget/v/NuGet包的Id字符串.svg)` 而仅链接代码是 `[这是链接显示文字](https://www.nuget.org/packages/NuGet包的Id字符)` 将链接里面的显示文字替换为图片就是上面代码了

我推荐在首页放下面这个表格

```csharp
| Build | NuGet |
|--|--|
|![](https://github.com/组织或个人/仓库/workflows/执行Action的Name注意转码/badge.svg)|[![](https://img.shields.io/nuget/v/NuGet包的Id字符串.svg)](https://www.nuget.org/packages/NuGet包的Id字符)|
```

显示效果大概如下

| Build | NuGet |
|--|--|
|![](https://github.com/dotnet-campus/dotnetCampus.TagToVersion/workflows/.NET%20Core/badge.svg)|[![](https://img.shields.io/nuget/v/dotnetCampus.TagToVersion.svg)](https://www.nuget.org/packages/dotnetCampus.TagToVersion)|

<!-- ![](image/在 GitHub 仓库添加 NuGet 版本图标和构建图标/在 GitHub 仓库添加 NuGet 版本图标和构建图标0.png) -->

![](http://image.acmx.xyz/lindexi%2F202039948368297.jpg)

