---
layout: post
title:  C# AddRange 添加位置 
category: 技术 
---

有没人想知道， AddRange 添加位置 是哪？

是添加到数组的开始，还是数组的末尾？

<!--more-->

<div id="toc"></div>
<!-- csdn -->

假如有一个 代码，看起来是下面的，很简单，把一个 list b 放进list a


```csharp
                List<int> a=new List<int>(){1,2,};
            List<int> b = new List<int> {5, 6};
            a.AddRange(b);
            foreach (var temp in a)
            {
                Console.WriteLine(temp);
            }
```

那么打印的是 1 2  5 6

还是 5 6 1 2

答案是自己去跑。

不要打我，答案是 1256， AddRange 添加数组的末尾。

 
