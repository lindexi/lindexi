---
title: "C# dotnet 使用 OpenXml 关闭时不自动保存文档方法"
author: lindexi
date: 2024-5-20 16:22:3 +0800
CreateTime: 2021/6/30 20:14:17
categories: dotnet C#
---

默认在使用 OpenXML SDK 读写 Office 文件，如 PPT 或 Word 或 Excel 文件时，在关闭时调用 Dispose 将会自动将更改部分写入到文件。本文告诉大家如何让 OpenXML SDK 不写入只是释放资源

<!--more-->


<!-- CreateTime:2021/6/30 20:14:17 -->

<!-- 发布 -->

如使用以下代码传入 .docs 文件进行解析

```csharp
            using var wordprocessingDocument = WordprocessingDocument.Open("Test.docx", isEditable: true, new OpenSettings()
            {
            });
```

如此时有对文档的某个属性进行变更，例如使用下面代码

```csharp
            var rootPart = (MainDocumentPart) wordprocessingDocument.RootPart;
            var document = rootPart!.Document;
            var paragraph = document.Body!.GetFirstChild<Paragraph>();
            var run = paragraph!.GetFirstChild<Run>();
            var text = run!.GetFirstChild<Text>();
            text!.Text = "逗比";
```

根据 C# 最新的语法，在使用了 `using var` 将会在方法结束的时候，自动调用 Dispose 方法，和 `using ()` 的写法差不多。但是在调用 Dispose 方法时，将会发现，以上的更改自动保存到 Test.docx 文件里面

如果期望不自动保存，可以在 OpenSettings 设置不自动保存，如以下代码

```csharp
            using var wordprocessingDocument = WordprocessingDocument.Open("Test.docx", isEditable: true, new OpenSettings()
            {
                AutoSave = false
            });
```

调用上面代码，将会在结束时自动释放文件占用，而不将更改保存到文件

以上方法对于通用的 OpenXML 格式文件，如 docx 和 pptx 和 xlsx 等文件都可以设置在关闭时不自动保存



本文所有代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/3d8d6a8391a3f37f2da00c881b6a428f04e3ff2e/JeawufawelluChunerlecachear) 和 [gitee](https://gitee.com/lindexi/lindexi_gd/tree/3d8d6a8391a3f37f2da00c881b6a428f04e3ff2e/JeawufawelluChunerlecachear) 欢迎访问

可以通过如下方式获取本文的源代码，先创建一个空文件夹，接着使用命令行 cd 命令进入此空文件夹，在命令行里面输入以下代码，即可获取到本文的代码

```
git init
git remote add origin https://gitee.com/lindexi/lindexi_gd.git
git pull origin 3d8d6a8391a3f37f2da00c881b6a428f04e3ff2e
```

以上使用的是 gitee 的源，如果 gitee 不能访问，请替换为 github 的源

```
git remote remove origin
git remote add origin https://github.com/lindexi/lindexi_gd.git
```

获取代码之后，进入 JeawufawelluChunerlecachear 文件夹



更多请看 [Office 使用 OpenXML SDK 解析文档博客目录](https://blog.lindexi.com/post/Office-%E4%BD%BF%E7%94%A8-OpenXML-SDK-%E8%A7%A3%E6%9E%90%E6%96%87%E6%A1%A3%E5%8D%9A%E5%AE%A2%E7%9B%AE%E5%BD%95.html )

