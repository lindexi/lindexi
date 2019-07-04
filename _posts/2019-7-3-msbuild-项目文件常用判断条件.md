---
title: "msbuild 项目文件常用判断条件"
author: lindexi
date: 2019-7-3 17:35:45 +0800
CreateTime: 2019-7-3 17:7:38 +0800
categories: Roslyn MSBuild 编译器
---

在写项目文件的时候，需要根据不同的条件定义或执行不同的代码，有一些比较常使用的判断，本文收藏起来，方便大家找

<!--more-->


<!-- csdn -->
<!-- 标签：Roslyn,MSBuild,编译器 -->


在 msbuild 的项目文件 cspoj 或 xx.target 等文件里面，可以使用 Condition 条件写在很多标签元素作为判断

例如在 Target 上面添加条件，只有条件满足了才会执行

```csharp
  <Target Name="Lindexi" AfterTargets="CoreCompile" Condition="'$(Configuration)|$(TargetFramework)'=='DEBUG|net45'">
    <Message Text="林德熙是逗比"></Message>
  </Target>
```

下面将告诉大家一些常使用的判断

## 判断在调试下编译

请看代码

```csharp
Condition="'$(Configuration)'=='DEBUG'"
```

例如这样写

```csharp
  <PropertyGroup Condition=" '$(Configuration)' == 'Debug'">
      <MainProjectPath>blog.lindexi.com</MainProjectPath>
  </PropertyGroup>
```

反过来判断不是在调试下编译

```csharp
Condition="'$(Configuration)'!='DEBUG'"
```

## 判断在发布下编译

请看代码

```csharp
Condition="'$(Configuration)'=='RELEASE'"
```

## 判断平台

判断在 .NET Framework 4.5 运行

```csharp
Condition="'$(TargetFramework)'=='net45'"
```

对应的判断 .NET Standard 使用如下缩写 `netstandard1.0` 等

判断 .NET Core 使用如下缩写 `netcoreapp1.0` 等

## 多个判断

需要同时生效有两个写法，如判断只有在 .NET Framework 4.5 同时在调试下

```csharp
Condition="'$(Configuration)|$(TargetFramework)'=='DEBUG|net45'"
```

第二个方法是使用关键字 And 连接

```csharp
Condition=" '$(TargetFramework)'=='net45' And $(Configuration)=='Debug'"
```

两个条件的或判断使用关键字 Or 连接

```csharp
Condition=" '$(TargetFramework)'=='net45' or $(Configuration)=='Debug'"
```

更多判断请看

[Roslyn 在项目文件使用条件判断](https://blog.lindexi.com/post/roslyn-%E5%9C%A8%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E4%BD%BF%E7%94%A8%E6%9D%A1%E4%BB%B6%E5%88%A4%E6%96%AD )

[MSBuild 如何编写带条件的属性、集合和任务 Condition？ - walterlv](https://blog.walterlv.com/post/how-to-write-msbuild-conditions.html )

[Target frameworks](https://docs.microsoft.com/en-us/dotnet/standard/frameworks?wt.mc_id=MVP )

