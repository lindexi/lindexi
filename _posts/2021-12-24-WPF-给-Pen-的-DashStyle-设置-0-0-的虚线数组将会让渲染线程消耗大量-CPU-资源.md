---
title: "WPF 给 Pen 的 DashStyle 设置 0 0 的虚线数组将会让渲染线程消耗大量 CPU 资源"
author: lindexi
date: 2021-12-25 8:31:27 +0800
CreateTime: 2021/12/24 19:51:54
categories: WPF
---

给 WPF 的 Pen 的 DashStyle 属性设置 0 0 的虚线，在绘制几何图形时，绘制的几何图形的尺寸将关联渲染线程所使用的 CPU 资源。大约在周长大于 500 时，将可以从任务管理器上看到高 CPU 占用

<!--more-->


<!-- CreateTime:2021/12/24 19:51:54 -->

<!-- 发布 -->
<!-- 博客 -->

感谢 [Ryzen](https://www.cnblogs.com/ryzen) 大佬找到此问题，我只是帮他报告给 WPF 官方和记录的工具人

在 WPF 里面，可以使用 DashStyle 属性实现虚线的功能，通过放入 double 数组，即可实现间隔镂空功能，然而如果给定的是 0 0 的数组，那就意味着差不多是在绘制零宽度再空出零宽度。根据不靠谱的高数可以了解到，这是一个震荡收敛，要么整个线条绘制的是实线，要么就是空白

这也就存在一个问题，这几乎是求一个线段里有多少个无穷小的点组成的问题。好在计算机是有精度限制的，但即使有精度限制，所需要计算量也是非常大的，这也就让渲染线程炸掉了

如下面的逗比代码，我在定义的 Foo 类的 OnRender 方法里面，加上如下代码

```csharp
    class Foo : FrameworkElement
    {
        public Foo()
        {
            Width = 500;
            Height = 100;
        }

        protected override void OnRender(DrawingContext drawingContext)
        {
            var pen = new Pen()
            {
                Brush = Brushes.Black,
                DashStyle = new DashStyle(new double[] { 0, 0 }, 0),
                Thickness = 10,
            };

            var geometry = new LineGeometry(new Point(0, 0), new Point(500, 0));

            drawingContext.DrawGeometry(Brushes.Beige, pen, geometry);

            base.OnRender(drawingContext);
        }
    }
```

将以上的 Foo 类加入到界面里面，界面的 XAML 代码里放如一个 Grid 方便后台代码编写：

```xml
    <Grid x:Name="Grid">
        
    </Grid>
```

在后台代码，为了让大家更好看到效果，决定在鼠标移动的时候，不断设置 Foo 刷新：

```csharp
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();

            Foo = new Foo();
            Grid.Children.Add(Foo);

            MouseMove += MainWindow_MouseMove;
        }

        private Foo Foo { get; }

        private void MainWindow_MouseMove(object sender, MouseEventArgs e)
        {
            Foo.InvalidateVisual();
        }
    }
```

尝试执行代码，然后在 MainWindow 里移动鼠标，同时打开任务管理器，可以看到任务管理器的 CPU 有大量占用

此问题已报告给 WPF 官方，请看 [WPF set 0,0 dashes to Pen DashStyle will cause high CPU usage · Issue #5874 · dotnet/wpf](https://github.com/dotnet/wpf/issues/5874 )

不过我预计这个问题也许会分给我去解决

本文所有代码放在[github](https://github.com/lindexi/lindexi_gd/tree/5137479a45ce3f52ff1cf5c5d6ed0c20dfbeaeb3/KolefijurfeLonaynallcay) 和 [gitee](https://gitee.com/lindexi/lindexi_gd/tree/5137479a45ce3f52ff1cf5c5d6ed0c20dfbeaeb3/KolefijurfeLonaynallcay) 欢迎访问

可以通过如下方式获取本文的源代码，先创建一个空文件夹，接着使用命令行 cd 命令进入此空文件夹，在命令行里面输入以下代码，即可获取到本文的代码

```
git init
git remote add origin https://gitee.com/lindexi/lindexi_gd.git
git pull origin 5137479a45ce3f52ff1cf5c5d6ed0c20dfbeaeb3
```

以上使用的是 gitee 的源，如果 gitee 不能访问，请替换为 github 的源

```
git remote remove origin
git remote add origin https://github.com/lindexi/lindexi_gd.git
```

获取代码之后，进入 KolefijurfeLonaynallcay 文件夹

