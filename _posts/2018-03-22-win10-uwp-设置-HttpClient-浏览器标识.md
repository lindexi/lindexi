---
title: "win10 uwp 设置 HttpClient 浏览器标识"
author: lindexi
date: 2020-3-5 12:33:14 +0800
CreateTime: 2018/3/22 9:01:55
categories: Win10 UWP
---

最近在使用 smms 图床上传发现需要使用 UserAgent ，不然不会返回值。
所以我就询问了[群里](https://t.me/smms_images)大神，他们告诉我需要设置 UserAgent ，本文就是告诉大家如何设置 HttpClient 的浏览器标识

<!--more-->


<!-- CreateTime:2018/3/22 9:01:55 -->

<!-- csdn -->

如果使用 HttpClient 上传图片很简单，只需要创建 HttpMultipartFormDataContent ，里面写图片就可以上传。

设置的方法是`HttpClient.DefaultRequestHeaders.UserAgent.ParseAdd`，请看下面

```csharp
  HttpClient webHttpClient =
                new HttpClient();
           var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36";
            webHttpClient.DefaultRequestHeaders.UserAgent.ParseAdd(userAgent);              
```

这里 userAgent 是从[Chrome User Agents](https://developers.whatismybrowser.com/useragents/explore/software_name/chrome/ )拿到，这样就可以了。

如果大家希望知道如何上传图片到 smms ，那么请使用下面代码

```csharp
         string url = "https://sm.ms/api/upload";
            HttpClient webHttpClient =
                new HttpClient();
            HttpMultipartFormDataContent httpMultipartFormDataContent =
                new HttpMultipartFormDataContent();
            var fileContent = new HttpStreamContent(await File.OpenAsync(FileAccessMode.Read));
            fileContent.Headers.Add("Content-Type", "application/octet-stream");

            var userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36";
            webHttpClient.DefaultRequestHeaders.UserAgent.ParseAdd(userAgent);

            httpMultipartFormDataContent.Add(fileContent, "smfile", File.Name);
            var str = await webHttpClient.PostAsync(new Uri(url), httpMultipartFormDataContent);
            //这里可以拿到返回的值 str.Content.ToString();
```

拿到的返回的值就可以转换拿到上传的图片，现在我做了图床，欢迎大家使用

![](https://i.loli.net/2018/03/22/5ab30077c2c09.jpg)

如果需要设置 WebView 的标识，请看[win10 uwp 如何让WebView标识win10手机](http://blog.csdn.net/lindexi_gd/article/details/51820950 )

