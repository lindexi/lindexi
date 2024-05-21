---
title: "dotnet core 黑科技·String.IndexOf 性能"
author: lindexi
date: 2024-5-20 16:22:4 +0800
CreateTime: 2019/8/31 16:55:58
categories: dotnet dotnet-core 黑科技
---

本文来告诉大家 dotnet core 里面使用的黑科技，如何提高`String.IndexOf(char)`的性能

<!--more-->


<!-- CreateTime:2019/8/31 16:55:58 -->


<!-- 标签：dotnet，dotnet-core，黑科技 -->

在[Performance Improvements in .NET Core](https://blogs.msdn.microsoft.com/dotnet/2017/06/07/performance-improvements-in-net-core/ )有说道哪些提高性能的代码，所以我就去看了一下，发现有一些黑科技。

里面包括了 `Concat` 的提升和很多 linq 的提升，我准备在自己的 WPF 项目使用这些代码，因为现在的项目没有使用 .net Framework 4.7 。

感觉垃圾微软把很多功能放在一个 Framework 让很多开发者无法升级

本文主要来让大家看一下 IndexOf 的黑科技

修改的提交在[Improve performance of String.IndexOf(char) and String.LastIndexOf(char) by bbowyersmyth](https://github.com/dotnet/corert/pull/1339 )

```csharp
         public unsafe int IndexOf(char value, int startIndex, int count)
         {
             if (startIndex < 0 || startIndex > Length)
                 throw new ArgumentOutOfRangeException("startIndex", SR.ArgumentOutOfRange_Index);
 
             if (count < 0 || count > Length - startIndex)
                 throw new ArgumentOutOfRangeException("count", SR.ArgumentOutOfRange_Count);
 
             fixed (char* pChars = &_firstChar)
             {
                 char* pCh = pChars + startIndex;
-                for (int i = 0; i < count; i++)
+
+                while (count >= 4)
+                {
+                    if (*pCh == value) goto ReturnIndex;
+                    if (*(pCh + 1) == value) goto ReturnIndex1;
+                    if (*(pCh + 2) == value) goto ReturnIndex2;
+                    if (*(pCh + 3) == value) goto ReturnIndex3;
+
+                    count -= 4;
+                    pCh += 4;
+                }
+
+                while (count > 0)
                 {
                     if (*pCh == value)
-                        return i + startIndex;
+                        goto ReturnIndex;
+
+                    count--;
                     pCh++;
                 }
-            }
 
-            return -1;
+                return -1;
+
+                ReturnIndex3: pCh++;
+                ReturnIndex2: pCh++;
+                ReturnIndex1: pCh++;
+                ReturnIndex:
+                return (int)(pCh - pChars);
+            }
         }
```

可以看到.net Framework 的代码是使用循环

```csharp
 fixed (char* pChars = &_firstChar)
 {
 	char* pCh = pChars + startIndex;
 	for (int i = 0; i < count; i++)
 	{
 		if (*pCh == value)
 		{
 			return i + startIndex;
 		}

 		pCh++;
 	}
 } 
 
```

代码很简单，但是优化只有就使用了很黑的

```csharp
         fixed (char* pChars = &_firstChar)
            {
                char* pCh = pChars + startIndex;

                while (count >= 4)
                {
                    if (*pCh == value) goto ReturnIndex;
                    if (*(pCh + 1) == value) goto ReturnIndex1;
                    if (*(pCh + 2) == value) goto ReturnIndex2;
                    if (*(pCh + 3) == value) goto ReturnIndex3;

                    count -= 4;
                    pCh += 4;
                }

                while (count > 0)
                {
                    if (*pCh == value)
                        goto ReturnIndex;

                    count--;
                    pCh++;
                }

                return -1;

                ReturnIndex3: pCh++;
                ReturnIndex2: pCh++;
                ReturnIndex1: pCh++;
                ReturnIndex:
                return (int)(pCh - pChars);
```

为什么需要使用这样的方法，因为这样可以直接塞满寄存器，做判断会快很多。这和具体编译有关

测试代码可以使用[IndexOfChar.cs](https://gist.github.com/bbowyersmyth/791ff071a10ef901ed7a )

如果想看大神的测试，[Measuring Performance Improvements in .NET Core with BenchmarkDotNet](http://aakinshin.net/blog/post/stephen-toub-benchmarks-part1/ )

