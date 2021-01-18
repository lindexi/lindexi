---
title: "PowerShell 实现 curl 的用户名和密码逻辑"
author: lindexi
date: 2021-1-16 8:42:55 +0800
CreateTime: 2021/1/16 8:39:45
categories: 
---

在使用 curl 时，可以采用 -u 加上用户名和密码，这个对应在 PowerShell 也就是不到 10 句话的事情

<!--more-->


<!-- CreateTime:2021/1/16 8:39:45 -->

<!-- 发布 -->

假定使用 curl 输入的是如下代码

```
curl -ulindexi:AP7doYUzM7WApXobRb7X9qgURCF -T "E:\lindexi\doubi.exe" "https://blog.lindexi.com/artifactory/doubi.exe"
```

通过上面代码可以给我的存储服务上传文件

此时的 `-ulindexi:AP7doYUzM7WApXobRb7X9qgURCF` 的含义就是 `-u <用户名:密码>` 在对应的 Http 里面就是在 Head 的 Authorization 加入信息

在 PowerShell 中，按照规范需要传入一段 base64 的字符，于是代码如下

```
$encodedAuthString =  [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes("lindexi:AP7doYUzM7WApXobRb7X9qgURCF")) 
$Headers = 
@{
    Authorization = "Basic $encodedAuthString"
}

Invoke-WebRequest -Method Put -Uri "https://blog.lindexi.com/artifactory/doubi.exe" -Headers $Headers -InFile "E:\lindexi\doubi.exe"
```

感谢工具人 [lsj](https://blog.sdlsj.net/ ) 提供的方法


