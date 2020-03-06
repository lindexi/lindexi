---
title: "VisualStudio 开启仅我代码调试"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/6/5 19:29:44
categories: VisualStudio
---

在 VisualStudio 开始调试的时候经常需要加载很多符号，加载符号的速度很慢，很多时候我只是调试我的代码，因为框架提供的代码都是很稳定的，只有我这么逗比才会写出诡异的方法。可以在设置开启仅我代码进行调试，开启之后只有自己的用户代码才会进行调试，也只有自己的代码才会加载符号文件，这样可以调试的速度

<!--more-->


<!-- CreateTime:2019/6/5 19:29:44 -->

<!-- csdn -->

在 VisualStudio 可以使用开启仅我代码提高调试速度

点击工具-选项 找到调试里面的开启仅我代码就可以在调试的时候只加载用户代码的符号

<!-- ![](image/VisualStudio 开启仅我代码调试/VisualStudio 开启仅我代码调试0.png) -->

![](http://image.acmx.xyz/lindexi%2F201965192545316)

此时会自动跳过库里面的代码调试，同时也会跳过使用[DebuggerNonUserCodeAttribute](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.debuggernonusercodeattribute?wt.mc_id=MVP )标记的代码

如我添加了函数 Foo 在这个函数上面添加[DebuggerNonUserCodeAttribute](https://docs.microsoft.com/en-us/dotnet/api/system.diagnostics.debuggernonusercodeattribute?wt.mc_id=MVP )那么在调试的时候无法在这个函数添加断点也无法单步进入这个函数

```csharp
        [DebuggerNonUserCode]
        private static void Foo()
        {
        }
```

[Debug user code with Just My Code - Visual Studio](https://docs.microsoft.com/en-us/visualstudio/debugger/just-my-code?wt.mc_id=MVP )

