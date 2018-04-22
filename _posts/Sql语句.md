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

# Group By
```sql
select BusinessCode, [values]=stuff((select ','+FlageCode from R_SYS_business_logic t where BusinessCode=t.BusinessCode for xml path('')), 1, 1, '') 
from R_SYS_business_logic 
group by BusinessCode 
```
## stuff函数

```sql
STUFF ( character_expression , start , length ,character_expression ) 
```
参数
- character_expression：一个字符数据表达式。character_expression 可以是常量、变量，也可以是字符列或二进制数据列。
- start：一个整数值，指定删除和插入的开始位置。如果 start 或 length 为负，则返回空字符串。如果 start 比第一个character_expression 长，则返回空字符串。start 可以是 bigint 类型。
- length：一个整数，指定要删除的字符数。如果 length 比第一个 character_expression 长，则最多删除到最后一个character_expression 中的最后一个字符。length 可以是 bigint 类型。
- 返回类型：如果 character_expression 是受支持的字符数据类型，则返回字符数据。如果 character_expression 是一个受支持的 binary 数据类型，则返回二进制数据。

备注：如果开始位置或长度值是负数，或者如果开始位置大于第一个字符串的长度，将返回空字符串。如果要删除的长度大于第一个字符串的长度，将删除到第一个字符串中的第一个字符。 
如果结果值大于返回类型支持的最大值，则产生错误。

示例 
以下示例在第一个字符串 abcdef 中删除从第 2 个位置（字符 b）开始的三个字符，然后在删除的起始位置插入第二个字符串，从而创建并返回一个字符串。

SELECT STUFF('abcdef', 2, 3, 'ijklmn'); 
GO

下面是结果集： 
--------- 
aijklmnef

(1 row(s) affected)

## for xml path
