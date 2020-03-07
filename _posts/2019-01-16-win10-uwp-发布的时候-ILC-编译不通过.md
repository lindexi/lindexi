---
title: "win10 uwp 发布的时候 ILC 编译不通过"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/1/16 20:37:05
categories: Win10 UWP
---

本文告诉大家如果在 UWP 发布的时候遇到 ILC 的问题可以如何解决

<!--more-->


<!-- CreateTime:2019/1/16 20:37:05 -->

<!-- csdn -->

在 UWP 的发布中，需要通过 ILC 将代码编译为 Native 代码，但是在发布的 Microsoft.NETCore.UniversalWindowsPlatform 的 6.2.2 或 6.2.3 版本会让 ILC 无法编译

在编译的时候出现下面代码

```csharp
microsoft.net.native.compiler\2.2.1\tools\Microsoft.NetNative.targets(905,5): error : ILC 遇到了一个错误。请参阅 http://go.microsoft.com/fwlink/?LinkID=392869 处的 .NET Native 兼容性文档和支持信息以获取帮助
```

或者

```csharp
“ilc.exe”已退出，代码为 539754340
```

可以通过 Nuget 将 Microsoft.NETCore.UniversalWindowsPlatform 的版本修改为 6.1.9 解决

在[.NET Native](https://github.com/Microsoft/dotnet/blob/master/releases/UWP/README.md ) 可以看到最新的只是支持 UWP 的 6.1.x 的版本

[.net native 2.2 + UWP project build fail - Developer Community](https://developercommunity.visualstudio.com/content/problem/386760/net-native-22-uwp-project-build-fail.html )

打开 http://go.microsoft.com/fwlink/?LinkID=392869 链接可以看到 [Migrating Your Windows Store App to .NET Native](https://docs.microsoft.com/en-us/dotnet/framework/net-native/migrating-your-windows-store-app-to-net-native )

通过命令行编译的方法

[win10 uwp 使用 msbuild 命令行编译 UWP 程序](https://lindexi.gitee.io/post/win10-uwp-%E4%BD%BF%E7%94%A8-msbuild-%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%BC%96%E8%AF%91-UWP-%E7%A8%8B%E5%BA%8F.html )

