---
title: "PowerShell 通过 WMI 获取系统信息"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/8/31 16:55:58
categories: PowerShell WMI
---

本文告诉大家如何通过 WMI 使用 Win32_OperatingSystem 获取设备厂商

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


<!-- 标签：PowerShell,WMI -->

通过下面代码可以获取 系统版本和系统是专业版还是教育版

```csharp
Get-WmiObject Win32_OperatingSystem | Format-List BootDevice,BuildNumber,BuildType,Caption,CodeSet,CountryCode,CreationClassName,CSCreationClassName,CSDVersion,CSName,Description,Locale,Manufacturer,Name,Organization,OSArchitecture,OtherTypeDescription,PlusProductID,PlusVersionNumber,RegisteredUser,SerialNumber,Status,SystemDevice,SystemDirectory,SystemDrive,Version,WindowsDirectory
```

运行代码

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

[Win32_OperatingSystem class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-operatingsystem )


