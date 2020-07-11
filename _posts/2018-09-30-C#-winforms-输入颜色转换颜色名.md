---
title: "C# winforms 输入颜色转换颜色名"
author: lindexi
date: 2020-3-5 12:33:10 +0800
CreateTime: 2018/9/30 18:27:49
categories: C#
---

本文告诉大家如何输入颜色，如`0xFFFF8000`转换为 Orange 在 winforms 程序

<!--more-->


<!-- CreateTime:2018/9/30 18:27:49 -->


可以使用下面代码转换

```csharp
    public static class HexColorTranslator
    {
        private static Dictionary<string, string> _hex2Name;

        private static Dictionary<string, string> Hex2Name
        {
            get
            {
                if (_hex2Name == null)
                {
                    _hex2Name = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
                    foreach (KnownColor ce in typeof(KnownColor).GetEnumValues())
                    {
                        var name = ce.ToString();
                        var color = Color.FromKnownColor(ce);
                        var hex = HexConverter(color);
                        _hex2Name[hex] = name;
                    }
                }

                return _hex2Name;
            }
        }

        private static string HexConverter(Color c)
        {
            return c.R.ToString("X2") + c.G.ToString("X2") + c.B.ToString("X2");
        }

        public static string GetKnownColorFromHex(string hex)
        {
            hex = hex.TrimStart('#');
            if (Hex2Name.TryGetValue(hex, out var result))
            {
                return result;
            }

            return "???";
        }
    }

```

调用的方式是传入颜色

```csharp
HexColorTranslator.GetKnownColorFromHex("#FFFF8000");
```

参见：
https://stackoverflow.com/a/51238017/6116637

