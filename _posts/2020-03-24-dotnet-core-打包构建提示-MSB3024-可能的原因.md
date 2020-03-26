---
title: "dotnet core 打包构建提示 MSB3024 可能的原因"
author: lindexi
date: 2020-3-25 9:16:28 +0800
CreateTime: 2020/3/24 9:26:41
categories: dotnet
---

如果是在 Linux 下发布，可能是因为发布的可执行文件和文件夹重名

<!--more-->


<!-- CreateTime:2020/3/24 9:26:41 -->

<!-- 发布 -->

在使用 `dotnet publish -c release` 在 Linux 服务器发布或使用 `-r linux-x64` 发布看到下面代码

```csharp
_CopyOutOfDateSourceItemsToOutputDirectory:

正在部分生成目标“_CopyOutOfDateSourceItemsToOutputDirectory”，因为某些输出文件相对于其输入文件而言已经过期。

2>C:\Program Files\dotnet\sdk\3.1.102\Microsoft.Common.CurrentVersion.targets(4570,5): error MSB3024: 未能将文件“f:\lindexi\foo\obj\Release\netcoreapp3.1\linux-x64\Foo”复制到目标文件“bin\Release\netcoreapp3.1\linux-x64\Foo”，因为该目标是文件夹而不是文件 。若要将源文件复制到文件夹中，请考虑使用 DestinationFolder 参数，而不使用 DestinationFiles
```

可能的原因是存在文件夹和可执行文件相同。为什么在 Windows 下没有问题，原因是在 Windows 下的可执行文件是带后缀名的，而在 Linux 下是不带后缀名的。如果此时有文件夹和可执行文件重名，如下面的代码

```csharp
│  KalllaijawwaiKemjaniqemchelye.csproj
│  Program.cs
│
└─KalllaijawwaiKemjaniqemchelye
        1.png
```

可以看到 KalllaijawwaiKemjaniqemchelye 文件夹将会和创建的可执行文件 KalllaijawwaiKemjaniqemchelye 重名，此时将会提示 error MSB3024 代码

解决方法是要么更改文件夹名要么更改可执行文件名

本文代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/2b4a8ca4ff0e95f51c10c33cbab4a89037e6010e/KalllaijawwaiKemjaniqemchelye) 欢迎小伙伴访问


