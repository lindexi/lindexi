---
title: "dotnet 在 OpenXML SDK 的 HasValue 是什么含义"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 4/6/2020 3:26:44 PM
categories: dotnet
---

在 OpenXML SDK 里面对于很多值，如字符串等的值，都包含一个 HasValue 属性。刚入门的小伙伴会认为这就是一个和可空类型一样的属性，表示这个属性是不是为空。其实这句话只是对一半，其实这个属性表示的是在重新定义的字符串参数里面的属性是否为空

<!--more-->


<!-- CreateTime:4/6/2020 3:26:44 PM -->



在 OpenXML SDK 里面给很多基础类型都是自己新定义的，如 SingleValue 和 StringValue 等，这些定义都继承 OpenXmlSimpleType 类，而在 OpenXmlSimpleType 类就存在一个让刚入行的小伙伴会错误认为这是一个可空类型的 HasValue 属性

这个属性的命名刚好和可空类型相同，而刚好在 OpenXML SDK 里面存在大量的类型都是可能为空的。例如尝试获取文本的字体大小

```csharp
    Int32Value fontSize = run.RunProperties.FontSize;
```

此时拿到了 fontSize 但是可能在 PPT 里面没有定义这个属性，也就是 fontSize 为空，此时如果没有判断就开始使用，将会在某些有趣的课件里面在这里炸掉

但是如果使用下面代码判断，将会如何？

```csharp
    if (fontSize.HasValue)
    {
                
    }
```

哈哈，贺喜你踩到了这个 API 设计的坑，此时的 Int32Value 不是可空类型，也就是其实此时的 fontSize 是空，尝试获取他的属性将会炸掉

正确的做法是使用下面代码

```csharp
if (fontSize != null)
{

}
```

那么这个 HasValue 的意思是什么？我将 OpenXmlSimpleType 的源代码写出来大家就知道了

```csharp
        public virtual bool HasValue => TextValue != null;
```

没错，这个属性只是用来判断是否存在值，而不是判断自己本身是否是空

