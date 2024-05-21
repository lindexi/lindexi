---
title: "win10 uwp HttpClient post错误"
author: lindexi
date: 2024-5-20 16:22:6 +0800
CreateTime: 2018/2/13 17:23:03
categories: Win10 UWP
---

进行HttpClient post参数错误
从“Windows.Web.Http.HttpStringContent”转换为“System.Net.Http.HttpContent”

<!--more-->


<!-- CreateTime:2018/2/13 17:23:03 -->


<div id="toc"></div>
<!-- csdn -->

原因

用了`System.Net.Http.HttpClient`其实HttpStringContent是可以在错误看到，不是System.Net.Http

方法

使用

```csharp
           Windows.Web.Http.HttpClient webHttpClient=
                new Windows.Web.Http.HttpClient();

           Windows.Web.Http.HttpStringContent httpString=
                new HttpStringContent("a");
            await webHttpClient.PostAsync(new Uri(url), httpString);
```


<a href="https://www.codeproject.com/script/Articles/BlogFeedList.aspx?amid=12520573" rel="tag">CodeProject</a>

