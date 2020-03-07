---
title: "win2d CanvasRenderTarget vs CanvasBitmap"
author: lindexi
date: 2020-3-5 12:33:14 +0800
CreateTime: 2018/4/30 16:51:25
categories: UWP win2d
---

最近在做离线渲染就发现了 CanvasRenderTarget 和 CanvasBitmap 不知道为什么需要 CanvasBitmap 感觉 CanvasRenderTarget 和 CanvasBitmap 是重复的。
我在网上找了很多发现了大神的回复，于是我就把他翻译，希望大家看到就知道垃圾微软做 CanvasRenderTarget 和 CanvasBitmap 的区别

<!--more-->


<!-- CreateTime:2018/4/30 16:51:25 -->

<!-- csdn -->

<!-- <div id="toc"></div> -->
<!-- 标签：uwp,win2d -->

在 win2d 需要使用 CanvasBitmap 的是 CanvasBitmap 作为位图在 GPU 渲染而且作为位图可以直接渲染资源，本身就是资源给其他渲染使用。

但是 CanvasRenderTarget 是作为一个在 GPU 画的位图，是一个画板，从 GPU 画出的一个位图。

所有的 RenderTarget 都是位图，但不是所有的位图都是 RenderTarget，有些像素（如压缩的像素）只能在 source 使用而不能在 GPU 硬件画出来。通常 Rendertargets 对像素要严格的对齐要求，所以设备需要使用更多的资源。

那么如何选择使用 CanvasRenderTarget 和 CanvasBitmap ，简单的方法是如果需要画一些东西就使用 CanvasRenderTarget ，否则使用 CanvasBitmap 因为占用资源比较 CanvasRenderTarget 小。

## 为何 Rendertarget 不需要 LoadAsync

原因 Rendertarget 直接就在 GPU 画，在开始画的时候不需要从文件加载图片数据。和他不相同的，CanvasBitmap 是可能需要加载文件的图片。因为在一开始加载位图的效率会比在渲染的时候加载高。

参见：[CanvasRenderTarget vs CanvasBitmap](https://github.com/Microsoft/Win2D/issues/378 )

