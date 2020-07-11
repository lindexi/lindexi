---
title: "PowerShell 通过 WMI 获取系统服务"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/8/31 16:55:58
categories: PowerShell WMI
---

本文告诉大家如何通过 WMI 获取系统服务

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


<!-- 标签：PowerShell,WMI -->

通过 Win32_Service 可以获取系统启动的服务

```csharp
Get-WmiObject Win32_Service | Format-List Caption,State
```

运行代码

```csharp
Caption : Apple Mobile Device Service
State   : Running

Caption : iPod 服务
State   : Running
```

通过上面代码可以获取服务当前是否启动，还可以加上 StartMode 获取服务启动方法，可以选择手动启动，不自动启动和开机启动

```csharp
Get-WmiObject Win32_Service | Format-List Caption,State,CreationClassName,Description,DisplayName,Name,PathName,ServiceType,StartMode,StartName,SystemCreationClassName,SystemName
```

运行代码

```csharp
Caption                 : Apple Mobile Device Service
State                   : Running
CreationClassName       : Win32_Service
Description             : Provides the interface to Apple mobile devices.
DisplayName             : Apple Mobile Device Service
Name                    : Apple Mobile Device Service
PathName                : "C:\Program Files\Common Files\Apple\Mobile Device Support\AppleMobileDeviceService.exe"
ServiceType             : Own Process
StartMode               : Auto
StartName               : LocalSystem
SystemCreationClassName : Win32_ComputerSystem
SystemName              : DESKTOP-KA1CD6M

Caption                 : iPod 服务
State                   : Running
CreationClassName       : Win32_Service
Description             : iPod 硬件管理服务
DisplayName             : iPod 服务
Name                    : iPod Service
PathName                : "C:\Program Files\iPod\bin\iPodService.exe"
ServiceType             : Own Process
StartMode               : Manual
StartName               : LocalSystem
SystemCreationClassName : Win32_ComputerSystem
SystemName              : DESKTOP-KA1CD6M
```

[Win32_Service class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-service )

