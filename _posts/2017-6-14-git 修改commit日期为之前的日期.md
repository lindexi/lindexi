---
layout: post
title:  git 修改commit日期为之前的日期 
category: 技术 
---

我在之前修改了一个文件，但是没有commit，现在我想要commit，日期为那天的日期

git 修改日期的方法很简单，因为有一个命令`--date` 可以设置提交时间。

<!--more-->
<!-- csdn -->

使用git自定义时间的提交格式：

```csharp
git commit --date="月 日 时间 年 +0800" -am "提交"
```

如果我要把日期修改为 2016.5.7 那么我可以使用下面代码

```csharp
git commit --date="May 7 9:05:20 2016 +0800" -am "提交"
```

其中我希望大家知道的：


```csharp
January, Jan.
February, Feb.
March, Mar.
April, Apr.
May, May.
June, Jun.
July, Jul.
August, Aug.
September, Sep.
October, Oct.
November, Nov.
December, Dec.
```

  
