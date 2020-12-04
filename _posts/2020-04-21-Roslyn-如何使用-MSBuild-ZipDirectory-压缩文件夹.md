---
title: "Roslyn 如何使用 MSBuild ZipDirectory 压缩文件夹"
author: lindexi
date: 2020-12-3 20:27:51 +0800
CreateTime: 4/21/2020 7:50:26 PM
categories: 
---

在 csproj 文件或在 NuGet 的 Targets 文件中可以通过 Target 调用 ZipDirectory 任务用来制作压缩包，在构建的时候，可以用这个方法将某个输出文件夹等内容压缩输出

<!--more-->


<!-- CreateTime:4/21/2020 7:50:26 PM -->



使用 ZipDirectory 有两个必要的属性，一个是 DestinationFile 表示输出的 zip 文件的路径，另一个是 SourceDirectory 表示将被压缩的文件夹路径

如果 DestinationFile 文件期望进行覆盖，也就是如果 DestinationFile 路径已经存在，将覆盖写入新的 zip 文件，可以使用 Overwrite 属性

使用方法如下

```xml
    <Target Name="ZipOutputPath" AfterTargets="Build">
        <ZipDirectory
            SourceDirectory="$(OutputPath)"
            DestinationFile="$(MSBuildProjectDirectory)\lindexi.zip" />
    </Target>
```

将上面代码放在 csproj 文件，构建将会在 csproj 文件所在文件夹找到创建的文件

本文代码放在[github](https://github.com/lindexi/lindexi_gd/tree/c55f0a334b5eac0cdd3c12046961af8573f76369/BerjearnearheliCallrachurjallhelur)欢迎小伙伴访问

[ZipDirectory Task](https://docs.microsoft.com/en-us/visualstudio/msbuild/zipdirectory-task?view=vs-2019 )

