---
title: "git cannot lock ref"
author: lindexi
date: 2018-2-13 17:23:3 +0800
CreateTime: 2018-2-13 17:23:3 +0800
categories: git
---

如果在 git 准备下载仓库的时候，出现下面的错误
cannot lock ref 'refs/remotes/origin/xx':'refs/remotes/origin/xx/xx' exists cannot create 'ref/remotes/origin/xx'
那么请看本文，本文提供了一个解决方法。

<!--more-->



请使用下面代码

```csharp
git update-ref -d refs/remotes 
git fetch
```

使用了之后就可以了。


[https://stackoverflow.com/questions/43533473/error-cannot-lock-ref-refs-tags-exists-cannot-create-refs-tags](https://stackoverflow.com/questions/43533473/error-cannot-lock-ref-refs-tags-exists-cannot-create-refs-tags )

