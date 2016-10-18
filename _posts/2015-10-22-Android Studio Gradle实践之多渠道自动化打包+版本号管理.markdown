---
layout: post
date: '2015-10-22'
title: Android Studio Gradle实践之多渠道自动化打包+版本号管理
---

上次介绍了[Android Studio的安装、配置和基本使用](http://unclechen.github.io/2015/06/01/Android%20Studio%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE%E7%AC%94%E8%AE%B0/)。这次讲一下Android Studio用到的打包工具Gradle。[Gradle](http://gradle.org/)是一种构建项目的框架，兼容Maven、Ant，为Java项目提供了很多插件去实现打包功能。废话不多说，下面直接进入实战。当我写这篇博客的时候，Android Studio的版本已经更新到了**1.4**，比上一篇博客的版本又更新了。

# Android Studio工程build.gradle脚本介绍

在进行多渠道打包之前，先介绍一下Android Studio工程中的gradle脚本长什么样。打开Android Studio，新建一个Project，这里我给它命名为Hello Gradle，一路点击下一步，最后Android Studio自动为我们建立的如下图的这个工程。

![hello AS](/content/images/create-a-project.png)

按照上篇博客中介绍的，我们推荐大家采用Android结构的视图来查看项目结构。展开Gradle Scripts我们可以看到里面有两个`build.gradle`文件和一个`settings.gradle`文件。其中的`build.gradle(Project: HelloGradle)`文件是我们整个工程的build文件，而`build.gradle(Module: app)`文件是我们工程下的一个Module的build文件。前面我们就说过Android Studio采用单工程多Module结构，一个工程可以理解为Eclipse下的一个Workspace，一个Module可以理解为Eclipse下的Project。当我们用Android Studio建立一个默认的工程时，它自动为我们建立了一个名字为`app`默认的Module。

所以我们可以知道，一个Android Studio工程会有一个`工程级别的build.gradle`文件，同时有N个Module，就还会有N个`Module级别的build.gradle`文件。

## 工程目录下的build.gradle(Project: HelloGradle)文件

接着我们先看下这个工程级别的build.gradle文件。

{% highlight xml %}
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.3.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}

{% endhighlight %}

这个文件里的buildscript闭包中为我们定义了工程用到的repository地址，默认为我们加上了jcenter，并添加了版本号为1.3.0的Android Gradle插件。关于闭包，由于gradle是基于Groovy语言编写的，而闭包是里面的一个概念，可以理解为最小的代码执行块。关于jcenter，可以理解为一个兼容Maven中央仓库的东西，是Google为Android建立的。

最下面还有一个task clean，**task**是gradle脚本中用到最多的东西了。Gradle实际上是一个容器，实现真正的功能的都是Gradle的插件Plugin，而Plugin中又定义了各式各样的Task，这一个个的Task是执行任务的基本单元。

这里一看就知道是一个delete类型的task，意思是在我们执行打包脚本前做一个清理工作，把项目输出文件夹中的文件先全部清理干净。

## Module目录下的build.gradle(Module: app)文件

接着看app Module下的build.gradle文件。

{% highlight xml %}
apply plugin: 'com.android.application'
{% endhighlight %}

第一行`apply plugin: 'com.android.application'`：指的是在这个脚本中应用**Android Application**插件。前面我们说到了Gradle中真正起作用的是插件，每个插件中可以定义各种各样的Task，当然还可以有一些Property属性，如果你以前是用Ant打包的，那么对属性一定不会陌生吧。

