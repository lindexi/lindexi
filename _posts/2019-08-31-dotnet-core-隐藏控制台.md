---
title: "dotnet core 隐藏控制台"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2019/8/31 16:55:58
categories: dotnet
---

如果写一个控制台程序，需要隐藏这个控制台程序，可以使用本文的方法

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


如果是在 Windows 下运行， 可以使用一些系统提供的方法隐藏控制台。如果是 Linux 下，都是控制台，就不用隐藏了

复制下面的代码，然后使用 HiddenConsoleWindow.Hide 就可以隐藏控制台

```csharp
    public static class HiddenConsoleWindow
    {
        public static void Hide()
        {
            ShowWindow(GetConsoleWindow(), SW_HIDE);
        }

        [DllImport("kernel32.dll")]
        static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        const int SW_HIDE = 0;
        const int SW_SHOW = 5;
    }
```

第二个方法就是输出是 Windows application 这样就不会显示控制台

<!-- ![](image/dotnet core 隐藏控制台/dotnet core 隐藏控制台0.png) -->

![](http://image.acmx.xyz/lindexi%2F201921111517349)

或者修改 csproj 文件，将 OutputType 修改为 WinExe 请看代码

```csharp
    <PropertyGroup>
        <OutputType>WinExe</OutputType>
        <ApplicationIcon />
        <StartupObject />
    </PropertyGroup>
```

[dotnet core 通过修改文件头的方式隐藏控制台窗口](https://lindexi.gitee.io/post/dotnet-core-%E9%80%9A%E8%BF%87%E4%BF%AE%E6%94%B9%E6%96%87%E4%BB%B6%E5%A4%B4%E7%9A%84%E6%96%B9%E5%BC%8F%E9%9A%90%E8%97%8F%E6%8E%A7%E5%88%B6%E5%8F%B0%E7%AA%97%E5%8F%A3.html )

[Show/Hide the console window of a C# console application](https://stackoverflow.com/questions/3571627/show-hide-the-console-window-of-a-c-sharp-console-application )

