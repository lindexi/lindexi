---
layout: post
date: '2015-01-31'
title: 使用Jekyll渲染GitHub Pages个人博客
---

上一篇文章介绍了[使用GitHub Pages搭建个人博客](http://unclechen.github.io/2015/01/14/%E4%BD%BF%E7%94%A8Github%20Pages%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/) ，这次介绍一下GitHub Pages官方推荐的模板Jekyll渲染博客的页面。

[Jekyll](http://jekyllrb.com/)是一个简单的免费的Blog生成工具，类似WordPress。但是和WordPress又有很大的不同，原因是jekyll只是一个生成静态网页的工具，不需要数据库支持。但是可以配合第三方服务,例如discuz。最关键的是jekyll可以免费部署在Github上，而且可以绑定自己的域名。下面我主要参考[官方网站的指导](https://help.github.com/articles/using-jekyll-with-pages/)来介绍安装Jekyll的步骤，首先还是以MAC为例，介绍安装的步骤。再以Win7为例，介绍我自己碰到的一些问题和解决办法。

# Mac OS X的Jekyll安装步骤

## 一. 安装前的准备

将之前在GitHub上创建的仓库`username.github.io`clone到本地。进入`master`分支。如前一篇博客介绍到的，如果你使用的不是`username`为前缀的这类型**个人/组织主页**（**User or organization site**），而是**项目仓库**（**Project site**），那么clone到本地后，需要checkout到`gh-pages`分支。关于这两种博客站点的差异，在前一篇文章[使用GitHub Pages搭建个人博客](http://unclechen.github.io/2015/01/14/%E4%BD%BF%E7%94%A8Github%20Pages%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/) 中有详细的介绍，不再赘述了。

## 二. 安装Jekyll

建议大家都在自己的电脑上安装Jekyll，这样就可以在本地启动一个server来预览自己的博客网站，而不是每一次修改一些博客文章都要commit到GitHub上面再来看看我们的页面是否满意。

为了安装Jekyll，我们需要进行下面3个步骤：

1.**安装Ruby环境**

Jekyll的运行需要Ruby的支持，所以我们在Mac上打开终端，输入命令：

{% highlight xml %}
ruby --version
{% endhighlight %}

查看自己的ruby版本，一般Mac上都预装了Ruby的。我们需要保证的自己的Ruby版本是1.9.3或者是2.0.0，这样就可以进入第二步了，否则请先安装Ruby。

2.**安装Bundler管理器**

Bundler是一个包管理器，如果你想要在本地环境中预览GitHub Pages页面，Bundler可以使得基于Ruby环境的Jekyll管理起来更加简单。安装了这个管理器之后，我们就可以使用`bundler`命令来安装和管理Jekyll。

安装Bundler的命令是：

{% highlight xml %}
gem install bundler
{% endhighlight %}

这里`gem`相当于Linux下的`yum`之类的命令，是Ruby提供的。

3.**安装Jekyll**

这是最关键的一步，首先在当前仓库中新建一个名为`Gemfile`的文件，在其中添加两行：

> source 'https://ruby.taobao.org'
> gem 'github-pages'

注意到这里的`source`，我们需要改成国内比较快的地址，即**淘宝的Ruby镜像**[https://ruby.taobao.org](https://ruby.taobao.org)，至于原因呢，大家都懂得。

然后输入命令：

{% highlight xml %}
bundle install
{% endhighlight %}

系统就会给你哗哗哗装上一堆依赖的软件，这样Jekyll就算安装好了，文件夹下也多了一个`Gemfile.lock`文件。

## 三. 运行Jekyll

安装完了Bundle以后，在命令行输入：

{% highlight xml %}
bundle exec jekyll serve
{% endhighlight %}

就可以在本地将Jekyll跑起来了，这时你可以通过访问 [http://localhost:4000](http://localhost:4000) 来预览你的GitHub Pages。

到这里已经完成了Jekyll的安装和本地预览。根据我的经验，其实在MAC下安装起来真的是非常顺利，仅仅就是按照官方的指定的步骤执行，没有碰到什么问题。如果还有其他的一些需求，诸如更新或者关闭Jekyll啥的，可以参考官方的[help](https://help.github.com/articles/using-jekyll-with-pages/)页面。


***

# Jekyll的文档结构

在介绍windows下的Jekyll安装步骤前，简单介绍一下Jekyll模板的文档结构。

在GitHub Pages站点中，使用Jekyll模板以后，就会看到文件夹的结构如下。

![](/content/images/jekyll-structure.png)

他们各自的作用分别为：

* _config.yml：这个文件是为了保存一些公共的配置，可以保存很多公共的字段，这些字段在站点的任何页面都可以直接引用。

* _includes：这个文件夹里存放的是可以重复利用的文件。这个文件可以被其他的文件包含，重复利用，如一些公共的**css**文件。

* _layouts：这个文件夹存放的是一些公共的**html**模板文件。通常我们都会有三个文件，分别是`default.html`，`page.html`，`post.html`。

* _posts：这个文件夹存放的就是实际的文章了。一般我们写完博客后，把一个个的markdown文件丢到这里就好了。文件名必须使用YEAR-MONTH-DATE-title.markdown的格式。

* _site：这个文件夹存放的是最终生成的文件。一般可以不把这个文件夹commit到GitHub上。

* CNAME：这个文件就是自定义域名的文件了，将你自己的购买的**域名**，例如`uncle.chen.me`保存在里面就ok了。这样以后就可以通过`uncle.chen.me`来访问自己的博客了。

剩下还有一些文件，如错误页面文件`404.html`，`README.md`，这些都是常见的文件，大家肯定都知道的。至于`public`和`content`文件夹是我自己建立的文件夹，大家可以忽略了。


***

# Windows下的Jekyll安装步骤

好了，介绍了完了Mac下的Jekyll安装，我们搞搞Win7的Jekyll安装。相信很多人都和我一样，除了自己买台MAC玩，公司很多时候都会给你配备一台Windows系统的电脑，唉。。谁让咱是Android的RD呢，人家做ios都是发台iMac啊！！好了，言归正传，开始配置。

其实在Windows下安装，也是按照官网的页面来的，不过我结合自己的情况，讲一讲遇到的一些问题，给大家参考一下。说明一下，我在Windows下使用的终端还是`git bash`。

## 一. 安装前准备

1.**安装Ruby**

还是Ruby，Mac下自带Ruby，Windows下我们只好自己安装了。不多说，使用[Ruby Installers](http://rubyinstaller.org/downloads/)上面的新版就好，注意得是新版。因为新版的Ruby自带`Gem`，我们前面说了`Gem`就相当于Linux中的`yum`，方便我们进行软件包的安装和管理。这里我的Ruby版本是2.1。

2.**安装Devkit**

这个Devkit需要和Ruby的版本对应起来，同样可以在[Ruby Installers](http://rubyinstaller.org/downloads/)下载。

下载好了以后，解压到一个目录，例如我的是`C:\Devkit`。在git bash终端或者cmd中输入命令：

{% highlight xml %}
ruby dk.rb init
{% endhighlight %}

初始化。然后再输入命令：

{% highlight xml %}
ruby dk.rb install
{% endhighlight %}

进行安装。这里有的同学可能会遇到问题，安装失败并提示你需要修复`config.yml`。

这是因为下载过来的Devkit无法自动识别我们的Ruby安装目录，需要我们在`config.yml`种指定，因此我们在`C:\Devkit`中打开`config.yml`文件，增加一行：

> -C:/Ruby21-x64

这是我的Ruby安装目录，大家将它修改成自己的安装目录即可。

这样，windows下的安装准备工作算是完成了。


## 二. Jekyll的安装

1.**安装Bundler**

同样，在windows下面也需要安装Bundler管理器，输入同样的命令：

{% highlight xml %}
gem install bundler
{% endhighlight %}

此时如果你顺利安装成功的话，那就恭喜了！但是我遇到了问题。。首先`gem install bundler`默认的源是官方的源，身处天朝的我们都懂吧。所以我们还是将Ruby的源换成淘宝的镜像比较好。

使用命令：

{% highlight xml %}
gem sources -a https://ruby.taobao.org/
{% endhighlight %}

就好了。

这里，我遇到了两问题：

* 其一，我的终端里面提示错误

> “ERROR:  While executing gem ... (Encoding::UndefinedConversionError)
U+7CFB to IBM437 in conversion from UTF-16LE to UTF-8 to IBM437”

这可能是我脑残的修改了`git bash`终端的编码和字体，解决办法是参考[https://github.com/rubygems/rubygems/issues/1025](https://github.com/rubygems/rubygems/issues/1025)。

所以按照这个帖子的解决方法，我修改了Ruby的源码文件`registry.rb`，在自己的Ruby安装目录下找到这个文件。例如我的是`C:\Ruby21-x64\lib\ruby\2.1.0\win32\registry.rb`，然后找到这一行：

> LOCALE = Encoding.find(Encoding.locale_charmap)

修改成：

> LOCALE = Encoding::UTF_8

这样第一个错误就修复了。

* 其二，当身处公司内网时，

> Error fetching http://ruby.taobao.org/:Errno::ETIMEDOUT: A connection attempt failed because the connected part
y did not properly respond after a period of time, or established connection fai
led because connected host has failed to respond. - connect(2) for "ruby.taobao.
org" port 80 (http://ruby.taobao.org/specs.4.8.gz)

因此需要在上的命令后面加上代理，如`gem sources -a https://ruby.taobao.org/ -p http://proxy.tencent.com:8080`，第二个错误就修复了。

关于设置代理，其实还应该这样做，在终端中输入命令：

{% highlight xml %}
export http_proxy='http://proxy.tencent.com:8080'
{% endhighlight %}

2.**安装Jekyll**

安装完Bundler以后，我们也同时设置好了源和公司内网代理，让我们开始安装`Jekyll`吧。和在Mac下一样，首先也是新建一个名为`Gemfile`的文件，并在其中添加：

> source 'https://ruby.taobao.org'
> gem 'github-pages' 

保存该文件，然后在终端中输入命令：

{% highlight xml %}
bundle install
{% endhighlight %}

这时系统也是哗啦哗啦地安装了一堆依赖包，这样我们的Jekyll就安装好了，可以看到文件夹下面多了一个`Gemfile.lock`文件。

## 三. Jekyll的运行

安装完了Bundle以后，在命令行输入：

{% highlight xml %}
bundle exec jekyll serve
{% endhighlight %}

就可以在本地将**Jekyll**跑起来了，这时你可以通过访问 [http://localhost:4000](http://localhost:4000) 来预览你的GitHub Pages。

到这里就在Windows下完成了Jekyll的安装和本地预览，可以看到在Windows下我还是遇到一些小问题的，不够总的来说还是比较简单的。毕竟做了这些配置以后，我只需要把自己的的markdown文件丢到`_post`文件夹下，commit到GitHub上，就发布成功了，后续的博文编辑工作就很轻松了。

这样我们就完成了Jekyll模板的安装，可以看到渲染之后的博客页面变得好看了很多，可以安心的开始博文的编写工作了。但是我们还可以为自己的博客添加一些好看的主题和评论系统，例如我的博客主题就是[Hyde](http://hyde.getpoole.com/)。
