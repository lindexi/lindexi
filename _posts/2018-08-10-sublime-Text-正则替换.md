---
title: "sublime Text 正则替换"
author: lindexi
date: 2020-7-3 19:25:15 +0800
CreateTime: 2018/8/10 19:16:52
categories: 
---


<!--more-->


<!-- CreateTime:2018/8/10 19:16:52 -->


<div id="toc"></div>

我遇到一个文章，需要把所有的 (数字)  换为 [数字]

于是我使用 Sublime Text的替换

首先，我们需要打开正则使用“Alt+R” 或打开“Ctrl+h”选择正则。

然后我们开始输入正则，“ `\((\d+\)` ” 我们需要拿出的是数字，所有在数字加“()”。于是在替换写“`\[$1\]`”，其中`$0`就是所有的 `$1`就是第一个括号。

如何使用正则可以去看[正则表达入门](https://blog.lindexi.com/post/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F30%E5%88%86%E9%92%9F%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.html)。

Sumlime 还可以创建代码行，做法也很简单。

点击 Tools   New Snippet 


![](http://image.acmx.xyz/d021ae55-501f-4838-a9a0-f09ee95a83b82016121992723.jpg)


```xml
< snippet>
	< content><![CDATA[
Hello, ${1:this} is a ${2:snippet}.
]]>< /content>
	<!-- Optional: Set a tabTrigger to define how to trigger the snippet -->
	<!-- <tabTrigger>hello</tabTrigger> -->
	<!-- Optional: Set a scope to limit where the snippet will trigger -->
	<!-- <scope>source.python</scope> -->
< /snippet>

```

content 是我们按下快捷键的内容，\$ {1:this} 就是第一个输入内容，其中，默认写This，所有的{1}都代换你输入的第一个。\$2就是第二个。

我们需要设置快捷键。

`<tabTrigger>hello</tabTrigger>`

就是按下 hello，按下 tab 就会使用代码段。

写好，我们保存在`C:\Users\<Use>\AppData\Roaming\Sublime Text 2\Packages\User` 后缀`.sublime-snippet`


我们有时打开中文会乱码，我们可以 ctrl+shift+p

输入 Package  control:install 安装 CovertToUTF8


