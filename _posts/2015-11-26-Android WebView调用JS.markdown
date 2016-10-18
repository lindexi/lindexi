---
layout: post
title: Android WebView调用JS
date: '2015-11-26'
---

个人认为Android的WebView一直是一个比较难搞的东西，因为它需要和很多的Web开发打交道，如果以前没接触过Web相关的开发就会觉得有些不爽，但是现在越来越多的应用都是Hybrid的模式，HTML5定稿一年多，感觉也挺火，这也是以做内容为主的App非常需要的技术，所以还得多学学。

从Android4.4开始，WebView底层的实现从原来的Webkit变成了chromium，从而实现了对HTML5更好的支持，并且也和Chrome浏览器的一些特征越来越像。接触过WebView开发应该对`WebView.setWebContentsDebuggingEnabled(true)`不会陌生，正是从4.4开始的改变才使得WebView的调试变得更加方便。

只是用来展示一个网页内容还好，如果要通过WebView执行JS脚本来和Native代码做一些通信，就要小心可能会踩到各种坑了。例如onclick事件没用，用onTap又会触发两次，4.4以上只能用loadUrl的方法执行一行js代码，还有可能会被转码，API17以上需要给Java方法添加注解，API17以下又要换一种方法保证安全性等等。在这里记录一下我自己的学习心得和踩过的坑。


# Java与JS互相调用

在Android开发里面，我们说的WebView与JS互相调用，通常就是指用Java写的Native代码与JS的互相调用。所以下面我都会说Java调用JS，JS调用Java。而不是说WebView调用JS，JS调用WebView了。

## 1.Java调用JS

* 首先在JS中定义好即将提供给Native的方法`function javaCallJS()`
* 然后在Java代码里，通过`WebView.loadUrl("javascript:javaCallJS()"); `就可以调用JS的方法了。


## 2.JS调用Java

### 方法1:addJavascriptInterface：
* 首先在Java里定义一个类`WebAppInterface`，然后在Java中通过`WebView.addJavascriptInterface(new WebAppInterface(), "Android");  `就可以在JS中创建这个类的实例`Android`对象了
* 然后在JS中可以直接使用`Android`对象和它的方法，这样就实现了JS调用Java。

### 方法2:iframe + CustomWebViewClient：
* 在JS代码动态添加一个iframe，将其src属性设置为JS需要传给Java的参数（例如`bridge://uncle.nought.com?arg=xxx`）。
* 在Java代码中，定义一个`CustomWebViewClient extends WebViewClient`，然后`mWebView.setWebViewClient(new CustomWebViewClient())`。
* 在Java代码中的`CustomWebViewClient`中，重写`shouldOverrideUrlLoading(WebView view, String url)`方法，自己处理`url`参数，并`return true`。
* 这时JS代码就可以把参数通过url传递给Java，Java拿到参数去执行相应的工作了。如果JS需要返回值，那么通过Java调用JS代码的形式把返回值返回给JS。


## 方法小结

