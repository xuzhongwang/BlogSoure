---
title: 常用sql语句
date: 2018-01-30 08:53:36
tags:
---
# 1. 分页

变量说明

```sql
@pagesize 每页的容量
@pageindex 页码
@require 本要查询的语句
```

## 1.1. sqlserver

```sql
select top @pagesize * from (
    select Row_Number() over (order by ID) as RowNumber,@require
    ) as A where A.RowNumber > @pagesize*(@pageindex-1)
```

## 1.2. sqlserver

```sql
@require offset @pagesize*(@pageindex-1) rows fetch next @pagesize rows only
```

# 2. ISNULL

```sql
ISNULL ( check_expression , replacement_value )
```

如果 check_expression 不为 NULL，则返回它的值；否则，在将 replacement_value 隐式转换为 check_expression 的类型（如果这两个类型不同）后，则返回前者。

# 3. CAST

```sql
CAST (expression AS data_type)
```

- expression：任何有效的SQServer表达式。
- AS：用于分隔两个参数，在AS之前的是要处理的数据，在AS之后是要转换的数据类型。
- data_type：目标系统所提供的数据类型，包括bigint和sql_variant，不能使用用户定义的数据类型。

如果试图进行不可能的转换（例如，将含有字母的 char 表达式转换为 int 类型），SQServer 将显示一条错误信息。
如果转换时没有指定数据类型的长度，则SQServer自动提供长度为30。

# 4. Join

1. from A inner join B on A.ID=B.ID:两表都有的记录才列出
2. from A left join B on A.ID=B.ID:A表中所有记录列出，B中无法匹配的用Null匹配
3. from A right join B on A.ID=B.ID:B表中所有记录列出,A中无法匹配的用Null匹配
4. from A full outer join B on A.ID=B.ID.

其它join查询：

1. left outer join,等价于left join.
2. right outer join, 等价于right join.
3. cross join,    笛卡尔乘积查询

# 5. 找出数量大于的

SELECT DISTINCT HouseName FROM MainTable GROUP BY HouseName HAVING COUNT(*) > 1

