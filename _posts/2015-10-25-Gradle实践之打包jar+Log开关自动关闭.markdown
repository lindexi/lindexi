---
layout: post
title: Gradle实践之自定义打包jar+Log开关自动关闭
date: '2015-10-25'
---

上一篇博客介绍了[Gradle实践之多渠道自动化打包+版本号管理](http://unclechen.github.io/2015/10/22/Android%20Studio%20Gradle实践之多渠道自动化打包+版本号管理/)。由于我在公司里主要是做SDK开发的，这次我想介绍一下如何使用Gradle打出自己想要的jar包，并根据需要混淆、发布jar包。然后再介绍一下如何在打包的时候将自定义的Log输出工具关闭。

# 用Gradle打包出jar文件

前面我们说过，在Android Studio里面使用Gradle来打包应用程序，一般都是build出来一个apk文件。但是有的同学是做实现层的开发，不直接做View层的东西，例如sdk开发主要是给View层开发的同学提供接口，通常是把代码打包成jar，再给开发者使用。

现在有很多github上的开源项目也都是使用Android的library插件打包成aar，再提供给开发者用。这里说到`aar`，它是随着Android Studio的出现而出现的，功能上类似一个library，可以在其他的项目里面调用这个aar提供的接口，aar也是一种zip包，与apk文件非常地相似，用解压工具打开它就会发现里面除了一个 **classes.jar** ，还有 **res、assert、aidl、AndroidManifest.xml** 等等文件，真的和apk太像了，不过apk压缩包里面的classes文件是一个dex文件，aar里面的classes文件还是个jar。

还是以上一篇博客中建立的HelloGradle工程为例，现在向里面再添加一个新的Module。添加方法就是在项目面板的左侧，以`Andrioid`视图查看工程结构，右键，在弹出的菜单中选择`open module settings`，然后选择`new a module`，接着在弹出的对话框中，选择新建一个`Android Library Module`，这里我把它命名为HelloLib。如下图所示：

![New a lib module](/content/images/new-a-lib-module.png)

这时你会发现，我们的HelloGradle工程里，有了两个Module，一个是application类型的Module，一个是library类型的Module。

![Two module](/content/images/two-modules.png)

它们的区别可以在各自的`build.gradle`文件中一目了然。因为application module的build.gradle中引入的是`com.android.application`插件来打包，而library module的build.gradle中引入的是`com.android.library`插件进行打包。

```
apply plugin: 'com.android.library'
```

可想而知，这个`com.android.library`打包出的来的output一定就是`aar`文件了。这个aar文件位于`build/output/aar/`文件夹下。

那么我们要如何打包出一个jar呢？毕竟现在还有项目是用Eclipse开发的，使用jar文件比较方便，而且jar文件也可以在Android Studio中引入。

首先我们在新建HelloLib Module中new一个class，作为我们的库来提供给app module使用。如下所示，我新建了一个测试类。

```
package com.nought.hellolib;

import android.util.Log;

public class UncleNought {

    public static void Output() {
        Log.i(UncleNought.class.getSimpleName(), "I'm a library!");
    }
}

```

然后在app module的build.gradle文件中添加一行`compile project(':hellolib')`，使得app module依赖我们的HelloLib module。

```
dependencies {
    compile fileTree(include: ['*.jar'], dir: 'libs')
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:22.2.1'
    compile 'com.android.support:design:22.2.1'
    compile project(':hellolib')
}
```

这样就可以在app module中调用刚才的测试类了。我们在app module中MainActivity的onCreate方法里调用`UncleNought.Output();`，可以看到输出了Log`I'm a library!`。

![I am a lib](/content/images/i-am-a-lib.png)

接着，我们介绍两种生成jar的方法，有了jar以后，就可以在app module中以jar包的形式来调用HelloLib中的接口。

## 方案1：拷贝默认生成的jar包

说到jar包，其实它就是把java源文件编译出来的class字节码，以一种zip的形式压缩在了一起。Android很大部分的开发都是用java写的，那么我们可以将Android源代码编译出来的class字节码压缩到一个jar包里面，不就是我们想要的jar包吗？没错就是这个，实际上在`com.android.library`插件中，运行build命令是，也会有这样的操作，先把java源代码编译成class文件，再把文件打包成jar，再把jar压缩成dex。这其中就有jar的操作，生成的jar就位于`build/intermediates/bundles/release/classes.jar`。如果你想直接使用这个jar也是可以的，只要自己在HelloLib Module的build.gradle中写一个copy类型的task，把这个classes.jar拷贝到指定的目录下就可以了。下面是一种示例：


```
task releaseMyLib(type: Copy, dependsOn: ['build']) {
    from( 'build/intermediates/bundles/release/')
    into( 'build/libs')
    include('classes.jar')
    rename('classes.jar', 'my-lib.jar')
}

```

在HelloLib的build.gradle脚本添加完上面的task以后，打开Android Studio自带的命令行工具，依次输入下面两行，就可以打出一个my-lib.jar包了。

```
cd hellolib
gradle releaseMyLib
```

这段脚本的含义非常简单，我们自定义了一个名叫releaseMyLib的task，它是Gradle API自带的`copy`类型的任务，这个任务依赖于 `build`任务，前面我们提到过，gradle有很多默认的任务，build便是其中的一个。所以当build任务结束后，会在`build/intermediates/bundles/release/`下生成`classes.jar`文件，我们只要在这之后，把它拷贝出来，重命名为`my-lib.jar`就可以了。

然后把这个jar包拷贝到app module下的libs文件夹中，去掉刚才在app module的build.gradle文件中添加的`compile project(':hellolib')`，重新gradle sync一下，然后尝试运行你会发现和刚才的效果是一样的，这样就打出一个hellolib module的jar了。

但是上面这种做法太偷懒了，实际上这个classes.jar中，有一些是我们不要的类，例如`BuildConfig.class`这样的类。下图是用Java Decompiler反编译看到my-lib.jar里面的内容。

![My lib](/content/images/my-lib.png)

作为一个sdk开发者，很多时候需要自己的jar越小越好，所以我们可以不需要把编译后自动生成的BuildConfig类加入到我们自己的jar包中来，此外有时候我们并不想把所有的类都打到这个my-lib.jar包中，这时应该怎么做呢？

## 方案2：自定义Jar任务打包jar文件

我们知道，Android Studio生成默认的jar包，是把源代码编译之后生成的所有的class字节码都压缩到这个classes.jar中，如果我想只打其中的一部分类该怎么办呢？

答案很简单：只需要在对编译出来的class字节码做Jar操作时，include我自己想要的类（或者exclude掉不想要的类）即可。那么所有的编译好的class字节码都在哪里呢？答案是`build/intermediates/classes/release/`目录下，如下图所示：

![classes](/content/images/output-classes.png)

Android Library打包插件在build时，会把所有的java文件编译成class文件，放在这个目录下。所以我们接下来要做的事就是把这里面，所有需要的class，打成一个Jar包即可。下面是一个示例：

```
task jarMyLib(type: Jar, dependsOn: ['build']) {
    archiveName = 'my-lib.jar'
    from('build/intermediates/classes/release')
    destinationDir = file('build/libs')
    exclude('com/nought/hellolib/BuildConfig.class')
    exclude('com/nought/hellolib/BuildConfig\$*.class')
    exclude('**/R.class')
    exclude('**/R\$*.class')
    include('com/nought/hellolib/*.class')
}

```

同样，打开Android Studio的终端，依次输入下面两行命令：

```
cd hellolib
gradle jarMyLib

```
这样就通过Jar任务，自己打包出了一个jar包。我们可以反编译一下这个jar包看看：

![Jar classes](/content/images/my-jar-lib.png)

果然里面没有BuildCongfig这个类了，把这`my-lib.jar`拷贝到app module下的libs文件夹下，重新Gradle sync一下，再运行这个app module，可以看到和之前方案1中一样的效果了。

这里是一种基本的自定义示例，如果还需要有别的需求，可以参考Gradle官方的DSL，里面介绍了各种Task接收的参数和使用方法。大家可以自行发挥实现自己想要的效果。

## PS 0：如何将依赖的第三方库也打包进来

有一次我在Android开源群里，一个朋友问到“如果除了自己写的类，还想把第三方的OkHttp包打进来怎么办？”。其实这个问题很好解决，Gradle的`Jar`任务是可配置多个`from`来源的，所以我们只需要在上面的代码里添加一行:

```
task jarMyLib(type: Jar, dependsOn: ['build']) {
    archiveName = 'my-lib.jar'
    from('build/intermediates/classes/release')
    from(project.zipTree("libs/xxx-x.x.x.jar")) // 添加这一行
    destinationDir = file('build/libs')
    exclude('com/nought/hellolib/BuildConfig.class')
    exclude('com/nought/hellolib/BuildConfig\$*.class')
    exclude('**/R.class')
    exclude('**/R\$*.class')
    include('com/nought/hellolib/*.class')
    include('com/xxx/*.class') // 同时记得加上第三方的package
```

看上面的加了注释的两行，这样就可以把第三放依赖的jar包添加进来了。

## PS 1：为何要依赖默认的build任务

前面我们自定义`jarMyLib`的时候，都依赖了`build`任务，因为这个任务可以帮我们把所有的java源代码编译成class文件，实际上build任务自己又依赖了很多其他的任务来实现打包。如果你想实现更快速的打包，运行一下`gradle tasks`或者在Android Studio中点击右边的Gradle按钮弹出任务列表的面板，就会看到还有一个`compileReleaseJavaWithJavac`，看名字就知道这个任务是编译所有的release type的java源文件，因为我们可以把上面的代码改为dependsOn这个任务即可，改为`task jarMyLib(type: Jar, dependsOn: ['compileReleaseJavaWithJavac'])`。但是记住了，一定要看清楚自己的gradle插件版本，我这个Android Gradle插件的版本是`com.android.tools.build:gradle:1.3.0`，而`com.android.tools.build:gradle:1.2.3`插件版本中对应的这个Compile任务的名字是叫做`compileReleaseJava`，大家记得不要写错了。

## PS 2：为何不直接自定义compileJava任务

另外大家可能会说，既然都自己自定义Jar任务，为啥不把`compileJava`任务也自定义了，其实也是可以的，这样等于完全不用依赖Android Gradle插件的默认任务了。但有的时候，假设我们的代码中要把aidl打进来，依赖默认的`compileReleaseJavaWithJavac`任务会把aidl生成的class文件也包含在里面，非常方便。如果自己去写JavaCompile任务的话，首先还要把aidl文件生成java文件，再来compile它，会有一点点麻烦。咱们做sdk开发的，不需要打那么多渠道包，直接依赖默认的`compileReleaseJavaWithJavac`其实多花个1-2s不是什么大问题。

## PS 3：混淆自定义的jar包

刚才忘了提，混淆也是比较常见的一个需求，假设我们不是打包apk，在buildTypes闭包里面也没有给release类型的任务设置``为混淆。那么我们还可以自己定义一个混淆任务，话不多说，直接上代码：

```
def androidSDKDir = plugins.getPlugin('com.android.library').sdkHandler.getSdkFolder()
def androidJarDir = androidSDKDir.toString() + '/platforms/' + "${android.compileSdkVersion}" + '/android.jar'

task proguardMyLib(type: proguard.gradle.ProGuardTask, dependsOn: ['jarMyLib']) {
    injars('build/libs/my-lib.jar')
    outjars('build/libs/my-pro-lib.jar')
    libraryjars(androidJarDir)
    configuration 'proguard-rules.pro'
}

```

这里的混淆Task——`proguard.gradle.ProGuardTask`，也是来自Gradle标准的API，查看一下Gradle DSL，就知道怎么用了。injars、outjars和libraryjars以及混淆配置文件proguard-rules.pro这些参数，和原来使用Eclipse开发时是一样的，injars表示输入的需要被混淆的jar包，outsjars表示混淆后输出的jar包，libraryjars表示引用到的jar包不被混淆，`proguard-rules.pro`里面写的是混淆配置，具体就不在这里详细发散了。

最后，还是在终端中进入HelloLib目录，执行`gradle proguardMyLib`，就可以得到混淆以后的jar包`my-pro-lib.jar`了。

```
cd hellolib
gradle proguardMyLib

```

同样，我们反编译一下这个`my-pro-lib.jar`，如下图所示：

![Decompile my-pro-lib](/content/images/my-pro-lib.png)

有同学就会说了，这个混淆的后的jar包和原来的jar包没啥区别啊... ...没错，因为我们这个类里面只调用了一句Log API，这个API又是来自于android.jar的，我们在混淆的时候使用libraryjars(android.jar)保证了这个包里面的东西不会被混淆，所以这个示例里面看起来是没有什么变化的。如果你的HelloLib Module写的很复杂，里面代码有很多的话，混淆以后是有明显变化的，自定义打包jar文件就到这里结束了，大家可以自己体验一下。

***

# Gradle自动关闭Log开关

在Android开发中，很多时候我们会自己封装一个Log类，里面设置一个开关，在开发的时候将所有级别的Log全部打开输出。然后在发布应用前，把Log.i和Log.d这类级别的Log关闭，仅留下Log.e类型的输出。这样做是为了防止别人通过log来研究我们的代码，同时也可以把一些不必要给别人看的信息过滤掉。

其实这个需求很早就有，网上的大神们有很多的方法，这里我就举两个例子，说一下我自己的体会吧。

## 方案1：通过BuildConfig类来关闭

前面我们一经发现，当你使用Android Gradle插件打包，执行默认的build任务时，会在`build/intermediates/classes/release`中自动生成一个`BuildConfig.class`，有class就应该有java源代码文件啊，那么这个class文件对应的java文件在哪里呢？答案是`app/build/generated/source/buildConfig/`下。

关于这个生成的类文件，我们可以通过在build.gradle脚本中的buildTypes闭包中指定参数，使得这个类生成出来的时候包含一个我们自定义的boolean类型的静态常量`ENABLE_DEBUG`，直接上代码：

```
buildTypes {
        release {
            // 不显示log
            buildConfigField "boolean", "ENABLE_DEBUG", "false"
            ...
        }
 
        debug {
            // 显示Log
            buildConfigField "boolean", "ENABLE_DEBUG", "true"
            ...
        }
    }

```

按照上面的脚本编写之后，生成的release版BuildConfig类中就会多出一个常量，即`public static final boolean ENABLE_DEBUG = false;`；而debug版的BuildConfig类中的常量值则为true，即`public static final boolean ENABLE_DEBUG = true;`。你可以分别在源代码中调用这两个常量，最后这两个类分别也会被打包到release和debug版各自的apk文件当中。

当你修改build.gradle脚本以后，按照Android Studio的提示，点击`Gradle Sync`，就可以在之前我们自定义的UncleNought测试类中调用BuildConfig类中常量，可以看到`ENABLE_DEBUG`这个类已经自动生成出来了。下面是一段调用的示例：

```
package com.nought.hellolib;

import android.util.Log;

public class UncleNought {

    public static void Output() {
        if (BuildConfig.ENABLE_DEBUG) {
            Log.i(UncleNought.class.getSimpleName(), "I'm a library!");
        }
    }
}

```

咱们可以打个包看一下，在命令行中运行:

```
gradle releaseMyLib
```

记住，这里必须执行`releaseMyLib`这个任务，因为我们用到了BuildConfig这个自动生成的类，假如不把它编译到我们的jar包里，那么就没法去引用`BuildConfig`里面的`ENABLE_DEBUG`常量了。打包好了以后，我们通过反编译再看一下这个jar，如下图：

![enable-debug](/content/images/buildconfig-enable-debug.png)

把这个jar包给app module引用一下也会发现，现在Log已经不会输出了。

## 方案2：自定义Log开关

假设我们不想把BuildConfig打包进来，只想在自己的类中定义一个常量，然后在release的时候修改这个动态去常量，应该怎么做呢？这个时候就可以利用gradle强大的能力了，话不多说，一步步看代码。

首先在测试类的代码里添加一个常量`ENABLE_DEBUG`：

```
package com.nought.hellolib;

import android.util.Log;

public class UncleNought {

    public static boolean ENABLE_DEBUG = true;

    public static void Output() {
        if (ENABLE_DEBUG) {
            Log.i(UncleNought.class.getSimpleName(), "I'm a library!");
        }
    }
}

```

然后修改我们的HelloLib打包脚本build.gradle文件，在前面的基础上添加：

```
def enableLoggerDebug(boolean flag) {
    def loggerFilePath = "src/main/java/com/qq/e/comm/util/GDTLogger.java"
    def updatedDebug = new File(loggerFilePath).getText('UTF-8')
            .replaceAll("DEBUG_ENABLE\\s?=\\s?" + (!flag).toString(), "DEBUG_ENABLE = " + flag.toString())
    new File(loggerFilePath).write(updatedDebug, 'UTF-8')
    println(flag ? 'GDTLogger.DEBUG_ENABLE : [true]' : 'GDTLogger.DEBUG_ENABLE : [false]')
}

preBuild {}.doFirst {
    if (('jarMyLib' in gradle.startParameter.taskNames)) {
        enableLoggerDebug(false)
    }
}

jarMyLib {}.doLast {
    enableLoggerDebug(true)
}
```

前面我提过，Gradle兼容Java的语法，所以我就想到，可以用正则表达式替换掉原来代码中的`true`，让它变成`false`。当然我们要保证这该替换必须发生在`complileReleaseJavaWithJavac`之前，然后我们在打包彻底完成以后，再把Log开关打开，即再`false`变回`true`，使得开发环境一直都是可以输出Debug Log的。

可以看到我们在preBuild任务前把开关关闭了，然后在jarMyLib之后，又把开关打开了。`doFirst`和`doLast`都是通过闭包的方式向一个已有的任务里面添加可执行操作的语法。下面我们打开终端进入到HelloLib目录下，执行下面的语句打一个包试试：

```
gradle jarMyLib
```

找到我们的jar包，反编译一下看看：

![custom-enable-debug](/content/images/custom-log-enable.png)

果然，虽然我们的代码里是`public static boolean ENABLE_DEBUG = true;`，然而打出来的jar包却是`public static boolean ENABLE_DEBUG = false;`。

是不是很方便，如果你还有类似的动态修改代码的需求，也可以采用这种方法实现。其实还有其他的方式也可以实现同样的效果，在Android打包脚本的buildTypes和productFlavor支持下，我们还可以为不同类型的任务创建不同的源代码或者资源类型的文件，前面的博客就提到过可以为不同渠道包设置不同的`appname`，也可以采用同样的思路实现刚才这个需求，大家看自己的偏好吧，黑猫白猫，只要能抓到老鼠那都是好狗哇，哈哈哈！

最后上一下这个HelloGradle工程的代码示例[https://github.com/unclechen/HelloGradle](https://github.com/unclechen/HelloGradle)，里面有这两篇博客的打包示例，需要的同学可以看看。



