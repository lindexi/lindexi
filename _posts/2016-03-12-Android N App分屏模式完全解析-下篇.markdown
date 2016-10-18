---
layout: post
title: Android N App分屏模式完全解析（下）
date: '2016-03-12 10:00:00'
---

在[上篇](http://unclechen.github.io/2016/03/12/Android-N-App分屏模式完全解析-上篇/)中，介绍了什么是App分屏模式，以及如何设置我们的App来进入分屏模式。这次我们看一下，作为开发者，我们应该如何让自己的App进入分屏模式，当App进入分屏模式时，我们注意哪些问题。

简单地说，我认为除了保证分屏时App功能、性能正常以外，我们需要重点学习 ***如何在分屏模式下打开新的Activity*** 以及 ***如何实现跨App/Activity的拖拽功能***。

# 用分屏模式运行你的App

Android N中新增了一些方法来支持App的分屏模式。同时在分屏模式下，也禁用了App一些特性。

## 分屏模式下被禁用的特性

- 自定义[系统UI](http://developer.android.com/training/system-ui/index.html)，例如分屏模式下无法隐藏系统的状态栏。
- 无法根据屏幕方向来旋转App的界面，也就是说`android:screenOrientation`属性会被系统忽略。

## 分屏模式的通知回调、查询App是否处于分屏状态

最新的[Android N SDK](http://developer.android.com/preview/setup-sdk.html#docs-dl)中，`Activity`类中增加了下面的方法。

- inMultiWindow()：返回值为boolean，调用此方法可以知道App是否处于分屏模式。
- inPictureInPicture()：返回值为boolean，调用此方法可以知道App是否处于画中画模式。

> 注意：`画中画模式`其实是一个**特殊的**`分屏模式`，如果`mActivity.inPictureInPicture()`返回`true`，那么`mActivity.inMultiWindow()`一定也是返回`true`。

- onMultiWindowChanged(boolean inMultiWindow)：当Activity进入或者退出分屏模式时，系统会回调这个方法来通知开发者。回调的参数`inMultiWindow`为boolean类型，如果`inMultiWindow`为true，表示Activity进入分屏模式；如果`inMultiWindow`为false，表示退出分屏模式。
- onPictureInPictureChanged(boolean inPictureInPicture)：当Activity进入画中画模式时，系统会回调这个方法。回调参数`inPictureInPicture`为`true`时，表示进入了画中画模式；`inPictureInPicture`为`false`时，表示退出了画中画模式。

`Fragment`类中，同样增加了以上支持分屏模式的方法，例如`Fragment.inMultiWindow()`。

## 如何进入画中画模式

调用`Activity`类的`enterPictureInPicture()`方法，可以使得我们的App进入画中画模式。如果运行的设备不支持画中画模式，调用这个方法将不会有任何效果。更多画中画模式的资料，请参考[picture-in-picture](http://developer.android.com/intl/zh-cn/preview/features/picture-in-picture.html)。

## 在分屏模式下打开新的Activity

当你打开一个新的Activity时，只需要给Intent添加`Intent.FLAG_ACTIVITY_LAUNCH_TO_ADJACENT`，系统将***尝试***将它设置为与当前的Activity共同以分屏的模式显示在屏幕上。

**注意：**这里只是尝试，但这不一定是100%生效的，前一篇博客里也说过，假如新打开的Activity的`android:resizeableActivity`属性设置为`false`，就会禁止分屏浏览这个Activity。所以系统只是尝试去以分屏模式打开一个新的Activity，如果条件不满足，将不会生效！此外，我实际用`Android N Preview SDK`实践的时候发现这个`FLAG`实际得值是`FLAG_ACTIVITY_LAUNCH_ADJACENT`，并非是`FLAG_ACTIVITY_LAUNCH_TO_ADJACENT`。

当满足下面的条件，系统会让这两个Activity进入分屏模式：

- 当前Activity已经进入到分屏模式。
- 新打开的Activity支持分屏浏览（即**android:resizeableActivity=true**）。

此时，给新打开的Activity，设置`                intent.addFlags(Intent.FLAG_ACTIVITY_LAUNCH_ADJACENT | Intent.FLAG_ACTIVITY_NEW_TASK);
`才会有效果。

![two-acts](/content/images/two-acts.png)

建议参考官方的Sample：[MultiWindow Playground Sample](https://github.com/googlesamples/android-MultiWindowPlayground)

那么为何还需要添加`FLAG_ACTIVITY_NEW_TASK`？看一下官方解释：

> 注意：在同一个Activity返回栈中，打开一个新的Activity时，这个Activity将会继承上一个Activity所有和`分屏模式`有关的属性。如果你想要在一个独立的窗口以分屏模式打开一个新的Activity，那么必须新建一个Activity返回栈。

此外，如果你的设备支持`自由模式`（官方名字叫**freeform**，暂且就这么翻译它，其实我认为这算也是一种尺寸更自由的分屏模式，上一篇博客里提到过如果设备厂商支持用户可以自由改变Activity的尺寸，那么就相当于支持`自由模式`，这将比普通的分屏模式更加自由），打开一个Activity时，还可通过`ActivityOptions.setLaunchBounds()`来指定新的Activity的尺寸和在屏幕中的位置。同样，这个方法也需要你的Activity已经处于分屏模式时，调用它才会生效。

## 支持拖拽

在[上一篇](http://unclechen.github.io/2016/03/12/Android-N-App分屏模式完全解析-上篇/)博客里也提到过，现在我们可以实现在两个分屏模式的Activity之间拖动内容了。Android N Preview SDK中，`View`已经增加支持Activity之间拖动的API。具体的类和方法，可以参考[N Preview SDK Reference](http://developer.android.com/preview/setup-sdk.html#docs-dl)，主要用到下面几个新的接口：

- View.startDragAndDrop()：[View.startDrag()](http://developer.android.com/intl/zh-cn/reference/android/view/View.html#startDrag(android.content.ClipData,%20android.view.View.DragShadowBuilder,%20java.lang.Object,%20int)) 的替代方法，需要传递`View.DRAG_FLAG_GLOBAL`来实现跨Activity拖拽。如果需要将URI权限传递给接收方Activity，还可以根据需要设置`View.DRAG_FLAG_GLOBAL_URI_READ`或者`View.DRAG_FLAG_GLOBAL_URI_WRITE`。
- View.cancelDragAndDrop()：由拖拽的发起方调用，取消当前进行中的拖拽。
- View.updateDragShadow()：由拖拽的发起方调用，可以给当前进行的拖拽设置阴影。
- android.view.DropPermissions：接收方App所得到的权限列表。
- Activity.requestDropPermissions()：传递URI权限时，需要调用这个方法。传递的内容存储在[DragEvent](http://developer.android.com/reference/android/view/DragEvent.html)中的[ClipData](http://developer.android.com/reference/android/content/ClipData.html)里。返回值为前面的`android.view.DropPermissions`。

下面是我自己写的一个demo，实现了在分屏模式下，把一个Activity中ImageView中保存的内容到另外一个Activity中进行显示。实际应用中，可以还可以传递图片的url或者Bitmap对象。

![drag-drop](/content/images/drag-drop.png)

上图是一个最基本的例子，实现了把MainActivity中的图片保存的内容，拖拽到SecondActivity中。实现步骤如下：

在MainActivity中，发起拖拽。

```
// 1.首先我们在分屏模式下，打开自己App中的SecondActivity
findViewById(R.id.launch_second_activity).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, SecondActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_LAUNCH_ADJACENT | Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            }
        });
        
// 2.然后我们在MainActivity中发出拖拽事件
imageView = (ImageView) findViewById(R.id.img);
        /** 拖拽的发送方Activity和ImageView */
        imageView.setTag("I'm a ImageView from MainActivity");
        imageView.setOnTouchListener(new View.OnTouchListener() {

            public boolean onTouch(View view, MotionEvent motionEvent) {
                if (motionEvent.getAction() == MotionEvent.ACTION_DOWN) {
                    /** 构造一个ClipData，将需要传递的数据放在里面 */
                    ClipData.Item item = new ClipData.Item((CharSequence) view.getTag());
                    String[] mimeTypes = {ClipDescription.MIMETYPE_TEXT_PLAIN};
                    ClipData dragData = new ClipData(view.getTag().toString(), mimeTypes, item);
                    View.DragShadowBuilder shadow = new View.DragShadowBuilder(imageView);
                    /** startDragAndDrop是Android N SDK中的新方法，替代了以前的startDrag，flag需要设置为DRAG_FLAG_GLOBAL */
                    view.startDragAndDrop(dragData, shadow, null, View.DRAG_FLAG_GLOBAL);
                    return true;
                } else {
                    return false;
                }
            }
        });
```

在`SecondActivity`中，接收这个拖拽的结果，在`ACTION_DROP`事件中，把结果显示出来。

```
dropedText = (TextView) findViewById(R.id.text_drop);
        dropedText.setOnDragListener(new View.OnDragListener() {
            @Override
            public boolean onDrag(View view, DragEvent dragEvent) {
                switch (dragEvent.getAction()) {
                    case DragEvent.ACTION_DRAG_STARTED:
                        Log.d(TAG, "Action is DragEvent.ACTION_DRAG_STARTED");
                        break;

                    case DragEvent.ACTION_DRAG_ENTERED:
                        Log.d(TAG, "Action is DragEvent.ACTION_DRAG_ENTERED");
                        break;

                    case DragEvent.ACTION_DRAG_EXITED:
                        Log.d(TAG, "Action is DragEvent.ACTION_DRAG_EXITED");
                        break;

                    case DragEvent.ACTION_DRAG_LOCATION:
                        break;

                    case DragEvent.ACTION_DRAG_ENDED:
                        Log.d(TAG, "Action is DragEvent.ACTION_DRAG_ENDED");
                        break;

                    case DragEvent.ACTION_DROP:
                        Log.d(TAG, "ACTION_DROP event");
                        /** 3.在这里显示接收到的结果 */
                        dropedText.setText(dragEvent.getClipData().getItemAt(0).getText());
                        break;

                    default:
                        break;
                }

                return true;
            }
        });
```
这里实现的关键在新增加的`startDragAndDrop`方法，看下官方的API文档：

![start-drag](/content/images/start-drag.png)

清楚地提到了，`发出的DragEvent能够被所有可见的View对象接收到`，所以在分屏模式下，SecondActivity可以监听View的onDrag事件，于是我们监听它！

接着，我们看下`DragEvent.ACTION_DROP`事件发生的条件：

![drop-event](/content/images/drop-event.png)

当被拖拽的View的阴影进入到接收方View的坐标区域，如果此时用户松手，那么接收方View就可以接收到这个Drop事件。一目了然，我们通过拖拽ImageView到图上的灰色区域，松手，便可以触发`DragEvent.ACTION_DROP`，把数据传到SecondActivity中了。

其实还有更复杂的一些情况，需要调用`requestDropPermissions`，后续我再进一步实践一下。

这个demo的地址在[这里](https://github.com/unclechen/AndroidN-DragAndDropDemo)，先分享出来，后面我再接着完善它。

# 在分屏模式下测试你的App

无论你是否将自己的App适配到了Android N，或者是支持分屏模式，都应该找个Android N的设备，来测试一下自己的App在分屏模式下会变成什么样。

## 设置你的测试设备

如果你有一台运行Android N的设备，它是默认支持分屏模式的。

## 如果你的App不是用Android N Preview SDK打包的

如果你的App是用`低于Android N Preview SDK`打包的，且你的Activity支持`横竖屏切换`。那么当用户在尝试使用分屏模式时，系统会强制将你的App进入分屏模式。（我在第一篇博客里提到过这个，Android N Preview的介绍视频中，很多Google家的App都可以进入分屏模式，但是打开它们的xml一看，其实`targetSDKVersion = 23`）

因此，如果你的App/Activity支持横竖屏切换，那么你应该尝试一下让自己的App分屏，看看当系统强制改变你的App尺寸时，用户是否还可以接受这种体验。如果你的App/Activity不支持横竖屏切换，那么你可以确认一下，看看当尝试进入分屏时，你的App是不是仍然能够保持全屏模式。

## 如果你给App设置了支持分屏模式

如果你使用了`Android N Preview SDK`来开发自己的App，那么应该按照下面的要点检查一下自己的App。

- 启动App，长按系统导航栏右下角的小方块（Google官方把这个叫做**Overview Button**），确保你的App可以进入分屏模式，且尺寸改变后仍然能正常工作。
- 启动任务管理器（即单击右下角的小方块），然后长按你App的标题栏，将它拖动到屏幕上的高亮区域。确保你的App可以进入分屏模式，且尺寸改变后仍然能正常工作。

这两点在[上一篇博客](http://unclechen.github.io/2016/03/12/Android-N-App分屏模式完全解析-上篇/)中介绍过，让自己的App进入分屏模式有三种方法。第三种方法，就是在打开自己的App时，用手指从右下角的小方块向上滑动，这样也可以使得正在浏览的App进入分屏模式。这种方法目前属于实验性功能，正式版不一定保留。

- 当你的App进入分屏后，通过拖动两个App中间的分栏上面的小白线，从而改变App的尺寸，观察App中各个UI元素是否正常显示。
- 如果你给自己的App/Activity设置了**最小尺寸**，可以尝试在改变App尺寸时，低于这个最小尺寸，观察App是不是会回到设定好的最小尺寸。
- 在进行上面几项测试时，请同时验证自己的App功能和性能是否正常，并注意一下自己的App在更新UI时是否花费了太长的时间。

这几项测试，其实主要强调的是，我们的App可以顺利的进入/退出分屏模式，且改变App的尺寸时，UI依然可以也非常顺滑。

这里我想多说一句，如果进入了分屏模式，要注意下App弹出的对话框，因为屏幕被两个App分成两块之后，对话框也是可以弹出两个的。这时对话框上的UI元素可能就会变得比较小了，如果我们的代码是写死的大小，例如对话框是一个WebView，就需要特别注意了，搞不好显示出来就缺了一块了，这里需要我们做好适配。

### 测试清单

关于功能、性能方面测试，还可以按照下面的操作来进行。

- 让App进入，再退出分屏模式，确保此时App功能正常。
- 让App进入分屏模式，激活屏幕上的另外一个App，让自己的App进入`可见、paused`状态。举了例子来讲，如果你的App是一个视频播放器，那么当用户点击了屏幕上另外一个App时，你的App不应该停止播放视频，即使此时你的Activity/Fragment已经接到了`onPaused()`回调。
- 让App进入分屏模式，拖动分栏上的小白线，改变App的尺寸。请在竖屏（两个App一上一下布局）和横屏（两个App一左一右布局）模式下分别进行改变尺寸的操作。确保App不会崩溃，各项功能正常，且UI的刷新没有花费太多时间。
- 在短时间内、多次、迅速地改变App尺寸，确保App没有崩溃，且没有发生内存泄露。关于内存使用方面的更详细注意事项，请参考[Investigating Your RAM Usage](http://developer.android.com/tools/debugging/debugging-memory.html)。
- 在不同的窗口设置的情况下，正常使用App，确保App功能正常，文字仍然可读，其他的UI元素也没有变得太小，用户仍然可以舒适地操作App。

这几项测试，其实主要是说当App在分屏模式下运行时，仍然可以保持性能的稳定，不会Crash也不会OOM。


## 如果你给App设置了禁止分屏模式

如果你给App/Activity设置了`android:resizableActivity="false"`，你应该试试当用户在Android N的设备上，尝试分屏浏览你的App时，它是否仍然能保持全屏模式。

以上就是参考Google最新的[multi-window](http://developer.android.com/intl/zh-cn/preview/features/multi-window.html)进行的实践，总结下，我认为有3点比较重要：

1. 如何让自己的App/Activity顺利的进入和退出分屏模式，可以参考[处理运行时改变](http://developer.android.com/intl/zh-cn/guide/topics/resources/runtime-changes.html)这一章。
2. 如何在分屏模式下打开新的Activity，可以参考Google官方的[MultiWindow Playground Sample](https://github.com/googlesamples/android-MultiWindowPlayground)。
3. 如何实现跨App/Activity的拖拽功能，可以参考[Drag and Drop](http://developer.android.com/intl/zh-cn/guide/topics/ui/drag-drop.html)这一章。

关于App分屏模式的学习就到这里了，欢迎大家一起交流。我们还发挥更多的想象力，比如是否可以利用跨应用拖拽实现更方便操作，更好的用户体验。









