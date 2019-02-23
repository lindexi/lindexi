---
title: "dotnet 通过 WMI 获取指定进程的输入命令行"
author: lindexi
date: 2019-2-22 10:17:37 +0800
CreateTime: 2019-2-22 10:17:37 +0800
categories: dotnet C# WMI
---

本文告诉大家如何使用 WMI 通过 Process 获取这个进程传入的命令行

<!--more-->


<!-- csdn -->
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

[https://stackoverflow.com/a/2633674/6116637](https://stackoverflow.com/a/2633674/6116637 )

