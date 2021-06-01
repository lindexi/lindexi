---
title: "Unity3D OpenVR SteamVR 在头盔视觉前面常驻文本"
author: lindexi
date: 2021-5-31 21:20:2 +0800
CreateTime: 2021/5/31 8:47:48
categories: 
---

我期望在玩家视觉前方常驻一点文本，用于做有趣的交互，实现方法很简单

<!--more-->


<!-- CreateTime:2021/5/31 8:47:48 -->

<!-- 发布 -->

在开始之前，期望大家已阅读过基于 SteamVR 的 Unity3D 相关博客，如果还没了解相关知识，请参阅如下博客

- [Unity OpenVR 虚拟现实入门一：安装配置 Unity + OpenVR 环境](https://blog.walterlv.com/post/unity-openvr-starting-1.html)
- [Unity OpenVR 虚拟现实入门二：一个最简单的虚拟现实游戏/程序](https://blog.walterlv.com/post/unity-openvr-starting-2.html)
- [Unity OpenVR 虚拟现实入门三：最简单的五指交互](https://blog.walterlv.com/post/unity-openvr-starting-3.html)
- [Unity OpenVR 虚拟现实入门四：通过脚本控制手与控制器](https://blog.walterlv.com/post/unity-openvr-starting-4.html)
- [Unity OpenVR 虚拟现实入门五：通过传送控制玩家移动](https://blog.walterlv.com/post/unity-openvr-starting-5.html)
- [Unity OpenVR 虚拟现实入门六：通过摇杆控制玩家移动](https://blog.walterlv.com/post/unity-openvr-starting-6.html)

如系列博客的内容，咱通过加入 SteamVR SDK 然后将 Player 拖入到咱的场景中，如下图

![](http://image.acmx.xyz/lindexi%2F20215302212195348.jpg)

在 Player 的 VRCamera 添加一个文本，设置 z 轴方向为正数，让文本在相机前

<!-- ![](image/Unity3D OpenVR SteamVR 在头盔视觉前面常驻文本/Unity3D OpenVR SteamVR 在头盔视觉前面常驻文本0.png) -->

![](http://image.acmx.xyz/lindexi%2F20215312118557167.jpg)

因为文本放在相机对象，因此文本随着相机，文本在相机前面，玩家可以看到文本

这个做法有坑是，如果文本距离玩家不够远，看起来诡异

