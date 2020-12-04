---
title: "git 统计两个 commit 之间相差的次数"
author: lindexi
date: 2020-12-3 16:22:28 +0800
CreateTime: 5/15/2020 9:00:18 AM
categories: git
---

本文告诉大家在一个连续的 commit 树中统计两个 commit 之间的差异的 commit 数量，也就是存在 A commit 存在而 B commit 不存在的 commit 的数量

<!--more-->


<!-- CreateTime:5/15/2020 9:00:18 AM -->



可以使用下面代码统计两个 commit 或分支之间的差异的次数

```csharp
git log --oneline A ^B | 
```

这里的 A 和 B 可以替换为分支或 commit 号，如 `origin/dev` 等，下面代码统计的是 `19ef3265` 和远端的 dev 的差异数量

```csharp
git log --oneline origin/dev ^19ef3265 | wc -l
```

