---
title: "Win32 使用 SetCurrentProcessExplicitAppUserModelID 关联多个进程 在任务栏合并 WPF 多进程窗口"
author: lindexi
date: 2024-5-20 16:22:3 +0800
CreateTime: 2021/5/29 17:09:57
categories: WPF
---

我有一个 WPF 应用，这是一个绿色软件，会被用户拷贝这和那的文件夹，我期望在多个文件夹里面打开的进程，在任务栏里面都可以将窗口进行合并。使用 Win32 的 Shell32.dll 提供的 SetCurrentProcessExplicitAppUserModelID 可以显设置应用的 Application User Model ID 从而让在多个不同的路径打开的应用，使用相同的 Id 而在任务栏进行合并窗口

<!--more-->


<!-- CreateTime:2021/5/29 17:09:57 -->

<!-- 发布 -->

我期望使用 Win32 的 Shell32.dll 提供的 SetCurrentProcessExplicitAppUserModelID 方法，最简单的做法是使用 [lsj](https://blog.sdlsj.net) 的 Lsj.Util.Win32 库，在这个库里面已经做了封装

在 csproj 上添加下面代码，用来安装 [lsj](https://blog.sdlsj.net) 的 Lsj.Util.Win32 库

```xml
  <ItemGroup>
    <PackageReference Include="Lsj.Util.Win32" Version="5.1.0" />
  </ItemGroup>
```

在调用 SetCurrentProcessExplicitAppUserModelID 方法有一个要求是需要在应用完全启动之前调用，否则调用无效。传入给 SetCurrentProcessExplicitAppUserModelID 方法的 AppId 如果相同，那么多个进程都会认为是相同的 Application User Model ID 从而可以在任务栏进行合并窗口

实际上 Application User Model ID 能实现的功能还有很多，详细请参阅 [Application User Model IDs 官方文档](https://docs.microsoft.com/en-us/windows/win32/shell/appids?WT.mc_id=WD-MVP-5003260 )

在 WPF 的 App.xaml.cs 的启动方法里面，调用 SetCurrentProcessExplicitAppUserModelID 方法，传入相同的 AppId 值。只需要定义 AppId 作为常量，构建的应用在多个路径进行启动，都能在任务栏里面合并窗口

```csharp
        protected override void OnStartup(StartupEventArgs e)
        {
            Shell32.SetCurrentProcessExplicitAppUserModelID(AppId);

            base.OnStartup(e);
        }

        private const string AppId = "lindexi is doubi";
```

本文所有代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/0939187ce18c4d9cb69a5a55724b808ca28aab1b/BerekunakeaLearweekacee) 和 [gitee](https://gitee.com/lindexi/lindexi_gd/tree/0939187ce18c4d9cb69a5a55724b808ca28aab1b/BerekunakeaLearweekacee) 欢迎小伙伴访问

可以通过如下方式获取本文的源代码，先创建一个空文件夹，接着使用命令行 cd 命令进入此空文件夹，在命令行里面输入以下代码，即可获取到本文的代码

```
git init
git remote add origin https://gitee.com/lindexi/lindexi_gd.git
git pull origin 0939187ce18c4d9cb69a5a55724b808ca28aab1b
```

以上使用的是 gitee 的源，如果 gitee 不能访问，请替换为 github 的源

```
git remote add origin https://github.com/lindexi/lindexi_gd.git
```

[SetCurrentProcessExplicitAppUserModelID function (shobjidl_core.h) - Win32 apps](https://docs.microsoft.com/en-us/windows/win32/api/shobjidl_core/nf-shobjidl_core-setcurrentprocessexplicitappusermodelid?WT.mc_id=WD-MVP-5003260 )

[Application User Model IDs 官方文档](https://docs.microsoft.com/en-us/windows/win32/shell/appids?WT.mc_id=WD-MVP-5003260 )

