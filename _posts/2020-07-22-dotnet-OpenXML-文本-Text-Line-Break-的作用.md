---
title: "dotnet OpenXML 文本 Text Line Break 的作用"
author: lindexi
date: 2020-12-3 20:27:49 +0800
CreateTime: 2020/7/22 18:24:08
categories: dotnet
---

本文主要和小伙伴聊 a:br 这个标记的作用

<!--more-->


<!-- CreateTime:2020/7/22 18:24:08 -->



在 OpenXML 的 `<a:br/>` 的定义是 Text Line Break 是放在文本的 `<a:p>` 的标记，用于表示换行

如 [ECMA 376](http://www.ecma-international.org/publications/standards/Ecma-376.htm ) 文档的 21.1.2.2.1 所说，这个标记的作用是在一段内，将两个 TextRun 使用一个垂直的换行分割。这个元素可以具备当前的 rPr (RunProperties) 属性，可以用来设置换行的文本格式，用于在后续插入文本的时候使用正确的格式

在 OpenXML SDK 使用 DocumentFormat.OpenXml.Drawing.Break 表示，可以使用下面代码拿到

```csharp
using DocumentFormat.OpenXml.Drawing;

public void Foo(Paragraph textParagraph)
{
   foreach (var openXmlElement in textParagraph)
   {
      if (openXmlElement is Break breakLine)
      {

      }
   }
}
```

在 Office 里面基本上段落的分割都是使用回车键，也就是你在 Word 里面按下回车键，那么将会创建新的段落。而 `<a:br/>` 的作用就是让文档可以在一个段落里面使用多行

更多请看 [Office 使用 OpenXML SDK 解析文档博客目录](https://blog.lindexi.com/post/Office-%E4%BD%BF%E7%94%A8-OpenXML-SDK-%E8%A7%A3%E6%9E%90%E6%96%87%E6%A1%A3%E5%8D%9A%E5%AE%A2%E7%9B%AE%E5%BD%95.html )

在 UWP 使用 XAML 的换行，请看 [win10 uwp 在 xaml 让 TextBlock 换行](https://blog.lindexi.com/post/win10-uwp-%E5%9C%A8-xaml-%E8%AE%A9-TextBlock-%E6%8D%A2%E8%A1%8C.html )

