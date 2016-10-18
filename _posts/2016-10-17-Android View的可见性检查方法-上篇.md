---
layout: post
title: Android View的可见性检查方法（上）
date: '2016-10-17'
---

# 一、背景

在Android开发中有时候会遇到需要检查一个View是不是对用户可见，比如在消息流中，根据ImageView是否在屏幕中出现了再决定加载它，或者当视频滑入屏幕被用户可见时才播放、滑出屏幕就自动停止播放等等。乍一看好像都是在ListView、RecyclerView、ScrollView这些组件里面比较需要做这件事，今天总结一下我在实际开发中是怎么处理View可见性检查的。


# 二、检查View是否可见的基本方法（从外部检查View）

## 1 View.getVisibility()

很显然，我们可以用`View.getVisibility()`来检查一个它是否处于**View.VISIBLE**状态。这是**最基本**的检查，如果连这个方法得到的返回值都是**View.INVISIBLE或者View.GONE**的话，那么它对用户肯定是不可见的。

## 2. View.isShown()

这个方法相当于对View的所有祖先调用getVisibility方法。看下它的实现：

```
    /**
     * Returns the visibility of this view and all of its ancestors
     *
     * @return True if this view and all of its ancestors are {@link #VISIBLE}
     */
    public boolean isShown() {
        View current = this;
        //noinspection ConstantConditions
        do {
            if ((current.mViewFlags & VISIBILITY_MASK) != VISIBLE) {
                return false;
            }
            ViewParent parent = current.mParent;
            if (parent == null) {
                return false; // We are not attached to the view root
            }
            if (!(parent instanceof View)) {
                return true;
            }
            current = (View) parent;
        } while (current != null);

        return false;
    }
```

看代码注释便知，这个方法**递归地**去检查这个View以及它的parentView的Visibility属性是不是等于**View.VISIBLE**，这样就对这个View的所有parentView做了一个检查。

另外这个方法还在递归的检查过程中，检查了`parentView == null`，也就是说所有的parentView都不能为null。否则就说明这个View根本没有被`addView`过（比如使用Java代码创建界面UI时，可能会先new一个View，然后根据条件动态地把它add带一个ViewGroup中），那肯定是不可能对用户可见的，这里很好理解。

## 3 View.getGlobalVisibleRect

