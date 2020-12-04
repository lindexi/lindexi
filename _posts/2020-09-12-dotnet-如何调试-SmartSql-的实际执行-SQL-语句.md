---
title: "dotnet 如何调试 SmartSql 的实际执行 SQL 语句"
author: lindexi
date: 2020-12-3 16:22:23 +0800
CreateTime: 2020/9/12 12:06:22
categories: dotnet
---

在使用 SmartSql 中的 SQL 语句是支持进行属性替换，在调试时如何拿到实际执行的 SQL 命令

<!--more-->


<!-- CreateTime:2020/9/12 12:06:22 -->



只需要在 appsettings.json 中将 LogLevel 的 Default 设置为 Debug 等级，可以在运行时看到从开发者编写的 SQL 语句加上参数的实际 SQL 语句，大概内容如下

```csharp
dbug: SmartSql.Middlewares.PrepareStatementMiddleware[0]
      Statement.Id:[User.GetEntity],Sql:
      Select * From T_User Where Id=@Id
      Parameters:[Id=1]
      Sql with parameter value:
      Select * From T_User Where Id=1
```


如果存在 appsettings.Development.json 文件，那么请在调试时更改 appsettings.Development.json 文件，大概代码如下

```json
{
  "Logging": 
  {
    "LogLevel":
     {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information"
    }
  }
}
```

本文使用的 SmartSql 是在 GitHub 完全开源 [https://github.com/dotnetcore/SmartSql](https://github.com/dotnetcore/SmartSql)

