---
layout: post
title: nginx windows编译
category: nginx
tags: [nginx]
---
win10
vs2015
openssl 1.0.2h

<!--more-->
####步骤

* msys 生成makefile
* nmake -f makefile编译

####准备
md nginx\objs\lib
tar zxf  openssl-1.0.2h.tar.gz -C nginx/objs/lib
tar xf  zlib-1.2.8.tar.gz -C nginx/objs/lib
tar xf  pcre-8.39.tar.gz -C nginx/objs/lib

C:\RailsInstaller\DevKit\msys.bat

nasm

源码解压nginx\objs\lib

####nasm编译openssl

auto\lib\openssl\makefile.msvc
最后三行替换成

ms\do_nasm
nmake -f ms\nt.mak
nmake -f ms\nt.mak install

不用nasm编译openssl 1.0.2f会
tmp32\sha1-586.asm(1432) : error A2070:invalid instruction operands


直接编译openssl是
```
	perl Configure VC-WIN32
	ms\do_nasm.bat
	nmake -f ms\nt.mak
```
输出在 out32 目录

mkdir objs
mkdir objs\lib
cd objs\lib
mklink /D pcre ..\..\..\pcre-8.39
mklink /D zlib ..\..\..\zlib-1.2.8
mklink /D openssl ..\..\..\openssl-1.0.2h  

####生成makefile
msys.bat

	auto/configure --with-cc=cl   --with-cc-opt="-D FD_SETSIZE=4096 " --builddir=objs \
	--conf-path=conf/nginx.conf --pid-path=logs/nginx.pid \
	--http-log-path=logs/access.log --error-log-path=logs/error.log \
	--sbin-path=nginx.exe --http-client-body-temp-path=temp/client_body_temp \
	--http-proxy-temp-path=temp/proxy_temp \
	--http-fastcgi-temp-path=temp/fastcgi_temp \
	--with-pcre=objs/lib/pcre \
	--with-zlib=objs/lib/zlib \
	--with-openssl=objs/lib/openssl \
	--with-select_module \
	--with-http_ssl_module \
	--with-http_v2_module \
	--with-http_gunzip_module \
	--with-http_gzip_static_module

####编译

nginx\auto\lib\openssl\makefile.msvc，将 no-shared 改为 no-asm



cmd run
"C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\vcvarsall.bat"

nmake -f Makefile

<pre>
nginx version: nginx/1.9.12
built by cl
built with OpenSSL 1.0.2f  28 Jan 2016
TLS SNI support enabled
configure arguments: --with-cc=cl --with-cc-opt='-D FD_SETSIZE=4096' --builddir=objs --prefix= --conf-path=conf/nginx.conf --pid-path=logs/nginx.pid --http-log-path=logs/access.log --error-log-path=logs/error.log --sbin-path=nginx.exe --http-client-body-temp-path=temp/client_body_temp --http-proxy-temp-path=temp/proxy_temp --http-fastcgi-temp-path=temp/fastcgi_temp --with-pcre=objs/lib/pcre-8.32 --with-zlib=objs/lib/zlib-1.2.7 --with-openssl=objs/lib/openssl-1.0.2f --with-select_module --with-http_ssl_module --with-http_v2_module
</pre>

加个echo-nginx-module玩玩，注意先add ngx_devel_kit

https://github.com/simpl/ngx_devel_kit.git
https://github.com/openresty/echo-nginx-module.git

--add-module=objs/lib/ngx_devel_kit --add-module=objs/lib/echo-nginx-module

auto\cc\msvc把-Yungx_config.h 去掉，否则编译报错
windows 模块开发中会遇到的问题，每个源文件第一行代码必须添加 #include “ngx_config.h”* ，如果不想这样做就吧编译参数 *-Yungx_config.h 去掉。

<pre>
#NGX_USE_PCH="-Yungx_config.h -Fp$NGX_OBJS/ngx_config.pch"
NGX_USE_PCH="-Fp$NGX_OBJS/ngx_config.pch"
</pre>