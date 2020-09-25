---
title: "dotnet 找不到 PostAsJsonAsync 方法"
author: lindexi
date: 2020-9-24 17:29:35 +0800
CreateTime: 2019/9/19 14:53:58
categories: dotnet
---

在网络编程可以使用 PostAsJsonAsync 这个方便的方法将一个对象作为 json 推送到服务器，这个方法是一个扩展方法，在之前的框架，可以在 System.Net.Http.dll 找到这个好用的扩展方法，但是在 4.5 的时候就被移除了。本文告诉大家如何安装这个扩展方法

<!--more-->


<!-- CreateTime:2019/9/19 14:53:58 -->

<!-- csdn -->

在新的版本，可以通过安装 [Microsoft.AspNet.WebApi.Client](https://www.nuget.org/packages/Microsoft.AspNet.WebApi.Client/) 这个库使用，支持 .NETFramework 4.5 和 .NETStandard 2.0 另外不要看这个库的命名空间包含了 AspNet 其实这个库就是一些扩展方法，没有引用任何 AspNet 代码

在使用的时候，需要引用 `System.Net.Http` 命名空间，然后就可以使用下面的代码

```csharp
           await httpClient.PostAsJsonAsync(url, obj);
```

其实自己写一个扩展方法也是不错，例如我就需要通过 Get 一个对象，可以这样写

```csharp
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

    public static class HttpClientExtensions
    {
        public static async Task<T> GetObjectAsync<T>(this HttpClient httpClient, string url)
        {
            var str = await httpClient.GetStringAsync(url);
            return JsonConvert.DeserializeObject<T>(str);
        }
    }
```

通过自己定义扩展方法，可以让网络编程的时候减少重复代码

