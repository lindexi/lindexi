---
title: "win10 uwp 解决 SerialDevice.FromIdAsync 返回空"
author: lindexi
date: 2019-2-14 21:33:42 +0800
CreateTime: 2019-2-14 21:33:17 +0800
categories: Win10 UWP
---


<!--more-->


<!-- csdn -->

调用 SerialDevice.FromIdAsync 可能返回空，因为没有设置 package.appmanifest 可以使用端口

打开 package.appmanifest 文件添加下面代码

```csharp
    <Capabilities>
     <DeviceCapability Name="serialcommunication">
      <Device Id="any">
       <Function Type="name:serialPort" />
      </Device>
     </DeviceCapability>
    </Capabilities>
```

尝试使用特定的端口访问

```csharp
string aqs = SerialDevice.GetDeviceSelector("COM3");
DeviceInformationCollection dlist = await DeviceInformation.FindAllAsync(aqs);

if (dlist.Any())
{
    deviceId = dlist.First().Id;
}

using (SerialDevice serialPort = await SerialDevice.FromIdAsync(deviceId))
{

}
```

[https://stackoverflow.com/q/37505107/6116637](https://stackoverflow.com/q/37505107/6116637 )

