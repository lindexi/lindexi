---
title: "dotnet 控制台读写 Sqlite 提示 no such table 找不到文件"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:58
categories: dotnet
---

在使用 dotnet 读写 Sqlite 可以通过 EF Core 的方法，但是在 EF Core 创建的数据库可能和读写的数据库不是相同的文件

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


在我运行代码的时候发现在通过迁移创建数据库，创建的文件是在项目的代码文件夹里面，但是在运行代码的时候是从程序的文件夹开始寻找，于是就找不到数据库文件

因为找不到数据库文件就会提示 `Microsoft.Data.Sqlite.SqliteException:“SQLite Error 1: 'no such table:Foo'"` 看起来和没有写迁移一样

在 dotnet 使用迁移就可以创建数据库，或者在修改数据

```csharp
dotnet ef migrations add Lindexi
dotnet ef database update
```

于是通过修改文件的相对路径找到项目的数据库，因为程序一般都在 `bin\debug\netcoreapp3.0` 所以通过 `..\..\..\数据库.db` 就可以找到数据库

如果是在 ASP.NET Core 可以使用下面代码

```csharp
public class Startup
{
    private IApplicationEnvironment _appEnv;

    public Startup(IApplicationEnvironment appEnv)
    {
        _appEnv = appEnv;
    }
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddEntityFramework()
            .AddSqlite()
            .AddDbContext<MyContext>(
                options => { options.UseSqlite($"Data Source={_appEnv.ApplicationBasePath}/data.db"); });
    }
}
```

[迁移 - EF Core](https://docs.microsoft.com/zh-cn/ef/core/managing-schemas/migrations/index?wt.mc_id=MVP )

