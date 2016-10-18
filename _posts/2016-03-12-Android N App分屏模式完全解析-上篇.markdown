---
layout: post
title: Android N App分屏模式完全解析（上）
date: '2016-03-12 00:00:00'
cover_image: '/content/images/cover/muti-screen.png'
---

上手了Android N Preview，第一个不能错过的新特性就是App分屏的支持。Android7.0原生系统就可以支持两个App横屏并排或者竖屏上下摆放了。第二个新特性就是在Android TV上，原生系统也可以支持App实现画中画，用户可以一边看视频一边操作其他的应用。

其实早先在国内部分厂商以及鹅厂的微信App就已经支持在大尺寸手机上进行分屏浏览。也有一些视频播放器，如MoboPlayer就已经实现了按下Home键回到首页时以迷你播放器的形式进行播放。这种体验非常棒，我猜测一般是通过WindowManager来添加悬浮播放器界面的。但是这次是原生系统增加了对这种特性的支持，相信我们会有更多理由为用户的体验做出更多新的尝试。

下面介绍一下我参考[multi-window-support](http://developer.android.com/intl/zh-cn/preview/features/multi-window.html#running)对App分屏模式进行的实践。

首先引用一下官方的说法：

> 如果你使用Android N Preview SDK来构建你的App，你可以给添加App一些分屏浏览的配置。例如设置Activity的最小尺寸，也可以禁止自己的App进入分屏模式，保证你的App只能在全屏模式下展示。

# 概述

Android N允许用户一次在屏幕中使用两个App，例如将屏幕一分为二，左边浏览网页，右边查看邮件。具体的体验取决于你的设备。

- 手持设备中，用户可以左右并排/上下摆放两个App来使用。用户还可以左右/上下拖拽中间的那个小白线来改变两个App的尺寸。

![split-screen](/content/images/split-screen.png)

- 在运行Android N的Nexus Player上，App可以实现画中画模式，允许用户使用一个App浏览内容的同时，在另一个App上操作。

- 大尺寸设备的厂商甚至可以实现自由模式，这样就可以使得用户可以完全自由地改变界面的尺寸。这又是与分屏更为不同一种体验。

用户是如何操作来进入分屏模式的呢：

1. 点击右下角的方块，进入任务管理器，长按一个App的标题栏，将其拖入屏幕的高亮区域，这个App金进入了分屏模式。然后在任务管理器中选择另一个App，单击它使得这个App也进入分屏模式。
2. 打开一个App，然后长按右下角的方块，此时已经打开的这个App将进入分屏模式。然后在屏幕上的任务管理器中选择另外一个App，单击它使得这个App也进入分屏模式。
3. 最新发现：下拉通知栏，长按右上角的设置图标，将开启隐藏设置功能`“系统界面调谐器”`，进入设置界面，最下方有系统界面调谐器选项，进入后选择`“Other”->“启用分屏上滑手势”`，就可以从任务管理器上上滑进入分屏模式了。具体操作是`当一个App已经处于全屏模式时，用手指从右下角的小方块向上滑动`。这个设置将来在正式版可能有变化，所以还是不要太依赖。

用户还可以在这两个App之间拖动数据，例如将一个App的Activity上的文件拖动到另外一个App的Activity中去。具体的实现下面会介绍，谷歌官方也有[拖拽相关的教程](http://developer.android.com/intl/zh-cn/guide/topics/ui/drag-drop.html)。

# 分屏模式的生命周期

首先要说明的一点是，分屏模式没有改变Activity的生命周期。

官方说法是：
> 在分屏模式下，用户最近操作、激活过的Activity将被系统视为`topmost`。而其他的Activity都属于`paused`状态，即使它是一个对用户可见的Activity。但是这些可见的处于`paused`状态的Activity将比那些不可见的处于`paused`状态的Activity得到更高优先级的响应。当用户在一个可见的`paused`状态的Activity上操作时，它将得到恢复`resumed`状态，并被系统视为`topmost`。而之前那个那个处于`topmpst`的Activity将变成`paused`状态。

怎么理解这段话，看下图：

![two-app](/content/images/two-apps.png)

其实就是说处于分屏模式下的两个Ap各自处于生命周期的什么状态。上图中我打开了两个App，上面的是一个Gmail App，下面这个是一个Demo App（[ApkParser](https://github.com/jaredrummler/APKParser)先感谢作者的分享~）是个开源应用，能够解析Apk，后面会用到它）。现在这两个App都是进入了`分屏模式`，我们还可以拖动中间这条白线来调整两个App占用的大小。

我点击了Gmail，浏览了一封邮件，那么此时**Gmail**就被系统视为`topmost`状态，它是处于`resumed`状态的，而下面的**ApkPaserDemo**虽然对用户可见，但是**它仍然是处于`paused`状态**的。接着我点击了系统的`back`按钮返回，响应的是上面的**Gmail**（因为它被视为topmost）。然后我又点击了下面的**ApkParserDemo**，这时它从`paused`状态变成了`resumed`状态。而上面的**Gmail**进入了 `paused`状态。

注意，这两个App对于用户都是**始终可见**的，当它们处于`paused`状态时，也将比那些后台的处于**不可见的**App得到更高系统优先级。这个优先级怎么体现呢？两个App进入分屏模式后，一定有一个处于resume/topmost状态，假如我一直按`back`返回，当这个topmost状态App的task返回栈已经为空时，那么系统将把另外一个可见的App恢复为全屏模式，这就是我的理解。

那么这种`可见的pause`的状态将带来什么影响呢？引用下官方说法是：

> 在分屏模式中，一个App可以在对用户可见的状态下进入`paused`状态，所以你的App在处理业务时，应该知道自己什么时候应该真正的`暂停`。例如一个视频播放器，如果进入了分屏模式，就不应该在`onPaused()`回调中暂停视频播放，而应该在`onStop()`回调中才暂停视频，然后在`onStart`回调中恢复视频播放。关于如果知道自己进入了分屏模式，在`Android N`的Activity类中，增加了一个`void onMultiWindowChanged(boolean inMultiWindow)`回调，所以我们可以在这个回调知道App是不是进入了分屏模式。

当App进入分屏模式后，将会触发Activity的`onConfigurationChanged()`，这与以前我们在处理App从`横竖屏切换`时的方法一样，不同于的是这里是宽/高有所改变，而`横竖屏切换`是宽高互换。至于如何处理，可以参考官方文档[处理运行时变更](http://developer.android.com/intl/zh-cn/guide/topics/resources/runtime-changes.html)。我们最好处理好这种运行时状态的改变，否则我们的Activity将被重新创建，即以新的宽高尺寸重新`onCreate()`一遍。

注意，如果用户重新调整窗口的大小，系统在**必要的时候**也可能触发`onConfigurationChanged()`。当App的窗口被用户拖动，其尺寸改变后界面的还没有绘制完成时，系统将用App主题中的`windowBackground`属性指定的背景来暂时填充这些区域。

# 如何设置App的分屏模式

说了一堆分屏的操作方法、生命周期，那么作为开发者，怎样才能让App进入`分屏`模式呢？有下面这几个属性。

## android:resizeableActivity

如果你适配到了`Android N`，即`build.gradle`是这样的：

```
android {
    compileSdkVersion 'android-N'
    buildToolsVersion '24.0.0 rc1'

    defaultConfig {
        applicationId "com.example.noughtchen.andndemo"
        minSdkVersion 'N'
        targetSdkVersion 'N'
        versionCode 1
        versionName "1.0"
    }
    ...
}
```

那么直接在`AndroidManifest.xml`中的`<application>`或者`<activity>`标签下设置新的属性`android:resizeableActivity="true"`。

设置了这个属性后，你的App/Activity就可以进入`分屏模式`或者`自由模式`了。

如果这个属性被设为`false`，那么你的App将无法进入分屏模式，如果你在打开这个App时，长按右下角的小方块，App将仍然处于全屏模式，系统会弹出Toast提示你无法进入分屏模式。这个属性在你**target**到`Android N`后，`android:resizeableActivity`的默认值就是`true`。

> 注意：假如你**没有适配到Android N**（`targetSDKVersion < Android N`），打包App时的`compileSDKVersion < Android N`，你的App也是可以支持分屏的！！！！原因在于：如果你的App**没有** 设置 **`仅允许Activity竖屏/横屏`**，即没有设置类型**`android:screenOrientation="XXX"`属性**时，运行Android N系统的设备还是 **可以** 将你的App **分屏！！** 但是这时候系统是不保证运行时的稳定性的，在进入分屏模式时，系统首先也会弹出Toast来提示你说明这个风险。

所以其实我们在视频里看到那么多系统自带的App都是可以分屏浏览，原因就在于此。**这些App其实也并没有全部适配到Android N**。我不是骗你，不信你用`ApkParser`打开前面分屏过Gmail App的xml文件看看！

![Gmail-xml](/content/images/gmail-xml.png)


## android:supportsPictureInPicture

这里不多说，Activity标签下，添加`android:supportsPictureInPicture="true"`即可。

```
<activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:resizeableActivity="true"
            android:supportsPictureInPicture="true"
            android:theme="@style/AppTheme.NoActionBar">
            ...
        </activity>
```

## Layout attributes

在Android N中，我们可以向`manifest`文件中添加`layout`节点，并设置一些新增加的属性，通过这些属性来设置分屏模式的一些行为，如最小尺寸等。

- android:defaultWidth
- android:defaultHeight
- android:gravity
- android:minimalSize

我们可以给一个`Activity`增加一个`layout`子节点：

```
<activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:resizeableActivity="true"
            android:supportsPictureInPicture="true"
            android:theme="@style/AppTheme.NoActionBar">
            ...
            <layout android:defaultHeight="500dp"
                    android:defaultWidth="600dp"
                    android:gravity="top|end"
                    android:minimalSize="450dp" />
            ...
        </activity>
```

下一篇[Android N App分屏模式完全解析（下）](http://unclechen.github.io/2016/03/12/Android-N-App分屏模式完全解析-下篇/)将介绍一下分屏模式下运行的App将有哪些行为回调以及应该怎么处理等。

---

ps：封面图片来自于谷歌官网









