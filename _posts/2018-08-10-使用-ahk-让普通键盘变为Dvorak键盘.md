---
title: "使用 ahk 让普通键盘变为Dvorak键盘"
author: lindexi
date: 2024-8-6 20:43:43 +0800
CreateTime: 2018/8/10 19:16:51
categories: 
---

本文告诉大家，如何使用软件做出Dvorak键盘。
在开始说如何做之前，需要告诉大家，什么是Dvorak键盘。 Dvorak Simplified Keyboard /ˈdvɔːræk, dəˈvɔː-/ 德沃夏克 是1936由 August Dvorak等人做出来的键盘，他可以提高英文的输入的速度，传说使用这个键盘打字比现在常用的键盘会快几倍。因为他把最少用的字母在最难碰到的下排，而把常打的字放在右手边。如果经常打英文，可以试试把键盘换为这个，开始一定不会打很快，但是几个月后，打字速度就会变得很快。
![](http://cdn.lindexi.site/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2017819214.jpg)

<!--more-->


<!-- CreateTime:2018/8/10 19:16:51 -->


首先需要下载 ahk ，可以通过[AutoHotkey](https://autohotkey.com/)下载。

然后从 github 下载代码，或者复制本文提供代码，把代码保存为 .ahk 就可以。

安装 ahk 之后，双击打开刚才的代码，然后打开笔记本，试试打字，如果打出来就是和之前不同的，那么就是成功了。

下面就是提供的代码，请复制放在 .ahk 后双击

```csharp

-::[
=::]

q::'
w::,
e::.
r::p
t::y
y::f
u::g
i::c
o::r
p::l
[::/
]::=

;a::a
s::o
d::e
f::u
g::i
h::d
j::h
k::t
l::n
`;::s
'::-

z::`;
x::q
c::j
v::k
b::x
n::b
;m::m
,::w
.::v
/::z
```

github: https://gist.github.com/troynt/205106

