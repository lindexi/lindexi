---
title: "WPF 在后台代码定义 ResourceDictionary 资源字典"
author: lindexi
date: 2020-11-20 17:38:3 +0800
CreateTime: 2020-11-20 17:14:59 +0800
categories: WPF
---

在 WPF 中的 ResourceDictionary 资源字典大部分都是在 XAML 里面定义的，但是在 C# 代码定义一个资源字典也是可行的，只是写起来有点诡异

<!--more-->


<!-- 发布 -->

在 CSharp 后台代码里面给 WPF 定义资源字典需要重新创建一个类，让这个类继承 ResourceDictionary 如以下代码

```csharp
    public class Foo : ResourceDictionary
    {

    }
```

然后在构造函数里面加入测试的代码，添加一个颜色作为资源

```csharp
    public class Foo : ResourceDictionary
    {
        public Foo()
        {
            Add("Foo", Brushes.Gray);
        }
    }
```

在后台代码添加的资源需要在被加入到使用之前，完成资源的添加，因此建议写在构造函数里面

使用这个在后台代码定义的资源字典有两个方法，一个是在 XAML 引用，另一个是在后台代码添加

在 XAML 引用的逻辑如下

```xml
    <Window.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <local:Foo></local:Foo>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Window.Resources>

    <Grid Background="{StaticResource Foo}">

    </Grid>
```

需要注意的是在 C# 后台定义的 WPF 资源字典不能通过 Url 的方式引用，而是需要通过实例的方式。可以选择创建实例或引用资源的方式，如上面代码是创建实例

在上面代码定义了一个测试使用的代码，尝试使用 `StaticResource Foo` 静态资源，这个静态资源是定义在后台代码的资源字典的，运行代码可以看到能绑定上

而在后台代码添加引用的方法如下

```csharp
    Resources.MergedDictionaries.Add(new Foo());
```

这就是在后台定义资源字典的用法了

在后台代码定义资源字典还有一个有趣的黑科技是重新返回资源的值

大概代码逻辑如下

```csharp
    public class Foo : ResourceDictionary
    {
        public Foo()
        {
            Add("Foo", Brushes.Gray);
        }

        protected override void OnGettingValue(object key, ref object value, out bool canCache)
        {
            value = Brushes.Blue;
            canCache = true;
        }
    }
```

在这个资源字典里面定义了 Foo 是灰色，但是在 OnGettingValue 方法里面返回的是蓝色。因此在 XAML 里面绑定静态资源的时候，将会显示的实际颜色是蓝色

另外只要资源里面的值不是 null 空，那么都会进入 OnGettingValue 方法去读取实际返回的值，而实际返回值是 object 类型，意味着可以愉快更改返回类型

```csharp
        public Foo()
        {
            Add("Foo", null); // 传入 null 将不会进入 OnGettingValue 方法
        }

        protected override void OnGettingValue(object key, ref object value, out bool canCache)
        {
            value = Brushes.Blue;
            canCache = true;
        }
```

如以下代码，传入的是 object 但是在 OnGettingValue 方法可以返回颜色

```csharp
        public Foo()
        {
            Add("Foo", new object());
        }

        protected override void OnGettingValue(object key, ref object value, out bool canCache)
        {
            value = Brushes.Blue;
            canCache = true;
        }
```

利用这个有趣的科技也可以用来做多语言或者主题色等，只是这个方法没有自动的更新值机制

本文代码放在[github](https://github.com/lindexi/lindexi_gd/tree/9b4f948b/LojafeajahaykaWiweyarcerhelralya)欢迎小伙伴访问

