---
title: Code First学习
date: 2018-01-17 13:54:21
tags:
---
# 1. CodeFirst学习笔记

## 1.1. EntityTypeConfiguration&lt;T&gt;

## 1.2. SetInitializer

1 CreateDatabaseIfNotExists<>

只有在没有数据库的时候才会根据数据库连接配置创建新的数据库。这种配置主要用于production环境，因为你不可能把你现在使用的数据库删除掉，那样会损失重要的数据。你需要让你的实施人员拿着与Fluent API配置对应的数据库脚本去更新数据库。

2 DropCreateDatabaseIfModelChanges&lt;T&gt;

只要Fluent API配置的数据库映射发生变化或者domain中的model发生变化了，就把以前的数据库删除掉，根据新的配置重新建立数据库。这种方式比较适合开发数据库，可以减少开发人员的工作量。

3 DropCreateDatabaseAlways&lt;&gt;
不管数据库映射或者model是否发生变化，每次都重新删除并根据配置重建数据库。这种方式可以适用于一些特殊情况的测试，比如说当每次测试结束之后把所有的测试数据都删除掉，并且在测试开始前插入一些基础数据。
可以用配置文件配置上述信息

```xml
<?xml version="1.0"?>
<configuration>
<appSettings>
<add key="DatabaseInitializerForType OrderSystemContext"
value="System.Data.Entity.DropCreateDatabaseIfModelChanges[[OrderSystemContext]], EntityFramework" />

</appSettings>
</configuration>
```

## 1.3. 添加初始数据

## 1.4. 使用Fluent API 配置属性

### 1.4.1. 配置Length

Length用来描述数组的长度，当前包括string和Byte数组。
默认约定：Code First对string或byte数组的默认长度约定是max。注意：Sql Server Compact中默认最大数组长度是4000。
重写约定：使用HasMaxLength(nn)，参数为可空整数。

```c#
Property(t => t.Name).HasMaxLength(50);
```

另外关于Length的Fluent API还有下面2个：

- IsFixedLength()，配置属性为固定长度。

- IsMaxLength()，配置属性为数据库提供程序允许的最大长度。

### 1.4.2. 配置Data Type

Data Type表示将.NET类型映射到的数据库的数据类型。
默认约定：列的数据类型由使用的数据库提供程序决定。以SQL Server为例：String->nvarchar(max),Integer->int,Byte[]->varbinary(max),Boolean->bit。
重写约定：使用HasColumnType(“xxx”)，下面列子的Photo是byte[]类型，配置映射到image数据类型：

```c#
Property(t => t.Photo).HasColumnType("image");
```

### 1.4.3. 配置允许为空和不允许为空

默认约定：主键属性不允许为空，引用类型（String,array）允许为空，值类型（所有的数字类型，Datetime,bool,char）不允许为空，可空的值类型Nullable<T>允许为空。
重写约定：使用IsRequired()配置不允许为空，使用IsOptional()配置允许为空。下面配置Name属性为不为空：

```c#
Property(t => t.Name).IsRequired();
```

### 1.4.4. 配置属性到指定列

默认约定：映射到与属性名相同的列。

重写约定：使用Property(t=>t.属性名).HasColumnName(“xxx”)。下面配置Name映射到DepartmentName：

```c#
Property(t => t.Name).HasColumnName("DepartmentName");
```

### 1.4.5. 配置主键

默认约定：
(1)属性名为ID或Id的默认为主键 
(2)类名+ID或类名+Id默认为主键  （其中ID或Id的优先级大于类名+ID或类名+Id）

重写约定：使用HasKey(t=>t.属性名)。下面将BlogId配置为主键：

```c#
HasKey(t => t.BlogId);
```

### 1.4.6. 配置组合主键

下面的例子将DepartmentId和Name属性组合作为Department类型的主键：

```c#
HasKey(t => new { t.DepartmentId, t.Name });
```

### 1.4.7. 配置Database-Generated

默认约定：整型键：Identity。

重写约定：使用Property(t => t.属性名).HasDatabaseGeneratedOption(DatabaseGeneratedOption)。

DatabaseGeneratedOption枚举包括三个成员：
(1) None：数据库不生成值
(2) Identity：当插入行时，数据库生成值
(3) Computed：当插入或更新行时，数据库生成值

