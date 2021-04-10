---
title: "Windows 下的 WPF 开发 调试应用程序在什么时机加载了 Dll 模块"
author: lindexi
date: 2021-4-9 9:28:39 +0800
CreateTime: 2021/4/8 17:57:19
categories: WPF
---

在尝试优化性能的时候，如何可以了解到在应用程序启动的过程中，在什么步骤开始加载了某些 Dll 文件

<!--more-->


<!-- CreateTime:2021/4/8 17:57:19 -->

<!-- 发布 -->

在 VisualStudio 的 调试->窗口->模块 可以看到当前应用程序加载的所有模块，也就是应用程序加载了哪些 Dll 文件

一个调试方法是在合适的逻辑里面添加断点，或者在软件启动完成之后，通过模块了解应用程序加载了哪些 DLL 文件，从而了解应用程序启动慢是否因为加载了不应该加载的模块

在 dotnet 里面，可以通过辅助的代码了解是在哪些模块加载了 DLL 文件，例如我在调试的 [SVG 库](https://github.com/dotnet-campus/SharpVectors) 是在哪个模块加载的，我不期望在启动的过程中有加载 SVG 相关的 DLL 文件，那么我可以如何了解到是在应用程序的哪个逻辑里面加载的？可以通过在应用程序的主函数里面添加如下代码用来在加载到 [SharpVectors](https://github.com/dotnet-campus/SharpVectors) 模块进入断点

```csharp
        [STAThread]
        static void Main(string[] args)
        {
            AppDomain.CurrentDomain.AssemblyLoad += CurrentDomain_AssemblyLoad;
        }

        private static void CurrentDomain_AssemblyLoad(object sender, AssemblyLoadEventArgs args)
        {
            if (args.LoadedAssembly.FullName.Contains("SharpVectors"))
            {
                Debugger.Break();
            }
        }
```

如果是在 WPF 默认的应用里面，没有 Main 函数，那么写到 App 的构造函数也可以

```csharp
public App()
{
    AppDomain.CurrentDomain.AssemblyLoad += CurrentDomain_AssemblyLoad;
}
```

在进入 CurrentDomain_AssemblyLoad 函数加载到 SharpVectors 的模块的时候，将会进入断点。通过调用堆栈，可以了解到是在访问到哪个业务逻辑需要加载的，然后再调试这个业务逻辑是否需要放在启动的过程

