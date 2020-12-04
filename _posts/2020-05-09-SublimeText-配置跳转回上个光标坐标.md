---
title: "SublimeText 配置跳转回上个光标坐标"
author: lindexi
date: 2020-12-3 20:27:49 +0800
CreateTime: 5/9/2020 10:40:11 AM
categories: 
---

在 VisualStudio 可以通过 ctrl+- 的功能，跳转到上个光标所在的坐标。如在多个方法之间跳转，可以通过这个快捷键快速实现。在 SublimeText 可以在菜单的 Goto 里面找到 Jump Back 功能，这个功能就是对应 VisualStudio 的跳转回上个光标的功能，也就是向后定位功能

<!--more-->


<!-- CreateTime:5/9/2020 10:40:11 AM -->



对应的 SublimeText 的快捷键是 `alt+-` 和 VS 不相同，可以在 SublimeText 的 Preferences 的 Key Bindings 里面添加下面代码修改快捷键

```csharp
    { "keys": ["ctrl+-"], "command": "jump_back" },
```

这个快捷键是向后跳转，而向后跳转之后想要向前跳可以使用 `alt+shift+-` 快捷键，这对应 VS 的 `ctrl+shift+-` 快捷键，可以通过下面代码配置和 VS 相同

```csharp
    { "keys": ["ctrl+shift+-"], "command": "jump_forward" },
```

