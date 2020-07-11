---
title: "dotnet 修复找不到 System.ServiceProcess 定义"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/10/18 21:24:04
categories: dotnet
---

本文告诉大家如果复制网上一段代码发现 System.ServiceProcess 提示找不到方法或定义，需要手动添加引用

<!--more-->


<!-- CreateTime:2019/10/18 21:24:04 -->


例如下面一段代码

```csharp
using System.ServiceProcess;

        private static bool IsWindowsManagementInstrumentationAvailable
        {
            get
            {
                try
                {
                    using (var serviceController = new ServiceController("Winmgmt"))
                    {
                        return serviceController.Status == ServiceControllerStatus.Running;
                    }
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
```

在编译的时候提示

```
The type or namespace name 'ServiceProcess' does not exist in the namespace 'System' (are you missing an assembly reference?)


错误	CS0246	未能找到类型或命名空间名“ServiceController”(是否缺少 using 指令或程序集引用?)
```

修复方法是右击依赖项，点击添加引用，在程序集找到 System.ServiceProcess 点击引用就可以

如果是 SDK 的 csproj 可以直接在项目文件添加下面代码

```csharp
    <ItemGroup>
      <Reference Include="System.ServiceProcess" />
    </ItemGroup>
```

