---
title: "VisualStudio 2019 调试项目使用 Portable PDB 提示不支持 PDB 格式"
author: lindexi
date: 2021-3-29 8:29:21 +0800
CreateTime: 2021/3/27 11:18:52
categories: VisualStudio
---

在新的 .NET 上，将会默认使用 Portable PDB 符号格式，而如果 VisualStudio 配置了使用托管兼容模式，那么将在加载符号的时候，将会提示不支持 PDB 格式

<!--more-->


<!-- CreateTime:2021/3/27 11:18:52 -->

<!-- 发布 -->

在发现自己的代码因为没有加载符号而断点无法命中提示当前不会命中断点，还没有为该文档加载任何符号，就应该通过 调试->窗口->模块 打开模块界面，找到自己要调试的程序集，右击加载符号

如果 VisualStudio 找不到默认的符号文件，可以自己设置文件夹

但是在使用 Portable PDB 符号格式，如果 VisualStudio 配置了使用托管兼容模式，那么将会在模块界面看到自己的程序集的时间戳是 1951 年左右的。此时的 VS 将因为默认不会忽略 pdb 符号文件时间戳而失败

在自己找 PDB 文件，将会提示不支持 PDB 格式，或者英文版本的 PDB format is not supported 提示

解决的方法不是让 VisualStudio 2019 忽略 PDB 文件校验，而是通过配置的方法禁用使用托管兼容模式。只有在将默认调试引擎替换为旧版本才需要使用托管兼容模式，而旧版本的调试不支持新版本的 PDB 格式

点击工具->选项->调试 找到 使用托管兼容模式 选项，禁用即可

在英文版本的 VS 对应的选项是 Use Managed Compatibility Mode 选项

更多关于 使用托管兼容模式 的功能，请看 [使用托管兼容模式官方文档](https://docs.microsoft.com/zh-cn/visualstudio/debugger/general-debugging-options-dialog-box?view=vs-2019&WT.mc_id=WD-MVP-5003260 )

[“PDB format is not supported” with .NET portable debugging information](https://stackoverflow.com/q/44284170/6116637)