整型默认是Identity，数据库生成值，自动增长，如果不想数据库自动生成值，使用DatabaseGeneratedOption.None。

Guid类型作为主键时，要显示配置为DatabaseGeneratedOption.Identity。

### 1.4.8. 配置TimeStamp/RowVersion的乐观并发

默认约定：这个没有默认约定。

配置：使用Property(t=>t.属性名).IsRowVersion()

```c#
Property(t => t.RowVersion).IsRowVersion();
```

### 1.4.9. 不配置TimeStamp的乐观并发

有些数据库不支持RowVersion类型，但是又想对数据库的一个或多个字段并发检查，这时可以使用Property(t=>t.属性名).IsConcurrencyToken(),下面的例子将SocialSecurityNumber配置为并发检查。

```c#
Property(t => t.SocialSecurityNumber).IsConcurrencyToken();
```

### 1.4.10. 配置String属性是否支持Unicode内容

默认约定：默认string是Unicode（在SQL Server中是nvarchar）的。

重写约定：下面的例子使用IsUnicode()方法将Name属性配置为varchar类型的。

```c#
Property(t => t.Name).IsUnicode(false);
```

### 1.4.11. 配置小数的精度和小数位数

默认约定：小数是(18,2)

配置：使用Property(t=>t.属性名).HasPrecision(n,n)

```c#
public decimal MilesFromNearestAirport { get; set; }
```

### 1.4.12. 复杂类型

默认复杂类型有以下规则：

(1) 复杂类型没有主键属性 
(2) 复杂类型只能包含原始属性。 
(3)在其他类中使用复杂类型时，必须表示为非集合类型。

使用DbModelBuilder.ComplexType方法显示配置为复杂类型：

```c#
modelBuilder.ComplexType<Address>();
```

### 1.4.13. 嵌套的复杂类型

嵌套的复杂类型只需显示配置外层，内层自动继承复杂类型的约定。

### 1.4.14. 配置复杂类型的属性

配置复杂类型的属性和配置实体属性一样，具体参考下面的实例。

### 1.4.15. 实例

```C#
  //实体
public class Trip
{
    public Guid Identifier { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal CostUSD { get; set; }
    public string Description { get; set; }
    public byte[] RowVersion { get; set; }
}

//复杂类型
public class Address
{
    public int AddressId { get; set; }
    public string StreetAddress { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string ZipCode { get; set; }
}

//复杂类型
public class PersonalInfo
{
    public Measurement Weight { get; set; }
    public Measurement Height { get; set; }
    public string DietryRestrictions { get; set; }
}

//复杂类型
public class Measurement
{
    public decimal Reading { get; set; }
    public string Units { get; set; }
}

//实体
public class Person
{
    public Person()
    {
        Address = new Address();
        Info = new PersonalInfo()
        {
            Weight = new Measurement(),
            Height = new Measurement()
        };
    }

    public int PersonId { get; set; }
    public int SocialSecurityNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Address Address { get; set; }
    public byte[] Photo { get; set; }
    public PersonalInfo Info { get; set; }
    public byte[] RowVersion { get; set; }
}

//对实体Trip的配置，继承自EntityTypeConfiguration<T>
public class TripConfiguration : EntityTypeConfiguration<Trip>
{
    public TripConfiguration()
    {
        //配置Identifier映射到TripId列，并设为主键，且默认值为newid()
        HasKey(t => t.Identifier).Property(t => t.Identifier).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).HasColumnName("TripId");
        //配置CostUSD的精度为20，小数位数为3
        Property(t => t.CostUSD).HasPrecision(20, 3);
        //配置Description的长度为500
        Property(t => t.Description).HasMaxLength(500);
        //配置RowVersion乐观并发检查
        Property(t => t.RowVersion).IsRowVersion();
    }
}

//对实体Person的配置，继承自EntityTypeConfiguration<T>
public class PersonConfiguration : EntityTypeConfiguration<Person>
{
    public PersonConfiguration()
    {
        //配置SocialSecurityNumber不允许为空且乐观并发检查
        Property(t => t.SocialSecurityNumber).IsRequired().IsConcurrencyToken();
        //配置FirstName不允许为空
        Property(t => t.FirstName).IsRequired();
        //配置LastName不允许为空
        Property(t => t.LastName).IsRequired();
        //配置Photo映射到数据库的数据类型为image
        Property(t => t.Photo).HasColumnType("image");
        //配置RowVersion乐观并发检查
        Property(t => t.RowVersion).IsRowVersion();
    }
}

//对复杂类型Address的配置，继承自ComplexTypeConfiguration<T>
public class AddressConfiguration : ComplexTypeConfiguration<Address>
{
    public AddressConfiguration()
    {
        //配置AddressId映射到AddressId列
        Property(t => t.AddressId).HasColumnName("AddressId");
        //配置StreetAddress长度为100并映射到StreetAddrress列
        Property(t => t.StreetAddress).HasMaxLength(100).HasColumnName("StreetAddress");
        //配置State长度为50并映射到State列
        Property(t => t.State).HasMaxLength(50).HasColumnName("State");
        //配置City长度为50并映射到City列
        Property(t => t.City).HasMaxLength(50).HasColumnName("City");
        //配置ZipCode映射到ZipCode列，不支持Unicode内容，并设为固定长度为6
        Property(t => t.ZipCode).IsUnicode(false).IsFixedLength().HasMaxLength(6).HasColumnName("ZipCode");
    }
}

//对复杂类型PersonalInfo的配置，继承自ComplexTypeConfiguration<T>
public class PersonalInfoConfiguration : ComplexTypeConfiguration<PersonalInfo>
{
    public PersonalInfoConfiguration()
    {
        //配置DietryRestrictions长度为100
        Property(t => t.DietryRestrictions).HasMaxLength(100);
    }
}

public class BreakAwayContext : DbContext
{
    public DbSet<Trip> Trips { get; set; }
    public DbSet<Person> People { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        //注册配置
        modelBuilder.Configurations.Add(new TripConfiguration());
        modelBuilder.Configurations.Add(new PersonConfiguration());
        modelBuilder.Configurations.Add(new AddressConfiguration());
        modelBuilder.Configurations.Add(new PersonalInfoConfiguration());
        base.OnModelCreating(modelBuilder);
    }
}
```

