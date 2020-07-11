---
title: "dotnet 通过 HttpClient 下载文件同时报告进度的方法"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:58
categories: dotnet
---

本文告诉大家一个简单的方法通过 HttpClient 下载文件，同时报告下载进度

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


通过 HttpClient 的 ContentLength 很多时候都可以拿到下载的内容的长度，通过 ReadAsync 可以返回当前读到的长度，将读取到的长度加起来就是已经下载的长度

看起来很简单，于是直接给代码

```csharp
       private static async Task DownloadFile(string url, FileInfo file)
        {
            var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(url);

            try
            {
                var n = response.Content.Headers.ContentLength;
                var stream = await response.Content.ReadAsStreamAsync();
                using(var fileStream = file.Create())
                using (stream)
                {
                    byte[] buffer = new byte[1024];
                    var readLength = 0;
                    int length;
                    while ((length = await stream.ReadAsync(buffer, 0, buffer.Length)) != 0)
                    {
                        readLength += length;

                        Console.WriteLine("下载进度" + ((double)readLength) / n * 100);

                        // 写入到文件
                        fileStream.Write(buffer, 0, length);
                    }
                }
            
            }
            catch (Exception e)
            {
            }
        }
```

如果不是需要获取进度，那么最简单的方法是

```csharp
                var stream = await response.Content.ReadAsStreamAsync();
                using(var fileStream = file.Create())
                using (stream)
                {
                    await stream.CopyToAsync(fileStream);
                }
```

