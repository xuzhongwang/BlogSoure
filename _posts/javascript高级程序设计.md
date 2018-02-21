---
title: javascript高级程序设计
date: 2018-01-30 17:31:19
tags:
---

1. JavaScript简介
1.1 JavaScript简史
最初设计的主要目的是为了处理以前由服务器端语言(如Perl)负责的一些输入验证操作。
1.2 JavaScript实现
一个完整的JavaScript实现由三部分组成
- 核心：ECMAScript
- 文档对象模型：DOM
- 浏览器对象模型：BOM
2. 在HTML中使用JavaScript
2.1 <script>元素
带有src属性的<script>元素不应该在其<script>和</script>标签之间再包含额外的javascript代码。如果包含了嵌入的代码，则只会加载并执行外部脚本文件，嵌入的代码会被忽略。
2.1.2 延迟脚本
HTML4.0.1为<script>标签定义了defer属性。这个属性的用途是表明脚本在执行时不会影响页面构造。也就是说脚本会延迟到整个页面都解析完成后再运行。相当于告诉浏览器立即下载但延迟执行。
defer属性只适用于外部文件。
2.1.2  异步脚本  
async只适用于外部文件脚本，其与defer的不同点：
不能保证按照指定的先后顺序执行。因此确定两者之间互不依赖很重要。
2.1.4 在XHTML中的用法
什么是XHTML：将HTML作为XML的应用而重新定义的一个标准。

2.2 嵌入代码与外部文件
使用外部文件的优点
- 可维护性
- 可缓存
- 适应未来

3. 基本概念
任何语言的核心都必然会描述这门语言最基本的工作原理。而描述的内容通常都要涉及这门语言的语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念。
3.1.1 区分大小写
ECMAScript中的一切(变量、函数名和操作符)都区分大小写。
3.1.4 严格模式
要在整个脚本中启用严格模式，可以在顶部添加如下代码：
```
"use strict"
```
也可以指定函数在严格模式下执行：
```
function(){
    "use strict"
    do something;
}
```
3.3 变量
ECMAScript中的变量是松散类型的。所谓的松散类型是可以保存任何类型数据。换句话说，每个变量仅仅是一个用于保存值的占位符而已。
3.4 数据类型
ECMAScript中有5种简单的数据类型，也称为基本数据类型。
Undefined，Null，Boolean，Number，String和复杂的数据类型Object(本质上由一组无序的名值对组成)
3.4.1 typeof操作符
typeof的可能结果
- 'undefined':如果这个值未定义
- 'boolean':这个值是布尔值
- 'string': 这个值是字符串
- 'number':这个值是数值
- 'object':这个值是对象或null
- 'function':这个值是函数
typeof是一个操作符而不是函数，因此typeof(value)中的圆括号尽量可以使用，但不是必须的。
3.4.2 Undefined类型
Undefined类型只有一个undefined值。在使用var声明变量但未对其进行初始化时，这个变量的值就是undefined
对未初始化和未声明变量执行typeof操作符都会返回undefined
3.4.3 Null类型
Null类型是第二个只有一个值的数据类型，这个特殊的值是null
3.4.4 Boolean类型
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
3.4.5 Number类型
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
```
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
3.4.6 String类型
转义：
- \xnn : 以十六进制代码nn表示的一个字符(其中n为0-F).如\x41表示"A"
- \unnnn: 以十六进制代码nnnn表示的一个Unicode字符(其中n为0-F).如：\u03a3表示希腊字符
字符串转换方法
- toString()：null和undefined值没有这个方法
默认情况下数字返回十进制，也可以指定基数toString(进制)
- String()：在不知道转换的值是不是null或undefined情况下使用，这个函数能够将任何类型的值转换成字符串。如果是null，是返回"null"，undefined返回"undefined"      
3.4.7 Object类型
Object类型都具有的属性和方法
- Constructor：保存着用于创建当前对象的函数。
- hasOwnProperty(propertyName):用于检查给定的属性在当前对象实例中(而不是在实例的原型中)是否存在。其中，作为参数的属性名(propertyName)必须以字符串的形式指定。
- isPrototypeOf(Object):用于检查传入的对象是否是另一个对象的原型。   
- propertyIsEnumerable(propertyName):用于检查给定的属性是否能够使用for-in语句来枚举。
- toLocaleString():返回对象的字符串表示，该字符串与执行环境的地区对应。
- toString():返回对象的字符串表示。
- valueOf():返回对象的字符串、数值或布尔值表示。通常与toString()方法的返回值相同中。
3.5.2. 位操作符
无符号右移操作符由3个大于号(>>>)表示。、
3.5.3 布尔操作符
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
3.5.4 乘性操作符
乘性操作符有三个：乘法、除法和求模。
如果参与乘法计算的某个操作数不是数值，后台会先使用Number()转型函数将其转换成数值。
3.5.7 相等操作符
全等操作符由3个等号(===)表示，它只在两个操作数未经转换就相等的情况下返回true.
3.6.6 label语句
使用lable语句可以在代码中添加标签，以便将来使用。语法如下：
```
label:statement
```

3.6.8 with语句
with语句的作用是将代码的作用域设置到一个特定的对象中，with语句的语法如下：
```
with(expression) statement;
```
定义with的目的主要是为了简化多次编写同一个对象的工作。
```
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

