---
title: "dotnet 5 判断当前程序运行在 Windows 系统 Linux 系统的简单方法"
author: lindexi
date: 2021-12-23 8:40:30 +0800
CreateTime: 2021/12/22 9:38:21
categories: dotnet
---

本文告诉大家使用 dotnet 5 提供的 System.OperatingSystem 类的方法进行快速且简单判断当前程序所运行在的系统

<!--more-->


<!-- CreateTime:2021/12/22 9:38:21 -->

<!-- 发布 -->

判断系统的简单代码示例：

```csharp
            if (System.OperatingSystem.IsWindows())
            {
                if (System.OperatingSystem.IsWindowsVersionAtLeast(10, 0, 19043))
                {

                }
            }
            else if (System.OperatingSystem.IsLinux())
            {

            }
            else if (System.OperatingSystem.IsMacOS())
            {

            }
            else if (System.OperatingSystem.IsIOS())
            {

            }
            else if (System.OperatingSystem.IsAndroid())
            {

            }
            else if (System.OperatingSystem.IsBrowser())
            {

            }
            else if (System.OperatingSystem.IsTvOS())
            {

            }
            else if (System.OperatingSystem.IsFreeBSD())
            {

            }
```

可以很方便通过 IsXx 的方式判断当前是运行在哪个系统上。可以通过 IsXxVersionAtLeast 这一组方法判断是否当前运行的系统版本大于等于给定的版本

通过这些功能，可以很方便编写特定功能的代码

在 dotnet 5 之前，需要通过 RuntimeInformation.IsOSPlatform 方法进行判断系统，代码如下

```csharp
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                
            }
```

更多请看 [OperatingSystem Class (System) Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/system.operatingsystem?view=net-6.0 )

