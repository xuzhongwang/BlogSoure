---
title: Sublime使用
date: 2018-02-25 16:20:12
tags:
---

# 替换
Ctrl + H进行替换

# 搭建 JavaScript 运行环境

## 安装 NodeJs

## 配置 sublime

![sbulime配置.png](Sublime使用/sbulime配置.png)

添加如下代码

```json
{
   "cmd": ["node","$file"]
}
```

![settinguser](Sublime使用/settinguser.png)

添加如下配置

```json
{
"build_env": {
    "PATH": "C:/Program Files/nodejs"
}
}
```

PATH的值是nodejs的安装路径。 

## 测试

新建一个文件，随便写一段JavaScript代码，按快捷键：
Ctrl + B
即可看到运行结果。
