---
title: "win10 uwp 修改Pivot Header 颜色"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2018/8/10 19:17:19
categories: Win10 UWP
---


<!--more-->


<!-- CreateTime:2018/8/10 19:17:19 -->


<div id="toc"></div>

我们在xaml创建一个Pivot
		

```xml
        <Pivot Grid.Row="1">
            <PivotItem Header="lindexi"></PivotItem>
            <PivotItem Header="CSDN"></PivotItem>

        </Pivot>

```

这样的Header是默认颜色

![](http://image.acmx.xyz/be842536-5c96-47f4-a49d-354e749a826a20161229152841.jpg)

我们想修改颜色，可以使用

```xml
    <Pivot.HeaderTemplate>
        <DataTemplate>
            <TextBlock Text="{Binding}" Foreground="Cyan" FontSize="40" />
        </DataTemplate>
    </Pivot.HeaderTemplate>

```

![](http://image.acmx.xyz/f3c2f4a3-94ae-40b4-b3c3-da73116eb75d2016121716265.jpg)

参见：
http://stackoverflow.com/questions/31797875/overriding-pivot-header-foreground-brushes-in-uwp-app-win-10-rtm-sdk

但是如果我们要修改多的Pivot，使用模板其实还不能修改不选中的Pivot Header的颜色

我写了一个Style，可以直接复制到需要使用Pivot的Grid资源

		

```xml
        <Style TargetType="PivotHeaderItem">
            <Setter Property="FontSize" Value="{ThemeResource PivotHeaderItemFontSize}" />
            <Setter Property="FontFamily" Value="{ThemeResource PivotHeaderItemFontFamily}" />
            <Setter Property="FontWeight" Value="{ThemeResource PivotHeaderItemThemeFontWeight}" />
            <Setter Property="CharacterSpacing" Value="{ThemeResource PivotHeaderItemCharacterSpacing}" />
            <Setter Property="Background" Value="Transparent" />
            <Setter Property="Foreground" Value="{StaticResource PivotHeaderForegroundUnselectedBrush}" />
            <!-- original value {ThemeResource SystemControlForegroundBaseMediumBrush} -->
            <Setter Property="Padding" Value="{ThemeResource PivotHeaderItemMargin}" />
            <Setter Property="Height" Value="48" />
            <Setter Property="VerticalContentAlignment" Value="Center" />
            <Setter Property="IsTabStop" Value="False" />
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="PivotHeaderItem">
                        <Grid x:Name="Grid" Background="{TemplateBinding Background}">
                            <Grid.Resources>
                                <Style x:Key="BaseContentPresenterStyle" TargetType="ContentPresenter">
                                    <Setter Property="FontFamily" Value="Segoe UI" />
                                    <Setter Property="FontWeight" Value="SemiBold" />
                                    <Setter Property="FontSize" Value="15" />
                                    <Setter Property="TextWrapping" Value="Wrap" />
                                    <Setter Property="LineStackingStrategy" Value="MaxHeight" />
                                    <Setter Property="TextLineBounds" Value="Full" />
                                    <Setter Property="OpticalMarginAlignment" Value="TrimSideBearings" />
                                </Style>
                                <Style x:Key="BodyContentPresenterStyle" TargetType="ContentPresenter" BasedOn="{StaticResource BaseContentPresenterStyle}">
                                    <Setter Property="FontFamily" Value="{ThemeResource PivotHeaderItemFontFamily}" />
                                    <Setter Property="FontWeight" Value="{ThemeResource PivotHeaderItemThemeFontWeight}" />
                                    <Setter Property="FontSize" Value="{ThemeResource PivotHeaderItemFontSize}" />
                                </Style>
                            </Grid.Resources>
                            <VisualStateManager.VisualStateGroups>
                                <VisualStateGroup x:Name="SelectionStates">
                                    <VisualStateGroup.Transitions>
                                        <VisualTransition From="Unselected" To="UnselectedLocked" GeneratedDuration="0:0:0.33" />
                                        <VisualTransition From="UnselectedLocked" To="Unselected" GeneratedDuration="0:0:0.33" />
                                    </VisualStateGroup.Transitions>
                                    <VisualState x:Name="Disabled">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{StaticResource PivotHeaderForegroundSelectedBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="Unselected" >
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter"
                                                                           Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{StaticResource PivotHeaderForegroundUnselectedBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="UnselectedLocked">
                                        <Storyboard>
                                            <DoubleAnimation Storyboard.TargetName="ContentPresenterTranslateTransform" Storyboard.TargetProperty="X" Duration="0" To="{ThemeResource PivotHeaderItemLockedTranslation}" />
                                            <DoubleAnimation Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="(UIElement.Opacity)" Duration="0" To="0" />
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="Selected">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{StaticResource PivotHeaderSelectedForegroundBrush}" />
                                                <!-- original value {ThemeResource SystemControlHighlightAltBaseHighBrush} -->
                                            </ObjectAnimationUsingKeyFrames>
                                            <!--<ObjectAnimationUsingKeyFrames Storyboard.TargetName="Grid" Storyboard.TargetProperty="Background">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightTransparentBrush}" />
                                            </ObjectAnimationUsingKeyFrames>-->
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="UnselectedPointerOver">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{StaticResource PivotHeaderUnselectedPointerOverForegroundBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="Grid" Storyboard.TargetProperty="Background">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightTransparentBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="SelectedPointerOver">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{StaticResource PivotHeaderSelectedPointerOverForegroundBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="Grid" Storyboard.TargetProperty="Background">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightTransparentBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="UnselectedPressed">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{StaticResource PivotHeaderUnselectedPressedForegroundBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="Grid" Storyboard.TargetProperty="Background">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightTransparentBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="SelectedPressed">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="ContentPresenter" Storyboard.TargetProperty="Foreground">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightAltBaseMediumHighBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetName="Grid" Storyboard.TargetProperty="Background">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightTransparentBrush}" />
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                </VisualStateGroup>
                            </VisualStateManager.VisualStateGroups>
                            <ContentPresenter x:Name="ContentPresenter" Content="{TemplateBinding Content}" 
                                              ContentTemplate="{TemplateBinding ContentTemplate}" 
                                              Margin="{TemplateBinding Padding}" 
                                              FontSize="{TemplateBinding FontSize}" 
                                              FontFamily="{TemplateBinding FontFamily}"
                                              FontWeight="{TemplateBinding FontWeight}" 
                                              HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}" 
                                              VerticalAlignment="{TemplateBinding VerticalContentAlignment}">
                                <ContentPresenter.RenderTransform>
                                    <TranslateTransform x:Name="ContentPresenterTranslateTransform" />
                                </ContentPresenter.RenderTransform>
                            </ContentPresenter>
                        </Grid>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>

```

接着在style的前面写
		

```xml
       <SolidColorBrush x:Key="PivotHeaderSelectedForegroundBrush" Color="BurlyWood"></SolidColorBrush>
        <SolidColorBrush x:Key="PivotHeaderUnselectedPressedForegroundBrush" Color="Brown"></SolidColorBrush>
        <SolidColorBrush x:Key="PivotHeaderForegroundUnselectedBrush" Color="Cyan" />
        <SolidColorBrush x:Key="PivotHeaderUnselectedPointerOverForegroundBrush" Color="BurlyWood"></SolidColorBrush>
        <SolidColorBrush x:Key="PivotHeaderSelectedPointerOverForegroundBrush" Color="BurlyWood"></SolidColorBrush>

```

PivotHeaderSelectedForegroundBrush 就是PivotHeader 被选择的颜色

PivotHeaderUnselectedPressedForegroundBrush 是PivotHeader 不被选择的颜色

PivotHeaderUnselectedPointerOverForegroundBrush 是鼠标移到 没被选择的PivotHeader 上的颜色

PivotHeaderSelectedPointerOverForegroundBrush 是鼠标移到 被选择的PivotHeader 上的颜色

如果希望修改其他颜色，请自己去看style可以修改的颜色，如果遇到问题，欢迎讨论。

代码 https://github.com/lindexi/UWP/tree/master/uwp/src/PivoHeader


