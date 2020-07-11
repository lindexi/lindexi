---
title: "dotnet 通过 WMI 获取系统启动的服务"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:59
categories: dotnet C# WMI
---

本文告诉大家如何通过 WMI 获取系统启动的服务

<!--more-->


<!-- CreateTime:2019/8/31 16:55:59 -->


<!-- 标签：dotnet,C#,WMI -->

通过 Win32_Service 可以获取系统启动的服务

获取的时候只需要拿Caption和State就可以


```csharp
            var mc = "Win32_Service";
            var managementObject = new[]
            {
                    "Caption",
                    //"CreationClassName",
                    //"Description",
                    //"DisplayName",
                    //"ErrorControl",
                    //"Name",
                    //"PathName",
                    //"ServiceType",
                    //"StartMode", // 是否开机启动
                    //"StartName", 
                    "State", // 是否在运行
                    //"Status",
                    //"SystemCreationClassName",
                    //"SystemName",
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

输出 str 的内容

```csharp
Caption : Apple Mobile Device Service
State   : Running

Caption : iPod 服务
State   : Running
```

上面只是输出的一点，因为服务是很多

[Win32_Service class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-service )

