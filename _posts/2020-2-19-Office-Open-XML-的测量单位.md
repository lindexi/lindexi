---
title: "Office Open XML 的测量单位"
author: lindexi
date: 2020-2-19 16:19:12 +0800
CreateTime: 2020-2-19 15:59:57 +0800
categories: 
---

本文记录 Office Open XML (OOXML) 的测量单位

<!--more-->


<!-- 发布 -->

在 Office Open XML 默认单位是 dxa 也就是像素点的 20 倍，如 ISO 216 A4 (210x297mm ~ 8.3×11.7in) 的大小可以使用下面代码表示

在页面大小 Page width Page height 和边距 margin 和缩进 tabs 使用

```
<w:pgSz w:w="11906" w:h="16838"/>
```

单位计算可以使用下面公式

```
像素 Points = dxa/20 
英寸 Inches = Points/72
厘米 Centimeters = Inches*2.54
```

缩写如下

- Points:pt
- Inches:in
- Centimeters:cm

以 A4 为例

```
Width = 11906 dxa = 595.3 point = 8.27 in = 21 cm
```

## Half-points

用来表示字体大小的半点，一个点等于两个半点，如表示 12pt 可以这样写

```xml
// run properties
<w:rPr>
  // 24 = 12pt
  <w:sz w:val="24"/>
</w:rPr>
```

## Fiftieths of a Percent

表示百分比相对值，用于表示表格的宽度和相对宽度，他的值和百分比换算如下

```
n/100 * 5000
```

如百分之50可以表示为 50/100 * 5000 pct 的大小，如表格的宽度是百分之50宽度

```xml
<w:tbl>
    <w:tblPr>
      <!-- 表格宽度是百分之50宽度 -->
      <w:tblW w:w="2500" w:type="pct"/>
    </w:tblPr>
    <w:tblGrid/>
    <w:tr>
        <w:tc>
            <w:p>
                <w:r>
                    <w:t>Hello, World!</w:t>
                </w:r>
            </w:p>
        </w:tc>
    </w:tr>
</w:tbl>
```

## English Metric Unit

这也是最常用的单位，使用 EMUs (English Metric Unit) 用来表示图片和其他元素的宽度，换算如下

```
1 in = 914400 EMUs
1 cm = 360000 EMUs
```

如用于 `w:drawing` 绘制，表示绘制画布的宽度 `<wp:extent cx="1530350" cy="2142490"/>` 用这么大的数是可以提高精度和性能，不需要通过浮点计算

