---
title: "dotnet C# 在 finally 抛异常会发生什么"
author: lindexi
date: 2021-6-18 8:45:36 +0800
CreateTime: 2021/6/17 20:00:49
categories: dotnet C#
---

如果我在一个方法的 finally 里面抛出异常，而在 try 里面也抛出，那在上层拿到的是什么

<!--more-->


<!-- CreateTime:2021/6/17 20:00:49 -->


<!-- 发布 -->

如下面代码

```csharp
        private void F1()
        {
            try
            {
                A();
            }
            catch (Exception e)
            {
                
            }
        }

        private void A()
        {
            try
            {
                throw new ArgumentException("lindexi is doubi");
            }
            finally
            {
                throw new FileNotFoundException("lsj is doubi");
            }
        }
```

请问在 F1 的 catch 里面收到的 e 是什么类型，会触发几次？

试试上面的代码，可以看到其实在进入 try 时，抛出 ArgumentException 不会立刻返回到 F1 方法里面，而是会继续执行 finally 方法

在 finally 抛出的 FileNotFoundException 将会替换掉 ArgumentException 抛给了 F1 方法里面

所以答案就是在 F1 的 catch 方法，只会被触发一次，这一次的 e 就是在 finally 抛出的 FileNotFoundException 异常

