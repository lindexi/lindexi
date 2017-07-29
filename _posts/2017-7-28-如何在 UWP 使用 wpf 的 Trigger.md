---
layout: post
title:  如何在 UWP 使用 wpf 的 Trigger  
category: uwp 
---

本文需要告诉大家，如何使用 Behaviors 做出 WPF 的 Trigger ，需要知道 UWP 不支持 WPF 的 Trigger 。

<!--more-->

## 安装 Behaviors

请使用 Nuget 安装，可以输入下面的代码进行安装

```csharp
Install-Package Microsoft.Xaml.Behaviors.Uwp.Managed 

```

或者搜索 `Microsoft.Xaml.Behaviors` 下载

他的官网在 [Behaviors](https://github.com/Microsoft/XamlBehaviors)

## 以前的代码

在 WPF 开发，可以写出下面代码

```csharp
<Button>
  <Image>
    <Style TargetType="Image">
       <Trigger Property="IsEnabled" Value="Flase">
         <Setter Property="Opacity" Value="0.5"></Setter>
        </Trigger>
    </Style>
  </Image>
</Button>
```

在 Button IsEnabled 设置透明，但是 UWP 不支持

## UWP 使用 Trigger

上面的代码可以很简单用 DataTriggerBehavior 来做

```csharp
     <Button x:Name="MyButton" Margin="10,10,10,10" Width="140" Height="80">
            <Image x:Name="MyImage" Source="Assets/动漫.jpg">
                <interactivity:Interaction.Behaviors>
                        <core:DataTriggerBehavior Binding="{Binding IsEnabled, ElementName=MyButton}" Value="False">
                            <core:ChangePropertyAction TargetObject="{Binding ElementName=MyImage}" PropertyName="Opacity" Value="0.5" />
                        </core:DataTriggerBehavior>
                </interactivity:Interaction.Behaviors>
            </Image>
        </Button>
```

按钮可以使用时的图片

![](http://7xqpl8.com1.z0.glb.clouddn.com/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2017727204046.jpg)

按钮无法使用时的图片

![](http://7xqpl8.com1.z0.glb.clouddn.com/34fdad35-5dfe-a75b-2b4b-8c5e313038e2%2F2017727204024.jpg)


请使用 DataTriggerBehavior 的Binding 连到需要修改的属性，在 Value 判断他的值。

然后可以在得到的值判断，修改透明

可以看到使用方法和动画一样

如果使用 MVVM 的话，可以把透明绑到一个属性，通过返回来设置，如果按钮有 `IsMyButtonEnabled` 那么可以使用下面的代码绑定透明，因为很简单我就不说啦。

```csharp
return IsMyButtonEnabled ? 1.0 : 0.5;
```

参见：[Trigger element (XAML) is not supported in a UWP project ](https://stackoverflow.com/questions/31929071/trigger-element-xaml-is-not-supported-in-a-uwp-project)

 
