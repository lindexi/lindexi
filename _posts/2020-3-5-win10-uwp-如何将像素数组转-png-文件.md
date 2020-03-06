---
title: "win10 uwp 如何将像素数组转 png 文件"
author: lindexi
date: 2020-3-5 12:33:14 +0800
CreateTime: 2019/3/25 8:53:01
categories: Win10 UWP
---

堆栈的小伙伴好奇他有一个数组，数组里面是 BGRA 的像素，他需要将这个数组转换为 PNG 文件
在 UWP 可以使用 BitmapEncoder 将像素数组加密为文件

<!--more-->


<!-- CreateTime:2019/3/25 8:53:01 -->

<!-- csdn -->

在使用 BitmapEncoder 之前需要要求有像素数组，像素数组的规律有要求，按照 BGRA 按照顺序的数组，同时要求知道像素的原图的像素宽度。因为存放像素数组使用的是一维的数组，如果不知道图片宽度，那么就不知道这个图片的像素是对应数组哪个

通过下面方法可以转换像素数组到文件

```csharp

        private async Task ByteToPng(byte[] byteList, int width, int height, IRandomAccessStream file)
        {
            try
            {
                var encoder = await BitmapEncoder.CreateAsync(BitmapEncoder.PngEncoderId, file);
                encoder.SetPixelData(BitmapPixelFormat.Bgra8, BitmapAlphaMode.Ignore, (uint) width, (uint) height, 96,
                    96, byteList);
                await encoder.FlushAsync();
            }
            catch (Exception e)
            {
            }
        }
```
 
这里的 IRandomAccessStream 就是 StorageFile 打开文件

```csharp
        private async Task SaveToFileAsync(byte[] byteList, int width, int height, IStorageFile file)
        {
            using (var stream = (await file.OpenStreamForWriteAsync()).AsRandomAccessStream())
            {
                await ByteToPng(byteList, width, height, stream);
            }
        }
```

通过这个方法，可以传入数组和图片的宽度和高度，保存的文件，就可以将像素数组保存到 png 文件

