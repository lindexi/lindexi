---
title: "Xamarin Forms WPF 干掉默认的窗口导航条"
author: lindexi
date: 2020-12-3 20:38:30 +0800
CreateTime: 2020/8/8 11:16:03
categories: Xamarin WPF
---

在创建默认的 Xamarin Forms WPF 应用，将和 UWP 应用的界面不相同，在 WPF 项目会显示顶部蓝色的一条，看起来不好看，那么可以如何干掉他

<!--more-->


<!-- CreateTime:2020/8/8 11:16:03 -->
<!-- 标签：Xamarin, WPF -->

下图是一个默认的 Xamarin Forms 应用

<!-- ![](image/Xamarin Forms WPF 干掉默认的窗口导航条/Xamarin Forms WPF 干掉默认的窗口导航条0.png) -->

![](http://image.acmx.xyz/lindexi%2F2020881119116467.jpg)

此时显示工具的蓝色条就是本文说的 窗口导航条，在 Xamarin Forms 的源代码，这个导航条是在 FormsWindow.xaml 文件里面，使用 PART_TopAppBar 控制的，也就是想要不显示这个工具栏，可以通过设置让这个控件不可见

最简单的方法是通过附加属性的方式

在 MainPage.xaml 添加下面代码

```csharp
NavigationPage.HasNavigationBar="False"
```

现在的 MainPage.xaml 的代码如下

```
<?xml version="1.0" encoding="utf-8" ?>
<ContentPage xmlns="http://xamarin.com/schemas/2014/forms"
             xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml"
             xmlns:d="http://xamarin.com/schemas/2014/forms/design"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
             mc:Ignorable="d" Title="工具" 
             NavigationPage.HasNavigationBar="False"
             x:Class="XamarinNeller.MainPage">

    <StackLayout>
        <Label Text="内容" HorizontalOptions="Center" VerticalOptions="CenterAndExpand"></Label>
    </StackLayout>

</ContentPage>

```

运行代码可以看到如下界面

<!-- ![](image/Xamarin Forms WPF 干掉默认的窗口导航条/Xamarin Forms WPF 干掉默认的窗口导航条1.png) -->

![](http://image.acmx.xyz/lindexi%2F2020881122165939.jpg)

此时原本显示工具的蓝色的一条就被干掉了

这部分文档请看

[Navigation In Xamarin.Forms](https://www.c-sharpcorner.com/article/navigation-in-xamarin-forms/ )

[xamarin.forms - Remove navigation bar in contentpage Xamarin - Stack Overflow](https://stackoverflow.com/questions/51331930/remove-navigation-bar-in-contentpage-xamarin )

[Navigating in Xamarin Forms - Xamarin Help](https://xamarinhelp.com/navigating-xamarin-forms/ )

那为什么设置 HasNavigationBar 就能干掉工具栏，在 Xamarin Forms 的源代码 FormsWindow.xaml 是通过绑定设置是否显示

```
<controls:FormsAppBar x:Name="PART_TopAppBar" Visibility="{Binding HasNavigationBar, FallbackValue=Collapsed, TargetNullValue=Collapsed, Converter={StaticResource BoolToVis}, RelativeSource={RelativeSource AncestorType={x:Type controls:FormsWindow}}}"">
    <Grid>
        <!-- 忽略代码 -->
    </Grid>
</controls:FormsAppBar>
```

而 HasNavigationBar 属性的设置是在 FormsWindow.cs 的 SynchronizeAppBar 方法，在这个方法里面使用这个代码修改

```csharp
		public void SynchronizeAppBar()
		{
			IEnumerable<FormsPage> childrens = this.FindVisualChildren<FormsPage>();

			HasNavigationBar = childrens.FirstOrDefault()?.GetHasNavigationBar() ?? false;

			// 忽略代码
		}
```

而 FormsPage 的 GetHasNavigationBar 方法如下

```csharp
	public class FormsPage : UserControl
	{
		public virtual bool GetHasNavigationBar()
		{
			return this.HasNavigationBar;
		}
	}
```

在 VisualPageRenderer 将会在 UpdateNavigationBarVisible 方法里面设置 FormsPage 的 HasNavigationBar 属性

设置方法是通过获取当前元素的附加属性，使用 `NavigationPage.GetHasNavigationBar` 的方法获取

所以在 MainPage 设置 `NavigationPage.HasNavigationBar="False"` 就能让 VisualPageRenderer 也就是对应的布局更新工具栏不可见

在 Xamarin Forms 的 WPF 版本里面，在 WPF 实现了大量基础的控件，和 Xamarin Forms 对应，此时做实际交互和渲染都是原生的 WPF 控件，这样能提升性能



