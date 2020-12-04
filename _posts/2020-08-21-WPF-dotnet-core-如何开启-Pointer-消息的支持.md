---
title: "WPF dotnet core 如何开启 Pointer 消息的支持"
author: lindexi
date: 2020-12-3 16:22:25 +0800
CreateTime: 2020/8/21 14:20:47
categories: WPF dotnet
---

在 WPF 下，可以使用和 UWP 一样的 Pointer 触摸架构，只是开启的方式和 .NET Framework 版本有细微的差异

<!--more-->


<!-- CreateTime:2020/8/21 14:20:47 -->



看过 [win10 支持默认把触摸提升 Pointer 消息](https://blog.lindexi.com/post/win10-%E6%94%AF%E6%8C%81%E9%BB%98%E8%AE%A4%E6%8A%8A%E8%A7%A6%E6%91%B8%E6%8F%90%E5%8D%87-Pointer-%E6%B6%88%E6%81%AF.html) 的小伙伴可以了解到，这个博客的方法是通过配置文件的方式

而在 .NET Core 的 WPF 下是不会去读取  App.config 文件，那么此时应该如何开启？此时可以通过代码开启

打开 App.xaml.cs 文件，在构造函数添加下面代码

```csharp
        public App()
        {
            AppContext.SetSwitch("Switch.System.Windows.Input.Stylus.EnablePointerSupport", true);
        }
```

此时就可以开启 Pointer 消息的支持。注意需要在第一个窗口的显示之前调用，否则这个开关也就无效

开启之后，还请小伙伴测试一下，看是否真的开启了 Pointer 消息

测试方法请看 [WPF 如何确定应用程序开启了 Pointer 触摸消息的支持](https://blog.lindexi.com/post/WPF-%E5%A6%82%E4%BD%95%E7%A1%AE%E5%AE%9A%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%90%AF%E4%BA%86-Pointer-%E8%A7%A6%E6%91%B8%E6%B6%88%E6%81%AF%E7%9A%84%E6%94%AF%E6%8C%81.html)

代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/4c87d6d1b73dfa725a37e913c5568333201834af/KemjawyecawDurbahelal) 欢迎小伙伴访问



特别感谢 WPF 官方开发者[Rob LaDuca](https://github.com/rladuca) 告诉我这个方法，详细请看 [https://github.com/dotnet/wpf/issues/3360#issuecomment-678032853](https://github.com/dotnet/wpf/issues/3360#issuecomment-678032853)

关于配置文件的从 .NET Framework 到 .NET Core 的更新，请看 [Deep-dive into .NET Core primitives, part 3: runtimeconfig.json in depth](https://natemcmaster.com/blog/2019/01/09/netcore-primitives-3/#additional-runtime-settings )

