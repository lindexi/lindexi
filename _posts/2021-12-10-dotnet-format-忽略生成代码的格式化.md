---
title: "dotnet format 忽略生成代码的格式化"
author: lindexi
date: 2021-12-11 8:43:47 +0800
CreateTime: 2021/12/10 8:55:10
categories: dotnet
---

我给团队引入了自动格式化代码机器人，这个机器人有点傻，会将生成的代码也进行格式化，每次都会我的代码生成工具打架。为了让这两个机器人和好，我探索了让 dotnet format 忽略对生成代码进行自动格式化的方法

<!--more-->


<!-- CreateTime:2021/12/10 8:55:10 -->

<!-- 发布 -->

实现的方法很简单，只需要指定某个生成代码文件，或者存放代码文件的文件夹作为 `generated_code` 生成代码即可

在 `.editorconfig` 文件里，可以指定当前文件夹内的包括子文件夹内的文件的格式化规则，通过在 `.editorconfig` 文件里，设置某些文件或文件夹是被 `generated_code` 即可让 dotnet format 在进行格式化的时候，进行忽略

例如指定某个 MainPage.g.i.cs 文件作为生成文件，代码如下

```yml
# Remove the line below if you want to inherit .editorconfig settings from higher directories
root = true
# C# files
[MainPage.g.i.cs]
## All files should be considered generated code.
generated_code = true
```

或者是对文件夹设置此文件夹存放的是生成代码，在文件夹里面存放 `.editorconfig` 文件，内容如下

```yml
# Remove the line below if you want to inherit .editorconfig settings from higher directories
root = true
# C# files
[*.cs]
## All files should be considered generated code.
generated_code = true
```

更多请看 [Analyzer configuration - Visual Studio (Windows) Microsoft Docs](https://docs.microsoft.com/en-us/visualstudio/code-quality/use-roslyn-analyzers?view=vs-2022&WT.mc_id=WD-MVP-5003260 )

