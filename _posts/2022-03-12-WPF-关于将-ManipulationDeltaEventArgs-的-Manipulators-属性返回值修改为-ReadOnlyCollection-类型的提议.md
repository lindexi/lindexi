---
title: "WPF 关于将 ManipulationDeltaEventArgs 的 Manipulators 属性返回值修改为 ReadOnlyCollection 类型的提议"
author: lindexi
date: 2022-3-14 8:59:9 +0800
CreateTime: 2022/3/12 10:08:49
categories: WPF
---

这是一个 WPF 框架的 API 变更提议，记录一下博客

<!--more-->


<!-- CreateTime:2022/3/12 10:08:49 -->

<!-- 发布 -->
<!-- 博客 -->

讨论的地方是： [How about change the type of ManipulationDeltaEventArgs.Manipulators property to ReadOnlyCollection · Discussion #6249 · dotnet/wpf](https://github.com/dotnet/wpf/discussions/6249 )

问题：

在 WPF 里，放在 ManipulationDeltaEventArgs 类型的 Manipulators 属性，当前的返回值是 `IEnumerable<IManipulator>` 类型。然而此类型的返回值用起来比较坑，例如获取元素数量，就需要用到 Linq 的 Count 方法

然而在 WPF 框架的实现，在 Manipulators 属性的获取，是采用此方法获取的

```csharp
    /// <summary>
    ///     Provides an update on an ocurring manipulation.
    /// </summary>
    public sealed class ManipulationDeltaEventArgs : InputEventArgs
    {
    	// 忽略代码

        /// <summary>
        ///     The Manipulators for this manipulation.
        /// </summary>
        public IEnumerable<IManipulator> Manipulators
        {
            get
            {
                if (_manipulators == null)
                {
                    _manipulators = ((ManipulationDevice)Device).GetManipulatorsReadOnly();
                }
                return _manipulators;
            }
        }

        private IEnumerable<IManipulator> _manipulators;
    }
```

更底层的 ManipulationDevice 的 GetManipulatorsReadOnly 方法的代码如下

```csharp
    internal sealed class ManipulationDevice : InputDevice
    {
        internal IEnumerable<IManipulator> GetManipulatorsReadOnly()
        {
            if (_manipulators != null)
            {
                return new ReadOnlyCollection<IManipulator>(_manipulators);
            }
            else
            {
                return new ReadOnlyCollection<IManipulator>(new List<IManipulator>(2));
            }
        }
        private List<IManipulator> _manipulators;
    }
```

实际上，以上代码有两个坑，一个就是 `_manipulators` 的初始化问题，另一个就是，为什么在 `_manipulators` 是空的时候，传入 `new List` 初始个数是 2 的值

提议：

修改 ManipulationDeltaEventArgs 的 Manipulators 属性的返回值为 `ReadOnlyCollection` 或者 `IReadOnlyCollection` 或者 `IReadOnlyList` 等类型

