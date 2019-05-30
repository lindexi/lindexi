---
title: "How to fix nuget Unrecognized license type MIT when pack"
author: lindexi
date: 2019-5-29 19:53:57 +0800
CreateTime: 2019-5-29 19:53:52 +0800
categories: 
---

When I packaging license within the nupkg, I will using License to replace licentUrl.

<!--more-->


<!-- csdn -->

I using this code to set the license as MIT but it can not pack.

```
<license type="MIT"/>
```

Because it is a newest feature.

If your nuget version is 5.0.2 that you should use this code.

```
<license type="expression">MIT</license>
```

[Packaging License within the nupkg · NuGet/Home Wiki](https://github.com/NuGet/Home/wiki/Packaging-License-within-the-nupkg )
