---
title: "asp dotnet core 从 Frp 获取用户真实 IP 地址"
author: lindexi
date: 2024-5-20 16:22:3 +0800
CreateTime: 2020/2/24 17:17:27
categories: asp aspdotnetcore dotnetcore
---

我在本地开一个服务，然后通过 Frp 让小伙伴可以在外网访问我的 API 连接，但是直接通过 RemoteIp 拿到的是本地的地址。本文告诉小伙伴如何通过 Frp 可以拿到用户的真实 IP 地址

<!--more-->


<!-- CreateTime:2020/2/24 17:17:27 -->

<!-- 标签：asp,aspdotnetcore,dotnetcore -->

我写过[dotnet core 通过 frp 发布自己的网站](https://blog.lindexi.com/post/dotnet-core-%E9%80%9A%E8%BF%87-frp-%E5%8F%91%E5%B8%83%E8%87%AA%E5%B7%B1%E7%9A%84%E7%BD%91%E7%AB%99.html)可以在本地运行自己的服务，然后在外网访问到

但是因为是通过本地的 frp 发给用户，也就是本地是 frp 访问，如使用下面代码获取用户的 IP 地址拿到的是本地的地址

```csharp
_accessor.HttpContext.Connection.RemoteIpAddress.ToString()
```

上面代码的 `_accessor` 是注入的，需要在 Startup 的 ConfigureServices 添加下面代码

```csharp
            services.AddHttpContextAccessor();
            services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
```

然后在构造注入

```csharp
public SomeController(IHttpContextAccessor accessor)
{
    _accessor = accessor;
}

private IHttpContextAccessor _accessor;
```

详细请看 Edi wang 大神的博客[Get Client IP Address in ASP.NET Core 2.x - Edi.Wang](https://edi.wang/post/2017/10/16/get-client-ip-aspnet-20 ) 虽然是英文的，但是你可以微信问他

如果使用 frp 的拿到的字符串都是 `127.0.0.1` 本地的地址，因为就是本地的 frp 访问连接

在 frp 会在访问的时候在 HTTP 添加 `X-Forwarded-For` 里面是用户的真实 IP 当然这里也可能是代理的地址，所以修改一下代码，通过下面代码可以从 frp 拿到用户的真实地址

```csharp

        private static bool TryGetUserIpFromFrp(HttpRequest httpContextRequest, out StringValues ip)
        {
            return httpContextRequest.Headers.TryGetValue("X-Forwarded-For", out ip);
        }
```

下面是使用方法

```csharp
            if (TryGetUserIpFromFrp(HttpContext.Request, out var ip))
            {
                str.Append("用户Ip=");
                str.Append(ip);
                str.Append(" ");
            }
```

[Get Client IP Address in ASP.NET Core 2.x - Edi.Wang](https://edi.wang/post/2017/10/16/get-client-ip-aspnet-20 )

[dotnet core 通过 frp 发布自己的网站](https://blog.lindexi.com/post/dotnet-core-%E9%80%9A%E8%BF%87-frp-%E5%8F%91%E5%B8%83%E8%87%AA%E5%B7%B1%E7%9A%84%E7%BD%91%E7%AB%99.html)

用 [使用 Frp 为你的 Web 服务添加 https 支持](https://blog.walterlv.com/post/add-https-support-for-web-service-using-frp.html#%E4%B8%8B%E8%BD%BD-frp) 方式是获取不到用户 IP 地址

