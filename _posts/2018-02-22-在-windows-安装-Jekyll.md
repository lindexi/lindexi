---
title: "在 windows 安装 Jekyll"
author: lindexi
date: 2020-3-5 12:33:15 +0800
CreateTime: 2018/2/22 17:47:39
categories: jekyll
---

本文告诉大家一个简单的方法在 Windows 安装 Jekyll

<!--more-->


<!-- CreateTime:2018/2/22 17:47:39 -->

<div id="toc"></div>

## 下载 ps1 文件

首先需要安装 Chocolatey ，这个工具可以快速安装 Jekyll

先下载[Chocolatey](https://chocolatey.org/install.ps1)，如果无法从这个地方下载，请到csdn[下载](http://download.csdn.net/download/lindexi_gd/10132718 )

然后管理员打开 PowerShell ，因为需要使用脚本，所以让 PowerShell 支持脚本

```csharp
Set-ExecutionPolicy bypass
```

需要注意 bypass 是不需要签名就可以运行脚本，对于开发者，这个功能是很好的，但是如果你不是开发者，那么请不要使用这个功能。

```csharp
如果不是开发者，请用下面代码

 Set-ExecutionPolicy bypass process
```

## 安装 Chocolatey 

把下载的脚本放到 PowerShell 运行就可以

然后输入下面代码

```csharp
 SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

## 安装 Ruby

使用下面的命令安装

```csharp
choco install ruby -y
```

## 安装bundler

使用下面的命令

```csharp
cd  C:\tools\ruby24\bin
 .\gem install bundler
```

## 安装Jekyll

使用下面命令安装

```csharp
.\gem install jekyll

.\gem install jekyll bundler
```

然后重新打开命令行输入

```csharp
bundle install
```

这样就可以安装了，使用下面的代码启动

```csharp
jekyll new myblog
cd myblog
jekyll serve
```

感谢

[Easily install Jekyll on Windows with 3 command prompt entries and Chocolatey ](https://davidburela.wordpress.com/2015/11/28/easily-install-jekyll-on-windows-with-3-command-prompt-entries-and-chocolatey/ )

