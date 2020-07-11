---
title: "dotnet core 使用 PowerShell 脚本"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2019/8/31 16:55:58
categories: dotnet dotnetcore PowerShell
---

本文告诉大家如何在 dotnet core 通过 Host PowerShell 的方法使用 PowerShell 脚本

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->

<!-- 标签：dotnet，dotnetcore,PowerShell -->

本文提供的方法需要在 dotnet core 2.1 和以上的版本，对于 dotnet core 2.1 以下暂时只能通过命令行调用 PowerShell.exe 的方法调用

在使用之前请创建一个 dotnet core 程序然后安装下面几个 Nuget 库

- [Microsoft.PowerShell.Commands.Diagnostics](https://www.nuget.org/packages/Microsoft.PowerShell.Commands.Diagnostics/ )

- [Microsoft.PowerShell.SDK](https://www.nuget.org/packages/Microsoft.PowerShell.SDK/)

- [Microsoft.WSMan.Management](https://www.nuget.org/packages/Microsoft.WSMan.Management/)

通过 System.Management.Automation.PowerShell 可以快速使用 PowerShell 脚本

使用 `PowerShell.Create()` 创建一个 PowerShell 类，在 PowerShell 类先添加脚本，然后就可以运行，运行函数会返回运行的返回的内容

```csharp
        public static void Execute(string command)
        {
            using (var ps = PowerShell.Create())
            {
                var results = ps.AddScript(command).Invoke();
                foreach (var result in results)
                {
                    Console.Write(result.ToString());
                }
            }
        }
```

如使用下面的脚本

```csharp
([System.Management.Automation.ActionPreference], [System.Management.Automation.AliasAttribute]).FullName
```

可以直接调用上面封装的函数

```csharp
            Execute("([System.Management.Automation.ActionPreference], [System.Management.Automation.AliasAttribute]).FullName");

```

在命令行使用 dotnet run 可以看到输出

```csharp
System.Management.Automation.ActionPreferenceSystem.Management.Automation.AliasAttribute
```

本文使用的代码请看 [github](https://github.com/lindexi/lindexi_gd/tree/95327125115b031efd08253079ba6dc21404dca5/Motmoxakaypeobweawi)

[官方例子](https://github.com/PowerShell/PowerShell/tree/2c488fb4e5020de2b0629934c9edbf0fa7858b28/docs/host-powershell )

https://stackoverflow.com/a/47777636/6116637

