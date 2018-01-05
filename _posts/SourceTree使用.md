---
title: SourceTree使用
date: 2018-01-05 12:55:38
tags:
---

# SourceTree的安装
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
