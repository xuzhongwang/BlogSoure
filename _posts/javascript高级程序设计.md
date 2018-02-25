---
title: javascript高级程序设计
date: 2018-01-30 17:31:19
tags:
---
# 1. JavaScript简介

## 1.1. JavaScript简史

最初设计的主要目的是为了处理以前由服务器端语言(如Perl)负责的一些输入验证操作。

## 1.2. JavaScript实现

一个完整的JavaScript实现由三部分组成

- 核心：ECMAScript
- 文档对象模型：DOM
- 浏览器对象模型：BOM

# 2. 在HTML中使用JavaScript

## 2.1. &lt;script&gt;元素

带有src属性的&lt;script&gt;元素不应该在其&lt;script&gt;和&lt;/script&gt;标签之间再包含额外的javascript代码。如果包含了嵌入的代码，则只会加载并执行外部脚本文件，嵌入的代码会被忽略。

### 2.1.1. 延迟脚本

HTML4.0.1为&lt;script&gt;标签定义了defer属性。这个属性的用途是表明脚本在执行时不会影响页面构造。也就是说脚本会延迟到整个页面都解析完成后再运行。相当于告诉浏览器立即下载但延迟执行。
defer属性只适用于外部文件。

### 2.1.2. 异步脚本

async只适用于外部文件脚本，其与defer的不同点：
不能保证按照指定的先后顺序执行。因此确定两者之间互不依赖很重要。

### 2.1.3. 在XHTML中的用法

什么是XHTML：将HTML作为XML的应用而重新定义的一个标准。

## 2.2. 嵌入代码与外部文件

使用外部文件的优点

- 可维护性
- 可缓存
- 适应未来

# 3. 基本概念

## 3.1. 语法

任何语言的核心都必然会描述这门语言最基本的工作原理。而描述的内容通常都要涉及这门语言的语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念。

### 3.1.1. 区分大小写

ECMAScript中的一切(变量、函数名和操作符)都区分大小写。

### 3.1.2. 严格模式

要在整个脚本中启用严格模式，可以在顶部添加如下代码：

```javascript
"use strict"
```

也可以指定函数在严格模式下执行：

```javascript
function(){
    "use strict"
    do something;
}
```

## 3.2. 变量

ECMAScript中的变量是松散类型的。所谓的松散类型是可以保存任何类型数据。换句话说，每个变量仅仅是一个用于保存值的占位符而已。

## 3.3. 数据类型

ECMAScript中有5种简单的数据类型，也称为基本数据类型。
Undefined，Null，Boolean，Number，String和复杂的数据类型Object(本质上由一组无序的名值对组成)

### 3.3.1. typeof操作符

typeof的可能结果

- 'undefined':如果这个值未定义
- 'boolean':这个值是布尔值
- 'string': 这个值是字符串
- 'number':这个值是数值
- 'object':这个值是对象或null
- 'function':这个值是函数

typeof是一个操作符而不是函数，因此typeof(value)中的圆括号尽量可以使用，但不是必须的。

### 3.3.2. Undefined类型

Undefined类型只有一个undefined值。在使用var声明变量但未对其进行初始化时，这个变量的值就是undefined
对未初始化和未声明变量执行typeof操作符都会返回undefined

### 3.3.3. Null类型

Null类型是第二个只有一个值的数据类型，这个特殊的值是null

### 3.3.4. Boolean类型

Boolean类型的字面值true和false是区分大小写的。也就是说True和False（以及其它混合大小写形式）都不是Boolean值，只是标识符。
要将一个值转换为其对应的Boolean值，可以调用转型函数Boolean()
Boolean()值返回值规则

数据类型 | 转换为true的值 | 转换为false的值 
- | :-: | -: 
Boolean | true | false
String | 任何非空字符串 | ""(空字符串)
Number | 任何非零数字值(包括无穷大) | 0和NaN
Object | 任何对象 | null
Undefined | n/a | undefined

### 3.3.5. Number类型

八进制字面值的第一位必须是零(0),然后是八进制序列(0-7)。如果字面值中的数值超出了范围，那么前导零将被忽略，后面的值当作十进制数值解析。
ECMAScript能够表示的最小数值保存在Number.MIN_VALUE，最大值保存在Number.MAX_VALUE。如果数值超过这个范围，将自动转换成Infinity值。
要想确定一个数值是不是有穷的，可以用IsFinite()函数，这个函数在参数位于最小值与最大值之间会返回true。
NaN(not a number)即非数值，是一个特殊的数值，其特点：

