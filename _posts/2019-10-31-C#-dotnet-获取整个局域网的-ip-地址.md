---
title: "C# dotnet 获取整个局域网的 ip 地址"
author: lindexi
date: 2020-3-5 12:33:10 +0800
CreateTime: 2019/10/31 8:57:55
categories: dotnet C#
---

局域网可以使用的 IP 地址有很多，我写了一段代码用来枚举所有可以用的 ip 地址

<!--more-->


<!-- CreateTime:2019/10/31 8:57:55 -->


小伙伴都知道，局域网可以使用的 IP 范围如下

- A类地址：10.0.0.0 - 10.255.255.255 
- B类地址：172.16.0.0 - 172.31.255.255 
- C类地址：192.168.0.0 -192.168.255.255 

我写了函数 GetIpList 用于在传入两个 IP 地址，一个是开始，一个是结束地址，返回这个范围所有的 IP 地址

```csharp
        private static IEnumerable<IPAddress> GetIpList(IPAddress ipFrom, IPAddress ipTo)
        {
            var ipEnd = ipTo.GetAddressBytes();
            var ipNext = ipFrom.GetAddressBytes();

            while (CompareIPs(ipNext, ipEnd) < 1)
            {
                var ip = new IPAddress(ipNext);
                IncrementIP(ipNext);
                yield return ip;
            }
        }

        private static int CompareIPs(byte[] ip1, byte[] ip2)
        {
            if (ip1 == null || ip1.Length != 4)
            {
                return -1;
            }

            if (ip2 == null || ip2.Length != 4)
            {
                return 1;
            }

            var compare = ip1[0].CompareTo(ip2[0]);
            if (compare == 0)
            {
                compare = ip1[1].CompareTo(ip2[1]);
            }

            if (compare == 0)
            {
                compare = ip1[2].CompareTo(ip2[2]);
            }

            if (compare == 0)
            {
                compare = ip1[3].CompareTo(ip2[3]);
            }

            return compare;
        }

        private static void IncrementIP(byte[] ip, int idx = 3)
        {
            if (ip == null || ip.Length != 4 || idx < 0)
            {
                return;
            }

            if (ip[idx] == 254)
            {
                ip[idx] = 1;
                IncrementIP(ip, idx - 1);
            }
            else
            {
                ip[idx] = (byte) (ip[idx] + 1);
            }
        }
```

此时可以列举局域网所有地址

```csharp
        private static void Main(string[] args)
        {
            var ipFrom = IPAddress.Parse("172.16.0.0");
            var ipTo = IPAddress.Parse("172.31.255.255");
            Console.WriteLine(GetIpList(ipFrom, ipTo).Count());

            ipFrom = IPAddress.Parse("192.168.0.0");
            ipTo = IPAddress.Parse("192.168.255.255");
            Console.WriteLine(GetIpList(ipFrom, ipTo).Count());

            ipFrom = IPAddress.Parse("10.0.0.0");
            ipTo = IPAddress.Parse("10.255.255.255");
            Console.WriteLine(GetIpList(ipFrom, ipTo).Count());
        }
```

本文代码放在 [github](https://github.com/lindexi/lindexi_gd/tree/5e4ed220da093aeb922f147988be133f8160ceec/HayberenerhihaWaceafardu) 欢迎小伙伴访问

