---
title: Emmet语法
date: 2018-08-08 16:02:35
tags:
---
# 1. Emmet Html 语法

## 1.1. 元素

- 输入元素名称，自动生成标签,如 div

```html
<div></div>
```

- 输入 ! 或 html:5 自动补全基本结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
</body>
</html>
```

## 1.2. 嵌套操作

- child:使用 “>" 生成子元素

div>ul>li

```html
<div>
	<ul>
		<li></li>
	</ul>
</div>
```

- Sibling: 使用符号 “+” 生成兄弟元素

div+p+bq

```html
<div></div>
<p></p>
<blockquote></blockquote>
```

- Climb-up:使用 “^” 生成父元素，与 “>” 相反

div+div>p>span+em^bq

```html
<div></div>
<div>
	<p><span></span><em></em></p>
	<blockquote></blockquote>
</div>
```

- Multiplication:使用 “*” 操作符生成多个元素

div>ul>li*5

```html
<div>
	<ul>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</div>
```

- Grouping:使用 “()” 操作符将元素分组，实现更复杂的简写任务

div>(header>ul>li*2)+footer>p

```html
<div>
	<header>
		<ul>
			<li></li>
			<li></li>
		</ul>
	</header>
	<footer>
		<p></p>
	</footer>
</div>
```

## 1.3. 属性操作

- id 与 class

简写时，元素与 id 属性值之间用 “#” 分隔，与 class 属性值之间用 “.” 分隔。

div#header+div.page+div#footer.class1.class2.class3

```html
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

- 其它属性

使用 [attr] 标记添加其他属性。

```html
<td title="hello" colspan="3"></td>
```

注意：

    - 方括号中可添加任意数量的属性
    - 不给定属性值，则属性值为""。td[colspan title]将得到

    ```html
    <td colspan="" title=""></td>
    ```

    - 属性值可用单引号或双引号，输出统一为双引号
    - 如果属性值中没有空格，则引号可省略

- 为条目编号

```html
li.item$*3

<li class="item1"></li>
<li class="item2"></li>
<li class="item3"></li>
```

可在 “$” 后添加 “@n” 修改编号的起始值为n。

```html
li.item$@3*3

<li class="item3"></li>
<li class="item4"></li>
<li class="item5"></li>
```

可在 “$” 后添加 “@-” 修改编号的方向。

```html
li.item$@-3*3

<li class="item5"></li>
<li class="item4"></li>
<li class="item3"></li>
```

## 1.4. 添加文本

使用花括号 “{}” 操作符为元素添加文本节点。

```html
// before
a[href=me.htm]{click me}

// after
<a href="me.htm">click me</a>
```

因为文本也是节点，所以 a[href=me.htm]{click me} 与 a[href=me.htm]>{click me} 等价。

但有多个元素时则要注意。

```html
// before
a[href=me.htm]{click me}+p{ok}
a[href=me.htm]>{click me}+p{ok}

// after
<a href="me.htm">click me</a>
<p>ok</p>

<a href="me.htm">click me
    <p>ok</p>
</a>
```