- 任何涉及NaN的操作都会返回NaN
- NaN与任何值都不相等，包括NaN本身。

ECMAScript定义了isNaN()函数，判断这个参数是否"不是数值",任何不能被转换为数值的值都会导致这个函数返回true
可以把非数值转换成数值的函数：Number(),parseInt(),parseFloat()
Number()转换规则：

- 如果是Boolean值，true和false将分别转换成1和0
- 如果是数字值，则是简单的传入和传出
- 如果是null值，返回0
- 如果是undefined，返回NaN
- 如果是字符串，则遵循下列规则：
  - 如果字符串中只包含数字(包括前面带正号或者带负号的情况),则将其转换为十进制数值。注意前导零会被忽略。
  - 如果字符串中包含有效的浮点格式，则将其转换成对应的浮点数值，同样会忽略前导零。
  - 如果字符串中包含有效的十六进制格式，例如：'0xf",则将其转换为相同大小的十进制整数值。
  - 如果字符串是空的(不包含任何字符),则将其转换成0
  - 如果字符串中包含除上述格式之外的字符，则将其转换为NaN

- 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，然后再依次按照前面的规则转换返回的字符串值。

处理整数时常用的parseInt()函数，其转换过程为：忽略字符串前面的空格，直到找到第一个非空格字符，如果第一个字符不是数字字符或负号，则会返回NaN。

```javascript
//parseInt小例子
var number = parseInt("1234blue");// 1234
var number = parseInt("");        // NaN
var number = parseInt("22.5");    // 22
var number = parseInt("0xf");     // 15(16进制数)
var number = parseInt("070");     // 56(8进制数)
var number = parseInt("70");      // 70(10进制数)
```

parseInt(value,进制)//第二个参数可以指定基数

parseFloat()与parseInt()类似，它们的区别是前者

- 第一个小数点有效
- 如终忽略前导的零

### 3.3.6. String类型

转义：

- \xnn : 以十六进制代码nn表示的一个字符(其中n为0-F).如\x41表示"A"

- \unnnn: 以十六进制代码nnnn表示的一个Unicode字符(其中n为0-F).如：\u03a3表示希腊字符

字符串转换方法

- toString()：null和undefined值没有这个方法，默认情况下数字返回十进制，也可以指定基数toString(进制)

- String()：在不知道转换的值是不是null或undefined情况下使用，这个函数能够将任何类型的值转换成字符串。如果是null，是返回"null"，undefined返回"undefined" 

### 3.3.7. Object类型

Object类型都具有的属性和方法

- Constructor：保存着用于创建当前对象的函数。
- hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在。其中，作为参数的属性名(propertyName)必须以字符串的形式指定。
- isPrototypeOf(Object):用于检查传入的对象是否是另一个对象的原型。   
- propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in语句来枚举。
- toLocaleString():返回对象的字符串表示，该字符串与执行环境的地区对应。
- toString():返回对象的字符串表示。
- valueOf():返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同中。

## 3.4. 操作符

### 3.4.1. 位操作符

无符号右移操作符由3个大于号(&gt;&gt;&gt;)表示。

### 3.4.2. 布尔操作符

布尔操作有三个：非(NOT)、与(AND)和或(OR)
逻辑非运算符规则：

- 如果操作数是一个对象，返回false.
- 如果操作数是一个空字符串，则返回true.
- 如果操作数是一个非空字符串，返回false.
- 如果操作数是数值0，返回true.
- 操作数是任意非零数值(包括Infinity)，返回false.
- 如果操作操作数是null，返回true.
- 操作数是NaN，返回true.
- 操作数是undefined，返回true.

### 3.4.3. 乘性操作符

乘性操作符有三个：乘法、除法和求模。
如果参与乘法计算的某个操作数不是数值，后台会先使用Number()转型函数将其转换成数值。
### 3.4.4. 相等操作符

全等操作符由3个等号(===)表示，它只在两个操作数未经转换就相等的情况下返回true.

