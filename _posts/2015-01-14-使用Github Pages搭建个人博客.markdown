---
layout: post
title: 使用GitHub Pages搭建博客
date: '2015-01-14'
cover_image: '/content/images/cover/cover-create-git-pages.png'
---

新的一年开始，一定要做点美好的事情。[GitHub](https://github.com/) 是一个开源项目的托管网站，相信很多人都听过。在上面有很多高质量的项目代码，我们也可以把自己的项目代码托管到GitHub，与朋友们共享交流。

[GitHub Pages](https://pages.github.com/) 是Github为大家提供的一项服务，不仅能为托管的项目建立主页，还可以为我们建立个人博客。下面我就介绍个人博客是如何建立的，这里我们先假设大家已经了解Git一些基本使用，将来我也会发布另外一篇[《Git基本安装和使用教程》](http://)。

在使用GitHub Pages建立个人博客前，我们象征性地了解一下GitHub Pages建立的页面有哪些优点：

* 极简的配置，轻量级系统，无需数据库
* 使用标记语言，如Markdown
* 使用GitHub托管服务，免费300MB空间
* 可以绑定自己的域名
* 新版的GitHub Pages还支持CDN服务，提升访问速度


要说缺点的话，其实也有一些：

* 使用[Jekyll](https://github.com/jekyll/jekyll) 模板系统，属于静态页面。
* 基于Git操作，需要有一定的动手能力。
* 动态性不好，没有评论系统，不过可以自己配置[Disqus](https://disqus.com/) 扩展。

总体来说，GitHub Pages搭建的博客使用起来是非常方便的。配置好了之后，只需要使用例如Markdown编写自己的博文，扔到指定的文件夹里即可发布了。完全不需要管理网站相关的事务，例如数据库、安全性等问题。

开始正题，下面的操作步骤参考自[Github Pages](https://pages.github.com/)的主页，再结合我的实际操作介绍各个步骤，并说一下可能遇到的问题和解决办法。

首先说明下面是以Window 7环境为例的，至于OS X，我操作的时候感觉还更方便一些。。另外我采用的是Git Bash终端来操作，这在任何环境下都是一样的。

#搭建步骤


## 1. 创建一个新仓库 （Create a repository）

![](/content/images/create-a-repository.png)

如图所示，登录自己的GitHub主页，从右上角新建一个仓库，仓库名（**Repository name**）设置为你自己的用户名为前缀，例如我的是`unclechen.github.io`。

在GitHub上，每个用户只允许拥有唯一的一个以自己的username为前缀，名为`username.github.io`的仓库。这个仓库也就是Github Pages说的**个人/组织主页**（**User or organization site**），另一种则是**项目仓库**（**Project site**）。因此当我再次想要建立一个同样名字的仓库时，上图中显示我的账号下已存在同名的仓库了。假如你没有建立过的话，是没有问题的。


## 2. 把仓库拉到本地 （Clone the repository）

![](/content/images/clone-the-repository.png)

使用任何一种方式将刚才建立的仓库拉取到本地。如上图所示，我喜欢使用Git Bash终端，在Git Bash中输入

{% highlight xml %}
git clone git@github.com:unclechen/unclechen.github.io.git
{% endhighlight %}

即可将刚才建立的仓库拉取到本地。


## 3. 建立index.html文件 （Hello World）

![](/content/images/create-index.png)

如上图所示，继续在Git Bash中输入

{% highlight xml %}
cd unclechen.github.io/
{% endhighlight %}

命令，进入刚才拉取的仓库（**记住**你应该将上面的`unclechen`改成自己的`username`）。然后在Git Bash中继续输入

{% highlight xml %}
echo "Hello World" > index.html
{% endhighlight %}

命令，在本地先创建index.html文件。


## 4. 提交到GitHub服务器 （Commit the file）

创建index.html文件后，和使用其他Git仓库的基本操作一样，需要提交修改到服务器才能生效。

所以我们需要依次输入三条Git命令，第一条是

{% highlight xml %}
git add .
{% endhighlight %}

第二条是

{% highlight xml %}
git commit -a -m "my fisrt blog"
{% endhighlight %}

第三条是

{% highlight xml %}
git push
{% endhighlight %}

这样就把刚才建立的`index.html`文件提交到了GitHub服务器上，如下图所示：

![](/content/images/push.png)


## 5. 搭建成功 （…and you're done!）

好了！Push到GitHub之后，你就打开浏览器在地址栏输入`http://username.github.io/`来访问你的个人主页了，别忘了将`username`改成你自己的用户名。记住，页面初次打开可能会显示404错误。这没有关系，因为需要等待一些时间之后才会生效，我的博客是过了大概10分钟左右生效的吧。

![](/content/images/and-you-are-done.png)

如上图所示，页面显然有点朴素。没有关系，我们先将博客创建出来，再使用基于[Jekyll](https://github.com/jekyll/jekyll) 模板的一些主题，就可以渲染界面。我的博客用的主题是[Hyde](https://github.com/poole/hyde)。

至此，我们已经成功使用[Github Pages](https://pages.github.com/)搭建了个人博客（通过**User or organization site**方式）。至于如何使用Jekyll模板编写，并使用主题来渲染博客，以及绑定自己的域名等等，在我的另一篇博客中[《使用Jekyll渲染GitHub Pages个人博客》](http://unclechen.github.io/2015/01/31/%E4%BD%BF%E7%94%A8Jekyll%E6%B8%B2%E6%9F%93GitHub%20Pages%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/)将会介绍。

下面介绍的是另外一种使用GitHub Pages中的**Project site**建立博客的方法，有兴趣或者需要建立多个博客站点的朋友可以看一看。

***

# 另一种搭建方法（可搭建多个博客站点）

上面介绍了使用[Github Pages](https://pages.github.com/)中提到的**个人/组织主页**（**User or organization site**）来搭建个人博客，前面说过这种名为`username.github.io`的仓库，每个GitHub账户下只能拥有一个，如果你需要建立多个博客站点的话多少有些不方便。

不过没有关系，除了通过建立名为`username.github.io`的仓库搭建个人博客以外，还可以通过建立普通名字`project name`的仓库来创建个人博客。这就是GitHub Pages上提到的**项目仓库**（**Project site**）。

然而，使用**项目仓库**（**Project site**）创建博客又分为两种场景，一种是通过新建一个仓库（**Generate a site**）来创建，另一种则是直接从已有的项目仓库（**Start from scratch**）来创建。但这两种形式本质上都是通过在一个普通的仓库下开辟一个没有父分支的gh-pages分支，将网页的代码在gh-pages分下进行管理，维护页面的。acth）。但是这两种形式本质上都是通过在一个普通的仓库下开辟一个没有父分支的gh-pages分支，将网页的代码在gh-pages分下进行管理，维护页面的。

* 第一种场景：使用**Generate a site**搭建博客。

## 1. 创建新仓库（Create a repository）

这里我们就不再使用`username.github.io`的名字来建立仓库了，随便使用一个其他的名字，例如`blog`。

## 2. 设置仓库的参数 （Repository Settings）

进入刚才建立的新仓库，在GitHub网页的右边面板中点击`Settings`。如下图所示：

![](/content/images/settings.png)

## 3. 自动生成页面 （Automatic Generator）

在Settings界面下，选择下图所示的`Automatic page generator`按钮，在弹出的页面填写一些参数。再选择一个主题，可以自动生成一个页面。

![](/content/images/automatic-page-generator.png)

## 4. 搭建完成 （…and you're done!）

在浏览器中输入`http://username.github.io/repository`，即可访问页面。记住，你需要将前面的`repository`修改成你的项目名字（`project name`，例如我的是`blog`）。同样这需要等待一些时间之后才能生效。

![](/content/images/you-are-done-again.png)

至此，我们就成功使用**Generate a site**的形式，新建立一个仓库，搭建了自己的博客。如下所示，使用GitHub自动生成的页面比刚才的"Hello World"页面确实漂亮了不少。



* 第二种场景：使用**Start from scratch**搭建博客。

## 1. 创建gh-pages分支 （Create a gh-pages branch）

进入已有仓库的主页，在分支下拉菜单中输入`gh-pages`后，按下回车键`enter`，自定建立一个没有父分支的gh-pages分支，如下图所示。

![](/content/images/create-gh-pages-branch.png)

可选操作：创建`gh-pages`分支后，也可以将这个分支设为默认分支（`default branch`），将来方便我们自己管理。

## 2. 建立index.html文件 （Create an index file）

和上面介绍过的方法一样，在`gh-pages`分支下面建立一个`index.html`文件，输入`Hello World`。

## 3. 提交修改 （Commit the file）

建立了`index.html`文件之后，将修改commit到服务器上。

这里的第2、3步都可以在GitHub网站的界面直接进行操作，或者和**User or organization site**方法的第3、4步一样，也可以使用Git Bash终端操作。

## 4. 搭建成功 （…and you're done!）

等待片刻，博客页面生效。

至此，我们就成功使用**Start from scratch**的方式，通过在已有的仓库下建立没有父分支的`gh-pages`分支，搭建了自己的博客。


***

# 两种搭建方法的对比

* **User or organization site:** 使用`master`分支管理博客站点，命名为`username.github.io`的形式，每个GItHub账户下只能拥有一个。
* **Project site:** 采用一个没有父分支的`gh-pages`来管理博客站点，命名方式普通，每个GitHub账户下可以有多个。


