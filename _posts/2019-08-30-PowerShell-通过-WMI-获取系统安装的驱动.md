---
title: "PowerShell 通过 WMI 获取系统安装的驱动"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/8/30 8:58:39
categories: PowerShell WMI
---

本文告诉大家如何通过 WMI 获取用户已经安装的驱动程序

<!--more-->


<!-- CreateTime:2019/8/30 8:58:39 -->


<!-- 标签：PowerShell,WMI -->

通过下面代码可以获取用户已经安装的驱动程序

```csharp
Get-WmiObject Win32_SystemDriver | Format-List Caption,Name,State
```

运行代码

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

如果需要通过 PowerShell 获取系统安装的驱动的日期和安装的路径，请加上 InstallDate 驱动日期 PathName 请看代码

```csharp
Get-WmiObject Win32_SystemDriver | Format-List Caption,Name,State,InstallDate,PathName
```

[Win32_SystemDriver class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-systemdriver )

