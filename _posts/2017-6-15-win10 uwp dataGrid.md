---
layout: post
title:  win10 uwp dataGrid 
category: uwp 
---


 
看到国内一个大神写的：https://github.com/zmtzawqlp/UWP-master/commits/master 
 
本文有大量都是抄袭他的代码

<!--more-->

<div id="toc"></div>
<!-- csdn -->

## 表格控件

我们先要知道我说的是哪个？

其实DataGrid就是表格控件，本文就是告诉大家如何做一个UWP 表格控件

一开始我是改ListView，ListView有个问题，就是你设置他的宽度实际是很小，这个如何做？

其实简单UWP ListView宽度过小，可以通过

```xml
                <ListView.ItemContainerStyle>
                    <Style TargetType="ListViewItem">
                        <Setter Property="HorizontalContentAlignment"
                                Value="Stretch"></Setter>
                    </Style>
                </ListView.ItemContainerStyle>

```

我们这个问题还可以做ListView对齐，ListBox内容对齐，ListBox宽度过小的解决

这样我们手动写表格，手动写表格宽度不好做，因为我们需要都是固定宽度

## 表格固定列显示

参见：http://www.cnblogs.com/FaDeKongJian/p/5860148.html

##
 
现在可以使用： https://github.com/MyToolkit/MyToolkit/wiki/DataGrid
 
 国外 https://liftcodeplay.com/2015/10/24/datagrid-alternatives-in-uwp/
 
 需要钱的：https://www.syncfusion.com/products/uwp/sfdatagrid
 
 

