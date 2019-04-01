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

# jQuery 对象与 dom 对象转换

## jQuery 转换成 dom 对象

- [index]

```javascript
var $j =$("#j") ; //jQuery对象
var d=$j[0]; //DOM对象 
```

- .get(index)

```javascript
var $j=$("#v"); //jQuery对象
var d=$j.get(0); //DOM对象
```

## dom 对象转换成 jQuery

对于已经是一个DOM对象，只需要用$()把DOM对象包装起来，就可以获得一个jQuery对象了。

```javascript
var v=document.getElementById("v"); //DOM对象
var $v=$(v); //jQuery对象
```

# $.data()

$.data(dom对象, 'tree');

# $.extend()的深拷贝和浅拷贝详细讲解

```javascript
语法：jQuery.extend([deep],target,object1[,objectN])
```

- 浅拷贝（false默认):如果第二个参数对象有的属性第一个参数对象也有，那么不会进行相同参数内部比较，直接将第一个对象的相同参数覆盖。
- 深拷贝：如果第二个参数对象有的属性第一个参数对象也有，还要继续在这个相同的参数向下一层找，比较相同参数的对象中是否还有一样的属性，如果有，将其继承到第一个对象，如果没有，则覆盖。

```javascript
var object1 = {
    apple: 0,
    banana: {
        weight: 52,
        price: 100
    },
    cherry: 97
};
var object2 = {
    banana: {
        price: 200
    },
    durian: 100
};

//默认情况浅拷贝
//object1--->{"apple":0,"banana":{"price":200},"cherry":97,"durian":100}
//object2的banner覆盖了object1的banner，但是weight属性未被继承
//$.extend(object1, object2);

//深拷贝
//object1--->{"apple":0,"banana":{"weight":52,"price":200},"cherry":97,"durian":100}
//object2的banner覆盖了object1的banner，但是weight属性也被继承了呦
$.extend(true,object1, object2);

console.log('object1--->'+JSON.stringify(object1));
```

# jQuery 的应用

## $.each的用法

```javascript
$.each(parentData,function(index,childData){
    index ;     //选择器的index位置 
    childData;  //当前元素
    })
```

# checkbox

1、获取单个checkbox选中项(三种写法)

```javascript
$("input:checkbox:checked").val()
$("input:[type='checkbox']:checked").val();
$("input:[name='ck']:checked").val();
```

2、 获取多个checkbox选中项

```javascript
$('input:checkbox').each(function() {
        if ($(this).attr('checked') ==true) {
                alert($(this).val());
        }
});
```

3、设置第一个checkbox 为选中值

```javascript
$('input:checkbox:first').attr("checked",'checked');
$('input:checkbox').eq(0).attr("checked",'true');
```

4、设置最后一个checkbox为选中值

```javascript
$('input:radio:last').attr('checked', 'checked');
$('input:radio:last').attr('checked', 'true');
```

5、根据索引值设置任意一个checkbox为选中值

```javascript
$('input:checkbox).eq(索引值).attr('checked', 'true');索引值=0,1,2....
$('input:radio').slice(1,2).attr('checked', 'true');
```

6、选中多个checkbox同时选中第1个和第2个的checkbox

```javascript
$('input:radio').slice(0,2).attr('checked','true');
```

7、根据Value值设置checkbox为选中值

```javascript
$("input:checkbox[value='1']").attr('checked','true');
```

8、删除Value=1的checkbox

```javascript
$("input:checkbox[value='1']").remove();
```

9、删除第几个checkbox

```javascript
$("input:checkbox").eq(索引值).remove();索引值=0,1,2....
// 如删除第3个checkbox:
$("input:checkbox").eq(2).remove();
```

10、遍历checkbox

```javascript
$('input:checkbox').each(function (index, domEle) {
//写入代码
});
```

11、全部选中

```javascript
$('input:checkbox').each(function() {
        $(this).attr('checked', true);
});
```

12、全部取消选择

```javascript
$('input:checkbox').each(function () {
        $(this).attr('checked',false);
});
```
