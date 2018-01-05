---
title: Hexo的使用
date: 2018-01-05 14:16:22
tags:
---

# 使用Hexo生成博文中播入图片
1. 把主页配置文件_config.yml 里的post_asset_folder:这个选项设置为true
2. 在你的hexo目录下执行如下命令，下载一个可以上传本地图片的插件
```
npm install hexo-asset-image --save
```
3. 执行
```
hexo new "newblog"
```
    生成newblog.md的同时，会生成一个同名的文件在Source目录下，将你要引用的图片放入这个目录下，在文章中引用图片时，
```
![你想输入的文字](xxxx/图片名.jpg)
```
