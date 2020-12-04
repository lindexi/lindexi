---
title: "C# dotnet 提示找不到 CompositionContainer 类的解决方法"
author: lindexi
date: 2020-12-3 20:27:49 +0800
CreateTime: 6/17/2020 4:01:19 PM
categories: dotnet C#
---

在构建提示 Error CS0012 和 Error CS0246 说找不到 CompositionContainer 类，原因是没有引用 System.ComponentModel.Composition 库

<!--more-->


<!-- CreateTime:6/17/2020 4:01:19 PM -->



在构建的时候有如下提示

```
0>MainWindow.xaml.cs(51,59): Error CS0246: The type or namespace name 'CompositionContainer' could not be found (are you missing a using directive or an assembly reference?)
0>MainWindow.xaml.cs(51,35): Error CS0012: The type 'CompositionContainer' is defined in an assembly that is not referenced. You must add a reference to assembly 'System.ComponentModel.Composition, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089'.
```

原因是没有引用 System.ComponentModel.Composition 库，双击项目编辑 csproj 项目，添加下面代码

```xml
    <ItemGroup>
        <Reference Include="System.ComponentModel.Composition"/>
    </ItemGroup>
```

要求 csproj 是 sdk 风格的，如果不是，请右击引用，添加引用，找到 System.ComponentModel.Composition 勾选

