---
title: "win10 uwp 右击选择 GridViewItem "
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2018/2/13 17:23:03
categories: Win10 UWP
---

有时候我们需要选择一个 GridView 的一项，通过我们右击。

<!--more-->


<!-- CreateTime:2018/2/13 17:23:03 -->


<div id="toc"></div>

于是我们需要在 GridView 的 SelectionMode 为 Single ，IsRightTapEnabled 为True

假如我们给的 ItemSsource  的类型是`List<Student>`，那我们可以通过简单方法得到右击的 Student 。

我们需要使用 RightTapped 

		

```xml
      <GridView x:Name="SymbolGridView"
         SelectionMode="Single"
         IsItemClickEnabled="True"
         IsRightTapEnabled="True"
         ItemsSource="{x:Bind View.Student}"
         ItemClick="SymbolGridView_OnItemClick"
         RightTapped="SymbolGridView_OnRightTapped">
            <GridView.ItemTemplate>
                <DataTemplate x:DataType="view:ViewModel">
                    <TextBlock Text="{Binding Name}"></TextBlock>
                    </DataTemplate>
            </GridView.ItemTemplate>
        </GridView>

```

注意 DataTemplate 的是 TexTblock 

我们通过
		

```csharp
        private void SymbolGridView_OnRightTapped(object sender, RightTappedRoutedEventArgs e)
        {
            var student = (e.OriginalSource as TextBlock)?.DataContext as Student;
        }

```

就可以得到 Student

注意`e.OriginalSource`就是我们刚才使用的 DatEtemplate 的 TexTblock ，我们在 DateTemplate 使用类型 Type ，那么 OriginalSource 就可以使用 Type 。拿到后，他的 DataContext 就是我们选择的。

如果使用个人控件（UserControl），那么请要有 DataContext ，不要覆盖。

这样我们就可以得到 GridViewItem 

但有时候， OriginalSource 是 ListViewItemPresenter ，我们可以用一个简单方法，使用 FrameworkElement 

我们修改代码
        

```csharp
 var student = (e.OriginalSource as FrameworkElement)?.DataContext as Student;

```

这样我们就可以得到，不需要去看 DataTemplate 


