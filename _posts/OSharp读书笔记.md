---
title: OSharp读书笔记
date: 2018-01-04 15:50:42
tags:
---
# EntityFramework与其它ORM相比有什么优点

- EntityFramework 是微软大力发展的一个开源项目，EF 6 在 codeplex.com 开源，EF 7 在 github.com 随 ASP.NET 5 开源。
- EntityFramework 能轻松支持各大主流数据库，只要引入相应数据库的 DataProvider 即可，能无差异的操作各大主流数据库。
- EntityFramework 支持 linq to entities 语句查询，强类型支持，高效实现查询需求。
- EntityFramework 全面封装了数据库细节，使用了大量的“约定胜于配置”的思想，使开发者不必直接对关系存储架构编程，减少代码量，减轻维护工作，并使项目可维护性更高

# 为什么要封装EntityFramework

- 不是所有的开发人员都对 EntityFramework 足够熟悉，封装之后能将 EntityFramework 的细节及较敏感的 API 进行包装与隐藏，使 EntityFramework 的使用更加透明易用。
- 统一的封装，有利于对业务层提供统一的 API，对业务层的代码规范非常有利。
- 封装有利于业务实体与 EntityFramework 的解耦。如果不封装，所有业务实体模型（Model）都要在上下文类中设置一个 DbSet<TEntity> 类型的实体集，将与上下文强耦合，当需求发生变化时，都要对原有代码进行修改，很不利于维护。而封装之后，所有的实体模型都是动态加载到上下文类中的，业务实体与 EntityFramework 能够完全解耦，大大增强系统的可维护性。 

#  IEnumerable<T> 与 IQueryable<T> 的区别

　　在设计数据访问层的查询API的时候，IEnumerable<T> 和 IQueryable<T> 都可以作为集合类查询结果的返回类型，那么，这两者有什么区别呢？为什么误用的时候会造成致命的性能问题呢？
　　IEnumerable<T> 接口的声明为：　

```C#
/// <summary>
/// 公开枚举数，该枚举数支持在指定类型的集合上进行简单迭代。
/// </summary>
public interface IEnumerable<out T> : IEnumerable 
```

IQueryable<&lt;T> 接口的声明为：

```c#
/// <summary>
/// 提供对数据类型已知的特定数据源的查询进行计算的功能。
/// </summary>
public interface IQueryable<out T> : IEnumerable<T>, IQueryable, IEnumerable
```

在进行查询的时候，IEnumerable<T> 接口接受一个 Func<T, bool> 类型的委托参数： public static IEnumerable<TSource> Where<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate); ，而 IQueryable<T> 接口接受一个 Expression<Func<T, bool>> 类型的表达式参数： public static IQueryable<TSource> Where<TSource>(this IQueryable<TSource> source, Expression<Func<TSource, bool>> predicate); 。
正因为 IEnumerable<T> 接受的参数 predicate 数据类型是委托类型，所以这个参数在被调用的时候，就会立即执行查询逻辑，然后将查询的结果保存在内存中，后续的查询逻辑是完全在内存中执行的。而 IQueryable<T> 接受的参数 predicate 数据类型是表达式类型，这个参数会一直往下传递，直到被 IQueryable 中的 IQueryableProvider 类型的 Provider 属性解析成真正的查询语句（如 sql 语句），才传到数据源中进行查询动作。
所以，如果查询返回的数据集合很大的时候，使用 IEnumerable<T> 作为返回类型，会将这个数据集合立即加载到内存中，比如在设计 IRepository<T> 的 API 时，设计  IEnumerable<T> GetAll(); ， IEnumerable<T> GetByPredicate(Func<T, bool> predicate); 这种 API ，是非常可怕的，如果一个表中有几十上百万的数据，也同样会把所有数据加载到内存中，可能直接就导致服务器宕机了。即使数据量不大，当并发量上来的时候，也同样会造成极大的性能问题。

# 过早地内存化数据

　　IEnumerable<T> 类型与 IQueryable<T> 类型是支持延迟的，没有真正使用数据之前，不管怎么调用，都不会执行查询，数据还是在数据库内，只有真正使用数据的时候，才会执行查询，把数据本地化到内存中。这样一来，什么时候执行本地化操作（ToArray()，ToList()等操作）就显得非常重要了，如果过早的执行本地化操作，那么就容易造成加载到内存的数据集合过于庞大，记录条数过多，造成性能问题。因此，在进行数据查询的时候，原则上应该按需获取数据，取出的数据集合就尽量的小，字段应尽量少，到数据真正使用的时候，才执行数据内存本地化操作。对于筛选部分字段的需求，linq to entities 的 select 查询匿名结果的查询方式，提供了有力的支持。

# 导航属性的延迟加载与循环

　　EntityFramework 实体模型的导航属性（即与当前表有外键关系的关联表）通常标记为 virtual，标记为 virtual 之后，相应属性的数据是具有延迟加载的特性的，只有真正用到相应属性的数据时，才会根据外键关系执行相应的查询动作，加载相应的数据。延迟加载的特性，能给系统性能带来优化，因为加载主干实体时只加载主干实体的信息，不会把关联实体的信息都加载进来，关联实体的数据只有用到的时候都会去加载。但也正是因为延迟加载，导航属性的数据是用到一次就执行一次查询动作，加载一次数据，一次还如，如果对于相同实体，需要多次用到同一个导航属性，就会产生多次重复的查询动作来加载导航属性的数据，给系统带来性能问题。例如如下的操作：
