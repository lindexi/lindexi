---
title: "dotnet 通过 WMI 获取设备厂商"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:59
categories: dotnet C# WMI
---

本文告诉大家如何通过 WMI 获取设备厂商

<!--more-->


<!-- CreateTime:2019/8/31 16:55:59 -->

<!-- 标签：dotnet,C#,WMI -->

通过 Win32_ComputerSystem 可以获取电脑系统信息

通过下面代码可以获取 机器型号 和 制造厂商

```csharp
            var mc = "Win32_ComputerSystem";
            var managementObject = new[]
                {
                    "Description",
                    "Manufacturer", //制造厂商
                    "model", //机器型号
                    "UserName", //用户
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
Description  : AT/AT COMPATIBLE
Manufacturer : Gigabyte Technology Co., Ltd.
model        : To be filled by O.E.M.
UserName     : DESKTOP-KA1CD6M\lindexi
```

这里的model就是 PC 序列号

[Win32_ComputerSystem class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-computersystem )