{% highlight xml %}
android {
    compileSdkVersion 22
    buildToolsVersion "23.0.1"

    defaultConfig {
        applicationId "com.nought.hellogradle"
        minSdkVersion 14
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
{% endhighlight %}

接着看android闭包，里面首先定义了我们这个Module使用的**compileSdkVersion**和**buildToolsVersion**，这两个属性大家肯定知道，一个是用来编译代码的sdk版本，一个是用来打包apk的build-tools版本。

再看里面的defaultConfig，又定义了几个属性。依次有**applicationId**，代表着你的包名，以前我们都是在AndroidManifest.xml文件中通过`package="com.nought.hellogradle"`指定应用程序的包名，现在我们可以在gradle打包脚本中指定它，后面你会发现我们结合 **buildTypes** 和 **productFlavors** ，还可以动态的改变它，有点神奇了吧！ **minSdkVersion** 指的是你的应用程序兼容的最低Android系统版本； **targetSdkVersion** 指的是你的应用程序希望运行的Android系统版本；**versionCode** 是你的代码构建编号，一般我们每打一次包就将它增加1；**versionName** 则是你对外发布时，用户看到的应用程序版本号，一般我们都用“点分三个数字”来命名，例如`1.0.0`。

接着看下 **buildTypes** ，这里面默认只定义了 **release** 类型，其实还可以定 **debug** 类型以及你自己定义的例如 **internal** 国内类型、**external** 国外类型等等。以前在每一个type中，可以分别配置不同的选项，例如可以 **配置不同的包名、是否混淆** 等等，目前的默认release类型中配置了混淆文件，`minifyEnabled false`指的是不混淆代码，下面这行 `proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'` 指定的是你的混淆配置文件。这里就不详细介绍了，马上我们就会看一下多渠道打包，实践一下大家就清楚了。

{% highlight xml %}
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:22.2.1'
    compile 'com.android.support:design:22.2.1'
}
{% endhighlight %}

最后，我们看dependencies闭包，这里指的是我们的工程依赖的库，以往在Eclipse中开发，我们常常通过jar包，以及添加library的形式来添加依赖，现在方便了，在gradle脚本里，一行代码通通搞定！真是简单啊！dependencies闭包下，有几种基本的语法。

- 1：`compile fileTree(dir: 'libs', include: ['*.jar'])`,指的是依赖libs下面所有的jar包，你还可以指定具体的每一个jar包，而不是采用`*.jar`通配符匹配的方式，例如`compile files('libs/文件名.jar')`；

- 2：`compile 'com.android.support:appcompat-v7:22.2.1'`，这种语法是通过包名：工程名：版本号的形式来依赖的，

- 3：`testCompile 'junit:junit:4.12'`，指的是测试时才会用到的依赖，这里一看就知道是指做单元测试时依赖junit。

好了，上面介绍了Android Studio默认生成的基本的Gradle打包脚本的结构。下面我们在实践中学习，怎么修改这个脚本，来实现自己的各种需求，例如多渠道自动化打包等等。

# 多渠道打包实践

多渠道指的是你的应用程序可以发布到不同的应用市场，被不同的用户从各个市场下载以后，你可以监测到每一个用户安装的这个应用程序是来自哪个市场的。实现的方法有很多，主要是通过在安装包中的放置一个标志位来区分不同的渠道包。

## 多渠道打包实现思路

### 思路1：AndroidManifest.xml占位符与productFlavor结合

比较常见的友盟移动统计sdk中使用的方案，这种方案是 **通过`build.gradle`脚本中的`productFlavor`** 来实现的。首先在AndroidManifest.xml文件的 **`application`** 标签里指定一个 **meta-data** ，然后Umeng SDK会读取这个标签中value传到Umeng的后台，这样就可以让开发者监测到自己的应用程序渠道分布情况了。

{% highlight xml %}
<meta-data android:name="UMENG_CHANNEL" android:value="${UMENG_CHANNEL}"></meta-data>
{% endhighlight %}

其实`meta-data`元素可以作为子元素，被包含在 `activity`,`application`,`service`和`receiver`标签中，但是不同位置下的 `meta-data` 读取方法不一样，我们这里就以在`application`中放置占位符为例。

### 思路2：一次打包，动态替换渠道标识符

在[美团的技术博客](http://tech.meituan.com/mt-apk-packaging.html)上还分享过 **另外一种实现思路** ：就是在打包完apk之后，再拆包替换掉其中一个文件，或者替换文件中的标识符，实现不同渠道市场的打包。因为apk实际上也是一种zip文件，里面有Android定义的一些文件组织结构，比如可以在assert目录下塞一个文件，命名为version之类的，再动态改变其中的内容。这种思路和官方的`buildTypes + productFlavor`方式有所不同。因为这种思路只需要执行一次打包任务，剩下的操作是拆开apk，替换文件。可想而知这种速度比较快，如果你有很多个渠道包要打的话，这种思路能提高很多速度，据说100个渠道包大概只要2分钟。而普通的`buildTypes + productFlavor`方式，我打了4个渠道包也花费了几十秒。可见如果有很多渠道包要出，建议采用美团的这种思路。


## 多渠道打包实现步骤

### 1. 在AndroidManifest.xml的`application`标签下定义UMENG_CHANNEL占位符。

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.nought.hellogradle" >

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme" >

        <meta-data android:name="UMENG_CHANNEL" android:value="${UMENG_CHANNEL}"></meta-data>

        <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:theme="@style/AppTheme.NoActionBar" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
{% endhighlight %}

### 2. 修改app目录下的build.gradle脚本，在`android`闭包中添加 **`productFlavors`** 属性，配置替换占位符的渠道标识。

{% highlight xml %}
apply plugin: 'com.android.application'

android {
    compileSdkVersion 22
    buildToolsVersion "23.0.1"

    defaultConfig {
        applicationId "com.nought.hellogradle"
        minSdkVersion 14
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    productFlavors {
        GooglePlay {
            manifestPlaceholders = [UMENG_CHANNEL: "GooglePlay"]
        }
        Baidu {
            manifestPlaceholders = [UMENG_CHANNEL: "Baidu"]
        }
        Wandoujia {
            manifestPlaceholders = [UMENG_CHANNEL: "Wandoujia"]
        }
        Xiaomi {
            manifestPlaceholders = [UMENG_CHANNEL: "Xiaomi"]
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:22.2.1'
    compile 'com.android.support:design:22.2.1'
}

{% endhighlight %}

### 3. 打开Android Studio自带的命令行工具，运行`gradle build`命令，就可以在 **`app/build/outputs/apk/`** 目录下看到生成渠道包apk文件。注意：输出的apk文件是在app Module下的build目录中，不是工程根目录下的build目录。

![hello AS](/content/images/apk-outputs.png)

我们可以看到在 **`app/build/outputs/apk/`** 中，生成的带有渠道标识的apk文件有12个，这时因为 **buildTypes** 与 **productFlavors** 两两组合，2*4=8，Android Studio默认必须有 **release** 和 **debug** 这两种Type。此外，由于buildTypes中还可以定义 **`zipAlignEnabled true`** ，意思是混淆后的zip优化，该值默认为true，因此每个渠道还多了一个 **`app-渠道标识-debug-unaligned.apk`** 文件。

## 小结：

运行`gradle build`命令时，终端里会显示当前正在执行的task，里面有很多我们熟悉的任务，例如dex、javaCompile这些。前面我们说过，gradle脚本会以钩子的形式，执行一系列的tasks，最终构建出我们所需要的程序安装包。感兴趣的同学可以执行一下 **`gradle tasks`** 命令，这个命令可以查看当前工程下所有的tasks，后面我也将结合这些tasks，实践一下jar包的构建。
 
![hello AS](/content/images/open-terminal.png)

## PS：渠道包修改包名
 
如果你想修改不同的渠道包的包名，可以在你的 **productFlavors** 指定不同的 **applicationId ** 即可。在build.gradle文件中，输入的时候你就发现自动补全已经提示你，还有很多其他的属性可以配置了，感兴趣的同学不妨试试。

## PPS：渠道包改应用名称

如果你还想给不同的渠道指定不同的应用名字，例如想要在Xiaomi市场上叫做 **“HelloGradle-小米专供版”** , 那么你可以新建 `app/src/Xiaomi/res/values/strings.xml` 的文件，里面填写 `<string name="app_name">HelloGradle-小米专供版</string>`，这样打包出来的小米渠道包，应用程序的名称就改变成**“HelloGradle-小米专供版”** 了。

## PPPS：单独打包某一个渠道

运行 **`gradle build`** 会一次性打包出所有的渠道包，花费的时间还是很长的。如果只想打一个渠道的渠道包话应该怎么做？以百度为例，可以在命令行中执行  **`gradle assembleBaidu`** ，我是怎么找到 `assembleBaidu` 这个任务名字的？前面提到过的，运行 `gradle tasks`，你就会发现所有的tasks列表，找到build类的tasks，就看到了！其实Android Studio里面，这些全部都有界面操作的，大家看下代码编辑窗口的右边栏，是不是有一个Gradle的按钮，点击一下展开它，然后点击面板左上角的刷新按钮，就可以将所有的tasks列出来了，和执行命令行的效果是一样的。定制化打包的需求还有很多，同学们可以自己尝试尝试，记得分享出来给大家啊！

![hello AS](/content/images/aB.png)

***

# 版本号管理实践

版本号管理，在实际的业务中有很重要的作用，因为有的时候我们需要在做新版本特性的时候对旧版本做一些兼容处理，即使旧版本不能享受新版本功能，但是也不能影响到旧版本上已有功能的稳定运行。例如，新版本的应用程序支持视频播放，而旧版本的应用无法支持，那么可以在后台做控制，只针对新版本的应用返回视频数据，而旧版本不需要返回视频数据。

一般版本号都会用 **`major.minor.patch`** 表示，例如 **`1.0.0`** 这样的形式。第一个数字major表示主版本号，第二个数字minor表示副版本号，第三个数字patch表示小版本号或者叫补丁号。当然也不一定要强制用三个数字来表示，直接用  **`major.minor`** 也是可以的，但是一旦你的应用程序版本号按照一个规则进行管理后，如果后台有逻辑依赖这个版本号，那么就不应该随意进行修改，一定要保持一致。

做Android开发的同学都熟悉 **versionCode** 和 **versionName** 这两个与版本管理相关的属性。以前用Eclipse开发项目时，都是在 `AndroidManifest.xml`文件中定义，如下所示。

{% highlight xml %}
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.nought.hellogradle"
    android:versionCode="1"
    android:versionName="1.0" >
{% endhighlight %}

但是在Android Studio中，这两个属性已经被放在Module下的`build.gradle`中，一般是在`android`闭包的`defaultConfig`中，如下所示。

{% highlight xml %}
android {
	...

    defaultConfig {
        applicationId "com.nought.hellogradle"
        minSdkVersion 14
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }

	...

}
{% endhighlight %}

正是由于放到了gradle脚本中，而 **gradle脚本中可以写groovy代码和java代码** ，使得动态改变这两个属性变得更加方便了。关于 **versionCode** ，是一个整数，每build一次工程，我们都会将它增加1，因此可见应用程序的`versionCode`越大，其版本越新。而 **versionName** 是一个字符串，通常我们用这个来告诉用户，他们正在使用的应用程序版本名是多少，至于这个`versionName`每次打包怎么增加，就由你的自己来定义了，但是请记住，遵循这个规则不要改变，否则它就没有什么意义了。

下面介绍一种版本号管理的思路，还是以前面的工程为例，这里为了简便，我把多渠道打包的代码注释掉了，先实现版本号自增。

## versionCode版本号自增实现步骤

### 1. 在app目录下新建一个文本类型的文件 `version.properties`，在文件中添加：

{% highlight xml %}
build.number=1
{% endhighlight %}

这里简单提一下 **properties** ，在gradle脚本中，我们可以定义各种 **`name=value`** ，然后通过读取属性的方式load进来，在脚本中使用。

### 2. 在app目录的build.gradle文件中，定义一个getVersionCode方法。

{% highlight xml %}
def getVersionCode() {
    def versionFile = file('version.properties')

    if (versionFile.exists()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionFile))
        def versionCode = versionProps['build.number'].toInteger()
        println('Current version code is ' + versionCode.toString())
        return versionCode
    } else {
        throw new GradleException("Could not find version.properties!")
    }
}
{% endhighlight %}


### 3. 修改build.gradle中的defaultConfig闭包，将versionCode的属性赋值改为通过getVersionCode方法获取。

{% highlight xml %}
android {
	...

	def currentVersionCode = getVersionCode()

    defaultConfig {
        applicationId "com.nought.hellogradle"
        minSdkVersion 14
        targetSdkVersion 22
        versionCode currentVersionCode
        versionName "1.0"
    }

	...

}
{% endhighlight %}

### 4. 再定义一个updateVersionCode方法。

{% highlight xml %}
def updateVersionCode() {
    def runTasks = gradle.startParameter.taskNames

    if (!('assemble' in runTasks || 'assembleRelease' in runTasks || 'aR' in runTasks)) {
        return
    }

    def File versionFile = file('version.properties')

    if (versionFile.exists()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionFile))
        def currentVersionCode = versionProps['build.number'].toInteger()
        currentVersionCode++
        versionProps['build.number'] = currentVersionCode.toString()
        versionProps.store(versionFile.newWriter(), null)
        println('Updated version code to ' + currentVersionCode.toString())
    } else {
        throw new GradleException("Could not find version.properties!")
    }
}
{% endhighlight %}

可以看到这个方法中，首先获取了本地build任务中所有的任务名字，前面说过build任务实际上是个钩子，里面会去依赖很多其他的任务，例如`assemble`、`assembleRelease`及其驼峰式缩写`aR`。这里我们约定为只要执行过`assemble`任务，就将`versionCode`加1。当然你可以根据需要改成其他的条件。

### 5. 给assembleRelease任务依赖，使得release版本构建成功后，versionCode增加1，并写入`version.properties`文件。

{% highlight xml %}
assembleRelease {}.doLast {
    updateVersionCode()
}
{% endhighlight %}

### 6. 打开Android Studio自带的命令行，运行`cd app`进入app目录，接着运行 `gradle assembleRelease`。

**记得一定要进入`app`目录以后，再build。** 当打包成功以后，versionCode增加了1，并保存在`version.properties`文件中。打开文件看下，果然变成了2，gradle还在第一行添加了修改时间。

{% highlight xml %}
#Fri Oct 23 17:34:28 CST 2015
build.number=2
{% endhighlight %}

### 小结：

说了很多，直接把完整的build.gradle脚本贴出来吧。

{% highlight xml %}
apply plugin: 'com.android.application'

android {
    compileSdkVersion 22
    buildToolsVersion "23.0.1"

    def currentVersionCode = getVersionCode()

    defaultConfig {
        applicationId "com.nought.hellogradle"
        minSdkVersion 14
        targetSdkVersion 22
        versionCode currentVersionCode
        versionName "1.0"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    testCompile 'junit:junit:4.12'
    compile 'com.android.support:appcompat-v7:22.2.1'
    compile 'com.android.support:design:22.2.1'
}

assembleRelease {}.doLast {
    updateVersionCode()
}

def getVersionCode() {
    def versionFile = file('version.properties')

    if (versionFile.exists()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionFile))
        def versionCode = versionProps['build.number'].toInteger()
        println('Current version code is ' + versionCode.toString())
        return versionCode
    } else {
        throw new GradleException("Could not find version.properties!")
    }
}

