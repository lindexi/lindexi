---
layout: post
title: resharper 自定义代码片
tags: 技术,Resharper,代码片
---

Resharper的代码预知和VisualStudio的代码片相似，但是他可以知道当前输入
是变量还是属性，这样就比原来的好用。

<!--more-->

安装了Resharper 2016.2会隐藏VisualStudio的代码片。

resharper提供了很有用的代码片，但是我们还是觉得不够，这时我们需要自己编辑Resharper代码片。

打开Resharper > Tool > Templates Explor

![](http://7xqpl8.com1.z0.glb.clouddn.com/76a67ab5-7429-4e23-8bd2-6d6d68755c8e2016122205413.jpg)

选择语言

![](http://7xqpl8.com1.z0.glb.clouddn.com/76a67ab5-7429-4e23-8bd2-6d6d68755c8e2016122205450.jpg)

选择一个修改的代码片，选择编辑

![](http://7xqpl8.com1.z0.glb.clouddn.com/76a67ab5-7429-4e23-8bd2-6d6d68755c8e2016122205827.jpg)

可以添加新的代码片，我们新建一个

和vs的一样，我们需要代换的变量用`$变量$`，相同的会代换为输入的单词，可以按Enter跳到下一个，当然一旦按Enter就是确定这个单词。

例如我们想写一个

```
       public string Url
        {
            set
            {
                _url = value;
                OnPropertyChanged();
            }
            get
            {
                return _url;
            }
        }

        private string _url;

```

可以看到，这变量，有Url需要我们写三遍，而且还需要写set、get，所以我们需要写一个简单的模板，直接使用。

接下来我就直接写出一个可以使用的

```
public $string$ $name$
{
    set
    {
         _$name$=value;  
		 OnPropertyChanged();       
    }
    get
    {
         return _$name$;
    }
}

private $string$ _$name$$END$;

```

所有输入的`$string$`都会代换为一个单词，`$name$`也代换为一个单词，这个单词就是用户输入

这一个就是在代码按ps就会使用属性加上`OnPropertyChanged();`


还有特殊的变量`$END$`，变量作用在用户写完就是跳到END位置。

有定义一些常用的变量，这变量不会让用户改变。

我们先看下有哪些。

 - `$SELECTION$`就是选择放在地方，这代码用在的是surround templat，关于这个我们刚才没有说，刚才说的是快速输入代码，而包围代码是我们选择了一段代码，然后让模板把代码包围。

 - `$SELSTART$`

 - `$SELEND$ ` 选择一段字符结束，和上面的合起就是选择一段

我们可以使用之前Vs写的代码。

其实上面代码，我们不能让命名有下划线小写

要让变量名小写，我们可以使用`macr`

在我们写出一个变量，可以在左边出现mar

我们修改下模板

```
public $string$ $name$
{
    set
    {
         _$field$=value;  
		 OnPropertyChanged();       
    }
    get
    {
         return _$field$;
    }
}

$END$

private $string$ _$field$;

```

![](http://7xqpl8.com1.z0.glb.clouddn.com/76a67ab5-7429-4e23-8bd2-6d6d68755c8e2016122213645.jpg)

点击属性选择，我们可以让输入的变量，修改范围

![](http://7xqpl8.com1.z0.glb.clouddn.com/76a67ab5-7429-4e23-8bd2-6d6d68755c8e2016122213830.jpg)

输入Name是`Suggest name variable`输入名称为变量名

然后field是在Name前第一个小写

选择上下就是输入变量的前后，第一个是第一输入

https://www.jetbrains.com/help/resharper/2016.2/Templates__Creating_and_Editing_Templates.html

写好，我们选快捷键

保存

在一个新建工程输入快捷键，就可以输入我们写的

