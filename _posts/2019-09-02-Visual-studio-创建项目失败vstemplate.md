---
title: "Visual studio 创建项目失败vstemplate"
author: lindexi
date: 2020-3-5 12:33:13 +0800
CreateTime: 2019/9/2 12:57:38
categories: 
---

Visual studio 创建项目失败 提示 the vstemplate file references the wizard class 'Microsoft.VisualStudio.WinRT.TemplateWizards.ApplicationInsights.Wizard' which does not exsist in the assembly 'Microsoft.VisualStudio.WinRT.TemplateWizards, Version=14.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'.

<!--more-->


<!-- CreateTime:2019/9/2 12:57:38 -->


<div id="toc"></div>

```csharp
vstemplate文件引用的向导类“Microsoft.VisualStudio.WinRT.TemplateWizards.ApplicationInsights.Wizard"在程序集”Microsoft.VisualStudio.WinRT.TemplateWizards,Version=14.0.0.0,Culture=neutral,PublicKeyToken=b03f5f7f11d50a3a"中不存在。


```

![这里写图片描述](http://img.blog.csdn.net/20160828152032748) 


解决方法简单，在我们VisualStudio安装，C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\ProjectTemplates\CSharp\Windows Root\Windows UAP

---
感谢anngg2008 
如果在CSharp文件夹没找到，请到`Common7\IDE\ProjectTemplatesCache\CSharp\Windows UAP*\BlankApplication\BlankApplication.vstemplate `

`Common7\IDE\ProjectTemplates\CSharp\Windows UAP*\BlankApplication\BlankApplication.vstemplate`

---

可以找到我们的文件夹，一般是1033,如果有比较高的文件夹，那么都选择，进入，打开BlankApplication，把BlankApplication.vstemplatet拖到VisualStudio


![这里写图片描述](http://img.blog.csdn.net/20160828152134623)

找到Microsoft.VisualStudio.WinRT.TemplateWizards, Version=14.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a，FullClassName：Microsoft.VisualStudio.WinRT.TemplateWizards.ApplicationInsights.Wizard删除

![这里写图片描述](http://img.blog.csdn.net/20160828152347823)

然后保存到桌面，从桌面复制，这样是没法直接保存在C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\ProjectTemplates\CSharp\Windows Root\Windows UAP\1033\BlankApplication

复制选择管理员，这个需要我们管理员复制才可以

复制我们就可以新建我们的项目





