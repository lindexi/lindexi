---
title: "WinForms 使用 Image 的 FromFile 方法加载文件和使用 Bitmap 有什么不同"
author: lindexi
date: 2021-11-11 8:26:9 +0800
CreateTime: 2021/11/9 19:55:10
categories: 
---

本文来告诉大家使用 GDI+ 的 Image.FromFile 加载图片文件和使用创建 Bitmap 传入图片文件有什么不同

<!--more-->


<!-- CreateTime:2021/11/9 19:55:10 -->

<!-- 发布 -->

如使用下面代码加载图片

```csharp
                using var image = Image.FromFile(imageFile, true);
                using var bitmap = new Bitmap(image);
```

和使用下面代码加载图片

```csharp
using var bitmap = new Bitmap(imageFile);
```

不同在于使用 Image.FromFile 加载图片文件，将会进入默认解码模式，拿到的 bitmap 的格式是 32 位色的，相当于如下代码

```csharp
                var image = bitmap.Clone(new Rectangle(0, 0, cols, rows), PixelFormat.Format32bppArgb);
```

而如果是从 Bitmap 创建传入图片文件，那么图片的 PixelFormat 就是图片文件自己定义的

