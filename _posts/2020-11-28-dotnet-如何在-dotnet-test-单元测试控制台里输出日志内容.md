---
title: "dotnet 如何在 dotnet test 单元测试控制台里输出日志内容"
author: lindexi
date: 2020-12-3 16:22:22 +0800
CreateTime: 2020/11/28 9:02:42
categories: dotnet
---

我在协助小伙伴调试一个只有在 GitHub 的 Action 自动测试时才会炸的问题，而我发现默认的控制台输出是不会在 GitHub 的 Action 显示的，换句话说，在使用 dotnet test 时，代码里面使用的控制台输出不会进行输出

<!--more-->


<!-- CreateTime:2020/11/28 9:02:42 -->



解决方法很简单，只需要在控制台输出的部分逻辑修改为 `Console.WriteLine` 而不是 `Debug.WriteLine` 方法

然后在 dotnet test 的命令加上 `-l "console;verbosity=detailed"` 代码，如下面代码


```
dotnet test --configuration release -l "console;verbosity=detailed"
```

这样就能在 GitHub 的 Action 进行单元测试时，输出对应的日志

为什么 `Debug.WriteLine` 方法没有输出？原因是 `--configuration release` 配置了不要让 Debug 下输出

更多请看 [Console.WriteLine calls during dotnet test are not emitted to the console on Windows · Issue #799 · microsoft/vstest](https://github.com/microsoft/vstest/issues/799 )

