---
title: "win10 uwp 从Type使用构造"
author: lindexi
date: 2020-3-5 12:33:14 +0800
CreateTime: 2018/2/13 17:23:03
categories: Win10 UWP
---

本文主要：如何从 Type new一个对象

<!--more-->


<!-- CreateTime:2018/2/13 17:23:03 -->


<div id="toc"></div>

原本从 WPF ，要想 new 一个对象从 type ，可以使用`type.Assembly.CreateInstance(type.FullName);`

但是在 UWP ，需要使用`type.GetConstructor(Type.EmptyTypes).Invoke(parameters);`

多谢 durow ，找了很久在他写的 http://www.cnblogs.com/durow/p/4883556.html 刚好有这个

