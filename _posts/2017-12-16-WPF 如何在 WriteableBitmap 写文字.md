---
layout: post
title: WPF 如何在 WriteableBitmap 写文字 
category: 技术 
stickie: False
---

最近看到[WPF 使用不安全代码快速从数组转 WriteableBitmap ](https://lindexi.github.io/lindexi/post/WPF-%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%AE%89%E5%85%A8%E4%BB%A3%E7%A0%81%E5%BF%AB%E9%80%9F%E4%BB%8E%E6%95%B0%E7%BB%84%E8%BD%AC-WriteableBitmap.html )可以快速从数组转 WriteableBitmap 所以就让他画一些元素，但是发现元素有文字就没法了。

本文告诉大家如何在 WriteableBitmap 把文字画上去。

<!--more-->
<!-- csdn -->

这个方法是从 [WriteableBitmapEx](https://github.com/teichgraf/WriteableBitmapEx/ )看到的，可以在页面创建一个 TextBlock 让他来显示文字，然后使用截图获得文字，把图片画到 WriteableBitmap 就好。

先创建一个对象

```csharp
 var wb = new WriteableBitmap((int) 宽, (int) 高, 96, 96, PixelFormats.Pbgra32, null);
```

然后对文字截图

```csharp
 var rtb = new RenderTargetBitmap(wb.PixelWidth, wb.PixelHeight, wb.DpiX, wb.DpiY, PixelFormats.Pbgra32);
 rtb.Render(txt);
```

然后从截图复制到 WriteableBitmap 可以使用不安全代码

```csharp
   wb.Lock();
   rtb.CopyPixels(new Int32Rect(0,0, rtb.PixelWidth, rtb.PixelHeight), 
   wb.BackBuffer,
   wb.BackBufferStride * wb.PixelHeight,  wb.BackBufferStride);

   wb.AddDirtyRect(new Int32Rect(0, 0, (int)ActualWidth, (int)ActualHeight));
   wb.Unlock();
```

 
