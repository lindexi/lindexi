---
title: "How to use code to exit the application in UWP"
author: lindexi
date: 2018-6-15 20:34:23 +0800
CreateTime: 2018-6-15 20:30:49 +0800
categories: UWP
---

I will tell you how to exit the application in UWP by the code.

<!--more-->


<!-- csdn -->

We can call some static method to help us to exit the application.

The first method is as this code:

```csharp
            CoreApplication.Exit();

```

And the other one is 

```csharp
Application.Current.Exit();
```

If you are making the WPF application that you can use this code to exit the application.

```csharp
Application.Current.Shutdown();

```

And

```csharp
Environment.Exit(0);

```

If you find any problems, please contact me.

