---
layout: post
title: 自定义Android Gradle插件
date: '2015-11-17'
---

上一篇博客介绍到[Gradle实践之自定义打包jar+Log开关自动关闭](http://unclechen.github.io/2015/10/25/Gradle%E5%AE%9E%E8%B7%B5%E4%B9%8B%E6%89%93%E5%8C%85jar+Log%E5%BC%80%E5%85%B3%E8%87%AA%E5%8A%A8%E5%85%B3%E9%97%AD/)。可以自己定义打包的jar已经不错了，但是还是不够爽，怎么办？自己写一个Plugin！会用轮子，也要会造轮子是不是，我们经常使用到的`com.android.library`和`com.android.application`都是Google给我们提供的Gradle插件，里面已经实现了大部分App开发者所需要的功能。Github上面也已经有很多gradle插件，但是如果我们是程序猿，我们总是可以有需求是人家的Plugin无法满足的，那好吧，我们自己写个插件。

# 准备工作

## 开发环境（以Win7为例）

* IDE开发环境：我这篇例子就用Android Stuido来写的，使用AS写会有一点点的奇怪，因为AS默认新建的都是Android工程，可是！用它来写一个Gradle Plugin并没有任何问题！但实际上Gradle不仅仅可以给Android项目使用。所以我推荐大家去体验一下JetBrains家的Java IDE——[Intelligent Java IDE](https://www.jetbrains.com/idea/)。我们用的Android Studio就是基于这个开发的。

* JDK：我这次用的是Windows系统，安装了1.8和1.7的JDK，等下写Gradle插件的时候会指定一个版本的JDK。至于指定哪个版本的JDK，会遇到什么问题，我会在后面提到。不过不管你使用什么版本的JDK，必须用交叉编译选项来编译我们的插件，以保证别人能在低版本的JDK上运行我们的插件。交叉编译选项我会在build.gradle文件中会特别标注一下。 **注意** ，JDK必须要安装，Groovy最后也要compile成Jar包。

* Gradle：一般我们用Android Studio开发的时候都已经配置好了这个。我是让它翻墙自己下载的，下载后的目录都在C盘的Users目录下。例如我的`GRADLE_HOME`是`C:\Users\noughtchen\.gradle\wrapper\dists\gradle-2.4-all\6r4uqcc6ovnq6ac6s0txzcpc0\gradle-2.4`。为了确保你安装了Gradle并配置了环境变量，可以在命令行输入一句:

```
gradle -v
```
如果终端上显示了：

```
C:\Users\noughtchen>gradle -v

------------------------------------------------------------
Gradle 2.4
------------------------------------------------------------

Build time:   2015-05-05 08:09:24 UTC
Build number: none
Revision:     5c9c3bc20ca1c281ac7972643f1e2d190f2c943c

Groovy:       2.3.10
Ant:          Apache Ant(TM) version 1.9.4 compiled on April 29 2014
JVM:          1.7.0_80 (Oracle Corporation 24.80-b11)
OS:           Windows 7 6.1 amd64

C:\Users\noughtchen>
```
那就说明gradle是OK的。

* Groovy SDK（可跳过）：这个类似于JDK，因为Gradle插件使用Groovy语言编写，所以我们也可以安装Groovy SDK。这里是官方的[安装教程](http://www.groovy-lang.org/install.html#_installation_on_windows)，非常简单。分为三步：
	* 下载一个[Binary Release](http://www.groovy-lang.org/install.html#download-groovy)版的zip包，解压到你本地的一个目录下，例如我本地是`D:\mydev\groovy-2.4.5`。
	* 添加名为`GROOVY_HOME`的环境变量，它的值为刚才的目录`D:\mydev\groovy-2.4.5`。
	* 然后将`GROOVY_HOME/bin`添加到系统的环境变量`Path`里，添加的值为`%GROOVY_HOME%\bin`。

## Groovy基础

这里可以忽略，只要懂Java和一点基本Groovy语法就行，实际上我只是在打包我们SDK项目的时候自学了一点，另外参考了一下Google官方的Gradle插件就够了，实在不会的可以再去查看Gradle官方的Document。下面是几个可以学习的资源：

* [http://tools.android.com/build/gradleplugin](http://tools.android.com/build/gradleplugin) 这里介绍了怎么从Google Checkout下来官方的Gradle插件源码，以及Android Studio的源码！开源万岁，真是碉堡，推荐大家看一下这个，这样就知道APK是怎么打包的了。
* [https://docs.gradle.org/current/userguide/custom_plugins.html](https://docs.gradle.org/current/userguide/custom_plugins.html) Gradle官方的自定义插件文档，这篇是必看的，非常简单的HelloWorld例子。看完肯定还是不会写Gradle插件的，呵呵！

# 自定义Gradle Plugin

不废话了，下面进入正式的开发过程，这次我们在前面[Gradle实践之自定义打包jar+Log开关自动关闭](http://unclechen.github.io/2015/10/25/Gradle%E5%AE%9E%E8%B7%B5%E4%B9%8B%E6%89%93%E5%8C%85jar+Log%E5%BC%80%E5%85%B3%E8%87%AA%E5%8A%A8%E5%85%B3%E9%97%AD/)的基础上，把打包Jar、混淆Jar包的任务都丢到插件里，然后呢，我们这次自己写JavaCompile任务，这样一来，如果是做SDK开发的同学，实际上几乎就可以不用`com.android.library`插件了，当然我个人觉得吧，能不重复造轮子就不要重复造了，等下会大家看到这点的。

## 1.新建一个Groovy工程

如下图所示，我新建了一个名为`HelloGradlePlugin`的文件夹。

![New a groovy folder](/content/images/new-a-plugin-folder.png)

接着在文件夹里新建了一个名为`build.gradle`的文件，里面现在没有任何代码。

![New a gradle file](/content/images/new-a-gradle-file.png)

这里有点奇怪吗？是的，为啥不是用AS直接new一个project？前面说了，AS默认新建的只能选择Android Project，下面我们看看怎么使用这一步建立的文件夹。

## 2.建立项目结构

打开Android Studio，选择`File->Open`，打开刚才这个文件夹。如图所示：

![Open the plugin project](/content/images/open-the-plugin.png)

这时AS会提示我们是否使用本地的`Gradle Wrapper`，点击`yes`，AS会帮我们在`HelloGradlePlugin`文件夹下面自动生成对应的gradle文件夹和文件。

![use-your-gradle-wrapper](/content/images/use-your-gradle-wrapper.png)

这样，我们就算在AS中导入我们的Gradle Plugin工程了。下面我们建立项目结构。

首先，在`src`文件夹下面分别建立`main/groovy/`文件夹和`resources/META-INF/gradle-plugins`。

![create-folders](/content/images/create-folders.png)

然后，在`src/main/resources/META-INF/gradle-plugins`文件夹下面新建一个`hello-world-plugin.properties`文件，这个文件的名字就是我们就是我们这个Gradle插件的名字(即`name`)，将来在其他项目中引用这个插件的时候，就需要指定为这个名字，在最后面会详细介绍这个`name`是怎么用的。

接着需要在这个文件中添加一行代码。

```
implementation-class = com.nought.gradle.plugin.HelloPlugin
```

意思是我们的插件名字叫`hello-world-plugin`，实现这个插件功能的类名为`HelloPlugin`。

在实现`helloPlugin`这个类之前，我们先给这个Project添加一下依赖，因为我们最开始是通过新建文件夹的形式，然后在AS中导入这个项目，所以它还没有把groovy相关的包依赖进来。我们在项目名字上右键，选择`Open Module Settings`，然后添加Dependencies，如下图所示：

![add-groovy-sdk](/content/images/add-groovy-sdk.png)

最后，我们在`src/main/groovy`下面新建一个一个名为`com.nought.gradle.plugin`的package。

![new-class-folder](/content/images/new-class-folder.png)

并在这个包下建立名为`HelloPlugin`的类(右键`new file`->输入`HelloPlugin.groovy`)。

下面开始写代码，我们通过自己定义一个插件，来实现前一篇博客里面的gradle打包功能，它可以把我们指定的java代码打包成jar包，并按照配置决定是否进行混淆，并输出到一个指定的文件夹中。

## 3.实现Plugin接口

定义了`HelloPlugin`类，我们要让它实现Plugin接口，并实现其中的`apply`方法。

```
package com.nought.gradle.plugin

import org.gradle.api.Plugin
import org.gradle.api.Project


class HelloPlugin implements Plugin<Project> {
    @Override
    void apply(Project project) {
	...
    }
}

```


## 4.定义Extension

首先，什么是Extension？

Extension就是扩展属性，指的是你可以给你的project添加额外的gradle约定之外的其他properties属性。我们在Android项目里的`build.gradle`文件中通常使用的诸如下面这种代码：


```
android {
    compileSdkVersion 22
    buildToolsVersion "22.0.1"
	...
}

```

就是在给Android插件的Extension的`compileSdkVersion`和`buildToolsVersion`赋值。我们自己写一个插件，也要实现同样的效果。只要在gradle文件里apply了我们的自定义的插件，我们就可以给自定义的插件赋予额外的属性，并在插件里用到它们，例如你打一个jar包时可以把输出文件存放地址传入进去等等。

So，新建一个名为`HelloPluginExtension`的类，表明这是`HelloPlugin`的扩展属性。并在这个类里面添加一些`String`类型的变量，如下所示：

```
package com.nought.gradle.plugin

class HelloPluginExtension {
    String javaSrcDir // java源码的目录
    String classesOutDir // 编译输出的class文件目录

    String outputFileDir // 输出的jar包目录
    String outputFileName // 输出的jar包文件名

    String androidJarDir
    String javaBase
    String javaRt

    String proguardConfigFile
}

```
很显然，其实你可输入任何Java语言中的变量类型。这些属性在apply我们的插件时，都可以在build.gradle脚本中传入。

## 5.在Plugin中增加自定义的task

刚才定义了Extension里面的一些属性，自定义Gradle Plugin的框架就基本是这样了，当然你要是只写一个 **helloworld** demo尝尝口味，那就没必要干下面的事情了。

接下来我们要在`HelloPlugin`中用到这个属性，并增加一些实现了不同功能的tasks。

本例子中，我们自定义的插件可以编译Java源代码，并把生成的class文件打包成jar，再根据需求决定是不是混淆它。下面直接上代码：

```
package com.nought.gradle.plugin

import org.gradle.api.JavaVersion
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.tasks.Copy
import org.gradle.api.tasks.bundling.Jar
import org.gradle.api.tasks.compile.JavaCompile
import proguard.gradle.ProGuardTask

class HelloPlugin implements Plugin<Project> {

    static final String PLUGIN_NAME = "helloPlugin"

    Project project
    HelloPluginExtension extension

    JavaCompile compileJavaSrc
    Jar jarLib
    ProGuardTask proguardLib
    Copy copyLib

    @Override
    void apply(Project project) {
        this.project = project
        this.extension = project.extensions.create(PLUGIN_NAME, HelloPluginExtension)

        project.afterEvaluate {
            createSomeTasks()
            // 如果是执行packageProguardJar任务，那么要提前关闭log开关
            if ('packageProguardJar' in project.gradle.startParameter.taskNames) {
                project.tasks.getByName("preBuild").doFirst {
                    enableLoggerDebug(false)
                }
            }
        }
    }

    private void createSomeTasks() {
        // Create a task to compile all java sources.
        compileJavaSrc = project.tasks.create("compileJava", JavaCompile);
        compileJavaSrc.setDescription("编译java源代码")
        compileJavaSrc.source = extension.javaSrcDir
        compileJavaSrc.include("com/nought/hellolib/**")
        compileJavaSrc.classpath = project.files([extension.androidJarDir + "/android.jar", extension.javaBase + "/" + extension.javaRt])
        compileJavaSrc.destinationDir = project.file(extension.classesOutDir)
        compileJavaSrc.sourceCompatibility = JavaVersion.VERSION_1_7
        compileJavaSrc.targetCompatibility = JavaVersion.VERSION_1_7
        compileJavaSrc.options.encoding = "UTF-8"
        compileJavaSrc.options.debug = false
        compileJavaSrc.options.verbose = false

        // Create a task to jar the classes.
        jarLib = project.tasks.create("jarLib", Jar);
        jarLib.setDescription("将class文件打包成jar")
        jarLib.dependsOn compileJavaSrc
        jarLib.archiveName = "helloLib.jar"
        jarLib.from(extension.classesOutDir)
        jarLib.destinationDir = project.file(extension.outputFileDir)
        jarLib.exclude("com/nought/hellolib/BuildConfig.class")
        jarLib.exclude("com/nought/hellolib/BuildConfig\$*.class")
        jarLib.exclude("**/R.class")
        jarLib.exclude("**/R\$*.class")
        jarLib.include("com/nought/hellolib/*.class")

        // Create a task to proguard the jar.
        proguardLib = project.tasks.create("proguardLib", ProGuardTask);
        proguardLib.setDescription("混淆jar包")
        proguardLib.dependsOn jarLib
        proguardLib.injars(extension.outputFileDir + "/" + "helloLib.jar")
        proguardLib.outjars(extension.outputFileDir + "/" + extension.outputFileName)
        proguardLib.libraryjars(extension.androidJarDir + "/android.jar")
        proguardLib.libraryjars(extension.javaBase + "/" + extension.javaRt)
        proguardLib.configuration(extension.proguardConfigFile)
        proguardLib.printmapping(extension.outputFileDir + "/" + "helloLib.mapping")

        // Create a task to copy the jar.
        copyLib = project.tasks.create("copyLib", Copy);
        copyLib.setDescription("不混淆，仅拷贝jar包")
        copyLib.dependsOn jarLib
        copyLib.from(extension.outputFileDir)
        copyLib.into(extension.outputFileDir)
        copyLib.include("helloLib.jar")
        copyLib.rename("helloLib.jar", extension.outputFileName)

        def packageProguardJar = project.tasks.create("packageProguardJar");
        packageProguardJar.setDescription("打包混淆、关闭log开关的hello lib")
        // packageProguardJar任务作为一个钩子，依赖真正执行工作的proguardLib
        packageProguardJar.dependsOn proguardLib
        // 最后把log开关置回原来开发时的状态
        packageProguardJar.doLast {
            enableLoggerDebug(true)
        }

        def packageNoProguardJar = project.tasks.create("packageNoProguardJar");
        packageNoProguardJar.setDescription("打包不混淆、开启log开关的hello lib")
        // packageNoProguardJar任务作为一个钩子，依赖真正执行工作的copyLib
        packageNoProguardJar.dependsOn copyLib
    }


    // 开启/关闭Log开关
    def enableLoggerDebug(boolean flag) {
        def loggerFilePath = "src/main/java/com/nought/hellolib/UncleNought.java"
        def updatedDebug = new File(loggerFilePath).getText('UTF-8')
                .replaceAll("ENABLE_DEBUG\\s?=\\s?" + (!flag).toString(), "ENABLE_DEBUG = " + flag.toString())
        new File(loggerFilePath).write(updatedDebug, 'UTF-8')
        println(flag ? 'ENABLE_DEBUG : [true]' : 'ENABLE_DEBUG : [false]')
    }
}

```

代码不多，其实就是创建了4个task，彼此之间有依赖，最后再创建两个钩子任务，他们不做实际的工作，只是通过钩子任务去依赖真正实现了功能的task。大家如果看过Android Gradle Plugin的实现，就知道assembleXXX任务就是这么干的。

## 6.发布插件

为了让其他的项目能引用这个打包插件，需要将这个插件发布出去，我们在插件项目的根目录下的`build.gradle`文件。添加下面的代码：

```
apply plugin: 'groovy'
apply plugin: 'maven'

version = '1.0.0'
group = 'com.nought.gradle.plugin'
archivesBaseName = 'hello-gradle-plugin'

repositories {
    mavenCentral()
}

dependencies {
    compile gradleApi()
    compile localGroovy()
    compile files('libs/proguard.jar')
}

// 一定要记得使用交叉编译选项，因为我们可能用很高的JDK版本编译，为了让安装了低版本的同学能用上我们写的插件，必须设定source和target
compileGroovy {
    sourceCompatibility = 1.7
    targetCompatibility = 1.7
    options.encoding = "UTF-8"
}

uploadArchives {
    repositories.mavenDeployer {
// 如果你公司或者自己搭了nexus私服，那么可以将插件deploy到上面去
//        repository(url: "http://10.XXX.XXX.XXX:8080/nexus/content/repositories/releases/") {
//            authentication(userName: "admin", password: "admin")
//        }
// 如果没有私服的话，发布到本地也是ok的
        repository(url: 'file:release/libs')
    }
}

```

上面的代码就是通过`groovy`插件编译打包我们的插件代码，并通过`maven`插件publish到指定的服务器。我们为了调试，先将插件发布到本地的`release/libs`文件夹下面就行。

## 7.在自己项目中应用写好的插件

现在假设我们把刚才的插件打包，发布到了`release/libs`下面。这时属于本地的发布和引用，我们可以将这个libs下面的文件夹全部拷贝到自己的Android项目根目录的`libs`下面去，一般可能Android项目下的根目录中没有这个文件夹，那么我们就新建一个`libs`，再把gradle插件的文件夹全部丢进去。以前一篇博客的Android工程为例。

首先在项目根目录的`build.gradle`文件中按照下面的方式引用：

```
buildscript {
    repositories {
        jcenter()
        maven {
// 假如你有私服可以用的话，可以引用私服
// url 'http://10.XXX.XXX.XXX:8080/nexus/content/repositories/releases/'
// 没有的话，就本地引入
            url 'libs'
        }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:1.3.0'
		// 自定义的插件以 groupId:name:版本号 的方式引用，这个name来自插件工程下的hello-world-plugin.properties文件名
        classpath 'com.nought.gradle.plugin:hello-gradle-plugin:1.0.0'
    }
}

allprojects {
    repositories {
        jcenter()
        maven {
// 假如你有私服可以用的话，可以引用私服
// url 'http://10.XXX.XXX.XXX:8080/nexus/content/repositories/releases/'
// 没有的话，就本地引入，这里是给subProject设置，和上面类似
            url 'libs'
        }
    }
}


```

然后在需要使用自定义插件的Module中apply这个插件。并将该自定义插件的Extension传入进去，如下所示：

```
apply plugin: 'com.android.library'
apply plugin: 'hello-gradle-plugin'

android {
    compileSdkVersion 22
    buildToolsVersion "22.0.1"

    defaultConfig {
        minSdkVersion 14
        targetSdkVersion 22
        versionCode 1
        versionName "1.0"
    }
    buildTypes {
        release {
            buildConfigField "boolean", "ENABLE_DEBUG", "false"
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        debug {
            buildConfigField "boolean", "ENABLE_DEBUG", "true"
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
}

helloPlugin {
    javaSrcDir = 'src/main/java'
    classesOutDir = 'build/out_classes'

    outputFileDir = 'release'
    outputFileName = 'helloLib-release.jar'

    // Android SDK Dir
    androidJarDir = android.getSdkDirectory().toString() + "/platforms/" + "${android.compileSdkVersion}"

    // JAVA HOME
    javaBase = System.properties["java.home"]
    javaRt = "/lib/rt.jar"
    if (System.properties["os.name"].toLowerCase().contains("mac")) {
        if (!new File(javaBase + javaRt).exists()) {
            javaRt = "/../Classes/classes.jar"
        }
    }

    proguardConfigFile = 'proguard-rules.pro'
}

```

这时我们的Android工程下的gradle打包脚本就干净多了，所有的任务都丢到自定义的插件里面去了。需要动态指定的属性，通过Extension就可以进行赋值，非常方便。

当需要打包时，打开Android Studio自带的终端，输入`cd hellolib`进入lib工程的目录，再输入`gradle packageProguardJar`或者`gradle packageNoProguardJar`就可以打包了。打包出来的jar怎么给app module去引用，就不赘述了。

你甚至可以在自己的Gradle插件里再写一个copy task，直接将打好的helloLib.jar拷贝到app目录的libs下面，这样就更方便了。另外，app module下的版本号管理任务，你也可以把他们丢到自定义的插件里面去，如果你的生成环境要求你的Android工程尽可能简洁时，建议大家都封装一个自己的打包插件，deploy到公司的maven私服去。

最后贴上[Gradle插件工程](https://github.com/unclechen/HelloGradlePlugin)和引用插件工程打包的[Android工程](https://github.com/unclechen/HelloGradle)供参考。

# 容易遇到的问题

## 遇到`Unsupported major.minor version 52.0`问题

这个前面我提过，在插件工程的打包脚本中，有一个交叉编译选项，如果你使用高版本的JDK编写Gradle插件，为了让你打出来的Gradle Plugin（实际上就是一个jar包），能在别人低版本的JRE上跑起来，你就必须使用这个选项。否则，人家还要去安装一个新的JDK，就很蛋疼了。

请记得加上这个：

```
...

compileGroovy {
    sourceCompatibility = 1.7
    targetCompatibility = 1.7
    options.encoding = "UTF-8"
}

...

```




