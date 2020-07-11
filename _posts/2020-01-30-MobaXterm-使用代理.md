---
title: "MobaXterm 使用代理"
author: lindexi
date: 2020-7-3 18:48:45 +0800
CreateTime: 2020/1/30 16:55:33
categories: MobaXterm 代理 ssh vps 代理服务器
---

经常需要连接服务器，但是有时候服务器需要代理才可以连接，所以本文告诉大家如何使用MobaXterm 代理，进行ssh代理连接

<!--more-->


<!-- CreateTime:2020/1/30 16:55:33 -->

<!-- csdn -->

<!-- 标签：MobaXterm，代理，ssh，vps，代理服务器 -->

<div id="toc"></div>

在本文的开始，本地代理已经弄好，本文不会告诉大家如何搭建代理。

## ssh 通道

点击 MobaXterm 的 Tool 可以打开 ssh 通道，打开可以看到下面的界面

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F201821317278.jpg)

点击创建新通道

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2018213172725.jpg)

选择 动态端口，然后写入本地的端口和中间服务器的端口点击保存，然后启动

## ssh 代理

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F201821317278.jpg)

点击创建新通道，然后输入服务器和端口

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2018213172725.jpg)

选择 动态端口，然后写入本地的端口和中间服务器的端口点击保存，然后启动

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2018213172748.jpg)

设置完成点保存，然后开启

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2018213145741.jpg)

## ssh 代理

最简单的方法是在命令输入 ssh 加上代理，不过这个方法容易失败

在使用 ssh 的时候可以加上代理，方法是在控制台输入下面的代码

```csharp
ssh -D 代理端口 服务器 -p 端口
```

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2018213172918.jpg)

如果需要指定端口，请加上 `-p 端口`

## 连接代理

这个是我现在使用的方法，点击编辑连接可以看到下面界面

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2018213173016.jpg)

点击 use proxy 选择代理，然后写入服务器就可以

## 中间服务器

如果需要使用中间服务器，可以点击 Connect through ssh gateway 然后写入服务器的地址和端口

![](http://image.acmx.xyz/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F201821317311.jpg)

如果在使用中发现任何问题，欢迎告诉我

