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

4. 变量、作用域和内存问题

5. 引用类型
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

