---
title: "git无法pull仓库refusing to merge unrelated histories"
author: lindexi
date: 2018-11-14 16:58:10 +0800
CreateTime: 2018-2-13 17:23:3 +0800
categories: git
---

本文讲的是把git在最新2.9.2，合并pull两个不同的项目，出现的问题
如何去解决 `fatal: refusing to merge unrelated histories` 合并两个不同历史的仓库

<!--more-->



一开始是我在 [Github](https://github.com/iip-easi/EncodingNormalior) 新建一个仓库，写了 License ，然后把本地一个写了很久仓库上传。

因为已经创建了和本地不同的，不是一个空仓库，在上传之前先pull，因为两个仓库不同，发现`refusing to merge unrelated histories`，无法 pull 所以上传失败，谷歌了很久才发现为何这样。

原来在 2.9.2 之后，不可以合并不同没有相同结点的分支，如果需要合并两个不同结点的分支，那么需要在`git pull `添加一句代码`--allow-unrelated-histories`。于是修改之后的代码，假如源是origin，分支是master，那么请看下面代码。

```csharp
git pull origin master --allow-unrelated-histories
```

这个功能是可以让大家不要把仓库上传错了，如果会加上这个代码，那么就是自己确定了上传。之前很容易就把代码传错了，现在可以看到，如果上传的不是之前的，那么就需要加代码。