3.7.1 理解参数
ECMAScrip函数不介意传进来多少个参数，也不在乎传进来参数是什么类型。原因是ECAMScript中的参数内部是用一个数组来表示。函数接收的始终是这个数组，而不关心数组中包含哪些参数。在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递参数的每一个参数。
ECMAScript函数的一个重要特点：命名的参数只提供便利，但不是必需的。

4. 变量、作用域和内存问题
4.1 基本类型和引用类型的值
4.1.3 传递参数
ECMAScript中所有函数的参数都是按值来传递的。
例子：
```
function setName(obj){
    obj.name = "Nicholas";
    obj = new Object();
    obj.name = "Greg";
}
var person = new Object();
setName(person);
alert(person.name);  //"Nicholas"
```

4.1.4 检测类型
typeof操作符是确定一个变量是字符串、数值、布尔值，还是undefined的最佳工具。
使用typeof操作符检测函数时，返回"function"
检测引用类型的时，提供instanceof.

4.2 执行环境及作用域
每个执行环境都有一个与之关联变量对象，环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。
每个函数都有自己的执行环境。当执行流进入一个函数时，函数的环境会被推入一个环境栈中。而在函数执行之后，栈将其环境弹出，把控制权返回给之前的执行环境。
当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，由将其活动对象(activation object)作为变量对象。活动对象最开始时只包含一个变量，即arguments对象(这个对象在全局环境中是不存在的)。作用域链中的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境。这样一直延续到全局执行环境。全局执行环境的变量对象始终都是作用域链的最后一个对象。
标识符解析是沿着作用域链一级一级地搜索标识符的过程。
4.2.2 没有块级作用域
JavaScript没有块级作用域。
1. 声明变量
使用var声明的变量会自动被添加到最接近的环境中。如果初始化变量时没有var声明，该变量会自动添加到全局环境。
4.3 垃圾收集
4.3.1 标记清除
javascript中最常用的垃圾收集方式是标记清除(mark-and-sweep).
4.3.2 引用计数
另一种不太常见的垃圾收集策略叫做引用记数。
4.3.4 管理内存
优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据。一旦数据不再有用，最好通过将其值设置为null来释放引用--这个做法叫做解除引用(derefrencing)。

5. 引用类型
对象是某个特定引用类型的实例。
5.1 Object类型

6. 面向对象的程序设计
7. 函数表达式
8. BOM
9. 客户端检测
10. DOM
11. DOM扩展
12. DOM2的DOM3
13. 事件
14. 表单脚本
15. 使用Canvas绘图
16. HTML5脚本编程
17. 错误处理与脚本调试
18. Javascript与XML
19. E4X
20. JSON
21. Ajax与Comet
22. 高级技巧
23. 离线应用与客户端存储
24. 最佳实践
25. 新兴的API
26. 