## 3.5. 语句

### 3.5.1. label语句

使用lable语句可以在代码中添加标签，以便将来使用。语法如下：

```javacript
label:statement
```

### 3.5.2. with语句

with语句的作用是将代码的作用域设置到一个特定的对象中，with语句的语法如下：

```javacript
with(expression) statement;
```

定义with的目的主要是为了简化多次编写同一个对象的工作。

```javacript
var qs = location.search.substring(1);
var hostName = location.hostName;
var url = location.href;
//使用with
with(location){
    var qs = search.substring(1);
    var hostName = hostName;
    var url = href;
}
```

严格模式下不允许使用with语句，否则被视为语法错误。
with语句不建议使用。

## 3.6. 函数

### 3.6.1. 理解参数

ECMAScrip函数不介意传进来多少个参数，也不在乎传进来参数是什么类型。原因是ECAMScript中的参数内部是用一个数组来表示。函数接收的始终是这个数组，而不关心数组中包含哪些参数。在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递参数的每一个参数。
ECMAScript函数的一个重要特点：命名的参数只提供便利，但不是必需的。

# 4. 变量、作用域和内存问题

## 4.1. 基本类型和引用类型的值

### 4.1.1. 传递参数

ECMAScript中所有函数的参数都是按值来传递的。
例子：

```javacript
function setName(obj){
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name);  //"Nicholas"
```

### 4.1.2. 检测类型

typeof操作符是确定一个变量是字符串、数值、布尔值，还是undefined的最佳工具。
使用typeof操作符检测函数时，返回"function"
检测引用类型的时，提供instanceof.

## 4.2. 执行环境及作用域

每个执行环境都有一个与之关联变量对象，环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。
每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。
当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，由将其活动对象(activation object)作为变量对象。活动对象最开始时只包含一个变量，即arguments对象(这个对象在全局环境中是不存在的)。作用域链中的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境。这样一直延续到全局执行环境。全局执行环境的变量对象始终都是作用域链的最后一个对象。
标识符解析是沿着作用域链一级一级地搜索标识符的过程。

### 4.2.1. 没有块级作用域

JavaScript没有块级作用域。

1. 声明变量

使用var声明的变量会自动被添加到最接近的环境中。如果初始化变量时没有var声明，该变量会自动添加到全局环境。

## 4.3. 垃圾收集

### 4.3.1. 标记清除

javascript中最常用的垃圾收集方式是标记清除(mark-and-sweep).

### 4.3.2. 引用计数

另一种不太常见的垃圾收集策略叫做引用记数。

### 4.3.3. 管理内存

优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为null来释放引用--这个做法叫做解除引用(derefrencing)。

# 5. 引用类型

对象是某个特定引用类型的实例。

## 5.1. Object类型

创建Object实例的方式有两种。
第一种是new操作符后跟object构造函数。
另一种方式是使用对象字面量表示法

```javacript
var person = {
    name:"Nicholas",
    age:29
}
```

## 5.2. Array类型

与其它语言不同的是，ECMAScript数组的每一项都可以保存任何类型的数据。而且ECMAScript数组的大小是可以动态调整的，即可以随着数据的添加自动增长以容纳新增数据。
创建数组的基本方式有两种：

- 第一种是使用Array构造函数

```javacript
var colors = new Array();
```

也可以省略new操作符

```javacript
var colors = Array(3);
```

- 第二种是使用数据字面量表示法。数组的字面量由一对包含数组项的方括号表示，多个数组项之间以逗号隔开。

```javacript
var colors = ["red","blue","green"];
```

数组的length属性很有特点：它不是只读的。利用length属性可以方便地在数组末尾添加新项：

```javacript
colors[colors.length] = "black";
```

### 5.2.1. 检测数组

- instanceof检测

```javacript
if (value instanceof Array) {
    //对数组执行某些操作
}
```

- Array.isArray()方法

```javacript
if(Array.isArray(value)){
    //对数组执行某些操作
}
```

### 5.2.2. 栈方法

数组可以表现的像栈一样。
栈是一种LIFO(Last-In-First-Out)后进先出的数据结构。ECAMScript为数组专门提供了push()和pop()方法，以便实现类似栈的行为。
push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
pop()方法则从数组末尾移除最后一项，减少数组的length值，然后返回移除的项。

