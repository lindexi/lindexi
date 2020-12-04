---
title: "dotnet tool 判断博客文档链接是否可用的工具"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 2020/11/15 19:26:49
categories: dotnet
---

本文来和大家安利一个好用的工具，通过这个工具可以找到自己博客文档里面，是否存在有链接已经失效了

<!--more-->


<!-- CreateTime:2020/11/15 19:26:49 -->



## 安装

```
dotnet tool install -g Lindexi.Tool.CheckBlogUrlAvailable
```

## 使用

```
CheckBlogUrlAvailable [folder]
```

调用此命令，将会找到当前文件夹内所有的 md 文档，读取里面的内容，找到里面的连接，尝试访问链接

其中 folder 文件夹如不写则采用当前命令的工作文件夹

## 原理

通过正则匹配当前文件夹里面所有的 md 文档的内容，尝试找到属于链接的字符串，接着尝试去访问这个链接。如果访问失败了就输出

此工具是一个 dotnet 工具，因此可以使用 NuGet 进行分发。更多关于 dotnet 工具打包，请看 [dotnet 手工打一个 dotnet tool 包](https://blog.lindexi.com/post/dotnet-%E6%89%8B%E5%B7%A5%E6%89%93%E4%B8%80%E4%B8%AA-dotnet-tool-%E5%8C%85.html )

这个项目在 GitHub 完全开源，链接是 [https://github.com/lindexi/UWP](https://github.com/lindexi/UWP)

