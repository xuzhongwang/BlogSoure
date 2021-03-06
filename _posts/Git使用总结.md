---
title: Git使用总结
date: 2018-01-25 08:56:47
tags:
---
# 1. Git使用总结

## 1.1. SSH的添加与使用

+ 查看本机是否存在已有的SSH

```bash
ls -al ~/.ssh
```

+ 不存在则新建

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

+ 添加密钥到SSH-Agent中

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
```

+ 验证是否添加成功

```bash
ssh -T git@github.com
```

+ 粘贴密钥

```bash
clip < ~/.ssh/id_rsa.pub
```

+ 配置用户名密码

```bash
git config --global user.name "liuxianan"// 你的github用户名，非昵称
git config --global user.email  "xxx@qq.com"// 填写你的github注册邮箱
```

# Git增加dll文件

## 单独仓库

Git默认忽略dll文件，可添加如下代码取消忽略

```bash
## Include .dll files in perfect folder
# User-specific files
!*.dll
# Re-instate the build folder that is excluded in the default .gitignore
# This folder is used by Microsoft.Bcl.Build.* package
!build/
```
## 全局

```bash
C:\Users\Administrator\Documents\gitignore_global.txt
```
的配置文件中删除*.dll
