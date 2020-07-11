---
title: "C# 通过 probing 指定 dll 寻找文件夹"
author: lindexi
date: 2020-3-5 12:33:10 +0800
CreateTime: 2019/8/31 16:55:58
categories: C#
---

在很大的项目开发，会发现项目引用的 dll 会很多，我想要按照不同的功能，将不同的 dll 放在不同的文件夹

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


简单的方法是通过修改 App.config 文件指定文件夹，如将文件移动到 `abc\12` 的文件夹里面，可以在 App.config 添加代码

```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="abc\12" />
    </assemblyBinding>
  </runtime>
</configuration>
```

如创建一个简单的项目，此时项目引用一个dll 如 doubi.dll 这个项目运行的时候输出的文件有 lindexi.exe 和 doubi.dll 文件

这时需要将 doubi.dll 移动到文件夹 `abc\12` 里面

```csharp
lindexi.exe
abc\12\doubi.dll
```

打开 App.config 添加上面的代码就可以

如果有两个不同的dll需要放在两个不同的文件夹，如 walter.dll 需要放在 walter 文件夹

在 `<probing privatePath="abc\12" />` 里面使用分号表示不同的文件夹 `probing privatePath="abc\12;walter"` 不同的文件夹之间用分号分开

```csharp
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="abc\12;walter" />
    </assemblyBinding>
  </runtime>
</configuration>
```

这个 App.config 在编译之后会在被修改为 `程序集名.exe.config` 在输出文件夹找到 `xx.exe.config` 可以通过修改这个文件在编译之后修改 dll 的寻找文件夹

如果是对于 C++ 的 dll 需要做特殊引用，如需要区分 x86 和 x64 请看 [C# 如何在项目引用x86 x64的非托管代码](https://lindexi.gitee.io/post/C-%E5%A6%82%E4%BD%95%E5%9C%A8%E9%A1%B9%E7%9B%AE%E5%BC%95%E7%94%A8x86-x64%E7%9A%84%E9%9D%9E%E6%89%98%E7%AE%A1%E4%BB%A3%E7%A0%81.html )

不能直接添加一个 x86 文件和一个 x64 文件夹，通过 privatePath 同时指定文件夹的方式

