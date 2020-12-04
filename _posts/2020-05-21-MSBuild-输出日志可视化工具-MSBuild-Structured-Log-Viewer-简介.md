---
title: "MSBuild 输出日志可视化工具 MSBuild Structured Log Viewer 简介"
author: lindexi
date: 2020-12-3 20:27:51 +0800
CreateTime: 5/21/2020 4:09:16 PM
categories: 
---

感谢 Vatsan Madhavan 小伙伴推荐的 MSBuild 输出日志可视化工具，这个工具可以使用漂亮的 WPF 界面预览 MSBuild 复杂的输出内容

<!--more-->


<!-- CreateTime:5/21/2020 4:09:16 PM -->



这是一个完全开源的工具，请看 [KirillOsenkov/MSBuildStructuredLog: A logger for MSBuild that records a structured representation of executed targets, tasks, property and item values.](https://github.com/KirillOsenkov/MSBuildStructuredLog )

这个工具的使用方法很简单，首先是在项目里面使用 MSBuild 命令加上 `/bl` 生成 `msbuild.binlog` 文件，如使用下面代码

```csharp
msbuild /bl
```

<!-- ![](image/MSBuild 输出日志可视化工具 MSBuild Structured Log Viewer 简介/MSBuild 输出日志可视化工具 MSBuild Structured Log Viewer 简介0.png) -->

![](http://image.acmx.xyz/lindexi%2F202052116956826.jpg)

从官网 [MSBuild Log Viewer](https://msbuildlog.com/ ) 下载最新版本

打开软件，将 `msbuild.binlog` 文件拖进去就可以显示日志的信息



<!-- ![](image/MSBuild 输出日志可视化工具 MSBuild Structured Log Viewer 简介/MSBuild 输出日志可视化工具 MSBuild Structured Log Viewer 简介1.png) -->

![](http://image.acmx.xyz/lindexi%2F2020521161167844.jpg)

另外这个工具还提供了 NuGet 库可以用来读取 binlog 文件

先安装 [MSBuild.StructuredLogger](https://www.nuget.org/packages/MSBuild.StructuredLogger) 库，然后使用下面代码

```csharp
using System;
using Microsoft.Build.Logging.StructuredLogger;

class BinaryLogReadBuild
{
    static void Main(string[] args)
    {
        string binLogFilePath = @"C:\temp\test.binlog";

        var buildRoot = BinaryLog.ReadBuild(binLogFilePath);
        buildRoot.VisitAllChildren<CscTask>(c => Console.WriteLine(c.CommandLineArguments));
    }
}
```

这个软件用到了特别漂亮的 TreeView 欢迎小伙伴抄样式

