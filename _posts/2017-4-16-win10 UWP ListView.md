---
layout: post
title:  win10 UWP ListView  
category: uwp 
---

<!--more-->

<div id="toc"></div>

## 横向布局

默认 ListView 是垂直，那么如何让 ListView 水平？

可以使用下面代码

```csharp
            <ListView.ItemsPanel>
                <ItemsPanelTemplate>
                    <StackPanel Orientation="Horizontal"></StackPanel>
                </ItemsPanelTemplate>
            </ListView.ItemsPanel>
```

设置代码可以进行横向。

如果发现 UWP ListView 横向没有滚动条，可以使用 ScrollViewer 添加


```csharp
            <ListView  ScrollViewer.VerticalScrollBarVisibility="Disabled"  
                       ScrollViewer.HorizontalScrollBarVisibility="Auto"
                       ScrollViewer.HorizontalScrollMode="Enabled"                  
                       ScrollViewer.VerticalScrollMode="Disabled">
```


