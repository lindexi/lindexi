---
title: "修复 SmartAssembly 混淆 .NET 6 时提示 Unable to load runtime config file 失败"
author: lindexi
date: 2022-1-12 8:27:51 +0800
CreateTime: 2022/1/11 21:09:35
categories: 
---

本文告诉大家如何修复使用 SmartAssembly 7.5 混淆 .NET 6 应用时提示 Unable to load runtime config file 失败

<!--more-->


<!-- CreateTime:2022/1/11 21:09:35 -->

<!-- 发布 -->

因为在 SmartAssembly 7.5 发布时，还没有正式发布 .NET 6 版本，好在 IL 是兼容的，因此跑起来也没有什么问题。为了让 SmartAssembly 能跑起来，只需要新建一个 Xxx.runtimeconfig.json 文件，在文件里面放入以下内容

```json
{
  "runtimeOptions": 
  {
    "tfm": "net6.0",
    "framework": 
    {
      "name": "Microsoft.NETCore.App",
      "version": "6.0.0"
    }
  }
}
```

这个 `Xxx.runtimeconfig.json` 里的 Xxx 没啥要求，似乎写啥都行，写 Xxx 也行，只要有这个文件即可。那同文件夹下有多个 runtimeconfig 文件？没问题，放多个文件也没问题

更多请看 [Failed to load assembly. Unable to load runtime config file. — Redgate forums](https://forum.red-gate.com/discussion/88584/failed-to-load-assembly-unable-to-load-runtime-config-file )

