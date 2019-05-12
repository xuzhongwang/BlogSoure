---
title: JavaScript高级视频
date: 2019-04-15 16:37:01
tags:
---

# 编程思想

面向过程：所有事情都亲力亲为，注重过程。
面向对象：提出需求，找对象，对象解决，注重的是结果。面向对象不是面向过程的替代，而是面向过程的封装

js不是一门面向对象的语言，是基于对象的语言，js来模拟面向对象。

封装：就是包装，把一些重用的内容进行包装，在需要的时候，直接使用。
如：把一个值存放在一个变量中，把一些重用的代码放在函数中，把好多相同功能的函数放在一个对象中
继承：类与类之间的关系，js中没有类的概念，js中有构造函数中的概念，是可以继承的，是基于原型。
多态：指同一个行为，针对不同的对象，产生了不同的效果。

# 创建对象的三种方式

## 字面量的方式

```javascript
// 字面量
var per1 = {
    name:"test",
    age:20
};
```

## 调用系统的构造函数

```javascript
var per = new Object();
per.name = "test";
pert.age = 20;
```

## 自定义构造函数方式

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
var per = new Person("test",20);
```

# 原型的引入

通过来添加方法，解决数据共享，节省内存空间。

## 构造函数、原型与实例对象的关系

- 构造函数可以实例化对象
- 构造函数中有一个属性prototype,是构造函数的原型对象
- 构造函数的原型对象(prototype)中有一个constructor构造器，这个构造器指向的就是自己所在的原型对象所在的构造函数
- 实例对象的原型对象(__proto__)指向的是该构造函数的原型对象
- 构造函数的原型对象中(prototype)中的方法是可以被实例对象直接访问的。

## 利用原型共享数据

不需要共享的数据写在构造函数中，需要共享的数据写在原型中。

```javascript
function Student(name,age){
    this.name = name;
    this.age = age;
}
Student.prototype = {
    constructor: Student,//此种写法必须手动指定构造器
    height:"199",
    study:function(){
        console.log("happy");
    }
}
```

## 局部变量变成全局变量

```javascript
(function(win){
    win.num = 10;
})(window)
console.log(num);
```

## 原型

- 实例对象中有__proto__这个属性，叫原型，也是一个对象，这个属性是给浏览器使用，不是标准的属性。
- 构造函数中有prototype这个属性，叫原型，也是一个对象，这个属性是给程序员使用，是标准属性。

