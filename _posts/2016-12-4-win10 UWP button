---
layout: post
title: win10 UWP button 
 category:  
---
button�кܶ��wpfһ�������Կ�������ǳ��WPF��

���ǿ�����button��clickд��
```
<Button Content="ȷ��" Click="Button_Click"/>
```
��Button_Click��F12������д�ϵ����ť��Ҫ����
```
        private void Button_Click(object sender, RoutedEventArgs e)
        {

        }
```

Ҳ������viewModel��һ������
viewModel��һ������ ce

������Clickд
```
Click="{x:Bind view.ce}"
```
����view��Ҫ��MainPage.xaml.csд
```
viewModel view {set;get;}= new viewModel();

```

button content����ʹ��һ��Ԫ�أ����Ԫ�ؿ�����Grid�����ǿ�����һ��Բ��ͷ��

���ҳ�һ��ͼ�����ǰ�����ͼ��ͷ��

��ͼ�ŵ���Ŀ

```
                <Button Height="100" Width="100" Margin="10,10,10,10" Padding="0" Foreground="{x:Null}" BorderBrush="{x:Null}" Background="{x:Null}"> 
                    <Button.Content>                       
                            <Ellipse Margin="0,0,0,0" Height="90" Width="90">
                                <Ellipse.Fill>
                                    <ImageBrush ImageSource="Assets/20151226160608688.jpg" />
                                </Ellipse.Fill>
                            </Ellipse>                                          
                    </Button.Content>
                </Button>
```

���ǿ����޸�����ڰ�ť�ϵ�����



button�����������ԣ�ʹ����Դ
��Դ����д��ҳ��

```
    <Page.Resources>
        
    </Page.Resources>
```

���а�ťʹ��ͬ��ʽ

```
    <Page.Resources>
        <Style TargetType="Button">
            
        </Style>
    </Page.Resources>
```

��ť��������`<Setter Property="����" Value="ֵ"/>`

��ť�ı���

```
    <Page.Resources>
        <Style TargetType="Button">
            <Setter Property="Background" Value="White"/>
        </Style>
    </Page.Resources>
```

ָ��һ����ʽ��key

```
    <Page.Resources>
        <Style TargetType="Button">
            <Setter Property="Background" Value="White"/>
            <Setter Property="Width" Value="100"/>
            <Setter Property="Height" Value="100"/>
        </Style>
        <Style  x:Key="button" TargetType="Button">
            <Setter Property="Background" Value="White"/>
            <Setter Property="Width" Value="50"/>
            <Setter Property="Height" Value="50"/>
        </Style>
    </Page.Resources>
```

```
         <Button Content="Ĭ��"/>
         <Button Style="{StaticResource button}" Content="ȷ��"/>
```

![����дͼƬ����](image/20151211154753136.jpg)

����ƣ��㰴ť���һ����༭ģ�帱����ѡ��ǰҳ
![����дͼƬ����](image/QQ��ͼ20160103092022.png)

���Կ���
```xaml
    <Page.Resources>
        <Style x:Key="ButtonStyle1" TargetType="Button">
            <Setter Property="Background" Value="{ThemeResource SystemControlBackgroundBaseLowBrush}"/>
            <Setter Property="Foreground" Value="{ThemeResource SystemControlForegroundBaseHighBrush}"/>
            <Setter Property="BorderBrush" Value="{ThemeResource SystemControlForegroundTransparentBrush}"/>
            <Setter Property="BorderThickness" Value="{ThemeResource ButtonBorderThemeThickness}"/>
            <Setter Property="Padding" Value="8,4,8,4"/>
            <Setter Property="HorizontalAlignment" Value="Left"/>
            <Setter Property="VerticalAlignment" Value="Center"/>
            <Setter Property="FontFamily" Value="{ThemeResource ContentControlThemeFontFamily}"/>
            <Setter Property="FontWeight" Value="Normal"/>
            <Setter Property="FontSize" Value="{ThemeResource ControlContentThemeFontSize}"/>
            <Setter Property="UseSystemFocusVisuals" Value="True"/>
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="Button">
                        <Grid x:Name="RootGrid" Background="{TemplateBinding Background}">
                            <VisualStateManager.VisualStateGroups>
                                <VisualStateGroup x:Name="CommonStates">
                                    <VisualState x:Name="Normal">
                                        <Storyboard>
                                            <PointerUpThemeAnimation Storyboard.TargetName="RootGrid"/>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="PointerOver">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="BorderBrush" Storyboard.TargetName="ContentPresenter">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightBaseMediumLowBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="Foreground" Storyboard.TargetName="ContentPresenter">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightBaseHighBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <PointerUpThemeAnimation Storyboard.TargetName="RootGrid"/>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="Pressed">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="Background" Storyboard.TargetName="RootGrid">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlBackgroundBaseMediumLowBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="BorderBrush" Storyboard.TargetName="ContentPresenter">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightTransparentBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="Foreground" Storyboard.TargetName="ContentPresenter">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlHighlightBaseHighBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <PointerDownThemeAnimation Storyboard.TargetName="RootGrid"/>
                                        </Storyboard>
                                    </VisualState>
                                    <VisualState x:Name="Disabled">
                                        <Storyboard>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="Background" Storyboard.TargetName="RootGrid">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlBackgroundBaseLowBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="Foreground" Storyboard.TargetName="ContentPresenter">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlDisabledBaseLowBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                            <ObjectAnimationUsingKeyFrames Storyboard.TargetProperty="BorderBrush" Storyboard.TargetName="ContentPresenter">
                                                <DiscreteObjectKeyFrame KeyTime="0" Value="{ThemeResource SystemControlDisabledTransparentBrush}"/>
                                            </ObjectAnimationUsingKeyFrames>
                                        </Storyboard>
                                    </VisualState>
                                </VisualStateGroup>
                            </VisualStateManager.VisualStateGroups>
                            <ContentPresenter x:Name="ContentPresenter" AutomationProperties.AccessibilityView="Raw" BorderBrush="{TemplateBinding BorderBrush}" BorderThickness="{TemplateBinding BorderThickness}" ContentTemplate="{TemplateBinding ContentTemplate}" ContentTransitions="{TemplateBinding ContentTransitions}" Content="{TemplateBinding Content}" HorizontalContentAlignment="{TemplateBinding HorizontalContentAlignment}" Padding="{TemplateBinding Padding}" VerticalContentAlignment="{TemplateBinding VerticalContentAlignment}"/>
                        </Grid>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>
    </Page.Resources>
```

