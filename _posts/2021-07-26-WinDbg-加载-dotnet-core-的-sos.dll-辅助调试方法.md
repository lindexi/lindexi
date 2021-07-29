---
title: "WinDbg 加载 dotnet core 的 sos.dll 辅助调试方法"
author: lindexi
date: 2021-7-27 8:54:0 +0800
CreateTime: 2021/7/26 20:59:25
categories: dotnet
---

本文告诉大家如何加载 .NET Core 或 .NET 5 的 sos.dll 文件到 WinDbg 的方法

<!--more-->


<!-- CreateTime:2021/7/26 20:59:25 -->

<!-- 发布 -->

和 .NET Framework 或 dotnet core 2.0 不相同的是，当前的 sos.dll 是放在独立的 [https://github.com/dotnet/diagnostics](https://github.com/dotnet/diagnostics) 仓库里面，也需要独立安装。好在 sos 通过 dotnet tool 进行分发，安装方法非常简单

请通过如下命令行命令进行安装

```
dotnet tool install -g dotnet-sos
```

以上是添加 dotnet sos 工具，接下来还需要调用此工具进行安装，请在命令行输入下面命令进行安装

```
dotnet sos install
```

如安装成功，那么大概会输出以下内容

```
Installing SOS to C:\Users\lindexi\.dotnet\sos
Creating installation directory...
Copying files from C:\Users\lindexi\.dotnet\tools\.store\dotnet-sos\5.0.236902\dotnet-sos\5.0.236902\tools\netcoreapp2.1\any\win-x64
Copying files from C:\Users\lindexi\.dotnet\tools\.store\dotnet-sos\5.0.236902\dotnet-sos\5.0.236902\tools\netcoreapp2.1\any\lib
Execute '.load C:\Users\lindexi\.dotnet\sos\sos.dll' to load SOS in your Windows debugger.
SOS install succeeded
```

如上面提示，当前可以在 WinDbg 通过如上命令进行加载 sos 文件

```
.load C:\Users\linde\.dotnet\sos\sos.dll
```

但是此文件默认是 x64 的，如果期望调试的应用是 x86 的，那么以上命令将会提示如下错误

```
.load C:\Users\linde\.dotnet\sos\sos.dll

The call to LoadLibrary(C:\Users\lindexi\.dotnet\sos\sos.dll) failed, Win32 error 0n193
    "%1 不是有效的 Win32 应用程序。
```

此时的解决方法是去获取 x86 版本的 sos.dll 如下面命令

```
.load C:\Users\lindexi\.dotnet\tools\.store\dotnet-sos\5.0.236902\dotnet-sos\5.0.236902\tools\netcoreapp2.1\any\win-x86\sos.dll
```

需要自己去找放在 `C:\Users\lindexi\.dotnet\tools\.store\dotnet-sos\` 文件夹的对应的 dotnet 版本的 sos 的 win-x86 版本的文件

