---
title: "win10 uwp 去掉 Flyout 边框"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/2/27 17:48:46
categories: Win10 UWP
---

在 UWP 的 Flyout 的边框一点都不好看，本文告诉大家如何去掉这个边框

<!--more-->


<!-- CreateTime:2019/2/27 17:48:46 -->

<!-- csdn -->

先写一个简单的界面，这个界面里面有一个按钮

```csharp
           <Button.Flyout>
                <Flyout Placement="Right">
                    <Grid Name="PopupGrid" Background="Aqua" Height="600" Width="200"/>
                </Flyout>
            </Button.Flyout>
        </Button>
```

运行代码，点击按钮，可以看到下面界面

<!-- ![](image/win10 uwp 去掉 Flyout 边框/win10 uwp 去掉 Flyout 边框0.png) -->

![](http://image.acmx.xyz/lindexi%2F2019227174512312)

通过重写 FlyoutPresenterStyle 可以修改边框的距离

```csharp
            <Button.Flyout>
                <Flyout Placement="Right">
                    <Flyout.FlyoutPresenterStyle>
                        <Style TargetType="FlyoutPresenter">
                            <Setter Property="Padding" Value="0"></Setter>
                            <Setter Property="BorderThickness" Value="0"></Setter>
                        </Style>
                    </Flyout.FlyoutPresenterStyle>
                    <Grid Name="PopupGrid" Background="Aqua" >
                        <TextBlock Margin="10,10,10,10" Text="欢迎访问我博客 https://blog.lindexi.com 里面有大量 UWP 博客"></TextBlock>
                    </Grid>
                </Flyout>
            </Button.Flyout>
```

现在运行代码点击按钮可以看到下面界面，看不到边框

<!-- ![](image/win10 uwp 去掉 Flyout 边框/win10 uwp 去掉 Flyout 边框1.png) -->

![](http://image.acmx.xyz/lindexi%2F2019227174643670)

更多 Flyout 请看

[win10 uwp 右击浮出窗在点击位置](https://blog.lindexi.com/post/win10-uwp-%E5%8F%B3%E5%87%BB%E6%B5%AE%E5%87%BA%E7%AA%97%E5%9C%A8%E7%82%B9%E5%87%BB%E4%BD%8D%E7%BD%AE.html )