### 5.2.3. 队列方法

队列数据结构的访问规则是FIFO(First-In-First-Out)先进先出。实现这一操作的数组方法是shift(),它能够移除数组中的第一项并返回该项，同时将数组长度减速1.结合shift()和push()方法，可以像队列一样使用数组。
unshift()方法与shift()方法作用相反。它能够在数组前端添加任意个项并返回新数组的长度。因此unshift()与pop()方法，可以从相反的方向来模拟队列，即在数组的前端添加项，从数组的末尾移除项。

### 5.2.4. 重排序方法

数组中已经存在两个可以用来重排序的方法：reverse()和sort()方法。
reverse()会反转数组项的顺序。
sort()方法在默认情况下会按升序排列数组项。
sort()方法会调用每个数组项的toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值，sort()方法比较的也是字符串。
sort()方法可接收一个比较函数作为参数，以便我们指定哪个值在哪个值前面。比较函数接收两个参数，如果第一个参数应该位于每二个之前同返回一个负数。如果两个参数相等则返回0，如果第一个参数应该位于第二个之后则返回一个正数。
比较函数示例：

```javacript
function compare(value1,value2){
    if(value1&lt;value2){
        return -1;
    }else if(value1&gt;value2){
        return 1;
    }else{
        return 0;
    }
}
```

对于数据值类型的比较函数可以简化为

```javacript
function compare(value1,value2){
  return value2 - value1;
}
```

### 5.2.5. 操作方法

#### 5.2.5.1. concat()方法

- 无参数情况下复制当前数组并返回副本

- 参数是一个或多个数组，则会将这些数组中的每一项都添加到结果数组中

- 参数不是数组，则会简单地添加到结果数组的末尾

#### slice()方法

可接收一个或两个参数，不影响原数组

- 一个参数时，返回从该参数指定位置开始到当前数组末尾的所有项

- 两个参数时，返回起始位置和结束位置中间的项，但不包括结束位置的项。如果结束位置小于起始位置则返回空数组

如果参数中有负数，则用该数组的长度加上该数来确定位置。

#### splice()方法（最强大的数组方法）

主要用途是向数组中部插入项，该方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）

- 删除：可以删除任意数量的项，只需要指定2个参数，要删除的第一项的位置和要删除的项数。

- 插入和替换: 向指定位置插入任意数量的项，只需要提供3个参数：起始位置、0（要删除的项数）、要插入的项（可以是多个项）。

### 位置方法

两个方法：indexOf()和lastIndexOf().这两个方法都接收两个参数

- 要查找的项

- 表示查找起点的索引（可选）

### 迭代方法

5个迭代方法，每个方法都接收2个参数，如下：

- 要在每一项上运行的函数，该函数会接收3个参数。
     1 数组项的值
     2 该项在数组中的位置
     3 数组对象本身

- 运行该函数的作用域对象（可选），该参数影响this的值

5个迭代方法都会对数组中的每一项运行指定函数，区别如下：

- every():如果函数对每一项都返回ture，则返回true，(&&)

- filter():返回运行指定函数返回true的项的数组。

- forEach():无返回值

- map():返回每次函数调用的结果组成的数组。

- some():如果该函数对任意一项返回ture，则返回ture,(||)

### 缩小方法

2个缩小数组的方法：reduce()和reduceRight().区别是reduce()方法从数组的第一项开始，逐个遍历到最后，reduceRight()则方向相反。
两个方法都接收2个参数

- 在每一项上调用的函数,函数接收4个参数
    1 前一个值
    2 当前值
    3 项的索引
    4 数组对象

- 作为缩小基础的初始值（可选）

# 6. 面向对象的程序设计

# 7. 函数表达式

# 8. BOM

# 9. 客户端检测

# 10. DOM

# 11. DOM扩展

# 12. DOM的DOM

# 13. 事件

# 14. 表单脚本

# 15. 使用Canvas绘图

# 16. HTML脚本编程

# 17. 错误处理与脚本调试

# 18. Javascript与XML

# 19. EX

# 20. JSON

# 21. Ajax与Comet

# 22. 高级技巧

# 23. 离线应用与客户端存储

# 24. 最佳实践

# 25. 新兴的API




