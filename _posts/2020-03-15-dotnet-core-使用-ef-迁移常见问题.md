---
title: "dotnet core 使用 ef 迁移常见问题"
author: lindexi
date: 2020-3-16 8:59:36 +0800
CreateTime: 2020/3/15 15:06:19
categories: dotnet
---

本文记录一些常见的使用 EF Core 的问题

<!--more-->


<!-- CreateTime:2020/3/15 15:06:19 -->

<!-- 发布 -->

## 版本太低

执行命令`dotnet ef migrations add lindexi.github.io`显示下面代码

```
dotnet ef --info
It was not possible to find any compatible framework version
The framework 'Microsoft.NETCore.App', version '3.1.2' was not found.
  - The following frameworks were found:
      2.1.12 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      2.1.14 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      2.1.15 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      2.2.6 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      2.2.7 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      3.0.0 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      3.0.2 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      3.1.0 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]
      3.1.1 at [C:\Program Files\dotnet\shared\Microsoft.NETCore.App]

You can resolve the problem by installing the specified framework and/or SDK.

The specified framework can be found at:
  - https://aka.ms/dotnet-core-applaunch?framework=Microsoft.NETCore.App&framework_version=3.1.2&arch=x64&rid=win10-x64
```

此问题要么 EF 版本不对，要么 SDK 版本太低，解决方法是更新 EF 和更新 SDK 版本

可以使用我的一个工具协助更新 EF 版本，这个工具能更新所有工具的版本，使用方法如下

1. 通过下面代码安装 `dotnet tool install -g dotnetCampus.UpdateAllDotNetTools ` 此后使用不用再次安装
2. 通过下面代码更新所有工具 `dotnet updatealltools`

其次进入 [https://dotnet.microsoft.com/](https://dotnet.microsoft.com/) 下载安装最新版本的 SDK 就可以

## 代码构建不通过

使用 `dotnet ef` 第一件事就是执行构建，如果此时的代码构建不通过，那么自然失败

请在迁移失败时尝试用 `dotnet build` 看是否能构建通过

## 没有配置路径

如使用 Sqlite 需要在 ConfigureServices 里面先配置好数据库路径，如下面代码

```csharp

```

否则会有如下提示

```
System.InvalidOperationException: Unable to resolve service for type 'Microsoft.EntityFrameworkCore.Migrations.IMigrator'. This is often because no database provider has been configured for this DbContext. A provider can be configured by overriding the DbContext.OnConfiguring method or by using AddDbContext on the application service provider. If AddDbContext is used, then also ensure that your DbContext type accepts a DbContextOptions<TContext> object in its constructor and passes it to the base constructor for DbContext.
   at Microsoft.EntityFrameworkCore.Infrastructure.Internal.InfrastructureExtensions.GetService[TService](IInfrastructure`1 accessor)
   at Microsoft.EntityFrameworkCore.Infrastructure.AccessorExtensions.GetService[TService](IInfrastructure`1 accessor)
   at Microsoft.EntityFrameworkCore.Design.DesignTimeServiceCollectionExtensions.<>c__DisplayClass1_0.<AddDbContextDesignTimeServices>b__7(IServiceProvider _)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.CallSiteRuntimeResolver.VisitFactory(FactoryCallSite factoryCallSite, RuntimeResolverContext context)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.CallSiteVisitor`2.VisitCallSiteMain(ServiceCallSite callSite, TArgument argument)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.CallSiteRuntimeResolver.VisitDisposeCache(ServiceCallSite transientCallSite, RuntimeResolverContext context)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.CallSiteVisitor`2.VisitCallSite(ServiceCallSite callSite, TArgument argument)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.CallSiteRuntimeResolver.Resolve(ServiceCallSite callSite, ServiceProviderEngineScope scope)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.DynamicServiceProviderEngine.<>c__DisplayClass1_0.<RealizeService>b__0(ServiceProviderEngineScope scope)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.ServiceProviderEngine.GetService(Type serviceType, ServiceProviderEngineScope serviceProviderEngineScope)
   at Microsoft.Extensions.DependencyInjection.ServiceLookup.ServiceProviderEngine.GetService(Type serviceType)
   at Microsoft.Extensions.DependencyInjection.ServiceProvider.GetService(Type serviceType)
   at Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetService[T](IServiceProvider provider)
   at Microsoft.EntityFrameworkCore.Design.Internal.MigrationsOperations.EnsureServices(IServiceProvider services)
   at Microsoft.EntityFrameworkCore.Design.Internal.MigrationsOperations.AddMigration(String name, String outputDir, String contextType)
   at Microsoft.EntityFrameworkCore.Design.OperationExecutor.AddMigrationImpl(String name, String outputDir, String contextType)
   at Microsoft.EntityFrameworkCore.Design.OperationExecutor.AddMigration.<>c__DisplayClass0_0.<.ctor>b__0()
   at Microsoft.EntityFrameworkCore.Design.OperationExecutor.OperationBase.<>c__DisplayClass3_0`1.<Execute>b__0()
   at Microsoft.EntityFrameworkCore.Design.OperationExecutor.OperationBase.Execute(Action action)
Unable to resolve service for type 'Microsoft.EntityFrameworkCore.Migrations.IMigrator'. This is often because no database provider has been configured for this DbContext. A provider can be configured by overriding the DbContext.OnConfiguring method or by using AddDbContext on the application service provider. If AddDbContext is used, then also ensure that your DbContext type accepts a DbContextOptions<TContext> object in its constructor and passes it to the base constructor for DbContext.
```

