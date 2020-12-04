---
title: "Blazor 获取当前的 Url 链接"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 6/28/2020 8:40:39 AM
categories: 
---

在 Blazor 获取当前页面所在的 URL 链接可以通过 NavigationManager 类辅助获取，也可以通过此方法获取当前域名等信息

<!--more-->


<!-- CreateTime:6/28/2020 8:40:39 AM -->



首先在页面添加依赖注入，如下面代码

```csharp
@inject NavigationManager NavigationManager
```

此时就注入了 `NavigationManager` 属性，获取当前页面所在链接的方法或域名可以采用 Uri 或 BaseUri 两个属性

```xml
<p>
	NavigationManager.Uri = @NavigationManager.Uri
</p>

<p>
	NavigationManager.BaseUri = @NavigationManager.BaseUri
</p>
```

详细请看 [ASP.NET Core Blazor 路由](https://docs.microsoft.com/zh-cn/aspnet/core/blazor/fundamentals/routing?view=aspnetcore-3.1)

