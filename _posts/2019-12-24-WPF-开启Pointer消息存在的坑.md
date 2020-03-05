---
title: "WPF 开启Pointer消息存在的坑"
author: lindexi
date: 2019-12-24 14:33:41 +0800
CreateTime: 2020-3-5 9:18:34 +0800
categories: WPF
---

本文记录在 WPF 开启 Pointer 消息的坑

<!--more-->


<!-- 发布 -->

启用了Pointer之后，调用Textbox.Focus()，起不来屏幕键盘，必须点在它之上才行，触摸在它之上才行
