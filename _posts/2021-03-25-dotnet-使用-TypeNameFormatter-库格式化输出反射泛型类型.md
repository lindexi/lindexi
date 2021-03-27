---
title: "dotnet 使用 TypeNameFormatter 库格式化输出反射泛型类型"
author: lindexi
date: 2021-3-26 8:38:31 +0800
CreateTime: 2021/3/25 20:08:24
categories: dotnet
---

默认的反射输出带泛型的类型，都会使用反引号的字符串。使用 TypeNameFormatter 库可以输出贴近代码的输出

<!--more-->


<!-- CreateTime:2021/3/25 20:08:24 -->

<!-- 发布 -->

默认的类型的输出是和代码写的方法不相同，如获取 `List<int>` 类型的输出

```csharp
Console.WriteLine(typeof(List<int>));
// 大概输出是 List`1[System.Int32]
```

而我期望输出的是 `List<int>` 的内容，使用 TypeNameFormatter 库的代码如下

```csharp
    class Program
    {
        static void Main(string[] args)
        {
            var fType = typeof(List<F>);
            Console.WriteLine(fType.GetFormattedName());
            // 输出 List<F>
        }
    }

    class F
    {
        public string A { get; set; }
        public string B { get; set; }
        public string C { get; set; }
    }
```

使用 NuGet 搜 TypeNameFormatter 就可以找到这个库，需要加上命名空间

```csharp
using TypeNameFormatter;
```

编辑 csproj 添加下面代码可以快速安装

```xml
  <ItemGroup>
    <PackageReference Include="TypeNameFormatter.Sources" Version="1.1.1">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>
  </ItemGroup>
```

这是一个源代码包，按照之后，可以在 obj 文件夹找到代码。或者进入 GetFormattedName 方法定义，可以看到代码

这个库在 GitHub 开源，请看 [https://github.com/stakx/TypeNameFormatter](https://github.com/stakx/TypeNameFormatter)

