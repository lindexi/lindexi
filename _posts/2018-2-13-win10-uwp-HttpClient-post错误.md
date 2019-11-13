---
title: "win10 uwp HttpClient post错误"
author: lindexi
date: 2018-2-13 17:23:3 +0800
CreateTime: 2018-2-13 17:23:3 +0800
categories: Win10 UWP
---

进行HttpClient post参数错误
从“Windows.Web.Http.HttpStringContent”转换为“System.Net.Http.HttpContent”

<!--more-->



<div id="toc"></div>
<!-- csdn -->

原因

用了`System.Net.Http.HttpClient`其实HttpStringContent是可以在错误看到，不是System.Net.[Http](Http )

方法

使用

```csharp
           Windows.Web.[Http.HttpClient](Http.HttpClient ) web[HttpClient=](HttpClient= )
                new Windows.Web.[Http.HttpClient();](Http.HttpClient(); )

           Windows.Web.[Http.HttpStringContent](Http.HttpStringContent ) [httpString=](httpString= )
                new HttpStringContent("a");
            await web[HttpClient.PostAsync(new](HttpClient.PostAsync(new ) Uri(url), [httpString);](httpString); )
```


<a href="https://www.codeproject.com/script/Articles/BlogFeedList.aspx?amid=12520573" rel="tag">CodeProject</a>

