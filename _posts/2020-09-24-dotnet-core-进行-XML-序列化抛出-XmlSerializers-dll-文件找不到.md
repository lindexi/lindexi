---
title: "dotnet core 进行 XML 序列化抛出 XmlSerializers dll 文件找不到"
author: lindexi
date: 2020-12-3 16:22:27 +0800
CreateTime: 2020/9/24 20:27:49
categories: dotnet
---

在将原本的 dotnet framework 版本的 WPF 项目迁到 dotnet core 版本，在进行单元测试，发现在 XmlSerializer 抛出了 System.Private.CoreLib.XmlSerializers.dll 找不到的异常，其实这个只是在 XmlSerializer 的内部异常，可以忽略

<!--more-->


<!-- CreateTime:2020/9/24 20:27:49 -->



在 dotnet core 下，使用如下代码进行 xml 序列化，其中 Foo 是我定义的类

```csharp
   var xmlSerializer = new XmlSerializer(typeof(Foo));
```

应用将会在 VS 打开所有异常的时候，可以看到如下代码

```
System.IO.FileNotFoundException:“Could not load file or assembly 'C:\Users\lindexi\.nuget\packages\microsoft.testplatform.testhost\16.5.0\build\netcoreapp2.1\x64\System.Private.CoreLib.XmlSerializers.dll'. 系统找不到指定的文件。”
```

也就是 `System.Private.CoreLib.XmlSerializers.dll` 找不到的异常，其实在 .NET Core 的这个异常只是在 XmlSerializer 内部抛出，会被 XML 框架接住，上层啥都不需要做

因此，只需要忽略就可以

