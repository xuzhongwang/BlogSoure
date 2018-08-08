---
title: VSCode
date: 2018-02-25 17:09:06
tags:
---
# 1. 在VSCode中编辑MarkDown

## 1.1. 使用命令

```bash
ctrl+shit+p
```

## 1.2. 标题自动编号

- 安装markdown_index.

- 运行 > markdown add index，即可自动添加序号

# visual studio code 中搭建 javascript 开发环境

## 安装插件

- Code Runner
- Debugger for Chrome

## 添加配置文件

在 launch.json 中添加配置如下

```json
{
  "version": "0.2.0",
  "configurations": [
      {
          "name": "Launch Chrome and new instance of Chrome",
          "type": "chrome",
          "request": "launch",
          "url": "file:///C:/Users/xz/Desktop/test",
          "sourceMaps": true,
          "webRoot": "E:/apache-tomcat-8.0.21/webapps/Test",
      },
      {
          "name": "Attach to Chrome",
          "type": "chrome",
          "request": "attach",
          "port": 9222,
          "sourceMaps": true,
          "webRoot": "${workspaceRoot}"
      }
  ]
}
```