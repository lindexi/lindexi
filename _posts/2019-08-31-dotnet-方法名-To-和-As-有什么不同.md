---
title: "dotnet 方法名 To 和 As 有什么不同"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/8/31 16:55:58
categories: dotnet
---

在看到 dotnet 框架里面有很多方法里面用了 ToXx 和 AsXx 好像都是从某个类转换为另一个类，那么这两个方法命名有什么不同

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


在约定的方法命名里面，用 To 的方法表示从类 A 转为类 B 同时这两个类将没有任何关联，也就是对类 B 做的内容不会影响到原有的类 A 例如 ToString 方法

```csharp
            var str = new StringBuilder();
            var foo = str.ToString();
```

上面代码的 str 在调用 ToString 方法之后，返回值将和原来的 StringBuilder 没有关系

而在用 As 的方法表示转换类之后，转换的类和原有的类有关联，例如 List 的 AsReadOnly 方法

```csharp
            var foo = Enumerable.Range(0,100).ToList();
            var readOnlyCollection = foo.AsReadOnly();
            Console.WriteLine(readOnlyCollection.Count); // 100
            foo.RemoveAt(0);
            Console.WriteLine(readOnlyCollection.Count); // 99
```

虽然调用 AsReadOnly 返回了 ReadOnlyCollection 类型，但是原有的 foo 和 readOnlyCollection 是有关联的，对 foo 的修改将会影响转换类的值如上面代码，将 foo 移除了第一个之后，相应的值也会修改

在方法命名里面用 To 开始的表示转换类，同时转换的类和原有的没有关联，而使用 As 开始的表示从观测角度可以作为另一个类观测，转换的类和原有的存在关联

