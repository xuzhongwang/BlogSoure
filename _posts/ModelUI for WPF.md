---
title: ModelUI for WPF
date: 2018-03-08 08:53:36
tags:
---
# 使用ModelUI

## 首先获取相关dll

[github地址]：https://github.com/firstfloorsoftware/mui

## 在项目中添加引用

在目录FirstFloor.ModernUI\FirstFloor.ModernUI\bin\Debug下找到FirstFloor.ModernUI.dll,添加到你所需要的wpf项目中

在项目的App.xaml中添加如下代码

```xml
<Application x:Class="SuperRecite.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperRecite"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="/FirstFloor.ModernUI;component/Assets/ModernUI.xaml" />
                <ResourceDictionary Source="/FirstFloor.ModernUI;component/Assets/ModernUI.Light.xaml" />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Application.Resources>
</Application>
```

在项目的主页面中添加引用

```xaml
 xmlns:mui="http://firstfloorsoftware.com/ModernUI"
 ```

 主窗体后台改变继承的基类

 ```c#
    public partial class MainWindow : ModernWindow

 ```