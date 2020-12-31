---
title: "dotnet 集成测试 SmartSql 存在静态量导致多个主机启动提示 Alias 已存在"
author: lindexi
date: 2020-12-29 21:37:3 +0800
CreateTime: 2020/12/28 11:43:02
categories: dotnet
---

在集成测试中，我采用单个进程开启多个主机，可以理解为一个用例开启一次主机。但是在我使用到 SmartSql 的功能时，我发现在一个主机关闭之后，再开启下一个主机，会因为使用了相同的别名而提示 SmartSql.Alias:[SmartSql] already exist 错误。本文告诉大家如何解决此问题

<!--more-->


<!-- CreateTime:2020/12/28 11:43:02 -->

<!-- 发布 -->

默认的 dotnet 应用在主机销毁的时候，都会销毁自己的资源。而 SmartSql 没有做这个处理，同时使用了静态量，这就意味着两个不同的主机都会访问到相同的对象，在开启第二个主机的时候，会因为存在相同的 Alias 而提示出错，如下面代码

```
λ:SmartSql.ISqlMapper -> λ:SmartSql.SmartSqlBuilder.
                      ---> SmartSql.Exceptions.SmartSqlException: SmartSql.Alias:[SmartSql] already exist.
                        at SmartSql.SmartSqlContainer.Register(SmartSqlBuilder smartSqlBuilder)
                        at SmartSql.SmartSqlBuilder.Build()
                        at Microsoft.Extensions.DependencyInjection.SmartSqlDIExtensions.<>c__DisplayClass0_0.<AddSmartSql>b__0(IServiceProvider sp)
                        at Autofac.Extensions.DependencyInjection.AutofacRegistration.<>c__DisplayClass3_0.<Register>b__0(IComponentContext context, IEnumerable`1 parameters)
```

因为在应用中使用静态量的逻辑不少，因此集成测试可以采用多进程方法，一个进程跑一个主机，在一个主机里面跑多个用例。这样的优势可以减少静态清理，缺点是集成测试项目要么有很多个，要么需要一个中间的管理，相对复杂

第二个方法是给 SmartSql 一个别名，如下面代码

```csharp
      services.AddSmartSql((sp, builder) =>
      {
            builder.UseAlias("随机的命名");
      });
```

保持每次的主机都使用不同的 随机的命名 就可以解决此问题

特别感谢 [小黑兔](173592829) 的帮助

欢迎加入 SmartSql 官方群 604762592

关于集成测试请看 [asp dotnet core 基于 TestServer 做集成测试](https://blog.lindexi.com/post/asp-dotnet-core-%E5%9F%BA%E4%BA%8E-TestServer-%E5%81%9A%E9%9B%86%E6%88%90%E6%B5%8B%E8%AF%95.html )

