---
title: "Xamarin 解决创建空白项目编译提示 linking references 找不到资源"
author: lindexi
date: 2024-5-28 16:48:33 +0800
CreateTime: 2019/12/24 9:28:30
categories: Xamarin
---

在新建一个 Xamarin 应用，编译时提示了 linking references 和一些诡异的文件无法访问，原因是文件路径问题和 NuGet 还原问题

<!--more-->


<!-- CreateTime:2019/12/24 9:28:30 -->
<!-- 标签：Xamarin -->


如果创建的 Xamarin 项目所在的文件路径比较深，同时包含中文等字符时，在编译时可以会诡异失败

```csharp
oid\Xamarin.Android.Aapt2.targets(155,3): error APT2062: failed linking references.
```

或者

```csharp
error APT0000: resource integer/google_play_services_version (aka com.softoursistemas.rutesc.droid:integer/google_play_services_version) not found
```

也有比较明确的提示

```csharp
Failed to create JavaTypeInfo for class: Android.Support.V13.View.Inputmethod.InputConnectionCompat/IOnCommitContentListenerImplementor due to MAX_PATH: System.IO.DirectoryNotFoundException: 未能找到路径“g:\lindexi\ChuwheaweaharfelkalBelqearjurnawnere\ChuwheaweaharfelkalBelqearjurnawnere\ChuwheaweaharfelkalBelqearjurnawnere.Android\obj\Debug\90\android\src\mono\android\support\v13\view\inputmethod\InputConnectionCompat_OnCommitContentListenerImplementor.java”的一部分。
   在 System.IO.__Error.WinIOError(Int32 errorCode, String maybeFullPath)
   在 System.IO.File.InternalDelete(String path, Boolean checkHost)
   在 System.IO.File.Delete(String path)
   在 Xamarin.Android.Tools.Files.CopyIfStreamChanged(Stream stream, String destination)
   在 Xamarin.Android.Tasks.Generator.CreateJavaSources(TaskLoggingHelper log, IEnumerable`1 javaTypes, String outputPath, String applicationJavaClass, String androidSdkPlatform, Boolean useSharedRuntime, Boolean generateOnCreateOverrides, Boolean hasExportReference)	ChuwheaweaharfelkalBelqearjurnawnere.Android	
```

也有很诡异的提示

```csharp
Android\obj\Debug\90\lp\39\jl\res : error APT2097: failed to open directory: 绯荤粺
```

有明确的提示的可以看到，其实 Xamarin 的设计有点坑，就是路径太长了，加上了我的项目命名，在 Windows 下的路径就超过了 260 字符限制，此时就编译不通过

解决方法是尝试将项目移动到磁盘的第二级文件夹，然后使用删除所有的 `bin` 和 `obj` 文件夹，此时就可以解决这几个诡异的坑

[Failed linking references in Android project (Xamarin - Visual Studio Community 2019) · Issue #3822 · xamarin/xamarin-android](https://github.com/xamarin/xamarin-android/issues/3822)

[Create a new Mobile.App (Xamarin.Forms) project, try to compile, but "Failed linking references" - Stack Overflow](https://stackoverflow.com/questions/57592847/create-a-new-mobile-app-xamarin-forms-project-try-to-compile-but-failed-lin)

本文以上的 ChuwheaweaharfelkalBelqearjurnawnere 项目放在 <https://github.com/lindexi/lindexi_gd/tree/c265bb3f31155c45dab032cc50f4aa4215829666/Chuwheaweahar> 上，项目没有什么特殊的