先看下什么是[Rect](https://developer.android.com/reference/android/graphics/Rect.html)：

> Rect holds four integer coordinates for a rectangle. The rectangle is represented by the coordinates of its 4 edges (left, top, right bottom). 
Rect代表一个矩形，这个矩形可以由它左上角坐标(left, top)、右下角坐标(right, bottom)表示。所以每一个Rect对象里面都有left, top, right bottom这4个属性。

使用这个方法的代码非常简单，如下所示，直接可以得到rect对象和方法的返回值visibility：

```
Rect rect = new Rect();
boolean visibility = bottom.getGlobalVisibleRect(rect);
```

看一下该方法的注释：当这个View只要有一部分仍然在屏幕中（没有被父View遮挡，所谓的**not clipped by any of its parents**），那么将把没有被遮挡的那部分区域保存在rect对象中返回，且方法的返回值是true，即visibility=true。此时的rect是以手机屏幕作为坐标系（所谓的**global coordinates**），即原点是屏幕左上角；如果它全部被父View遮挡住了或者本身就是不可见的，返回的visibility就为false。

```
/**
     * If some part of this view is not clipped by any of its parents, then
     * return that area in r in global (root) coordinates. To convert r to local
     * coordinates (without taking possible View rotations into account), offset
     * it by -globalOffset (e.g. r.offset(-globalOffset.x, -globalOffset.y)).
     * If the view is completely clipped or translated out, return false.
     *
     * @param r If true is returned, r holds the global coordinates of the
     *        visible portion of this view.
     * @param globalOffset If true is returned, globalOffset holds the dx,dy
     *        between this view and its root. globalOffet may be null.
     * @return true if r is non-empty (i.e. part of the view is visible at the
     *         root level.
     */

```

举例子看一下，先看布局：

```
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
                xmlns:tools="http://schemas.android.com/tools"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

    <View
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:background="#0000ff"
        android:layout_marginLeft="-90dp"
        android:layout_marginTop="-90dp">
    </View>

</RelativeLayout>
```

在xml中定义了一个View，给它设置负值的marginLeft和marginTop，让它只有一部分可以显示在屏幕中。可以看到这个View只有10x10dp大小可以出现在屏幕里面，但是只要有这么点大小可以在屏幕中，上面的方法的返回值就是：**visibility=true**。

执行的效果如下图所示，可以看到100x100dp的蓝色矩形虽然只剩下**左上角的10x10dp蓝色小方块**可见，但是visibility仍然等于true。

![self-visibility](http://ww1.sinaimg.cn/large/006y8mN6gw1f8v777610gj30go0efgm6.jpg)

此时的GlobalVisibleRect的左上角(left,top)和右下角(right,bottom)分别为`(0, 280)和(36, 316)`。在这里top不为0是因为标题栏和系统状态栏已经占据了一定的屏幕高度。

> tips：这里写代码时测试getGlobalVisibleRect方法时，记得要等View已经绘制完成后，再去调用View的getGlobalVisibleRect方法，否则无法得到的返回值都是0。这和获取View的宽高原理是一样的，如果View没有被绘制完成，那么View.getWidth和View.getHeight一定是等于0的。

#### 关于**getGlobalVisibleRect**方法的特别说明

**这个方法只能检查出这个View在手机屏幕（或者说是相对它的父View）的位置，而不能检查出与其他兄弟View的相对位置**。

比如说有一个ViewGroup，下面有View1、View2这两个子View，View1和View2是平级关系。此时如果View2盖住了View1，那么用getGlobalVisibleRect方法检查View1的可见性，得到的返回值依然是true，得到的可见矩形区域rect也是没有任何变化的。也就是说**View1.getGlobalVisibleRect(rect)得到的结果与View2没有任何关系。**

空说无凭，看个具体的例子，先看xml：

```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <View
        android:id="@+id/bottom_view"
        android:layout_width="100dp"
        android:layout_centerInParent="true"
        android:layout_marginLeft="-90dp"
        android:layout_marginTop="-90dp"
        android:layout_height="100dp"
        android:background="#0000ff">
    </View>

    <!-- 这里为了看清bottom_view, 给top_view的背景色加了一个透明度 -->
    <View
        android:id="@+id/top_view"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_centerInParent="true"
        android:background="#9000ffff">
    </View>

</RelativeLayout>
```

这个xml很简单，两个View，分别是下层的bottom_view（100x100dp，在父ViewGroup中居中），
top_view（200x200dp，也在父ViewGroup居中，因此可以完全盖住bottom_view）。

![related-visibility](http://ww4.sinaimg.cn/large/006y8mN6gw1f8v77fhy24j30go0eqaat.jpg)

我们用getGlobalVisibleRect来获取一下bottom_view的visibleRect和visibility，得到的结果是：**visibility=true，rect的左上角(left, top)和右下角(right, bottom)是(545, 1161)和(895, 1511)。**

即使把top_view从xml里面删掉，我们得到visibility和rect也是一样的。

所以`getGlobalVisibleRect`方法并不是万能的，因为它只能检查View和他们的ParentView之间的位置进而判它断是不是可见。

## 4 View.getLocalVisibleRect

这个方法和getGlobalVisibleRect有些类似，也可以拿到这个View在屏幕的可见区域的坐标，**唯一的区别getLocalVisibleRect(rect)获得的rect坐标系的原点是View自己的左上角，而不是屏幕左上角。**

先看例子，仍然是使用上面第2个例子的代码，加上下面的代码，执行一下：

```
Rect localRect = new Rect();
boolean localVisibility = bottom.getLocalVisibleRect(localRect);
```

得到的结果是：** localVisibility=true，localRect的左上角(left, top)和右下角(right, bottom)为(0, 0)和(350, 350)**。

而global坐标的结果是：**visibility=true，rect的左上角为(545, 1161)，右下角为(895,1511)。**

**看下getLocalVisibleRect的源码**，原来就是先获取View的offset point（相对屏幕或者ParentView的偏移坐标），然后再去调用getGlobalVisibleRect(Rect r, Point globalOffset)方法来获取可见区域，最后再把得到的GlobalVisibleRect和Offset坐标做一个加减法，转换坐标系原点。

```
public final boolean getLocalVisibleRect(Rect r) {
        final Point offset = mAttachInfo != null ? mAttachInfo.mPoint : new Point();
        if (getGlobalVisibleRect(r, offset)) {
            r.offset(-offset.x, -offset.y); // make r local
            return true;
        }
        return false;
    }

```

## 5. 判断手机屏幕是否熄灭or是否解锁

```
PowerManager pm = (PowerManager) context.getSystemService(Context.POWER_SERVICE);
boolean isScreenOn = pm.isScreenOn();
boolean isInteractive = pm.isInteractive();
```

这里不深究解锁和屏幕是否熄灭的实现方法了，检查View的可见性虽然和屏幕的状态看起来没有直接关系，但是在做检查前先对屏幕的状态做一个检查也是很有必要的，如果屏幕都已经关闭了，那这个View当然是对用户不可见的。

# 三、ListView、RecyclerView、ScrollView中如何检查View的可见性

说实话感觉App开发中用得最多的就是各种列表啊、滚动滑动的View。在Android里面这几个可以滚动的View，都有着各自的特点。在用到上面的检测方法时，可以好好结合这几个View的特点，在它们各自的滚动过程中，更加有效的去检查View的可见性。我们可以先根据自己的业务需要，把上面提到的方法封装成一个`VisibilityCheckUtil`工具类，例如可以提供一个check方法，当View的物理面积有50%可见时，就返回true。

## 1. ScrollView

假设我们有一个mView在mScrollView中，我们可以监听mScrollView的滚动，在onScrollChanged中检查mView的可见性。

```
mScrollView.getViewTreeObserver().addOnScrollChangedListener(
        new ViewTreeObserver.OnScrollChangedListener() {

          @Override
          public void onScrollChanged() {
            if (VisibilityCheckUtil.check(mView)) {
                // start to do something
            } else {
                // stop doing something
            }
          }
        });

```

## 2. ListView 

假设我们在mListView的第10个位置（界面上是第11个item）有一个需要检查可见性的mView。

首先要监听mListView的滚动，接着在onScroll回调中，调用mListView.getFirstVisiblePosition和mListView.getLastVisiblePosition查看第10个位置是否处于可见范围，然后在调用封装好的VisibilityCheckUtil去检查mView是否可见。

```
mListView.setOnScrollListener(new OnScrollListener() {
      @Override
      public void onScrollStateChanged(AbsListView view, int scrollState) {
        mScrollState = scrollState;
      }

      @Override
      public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount,
          int totalItemCount) {
        if (mScrollState == OnScrollListener.SCROLL_STATE_IDLE) {
          return;
        }

        int first = mListView.getFirstVisiblePosition();
        int last = mListView.getLastVisiblePosition();
        // 满足3个条件
        if (10 >= first && 10 <= last && VisibilityCheckUtil.check(mView)) {
            // do something
        }
      }
    });
```

## 3. RecyclerView

和上面类似，还是把mView摆放在第10个位置，检查原理和ListView类似。

```
mLinearLayoutManager = new LinearLayoutManager(this);
mRecyclerView.setLayoutManager(mLinearLayoutManager);
mRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {

      @Override
      public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
        super.onScrolled(recyclerView, dx, dy);
        if (mLinearLayoutManager == null) {
          return;
        }

        int firstVisiblePosition = mLinearLayoutManager.findFirstVisibleItemPosition();
        int lastVisiblePosition = mLinearLayoutManager.findLastVisibleItemPosition();
        // 同样是满足3个条件
        if (10 >= firstVisiblePosition && 10 <= lastVisiblePosition && VisibilityCheckUtil.check(mView)) {
          // do something
        }
      }
    });

```

实际的开发中肯定会遇到更多的场景，我们都要先分析界面的特点，再结合前面提到的几个方法，更有效地检查View的可见性。

# 四、小结

本篇博客的思路，都是从View的外部去检查一个View的可见性。首先提到了一些基本的方法，然后介绍了几种常见的界面下可以怎么使用这些各种方法。

如果是App开发者的话，自己写的界面自己去判断View的可见性，有上面这些方法应该就够用了。但是如果你是一个SDK开发者，给App开发者提供第三方的library时（通常是自定义View这类的库），也能够检查开发者的使用到的View，并根据可见性来自动管理一些View的操作，那就非常棒了。这时从外部去检查一个View的可见性可能就不够用了，我们可以换一个角度，从内部去检查一个View的可见性，具体内容详见[Android View的可见性检查方法-下篇](http://unclechen.github.io/2016/10/21/Android-View的可见性检查方法-下篇/)


