---
title: python学习
date: 2019-08-15 08:06:22
tags:
---

# 配置pipe国内镜像

conda和pip默认使用国外站点来下载软件，我们可以配置国内镜像来加速下载（国外用户无须此操作）。

```python
# 配置清华PyPI镜像（如无法运行，将pip版本升级到>=10.0.0）
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

若使用国内镜像后出现安装错误，首先取消PyPI镜像配置，即执行命令

```python
pip config unset global.index-url
```
