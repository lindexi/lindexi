---
title: "Xamarin 使用 GTK 提示找不到 libglib-2.0-0.dll 找不到"
author: lindexi
date: 2020-3-31 17:34:25 +0800
CreateTime: 2020-3-31 17:26:58 +0800
categories: 
---

在使用 Xamarin 开发 Linux 应用的时候，刚开始如果没有弄好 libglib-2.0-0.dll 的依赖库，那么将会在运行的时候，在 Gtk.Application.Init() 这句代码提示找不到这个库

<!--more-->


<!-- 发布 -->

解决方法是先到[官网](https://www.monodevelop.com/download/#fndtn-download-win) 下载 `GTK#` 安装包或 mono x86 的应用

安装到默认路径，也就是在 `C:\Program Files (x86)\GtkSharp\2.12\bin` 路径，默认安装的时候会加入到环境变量

接下来到 `C:\Program Files (x86)\GtkSharp\2.12\bin` 复制 libglib-2.0-0.dll 文件到 xamarin 的输出文件夹，如 `D:\lindexi\t\Xamarin\Cla\bin\x86\Debug\net47` 文件夹里面，此时尝试运行，应该就不会存在这个提示

注意现在 GTK# 仅支持 x86 应用

