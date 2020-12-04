---
title: "win10 uwp 不显示 SplashScreen 欢迎界面的方法"
author: lindexi
date: 2020-12-3 20:27:49 +0800
CreateTime: 2020/8/14 16:30:24
categories: Win10 UWP
---

在 UWP 的应用，欢迎页面 SplashScreen 是用户第一个看到的界面，这个界面是由 ApplicationFrameHost 读取 UWP 配置的图片显示出来的，因此 UWP 才能做到点击应用瞬间启动

<!--more-->


<!-- CreateTime:2020/8/14 16:30:24 -->



那么如果我不想显示启动界面 SplashScreen 的图片，可以如何做？有两个方法，第一个方法是比较推荐的，在应用程序如果能启动足够快，那么将不显示欢迎界面，如果启动不够快那么依然显示欢迎界面，这样用户就知道打开应用程序。另一个方法是无论应用程序启动多慢，都不显示欢迎界面。第二个方法是假的不使用初始屏幕的方法，只是不显示图片。也就是我没有找到任何一个有用的进入应用程序界面的方法

第一个可以使用的是编辑 Package.appxmanifest 文件，在 VisualStudio 选中 Package.appxmanifest 文件，然后按下 F7 进入编辑文本模式，此时将使用 xml 打开文件

在这个文件里面可以看到 `uap:SplashScreen` 的配置，这就是 UWP 的启动界面图片设置的值

在这一行添加如下代码

```csharp
a:Optional="true" xmlns:a="http://schemas.microsoft.com/appx/manifest/uap/windows10/5"
```

添加之后的代码如下

```csharp
        <uap:SplashScreen a:Optional="true" xmlns:a="http://schemas.microsoft.com/appx/manifest/uap/windows10/5" Image="Assets\SplashScreen.png"/>
```

此时按照微软官方文档 [uap:SplashScreen (Windows 10) - Windows UWP applications](https://docs.microsoft.com/en-us/uwp/schemas/appxpackage/uapmanifestschema/element-uap-splashscreen ) 说的，在应用程序启动足够快的时候，才不会显示欢迎页面的图片

> Specifies whether an app should be launched without a splash screen. If true, the splash screen will not be shown if the app can launch fast enough. If there is a delay in the app launch time, the splash screen will be shown. If false, the splash screen will always be shown.

设置 `a:Optional` 的值是 true 那么将会让应用如果启动足够快就不显示欢迎界面，如果启动有延迟，那么将会依然显示欢迎界面。如果设置为 false 那么将会无论应用启动多快都显示启动图片

如果不知道怎么做，请看我放在[github](https://github.com/lindexi/lindexi_gd/tree/12b271b98d75ba6292cdce7520708f0d88f8cc40/ChugerebefibeareBearchalallnejeji)代码

另一个方法是删除 Package.appxmanifest 文件的 SplashScreen 配置，但是此时只是不使用欢迎界面图片，将会使用背景色，默认是白色作为初始屏幕

这个更改放在 [github](https://github.com/lindexi/lindexi_gd/tree/7dc4c013712571095c8257cbdd209753eef628e4/ChugerebefibeareBearchalallnejeji) 欢迎小伙伴访问


