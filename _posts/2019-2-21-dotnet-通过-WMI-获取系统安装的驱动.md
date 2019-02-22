---
title: "dotnet 通过 WMI 获取系统安装的驱动"
author: lindexi
date: 2019-2-21 20:17:29 +0800
CreateTime: 2019-2-21 20:17:24 +0800
categories: dotnet C# WMI
---

本文告诉大家如何通过 WMI 获取用户已经安装的驱动程序

<!--more-->


<!-- csdn -->

<!-- 标签：dotnet,C#,WMI -->

通过 Win32_SystemDriver 可以获取用户已经安装的驱动程序


```csharp
            var mc = "Win32_SystemDriver";
            var managementObject = new[]
            {
                    "Caption",
                    //"CreationClassName",
                    //"Description",
                    //"DisplayName",
                    //"InstallDate",
                    "Name",
                    //"PathName",
                    //"ServiceType",
                    //"StartMode",
                    "State",
            };
            ManagementClass managementClass = new ManagementClass(mc);
            ManagementObjectCollection managementObjectCollection = managementClass.GetInstances();
            var str = new StringBuilder();

            foreach (ManagementObject m in managementObjectCollection)
            {
                foreach (var temp in managementObject)
                {
                    try
                    {
                        str.Append(temp);
                        str.Append(" ");
                        str.Append(m[temp]?.ToString() ?? "");
                        str.Append("\n");
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(temp + " " + e);
                    }
                }

                str.Append("\n");
            }

            return str.ToString();
```

对于驱动程序只需要知道驱动程序是哪个，是否运行就可以，至于安装日期和在安装在哪很多时候不需要知道

输出 str 的内容

```csharp
Caption : Windows Driver Foundation - User-mode Driver Framework Reflector
Name    : WUDFRd
State   : Running

Caption : WPD 文件系统驱动程序
Name    : WUDFWpdFs
State   : Running

Caption : XINPUT HID 筛选器驱动程序
Name    : xinputhid
State   : Stopped
```

驱动的内容很多，我就不全部放在代码

[Win32_SystemDriver class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-systemdriver )



