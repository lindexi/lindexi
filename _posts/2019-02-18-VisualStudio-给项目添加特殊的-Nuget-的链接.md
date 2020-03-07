---
title: "VisualStudio 给项目添加特殊的 Nuget 的链接"
author: lindexi
date: 2020-3-5 12:33:11 +0800
CreateTime: 2019/2/18 15:56:48
categories: VisualStudio
---

有一些项目需要使用一些特殊的 Nuget 才可以下载，但是不能在开源的项目需要小伙伴下载仓库在自己的 VisualStudio 修改自己的 Nuget 链接才能编译，本文告诉大家将某个项目独立的 Nuget 配置放在一个文件

<!--more-->


<!-- CreateTime:2019/2/18 15:56:48 -->

<!-- csdn -->

如果有安装 dotnet core 的小伙伴，只需要在项目所在的文件夹输入下面代码就可以创建 Nuget 配置文件

```csharp
dotnet new nuget
```

就可以看到在 csproj 文件所在的文件夹看到 nuget.config 文件，里面大概有下面代码

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
 <packageSources>
    <!--To inherit the global NuGet package sources remove the <clear/> line below -->
    <clear />
    <add key="nuget" value="https://api.nuget.org/v3/index.json" />
 </packageSources>
</configuration>

```

假如我需要通过 myget 下载一些没发布的库，可以在这个文件做下面的修改

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
 <packageSources>
    <!--To inherit the global NuGet package sources remove the <clear/> line below -->
    <clear />
    <add key="nuget" value="https://api.nuget.org/v3/index.json" />
    <add key="dotnet-core" value="https://dotnet.myget.org/F/dotnet-core/api/v3/index.json" />
 </packageSources>
</configuration>

```

但是我自己全局也有一些特殊的 Nuget 库，这时就可以将 clear 去掉

```
<?xml version="1.0" encoding="utf-8"?>
<configuration>
 <packageSources>
    <!--To inherit the global NuGet package sources remove the <clear/> line below -->
    <!-- <clear /> 取消注释将会让全局的配置失效，被清空，只使用下面定义的 Nuget 下载-->
    <add key="nuget" value="https://api.nuget.org/v3/index.json" />
    <add key="dotnet-core" value="https://dotnet.myget.org/F/dotnet-core/api/v3/index.json" />
 </packageSources>
</configuration>

```