### Java调用JS的代码
其实比较简单，就是通过`WebView.loadUrl("javascript:javaCallJS()")`loadUrl的形式。这里啰嗦一句，从Android4.4开始，由于chromium内核对安全性检查更加严格，所以并不是传入的所有JS代码，都能够通过loadUrl来执行它。详情可以看一下这里[https://code.google.com/p/android/issues/detail?id=69969](https://code.google.com/p/android/issues/detail?id=69969)，简单来说就是4.4以上的WebView在loadUrl时会给我们的参数做一个escape，因此参数就变了，很有可能变得JS不认识，无法执行了。所以这时候需要用到`WebView.evaluateJavascript(java.lang.String, android.webkit.ValueCallback<java.lang.String>)`这个方法。后面我再详细举个例子来说明这个问题。

### JS调用Java的方法1：**addJavascriptInterface**
这种方法是比较简单的。在WebView官方的文档里面有介绍如何结合WebView来进行WebApp的开发[http://developer.android.com/intl/zh-cn/guide/webapps/webview.html#AddingWebView](http://developer.android.com/intl/zh-cn/guide/webapps/webview.html#AddingWebView)。

这里要再特别严肃地啰嗦一句！由于4.2（API<17）版本之前的WebView，在执行`WebView.addJavascriptInterface(Object obj, String interfaceName) `时存在一个漏洞，该漏洞的原因是在向JS中注入一个Java对象的时候，并没有对注册的这个Java类的方法调用做限制。导致JS代码里面可以利用发射机制，调用未注册的其他Java类。例如：

```
// Java里面注册了injectedObj对象以后
mWebView.addJavascriptInterface(this, "injectedObj");

// JS中可以去反射调用短信程序来进行恶意扣费
<script>
	var objSmsManager = injectedObj.getClass().forName("android.telephony.SmsManager").getMethod("getDefault",null).invoke(null,null);
	objSmsManager.sendTextMessage("10086",null,"this message is sent by JS when webview is loading", null, null);
</script>

// 这段摘自http://jaq.alibaba.com/blog.htm?id=48
```

可想而知，要是一个 **健康** 的网页被挂马之后，嵌入了这样的JS脚本，那么用户的手机来访问这个页面的时候就完蛋了，有兴趣的同学可以研究一下乌云的这个介绍[http://drops.wooyun.org/papers/548](http://drops.wooyun.org/papers/548)。Android4.2以后，修复了这个漏洞，但是要求我们在执行`WebView.addJavascriptInterface(Object obj, String interfaceName)`时，这个Object里面需要暴露给JS调用的方法，都需要加上注解`@JavascriptInterface`。

那么4.2以下的系统该怎么办？？用下面的方法吧！

### JS调用Java的方法2： **iframe + WebViewClient**
这是一种比较Trick的方式。js在执行的过程中去给整个dom添加一个iframe，并将这个iframe设置为`display:none`。然后通过这个iframe去load一个url，触发WebViewClient的shouldOverrideUrlLoading()，然后在这里面，我们可以决定如何处理JS传递过来的参数。由于这个url我们是自己来解析和处理的，不打算交给WebView去直接load，所以我们其实可以自己定义一个协议，例如`bridge://uncle.nought.com?arg1=x&arg2=y`。然后在WebView的WebViewClient里面拿到这个`nought://`开头的url后，我们自己写Java代码处理arg等参数。

说到这里，我们首先要了解一下WebViewClient，它决定了我们的WebView加载一条Url时的行为。如果你自定义一个CustomWebViewClient继承自WebViewClient，并重写里面的shouldOverrideUrlLoading()方法，然后把CustomWebViewClient的一个实例set给了你的WebView。那么就可以在shouldOverrideUrlLoading方法中将WebView里面本来将要load的url拦截下来，并决定是否由开发者自己的Java代码处理它。那么怎么才能自行处理这个url，而不是让WebView去自动load呢？我们看看官方文档[http://developer.android.com/intl/zh-cn/guide/webapps/webview.html](http://developer.android.com/intl/zh-cn/guide/webapps/webview.html)，总得来说是下面这样的：

* CustomWebViewClient的shouldOverrideUrlLoading返回true，表示由Java处理url，WebView不用管。
* CustomWebViewClient的shouldOverrideUrlLoading返回false，表示Java不管这个url，由WebView自己处理url（一般还会再添加一行代码`webView.loadUrl(url)`）。

可能你还会觉得白白添加iframe进来不好吧，那么不加也是可以的。只要你能让当前WebView去加载一个url就可以了，所以这样`window.location.href='bridge://uncle.nought.com?arg=xxx'`都是可以的！并没有任何问题！

# Java和JS互相调用实践

先上个图，在这个demo里面，左边是一个WebView，右边是一个TextView。然后实现点击左边Web页面的按钮，传递参数给Java，并在TextView里面显示出来。点击右边的按钮，传递参数给JS，并在WebView里面显示出来。

![hello-webview-js-demo](/content/images/hello-webview-js-demo.png)

上面提到了两种JS调用Java的方法，所以在左边的WebView里面也设置两个按钮来演示这两种不同的方法。

## 1.Java调用JS

### 第一步：提供JS给Java调用的方法

首先在我们的assets目录下放一个`hello.html`文件，方便WebView去加载。然后在JS代码添加一个给Java调用的方法：

```
<script type="text/javascript">
	// JS提供给Java调用的方法
	function javaCallJS(arg) {
		document.getElementById("hello").innerHTML += ("<br/>" + arg);
	}
</script>
```

### 第二步：在Java代码中调用

非常简单，直接在Java代码里调用刚才的JS Function。

```
mBtnJavaCallJs.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /**
                 * 注意参数的传递需要符合JS的语法，用单引号或者反斜杠转义
                 */
                String js = "javascript:javaCallJS(\"Java called JS.\")";
                mWebView.loadUrl(js);
            }
        });
```
这样就实现了Java在WebView里面打印了“Java called JS.”。

## JS调用Java

由于 **addJavascriptInterface** 的方法比较简单，大家可以直接看看代码示例。下面介绍一下第二种方法：

### 第一步：JS里面添加一个iframe来触发loadUrl

```
<script type="text/javascript">
	// JS提供给Java调用的方法
	function javaCallJS(arg) {
		document.getElementById("hello").innerHTML += ("<br/>" + arg);
	}

	/* 
	 *  JS通过创建一个不可见的iframe来调用Java
	 */
	function jsCallJavaByIframe(arg) {
		//创建iframe
		var iframe = document.createElement('iframe');
		iframe.id = "hello-iframe"
		iframe.style.display = 'none';
		iframe.src = "bridge://uncle.nought.com?arg=" + arg; // 把iframe的src设为要传递给Java的参数
		document.body.appendChild(iframe);
	}
</script>
```

### 第二步：自定义一个WebViewClient

```
public class HelloWebViewClient extends WebViewClient {
    private static final String TAG = HelloWebViewClient.class.getSimpleName();
    private static final String PREFIX = "bridge://uncle.nought.com";
    private static final Pattern ARG_PATTERN = Pattern.compile(PREFIX + "\\?arg=(.*)");

    private MainActivity.TextViewChanger mTextViewChanger;

    public HelloWebViewClient(MainActivity.TextViewChanger textViewChanger) {
        mTextViewChanger = textViewChanger;
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        Log.d(TAG, "Get params from JS: " + url);
        parseJSParams(url);
        return true;
    }

    private void parseJSParams(String url) {
        // 解析自定义参数
        if (url.startsWith(PREFIX)) {
            Matcher matcher = ARG_PATTERN.matcher(url);
            if (matcher.matches()) {
                mTextViewChanger.changeText(matcher.group(1));
            }
        }
    }
}
```

### 第三步：异步刷新UI

```
private TextViewChanger mTextChanger = new TextViewChanger() {
        @Override
        public void changeText(final String arg) {
            /**
             * 官方说明文档：
             * Note: The object that is bound to your JavaScript runs in another thread and not in the thread
             * in which it was constructed.
             *
             * mWebAppInterface虽然是在UI线程创建的，但是bind到JS以后就是在另一条线程中运行的，因此刷新UI的时候需要注意
             */
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (mTextView != null) {
                        mTextView.append("\n" + arg);
                    }
                }
            });
        }
    };
```

最后奉上[完整代码](https://github.com/unclechen/HelloWebViewJS)。

这里只是一个demo示例，在生产环境里面，我们肯定是需要针对自己的项目定制一个Java和JS通信的 **bridge** 框架，传递参数的时候也可以用JSON处理，对url的协议解析也应该做一个检查。

Github上面也有不少开源的 **WebView&JSBridge** 。我随便搜了一下，就看到了这个[https://github.com/pedant/safe-java-js-webview-bridge](https://github.com/pedant/safe-java-js-webview-bridge)，实现的思路貌似是差不多的。另外iOS也有不少类似的框架，[https://github.com/marcuswestin/WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)这个项目有4000+的star，可见iOS上面的WebApp需求还是非常多的，因为它不像Android一样可以用DexClassLoader去做热更新，通过WebApp的形式来动态更新App对iOS的意义非常大。

# 遇到的坑

## 1.HTML5的LocalStorage

Local Storage是h5里面常用到的一个缓存，如果加载的页面中用js去调用Local Storage的话，很容易出现`"Uncaught TypeError: Cannot read property 'getItem' of null", source: http://xxx.js`，原因就是没有开启WebView的h5缓存功能。于是上stackoverflow上搜了一下，加上下面这句：

```
mWebView..getSettings().setDomStorageEnabled(true);
```

就好了。

待补充。。。前面说到4.4开始有些JS代码得用evaluateJavascript来执行。blabla。。

# PS

手头看到了篇WebView文章，[Android 4.4 中 WebView 使用注意事项](https://github.com/cundong/blog/blob/master/Android%204.4%20%E4%B8%AD%20WebView%20%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.md)，可参考参考。





