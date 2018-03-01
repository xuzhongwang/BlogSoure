---
title: Access总结
date: 2018-03-01 13:28:22
tags:
---
# Access字段属性

```C#
OleDbCommand command = new OleDbCommand(sql, Connection);
OleDbDataReader reader = command.ExecuteReader();
DataTable dt = new DataTable();
dt = reader.GetSchemaTable();
```

下表是dt所包含的内容
| dt列名     | OLE DB 列 ID  | 说明                                                     |
| ---------- | ------------- | -------------------------------------------------------- |
| ColumnName | DBCOLUMN_NAME | 列的名称；它可能不唯一。如果无法确定该名称，则返回空值。此名称始终反映最近对当前视图或命令文本中的列进行的重命名|
|ColumnOrdinal|DBCOLUMN_NUMBER|列的序号。它对于行的书签列（如果有的话）为零。其他列从一开始编号。该列不能包含空值|
|ColumnSize|DBCOLUMN_COLUMNSIZE|列中值的最大可能长度。对于采用固定长度数据类型的列，它是该数据类型的大小|
|NumericPrecision|DBCOLUMN_PRECISION|如果 DbType 是数值数据类型，则它是列的最大精度。数据类型为 DBTYPE_DECIMAL 或 DBTYPE_NUMERIC 的列的精度取决于该列的定义。如果 DbType 不是数值数据类型，则它为空值|
|NumericScale|DBCOLUMN_SCALE|如果 DbType 是 DBTYPE_DECIMAL 或 DBTYPE_NUMERIC，则它是小数点右侧的位数。否则，它为空值|
|DataType|无|映射到列的 .NET Framework 类型。
|ProviderType|DBCOLUMN_TYPE|列的数据类型的指示符。如果不同行的列数据类型不同，则它必须为 DBTYPE_VARIANT。该列不能包含空值。
|IsLong|DBCOLUMNFLAGS_ISLONG|如果列中有包含非常长的数据的二进制长对象 (BLOB)，则提供程序设置 DBCOLUMNFLAGS_ISLONG。非常长的数据的定义针对于提供程序。此标志的设置对应于该数据类型的 PROVIDER_TYPES 行集合中 IS_LONG 列的值。
|AllowDBNull|DBCOLUMNFLAGS_ISNULLABLE|如果使用者可将列设置为空值，或者提供程序无法确定使用者是否可将列设置为空值，提供程序就会设置DBCOLUMNFLAGS_ISNULLABLE。即使列无法设置为空值，|它仍可能包含空值。
|IsReadOnly|DBCOLUMNFLAGS_WRITE|如果不能修改该列，则为 true；否则为 false。如果提供程序已经设置了 DBCOLUMNFLAGS_WRITE 或DBCOLUMNFLAGS_WRITEUNKNOWN 标志，则认为该列是可写的。
|IsRowVersion|DBCOLUMNFLAGS_ISROWID|如果列包含不能写入的持久性行标识符，并且该标识符除了标识行以外没有其他有意义的值，则提供程序设置 DBCOLUMNFLAGS_ISROWID。
|IsUnique|DBCOLUMN_ISUNIQUE|VARIANT_TRUE：在该列中，基表（返回到 BaseTableName 中的表）中的任意两行的值都不能相同。如果该列本身表示一个键，或者有一个只应用于该列的 UNIQUE 类型的约束，则 IsUnique保证为 VARIANT_TRUE。VARIANT_FALSE：该列包含基表中的重复值。此列的默认值为 VARIANT_FALSE。
|IsKey|DBCOLUMN_KEYCOLUMN|VARIANT_TRUE：该列属于行集中的列集，结合使用列集中的列可唯一标识行。IsKey 设置为 VARIANT_TRUE 的列集必须唯一标识行集中的行。不要求此列集是最小列集。这组列可以从基表主键、唯一约束或唯一索引生成。VARIANT_FALSE：不要求该列唯一标识行。
|IsAutoIncrement|DBCOLUMN_ISAUTOINCREMENT|VARIANT_TRUE：该列以固定的增量向新行赋值。VARIANT_FALSE：该列不会以固定增量为新行赋值。此列的默认值为 VARIANT_FALSE。
|BaseSchemaName|DBCOLUMN_BASESCHEMANAME|包含列的数据存储区中的架构的名称。如果无法确定基架构名称，则为空值。该列的默认值为空值。
|BaseCatalogName|DBCOLUMN_BASECATALOGNAME|包含列的数据存储区中的目录的名称。如果无法确定基目录名称，则为空值。该列的默认值为空值。
|BaseTableName|DBCOLUMN_BASETABLENAME|包含列的数据存储区中的表或视图的名称。如果无法确定基表名称，则为空值。该列的默认值为空值。
|BaseColumnName|DBCOLUMN_BASECOLUMNNAME|数据存储区中列的名称。如果使用别名，它可能不同于在ColumnName 列中返回的列名称。如果无法确定基列名称，或者如果行集合列从数据存储区中的列导出但不等于该列，则为空值。该列的默认值为空值。