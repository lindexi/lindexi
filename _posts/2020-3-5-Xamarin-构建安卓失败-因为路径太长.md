---
title: "Xamarin 构建安卓失败 因为路径太长"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2020/2/29 18:55:44
categories: 
---

如果将自己的应用放的路径比较深，那么构建安卓的时候可能因为路径超过长度失败

<!--more-->


<!-- CreateTime:2020/2/29 18:55:44 -->

<!-- 发布 -->

如果在你构建 Xamarin 安卓的时候看到如以下提示，那么请你确定以下你的应用程序路径是不是超过 250 个字符了

```csharp
obj\Debug\90\android\src\mono\android\support\v4\view\accessibility\AccessibilityManagerCompat_AccessibilityStateChangeListenerImplementor.java
```

解决方法是减少项目名的长度，移动到距离根文件夹比较近的文件夹，也就是让上面这个文件的总路径不要太长

