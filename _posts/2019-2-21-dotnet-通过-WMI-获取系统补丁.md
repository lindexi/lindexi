---
title: "dotnet 通过 WMI 获取系统补丁"
author: lindexi
date: 2019-2-21 20:38:1 +0800
CreateTime: 2019-2-21 20:38:1 +0800
categories: dotnet C# WMI
---

本文告诉大家如何通过 WMI 获取补丁

<!--more-->


<!-- csdn -->

<!-- 标签：dotnet,C#,WMI -->

通过 Win32_QuickFixEngineering 可以获取系统启动的服务

下面代码只是获取补丁的 kb 字符

```csharp
                const string query = "SELECT HotFixID FROM Win32_QuickFixEngineering";
                var search = new ManagementObjectSearcher(query);
                var collection = search.Get();

                var str = new StringBuilder();
                foreach (ManagementObject quickFix in collection)
                {
                    str.Append(quickFix["HotFixID"].ToString());
                    str.Append(";");
                }

                return str.ToString();
```

输出 str 的内容

```csharp
KB4465477,KB4465664
```

这个方法无法在 XP 系统获取补丁

[Win32_QuickFixEngineering class - Windows applications](https://docs.microsoft.com/en-us/windows/desktop/cimwin32prov/win32-quickfixengineering )

