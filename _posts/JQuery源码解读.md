---
title: JQuery源码解读
date: 2018-08-09 16:08:08
tags:
---

# AMD规范

## 什么是ADM

全称是Asynchronous Module Definition，即异步模块加载机制。
从它的规范描述页面看，AMD很短也很简单，但它却完整描述了模块的定义，依赖关系，引用关系以及加载机制。从它被requireJS，NodeJs，Dojo，JQuery使用也可以看出它具有很大的价值，没错，JQuery近期也采用了AMD规范。在这篇文章中，我们就将介绍AMD的性质，用法，优势以及应用场景。从AMD中我们也能学习到如何在更高层面去设计自己的前端应用。

## AMD构成

作为一个规范，只需定义其语法API，而不关心其实现。AMD规范简单到只有一个API，即define函数：

```define
define([module-name?],[array-of-dependencies?],[module-factory-or-object])
```

其中：

- module-name：模块标识，可以省略。
- array-of-dependencies：所依赖的模块，可以省略。
- module-factory-or-object：模块的实现，或者一个JavaScript对象。

从这个define函数AMD中的A：Asynchronous，我们也不难想到define函数具有的另外一个性质，异步性。当define函数执行时，它首先会异步的去调用第二个参数中列出的依赖模块，当所有的模块被载入完成之后，如果第三个参数是一个回调函数则执行，然后告诉系统模块可用，也就通知了依赖于自己的模块自己已经可用。

### 匿名模块

define 方法允许你省略第一个参数，这样就定义了一个匿名模块，这时候模块文件的文件名就是模块标识。