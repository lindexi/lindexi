---
title: "WPF 在 Alt+Tab 隐藏窗口"
author: lindexi
date: 2018-3-1 15:36:48 +0800
CreateTime: 2018-3-1 11:32:9 +0800
categories: 
---

最近在开发一个 Toast 窗口，因为这个窗口不能在显示之后关闭，因为可能用户会不停让窗口显示，所以只能 Hide 。但是这样会在 切换窗口看到这个窗口，所以我找到了一个方法来让 WPF 窗口不在切换窗口显示。

<!--more-->


<!-- csdn -->

因为只要设置窗口是`WS_EX_TOOLWINDOW`就不会在切换窗口显示，所以需要使用一些特殊的代码。

首先在窗口的 Load 之后拿到窗口句柄

```csharp
        public ToastWindow()
        {
            InitializeComponent();

            Loaded += ToastWindow_Loaded;
        }
```

然后在 Load 里面使用隐藏窗口的代码

```csharp
        private void HideAltTab()
        {
            var windowInterop = new WindowInteropHelper(this);
            var exStyle = GetWindowLong(windowInterop.Handle, GWL_EXSTYLE);
            exStyle |= WS_EX_TOOLWINDOW;
            Win32.SetWindowLong(windowInterop.Handle, GWL_EXSTYLE, exStyle);
        }
```

如果你直接复制上面的代码是无法运行的，因为需要写几个函数

第一个函数是  ExtendedWindowStyles 请看下面，实际使用 WS_EX_TOOLWINDOW

<script src="https://gist.github.com/lindexi/21e4e640d53b3dcac3e6a6c69fc09db8.js"></script>

如果看不到上面的代码，请看[ExtendedWindowStyles code from msdn](https://gist.github.com/lindexi/21e4e640d53b3dcac3e6a6c69fc09db8 )

```csharp
#region Window styles

    public enum GetWindowLongFields
    {
        // ...
        GWL_EXSTYLE = (-20),
        // ...
    }

    [DllImport("user32.dll")]
    public static extern IntPtr GetWindowLong(IntPtr hWnd, int nIndex);

    public static IntPtr SetWindowLong(IntPtr hWnd, int nIndex, IntPtr dwNewLong)
    {
        int error = 0;
        IntPtr result = IntPtr.Zero;
        // Win32 SetWindowLong doesn't clear error on success
        SetLastError(0);

        if (IntPtr.Size == 4)
        {
            // use SetWindowLong
            Int32 tempResult = IntSetWindowLong(hWnd, nIndex, IntPtrToInt32(dwNewLong));
            error = Marshal.GetLastWin32Error();
            result = new IntPtr(tempResult);
        }
        else
        {
            // use SetWindowLongPtr
            result = IntSetWindowLongPtr(hWnd, nIndex, dwNewLong);
            error = Marshal.GetLastWin32Error();
        }

        if ((result == IntPtr.Zero) && (error != 0))
        {
            throw new System.ComponentModel.Win32Exception(error);
        }

        return result;
    }

    [DllImport("user32.dll", EntryPoint = "SetWindowLongPtr", SetLastError = true)]
    private static extern IntPtr IntSetWindowLongPtr(IntPtr hWnd, int nIndex, IntPtr dwNewLong);

    [DllImport("user32.dll", EntryPoint = "SetWindowLong", SetLastError = true)]
    private static extern Int32 IntSetWindowLong(IntPtr hWnd, int nIndex, Int32 dwNewLong);

    private static int IntPtrToInt32(IntPtr intPtr)
    {
        return unchecked((int)intPtr.ToInt64());
    }

    [DllImport("kernel32.dll", EntryPoint = "SetLastError")]
    public static extern void SetLastError(int dwErrorCode);
    #endregion
```

参见：[https://stackoverflow.com/a/551847/6116637](https://stackoverflow.com/a/551847/6116637 )

如果需要在任务栏不显示，那么可以使用下面代码

```csharp
ShowInTaskbar = false
```