def updateVersionCode() {
    def runTasks = gradle.startParameter.taskNames

    if (!('assemble' in runTasks || 'assembleRelease' in runTasks || 'aR' in runTasks)) {
        return
    }

    def File versionFile = file('version.properties')

    if (versionFile.exists()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionFile))
        def currentVersionCode = versionProps['build.number'].toInteger()
        currentVersionCode++
        versionProps['build.number'] = currentVersionCode.toString()
        versionProps.store(versionFile.newWriter(), null)
        println('Updated version code to ' + currentVersionCode.toString())
    } else {
        throw new GradleException("Could not find version.properties!")
    }
}

{% endhighlight %}

如果想验证的话，我们可以在代码里读取一下应用程序的`versionCode`，并显示出来，这里就不演示了哈。其实我这里只是演示了一下gradle中实现一个小需求的方式，大家还可以根据需要写出各种各样的脚本。例如我工作中会将versionCode替换到代码里的某一个常量，实现方式是通过gradle脚本读取java源码文件，并通过正则表达式替换的。Gradle是用Groovy语言写的，兼容Java语法，因此我觉得特别适合Android程序员，大家也看到了上面定义的两个方法，实际上和Java语言差别不大，大家多参考一下官方的教程就会了。

## versionName怎么实现自增？

