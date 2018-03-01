---
title: Visual Studio 2017无法添加引用
date: 2018-01-07 15:43:02
tags:
---
# 问题描述
本机装了Visual Studio2017与2012两个版本，不知道是不是有冲突还是其它的一些原因，在2017项目中添加引用时总是报错，错误信息如下图所示：
![Error Image](Visual-Studio-2017无法添加引用\Error1.png)
# 解决方法
1. 用管理员权限打开命令行（不用管理员权限进行下面的操作可能会提示无权限）
在命行中打开如下路径:
```
C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Common7\IDE\PublicAssemblies
```
此路径因安装visaul studio的位置不同而不同，我装在C盘
2. 添加环境变量
在path下添加
```
C:\Program Files (x86)\Microsoft SDKs\Windows\v8.0A\bin\NETFX 4.0 Tools\x64
```
![EditPath](Visual-Studio-2017无法添加引用\EditPath.png)
3. 执行如下命令
```
gacutil -i Microsoft.VisualStudio.Shell.Interop.11.0.dll
```
![Add Succeed](Visual-Studio-2017无法添加引用\Add Succeed.png)
完成后重启Visual Studio，查看问题是否解决

