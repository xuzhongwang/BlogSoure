---
title: mysql
date: 2019-08-16 11:20:45
tags:
---

# 忘记root密码

新建一个文件，命名为 mysql-init.txt，并写入如下代码

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY '654321';
```

将文件放在c盘根目录下

停止服务

找到目录 "C:\Program Files\MySQL\MySQL Server 8.0\bin"

输入命令

```mysql
mysqld --defaults-file="C:\\ProgramData\\MySQL\\MySQL Server 8.0\\my.ini"   --init-file=C:\\mysql-init.txt
```
