---
title: Web前端开发环境搭建
date: 2018-08-11 15:37:32
tags:
---

# npm配置

如果提示代理有问题:

```npm
$ npm config set proxy null
$ npm config set https-proxy null
```

## 配置淘宝镜像
1. 命令

```npm
npm config set registry https://registry.npm.taobao.org
```

2. 验证命令

```npm
npm config get registry
```

如果返回https://registry.npm.taobao.org，说明镜像配置成功。

 

二、通过使用cnpm安装
1. 安装cnpm

```npm
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

2. 使用cnpm

```npm
cnpm install xxx
```



# 插件安装

- Nodejs
- grunt
- bower
- express
- supervisor

## grunt

```npm
npm install -g grunt cli
```

![Web前端开发环境搭建](Web前端开发环境搭建/grunt安装.png)

## bower

```npm
npm install bower -g
```

![Web前端开发环境搭建](Web前端开发环境搭建/bower安装.png)

验证是否安装成功

![Web前端开发环境搭建](Web前端开发环境搭建/bower安装验证.png)

## express

安装express，在cmd中输入：npm express -gd;   -g代表安装到NODE_PATH的lib里面，而-d代表把相依性套件也一起安装。如果沒有-g的话会安装目前所在的目录。


