---
title: "dotnet C# 多线程集合的 Linq 获取值同时写入集合将会抛出异常"
author: lindexi
date: 2021-6-25 8:36:6 +0800
CreateTime: 2021/6/25 8:35:55
categories: dotnet C#
---

在集合变更，无论是使用 foreach 遍历还是使用 Linq 语句，即使是 FirstOrDefault 获取第一项，都会失败

<!--more-->


<!-- CreateTime:2021/6/25 8:35:55 -->

<!-- 发布 -->

例如下面代码，在两个线程里面，第一个线程获取使用 FirstOrDefault 方法，第二个线程变更集合内容

```csharp
        static void Main(string[] args)
        {
            var list = new List<string>();
            Task.Run(() =>
            {
                while (true)
                {
                    var str = list.FirstOrDefault();
                    Console.WriteLine(str);
                }
            });

            Task.Run(() =>
            {
                while (true)
                {
                    list.Clear();
                    list.Add("doubi");
                }
            });

            Console.Read();
        }
```

运行以上代码，可以看到抛出了 ArgumentOutOfRangeException 如下面代码

```
System.ArgumentOutOfRangeException:“Index was out of range. Must be non-negative and less than the size of the collection. ”
```


本文所有代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/ffc985358957cc0c06c0985caa1d166c7ef8757d/GujidearkiLicairfeeka) 和 [gitee](https://gitee.com/lindexi/lindexi_gd/tree/ffc985358957cc0c06c0985caa1d166c7ef8757d/GujidearkiLicairfeeka) 欢迎小伙伴访问

可以通过如下方式获取本文的源代码，先创建一个空文件夹，接着使用命令行 cd 命令进入此空文件夹，在命令行里面输入以下代码，即可获取到本文的代码

```
git init
git remote add origin https://gitee.com/lindexi/lindexi_gd.git
git pull origin ffc985358957cc0c06c0985caa1d166c7ef8757d
```

以上使用的是 gitee 的源，如果 gitee 不能访问，请替换为 github 的源

```
git remote remove origin
git remote add origin https://github.com/lindexi/lindexi_gd.git
```

获取代码之后，进入 GujidearkiLicairfeeka 文件夹


