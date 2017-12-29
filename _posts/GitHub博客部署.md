---
title: GitHub博客部署
date: 2017-12-27 09:35:49
tags:
---
这是我的第一篇博客，我把它献给了提供这个博客的平台，记录一下在GitHub上如何部署自己的博客。
用到的工具：
- Git
    这个不多说，是必需的
- SourceTree
    这个是个Git的管理工具,比较友好，对于那些对于Git命令行不太熟悉的同学可以使用
- Hexo
    一个静态博客框架，只需要几条命令就可以快速创建自己的博客。

系统环境
    Windows7 64bit
    Git 2.15.0.windows.1
    SourceTree 2.3.1.0
    Hexo 3.4.4

# 工具的安装
## Git安装
   没有什么特别要说的，按引导下一步至完成。
## SourceTree
   安装没什么好说，但安装之后需要登陆之后才能使用，这个登陆也不知道怎么搞的，总是失败，在网上查找了一些解决方法，跳过这个初始化步骤。当然如果你人品好，登陆正常，可以跳过此步。
### 跳过初始化步骤
在目录 C:\Users\{youruser}\AppData\Local\Atlassian\SourceTree 下创建文件accounts.json
```
[
  {
    "$id": "1",
    "$type": "SourceTree.Api.Host.Identity.Model.IdentityAccount, SourceTree.Api.Host.Identity",
    "Authenticate": true,
    "HostInstance": {
      "$id": "2",
      "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountInstance, SourceTree.Host.AtlassianAccount",
      "Host": {
        "$id": "3",
        "$type": "SourceTree.Host.Atlassianaccount.AtlassianAccountHost, SourceTree.Host.AtlassianAccount",
        "Id": "atlassian account"
      },
      "BaseUrl": "https://id.atlassian.com/"
    },
    "Credentials": {
      "$id": "4",
      "$type": "SourceTree.Model.BasicAuthCredentials, SourceTree.Api.Account",
      "Username": "",
      "Email": null
    },
    "IsDefault": false
  }
]
```


    