��` <VisualState x:Name="Pressed">`���԰�����д�����״̬�����ӣ���ť�����������£�����ڰ�ť�ϣ����Զ�ÿ���޸�

![����дͼƬ����](image/QQ��ͼ20160103093039.png)

���Pressed����pressed

![���Pressed����pressed](image/QQ��ͼ20160103093204.png)

�������ﰴť�б���

![�������ﰴť�б���](image/QQ��ͼ20160103093320.png)

ȥ���������F4�ѱ����޻���

![ȥ���������F4�ѱ����޻���](image/QQ��ͼ20160103093441.png)

��ӹ���

![��ӹ���](image/QQ��ͼ20160103093544.png)

��¼�ؼ�֡

![��¼�ؼ�֡](image/QQ��ͼ20160103093647.png "��¼�ؼ�֡")

ѡʱ��0.5�ı䱳��

![ѡʱ��0.5�ı䱳��](image/QQ��ͼ20160103093838.png "ѡʱ��0.5�ı䱳��")

ѡʱ�䣬�ı䱳��

![](image/QQ��ͼ20160103094007.png)

�㲥�ſ��Կ���������������

��������


�ƶ���button��ʾ����

��װ���ر��ƶ����Ѻ���ʾ�Ѻ�
�ο���http://blog.csdn.net/lindexi_gd/article/details/50166161

```
                        <Button Click="souhu_Click" ToolTipService.ToolTip="�Ѻ���Ƶ" Padding="0" >
                            <Button.Content>
                                <Grid>
                                    <Grid.RowDefinitions>
                                        <RowDefinition Height="auto"/>
                                        <RowDefinition Height="auto"/>
                                    </Grid.RowDefinitions>
                                    <Image Source="ms-appx:///Assets/�Ѻ�.png" Grid.Row="0" ScrollViewer.VerticalScrollBarVisibility="Disabled" />
                                    <TextBlock Text="�Ѻ���Ƶ" Grid.Row="1" HorizontalAlignment="Center" />
                                </Grid>
                            </Button.Content>
                        </Button>
```

![����дͼƬ����](image/20151211161126290.jpg)

��ʾͼƬ

```
                        <Button Click="souhu_Click" Padding="0" >
                            <Button.Content>
                                <Grid>
                                    <Grid.RowDefinitions>
                                        <RowDefinition Height="auto"/>
                                        <RowDefinition Height="auto"/>
                                    </Grid.RowDefinitions>
                                    <Image Source="ms-appx:///Assets/�Ѻ�.png" Grid.Row="0" ScrollViewer.VerticalScrollBarVisibility="Disabled" />
                                    <TextBlock Text="�Ѻ���Ƶ" Grid.Row="1" HorizontalAlignment="Center" />
                                </Grid>
                            </Button.Content>
                            <ToolTipService.ToolTip>
                                <Image Height="50" Width="50" Source="ms-appx:///Assets/�Ѻ�.png"/>
                            </ToolTipService.ToolTip>
                        </Button>
```

