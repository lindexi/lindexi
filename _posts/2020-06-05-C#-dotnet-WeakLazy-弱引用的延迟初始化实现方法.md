---
title: "C# dotnet WeakLazy 弱引用的延迟初始化实现方法"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 6/5/2020 9:35:31 AM
categories: dotnet C#
---

本文来告诉大家如何实现一个 WeakLazy 方法

<!--more-->


<!-- CreateTime:6/5/2020 9:35:31 AM -->



代码很简单，请看代码

```csharp
    class WeakLazy<T> where T : class, new()
    {
        WeakReference<T> _instance = new WeakReference<T>(null);
        public T Value
        {
            get
            {
                lock (_instance)
                {
                    T value;
                    if (!_instance.TryGetTarget(out value))
                    {
                        value = new T();
                        _instance.SetTarget(value);
                    }
                    return value;
                }
            }
        }
    }
```

这样就能做到一个简单的缓存

