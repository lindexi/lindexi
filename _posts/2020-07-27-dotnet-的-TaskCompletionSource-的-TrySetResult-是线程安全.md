---
title: "dotnet 的 TaskCompletionSource 的 TrySetResult 是线程安全"
author: lindexi
date: 2020-12-3 16:22:23 +0800
CreateTime: 2020/7/27 19:52:44
categories: dotnet
---

在创建一个 TaskCompletionSource 期望让等待的逻辑只会被调用一次，而调用的是多线程，可以使用 TrySetResult 方法，这个方法是线程安全，只会让 TaskCompletionSource 被调用一次

<!--more-->


<!-- CreateTime:2020/7/27 19:52:44 -->



在多个线程调用 TaskCompletionSource 的 TrySetResult 方法，只有一个线程能进入设置，其他线程将会拿到返回 false 的值

测试代码如下

```csharp
            _taskCompletionSource = new TaskCompletionSource<bool>();

            Foo();

            var taskList = new List<Task>();

            for (int i = 0; i < 100; i++)
            {
                var task = Task.Run(() =>
                {
                    _taskCompletionSource.TrySetResult(true);
                });

                taskList.Add(task);
            }

            Task.WaitAll(taskList.ToArray());

            Console.Read();

        private static async void Foo()
        {
            await _taskCompletionSource.Task;
            Console.WriteLine("F");
        }

        private static TaskCompletionSource<bool> _taskCompletionSource;
```

可以看到使用很多线程调用，而 Foo 只执行一次输出

上面测试的代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/916a11d68c0fba14c75b5e438bdecddb1ff421be/CallbadojuBaheanurjair ) 欢迎小伙伴访问


