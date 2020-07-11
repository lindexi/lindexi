---
title: "dotnet 通过 WMI 获取系统信息"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:59
categories: dotnet C# WMI
---

本文告诉大家如何通过 WMI 获取系统信息

<!--more-->


<!-- CreateTime:2019/8/31 16:55:59 -->


<!-- 标签：dotnet,C#,WMI -->

通过 Win32_OperatingSystem 可以获取系统信息

```csharp
            var mc = "Win32_OperatingSystem";
            var managementObject = new[]
            {
                    "BootDevice",
                    "BuildNumber",
                    "BuildType",
                    "Caption",
                    "CodeSet",
                    "CountryCode",
                    "CreationClassName",
                    "CSCreationClassName",
                    "CSDVersion",
                    "CSName",
                    "Description",
                    "Locale",
                    "Manufacturer",
                    "Name",
                    "Organization",
                    "OSArchitecture",
                    "OtherTypeDescription",
                    "PlusProductID",
                    "PlusVersionNumber",
                    "RegisteredUser",
                    "SerialNumber",
                    "Status",
                    "SystemDevice",
                    "SystemDirectory",
                    "SystemDrive",
                    "Version",
                    "WindowsDirectory",
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
BootDevice           : \Device\HarddiskVolume2
BuildNumber          : 17763
BuildType            : Multiprocessor Free
Caption              : Microsoft Windows 10 专业版
CodeSet              : 936
CountryCode          : 86
CreationClassName    : Win32_OperatingSystem
CSCreationClassName  : Win32_ComputerSystem
CSDVersion           :
CSName               : DESKTOP-KA1CD6M
Description          :
Locale               : 0804
Manufacturer         : Microsoft Corporation
Name                 : Microsoft Windows 10 专业版|C:\WINDOWS|\Device\Harddisk0\Partition4
Organization         :
OSArchitecture       : 64 位
OtherTypeDescription :
PlusProductID        :
PlusVersionNumber    :
RegisteredUser       : lindexi_gd@outlook.com
SerialNumber         : 00331-10000-00001-AA523
Status               : OK
SystemDevice         : \Device\HarddiskVolume4
SystemDirectory      : C:\WINDOWS\system32
SystemDrive          : C:
Version              : 10.0.17763
WindowsDirectory     : C:\WINDOWS
```

这里的 Version 就是系统版本

[Win32_OperatingSystem class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-operatingsystem )