## 异常记录

### 从 datetime2 数据类型到 datetime 数据类型的转换产生一个超出范围的值

触发该错误的条件如下：

- SQL Server数据库版本中的字段类型为datetime2
- 数据库中，某个要进行Add或者Edit的字段的数据类型为datetime，比如表A中的today字段，类型为datetime。而后台代码进行数据库操作时，并没有给today（datetime类型）赋值。结果就是VS2015编译的时候默认将其类型编译为datetime2，导致用EF进行add和edit操作的时候出现该异常。 

解决方案：

- 给这些字段一个值（不管它是否在数据库设置了默认值），并且日期要大于1753年1月1日，这是最简单的方法。
- 将数据库类型修改为datetime？类型，也就是说允许为空。
- 修改数据库字段类型为datetime2类型，前提是数据库要支持该类型。
- 在C#中用new DateTime(year,month,day,hour,minute,second)来限制精度，原因之后会在datetime2和datetime的区别中提到。
- 这个方法不太推荐，将model的edmx中的providerManifestToken设置成2005，这样ef就默认转化成datetime。

datetime2和datetime的区别：

官方MSDN对于datetime2的说明：定义结合了 24 小时制时间的日期。 可将 datetime2 视作现有 datetime 类型的扩展，其数据范围更大，默认的小数精度更高，并具有可选的用户定义的精度。

这里值的注意的是datetime2的日期范围是"0001-01-01 到 9999-12-31"（公元元年 1 月 1 日到公元 9999 年 12 月 31 日）。

而datetime的日期范围是：”1753 年 1 月 1 日到 9999 年 12 月 31 日“。这里的日期范围就是造成“从 datetime2 数据类型到 datetime 数据类型的转换产生一个超出范围的值”这个错误的原因。

```c#
DateTime字段类型对应的时间格式是yyyy-MM-dd HH:mm:ss.fff，3个f，精确到1毫秒(ms)，示例2014-12-0317:06:15.433.
DateTime2字段类型对应的时间格式是yyyy-MM-dd HH:mm:ss.fffffff，7个f，精确到0.1微秒(μs)，示例2014-12-0317:23:19.2880929. 
如果用SQL的日期函数进行赋值，DateTime字段类型要用GETDATE()，DateTime2字段类型要用SYSDATETIME()。
```