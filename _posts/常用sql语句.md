---
title: 常用sql语句
date: 2018-01-30 08:53:36
tags:
---

# 分页
变量说明
```
@pagesize 每页的容量
@pageindex 页码
@require 本要查询的语句
```
## sqlserver 2008
```
select top @pagesize * from (
    select Row_Number() over (order by ID) as RowNumber,@require
    ) as A where A.RowNumber > @pagesize*(@pageindex-1)
```
## sqlserver 2012
```
@require offset @pagesize*(@pageindex-1) rows fetch next @pagesize rows only
```
