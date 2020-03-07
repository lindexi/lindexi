---
title: "WPF 如何判断两个 LinearGradientBrush 相等"
author: lindexi
date: 2020-3-5 12:33:12 +0800
CreateTime: 2019/7/22 21:26:22
categories: WPF
---

在 WPF 没有提供默认的判断 LinearGradientBrush 相等的方法，本文给大家一个可以直接在项目使用的方法

<!--more-->


<!-- CreateTime:2019/7/22 21:26:22 -->

<!-- csdn -->

可以使用下面代码判断两个 LinearGradientBrush 是否相等

```csharp
        public static bool AreEquals(LinearGradientBrush linearGradientBrush1,
            LinearGradientBrush linearGradientBrush2)
        {
            if (linearGradientBrush1.ColorInterpolationMode !=
                linearGradientBrush2.ColorInterpolationMode
                || linearGradientBrush1.EndPoint !=
                linearGradientBrush2.EndPoint
                || linearGradientBrush1.MappingMode !=
                linearGradientBrush2.MappingMode
                // ReSharper disable once CompareOfFloatsByEqualityOperator
                || linearGradientBrush1.Opacity !=
                linearGradientBrush2.Opacity
                || linearGradientBrush1.StartPoint !=
                linearGradientBrush2.StartPoint
                || linearGradientBrush1.SpreadMethod !=
                linearGradientBrush2.SpreadMethod
                || linearGradientBrush1.GradientStops.Count !=
                linearGradientBrush2.GradientStops.Count)
            {
                return false;
            }

            for (int i = 0; i < linearGradientBrush1.GradientStops.Count; i++)
            {
                if (linearGradientBrush1.GradientStops[i].Color !=
                    linearGradientBrush2.GradientStops[i].Color
                    // ReSharper disable once CompareOfFloatsByEqualityOperator
                    || linearGradientBrush1.GradientStops[i].Offset !=
                    linearGradientBrush2.GradientStops[i].Offset)
                {
                    return false;
                }
            }

            return true;
        }

```

上面代码可以在项目使用

