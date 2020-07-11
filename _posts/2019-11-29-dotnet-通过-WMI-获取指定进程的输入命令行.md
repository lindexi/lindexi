---
title: "dotnet 通过 WMI 获取指定进程的输入命令行"
author: lindexi
date: 2020-7-2 15:46:19 +0800
CreateTime: 2019/11/29 8:35:39
categories: dotnet C# WMI
---

本文告诉大家如何使用 WMI 通过 Process 获取这个进程传入的命令行

<!--more-->


<!-- CreateTime:2019/11/29 8:35:39 -->

<!-- 标签：dotnet,C#,WMI -->

使用下面代码，使用 Win32_Process 拿到所有的进程，通过 WHERE 判断当前的进程，然后拿到进程传入的命令

```csharp
private static string GetCommandLine(this Process process)
{
    using (ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT CommandLine FROM Win32_Process WHERE ProcessId = " + process.Id))
    using (ManagementObjectCollection objects = searcher.Get())
    {
        return objects.Cast<ManagementBaseObject>().SingleOrDefault()?["CommandLine"]?.ToString();
    }

}
```

获取所有的进程的命令行参数

```csharp
private static void Main()
{
    foreach (var process in Process.GetProcesses())
    {
        try
        {
            Console.WriteLine(process.GetCommandLine());
        }
        catch (Win32Exception ex) when ((uint)ex.ErrorCode == 0x80004005)
        {
            // Intentionally empty - no security access to the process.
        }
        catch (InvalidOperationException)
        {
            // Intentionally empty - the process exited before getting details.
        }

    }
}
```

如果不能访问 WMI 如使用的是 dotnet core 2.0 以下版本或需要通过 dotnet core 编译为 Native 就可以尝试[不使用 WMI 在 dotnet 获取指定进程的输入命令行](https://blog.lindexi.com/post/dotnet-%E8%8E%B7%E5%8F%96%E6%8C%87%E5%AE%9A%E8%BF%9B%E7%A8%8B%E7%9A%84%E8%BE%93%E5%85%A5%E5%91%BD%E4%BB%A4%E8%A1%8C.html )

https://stackoverflow.com/a/2633674/6116637

[dotnet 获取指定进程的输入命令行](https://blog.lindexi.com/post/dotnet-%E8%8E%B7%E5%8F%96%E6%8C%87%E5%AE%9A%E8%BF%9B%E7%A8%8B%E7%9A%84%E8%BE%93%E5%85%A5%E5%91%BD%E4%BB%A4%E8%A1%8C.html )

更多 WMI 请看 [WMI 博客](https://blog.lindexi.com/categories.html#wmi)

[.NET/C# 获取一个正在运行的进程的命令行参数 - walterlv](https://blog.walterlv.com/post/get-command-line-for-a-running-process.html )

