---
title: "WPF 通过 dotnet core 发布单文件时 log4net 无法使用"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2020/2/12 17:11:44
categories: WPF dotnet
---

在使用 dotnet core 版本的 WPF 可以将发布文件打包为一个exe文件，但是此时小伙伴发现 log4net 无法运行，因为 log4net 说找不到配置文件

<!--more-->


<!-- CreateTime:2020/2/12 17:11:44 -->

<!-- 发布 -->

这是 子铭 小伙伴问我的问题，我尝试创建一个 dotnet core 的 WPF 程序，使用下面代码创建的

```csharp
dotnet new wpf -o HudidaneahaFekujarchebea
```

在从另一个项目复制了 log4net 的配置的时候，我发现了一个细节，在运行 log4net 默认会读取 Log.config 配置文件，而读取的文件夹是应用程序所在的文件夹，如果通过下面代码将软件发布单文件，那么因为 log4net 需要读取而配置文件找不到而不能使用

```csharp
dotnet publish -r win10-x64 /p:PublishSingleFile=true 
```

解决方法是

- 启动时写入配置文件
- 重定向配置文件
- 通过代码配置
- 不用log4net都成

关于写日志请看 [程序猿修养 日志应该如何写](https://blog.lindexi.com/post/%E7%A8%8B%E5%BA%8F%E7%8C%BF%E4%BF%AE%E5%85%BB-%E6%97%A5%E5%BF%97%E5%BA%94%E8%AF%A5%E5%A6%82%E4%BD%95%E5%86%99.html)

[dotnet core 发布只有一个 exe 的方法](https://blog.lindexi.com/post/dotnet-core-%E5%8F%91%E5%B8%83%E5%8F%AA%E6%9C%89%E4%B8%80%E4%B8%AA-exe-%E7%9A%84%E6%96%B9%E6%B3%95.html)

