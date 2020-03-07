---
title: "win10 uwp 从StorageFile获取文件大小"
author: lindexi
date: 2020-3-5 12:33:14 +0800
CreateTime: 2018/2/13 17:23:03
categories: Win10 UWP
---

本文主要：获取文件大小

<!--more-->


<!-- CreateTime:2018/2/13 17:23:03 -->


<div id="toc"></div>

        private async Task<ulong> FileSize(Windows.Storage.StorageFile file)
        {
            var size = await file.GetBasicPropertiesAsync();
            return size.Size;
        }//32ddd4227a66713e1329214424c4be9b
        
在群里看到有大神问我就写出，虽然少，在没看到他们说之前没想到，九幽开发者：53078485

参见：http://stackoverflow.com/questions/14168439/how-to-get-file-size-in-winrt

## 获取用户最近使用文件

一般我们有一个文件夹或文件不在我们应用目录，需要用户Pick获得权限，那么我们会让用户每次都Pick，这样是不行的。
我们有什么方法让UWP 记住用户选择文件或文件夹，或UWP不让用户每次选择文件

其实有两个方法

- MostRecentlyUsedList

- FutureAccessList 

第一个很简单，用户最近使用文件或文件夹，这个只能保存25，我就在这里坑，他会自动删除，找了[https://msdn.microsoft.com/zh-cn/windows/uwp/files/how-to-track-recently-used-files-and-folders](https://msdn.microsoft.com/zh-cn/windows/uwp/files/how-to-track-recently-used-files-and-folders)，其实我们可以使用FutureAccessList ，这个可以使用1k个，但是为什么只有1k，好少，垃圾wr，要就给无限

参见：http://lindexi.oschina.io/lindexi/post/win10-uwp-%E4%BF%9D%E5%AD%98%E7%94%A8%E6%88%B7%E9%80%89%E6%8B%A9%E6%96%87%E4%BB%B6%E5%A4%B9/


        