前面我们在`app`模块的目录下添加了一个`version.properties`文件，里面以`name=value`的形式定义了`build.number=1`，那么我们也可以添加两行`version.major=1`，`version.minor=0`，然后在gradle脚本中以属性的方式读取，语法和前面读取`build.number`是一样的，至于major和minor号怎么增加，每个人有自己的约定规则，我这里就不演示了。

## PS：现成的版本号管理插件

后来我发现github上还有很多现成的插件可以用，里面已经内置了丰富的版本号管理功能。例如[packer](https://github.com/mcxiaoke/gradle-packer-plugin)插件，这个插件默认可以为我们实现版本号自增，apk输出文件按照版本号命名等等，感兴趣的同学也可以去看一下。

实际上使用Gradle有非常好扩展性，前面说了它只是一个容器，真正实现功能的是插件，而插件里实现功能的是一个一个的任务Task。我们可以自己写一些Gradle Task，并进一步封装成Gradle Plugin，apply到自己项目中。

下面我还会介绍一下如何使用[Gradle打包jar包+Log开关自动关闭](http://unclechen.github.io/2015/10/25/Gradle%E5%AE%9E%E8%B7%B5%E4%B9%8B%E6%89%93%E5%8C%85jar+Log%E5%BC%80%E5%85%B3%E8%87%AA%E5%8A%A8%E5%85%B3%E9%97%AD/)，而不是apk文件，并在打包时实现关闭Log开关，打包完成后恢复Log开关。

最后奉上这篇博客和下一篇博客的示例工程代码，链接[https://github.com/unclechen/HelloGradle](https://github.com/unclechen/HelloGradle)。


