---
title: "asp dotnet core 提供大文件下载的测试"
author: lindexi
date: 2020-12-3 20:27:50 +0800
CreateTime: 2020/8/1 10:04:52
categories: dotnet
---

本文仅仅是提供测试使用的代码

<!--more-->


<!-- CreateTime:2020/8/1 10:04:52 -->



提供文件下载只需要返回 PhysicalFile 方法，如下面代码

```csharp
        [HttpGet]
        public IActionResult Get()
        {
            var folder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var file = Path.Combine(folder, "big file");
            const string mime = "application/octet-stream";

            return PhysicalFile(file, mime);
        }
```

本文的 big file 是程序运行创建的垃圾文件

```csharp
        private void WriteBigFile()
        {
            var folder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            var file = Path.Combine(folder, "big file");

            if (!File.Exists(file))
            {
                using (var stream = new FileStream(file, FileMode.Create))
                {
                    for (int i = 0; i < 100000000; i++)
                    {
                        stream.WriteByte(0);
                    }
                }
            }
        }
```

测试代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/e237082b643c86cd15124f201c82f46955b9ab84/Gaaweeealjrdwrebiny) 欢迎小伙伴访问

