---
title: "dotnet 单元测试 Mock 让一个对象继承多个接口"
author: lindexi
date: 2021-1-13 8:30:39 +0800
CreateTime: 2021/1/12 16:34:23
categories: dotnet
---

在使用 Mock 的时候，可以设置一个 Mock 的对象继承多个接口，而不需要自己定义一个接口去继承其他的多个接口

<!--more-->


<!-- CreateTime:2021/1/12 16:34:23 -->

<!-- 发布 -->

这个算是 Mock 的高级的玩法了，在 Mock 的官方文档有说到，可以使用 As 的方法，给 Mock 的对象加入其他的接口继承

如下面代码，我有两个接口，定义如下

```csharp
    public interface IF1
    {

    }

    public interface IF2
    {

    }
```

此时我想要定义一个 Mock 的对象，让这个对象继承上面这两个没有继承关系的接口，此时的代码可以如下

```csharp
 var mock = new Mock<IF1>();
 mock.As<IF2>();
```

尝试判断一下，可以看到拿到的对象是继承两个接口

```csharp
   Assert.IsInstanceOfType(f, typeof(IF1));
   Assert.IsInstanceOfType(f, typeof(IF2));
```

也就是说如果有多个接口需要继承，只需要加上 As 方法，在里面传入自己需要的接口就可以了

而调用 As 方法是有返回值的，通过此返回值就可以给接口设置调用的方法等

通过这样的方法就不需要自己去定义一个接口分别继承 Mock 需要继承的接口，如下面代码

```csharp
    public interface IF3: IF1, IF2
    {

    }
```

本文代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/47267274/JajegeefinereCakairerekejeye) 欢迎小伙伴访问

