---
title: razor语法
date: 2018-01-04 09:38:00
tags:
---

# Razor标识符与任务域
@字符被定义为Razor服务器代码块的标识符，后面的表示的是服务器代码。
{}表示Razor的作用域
```
@{string userName= "razor test";}
    <span>@userName</span>
    <span>@DateTime.Now.ToString("yyyy-MM-hh")</span>
```
# Razor注释
```
@{
   @*
       多行注释
   *@
   var i = 10;  @* 单行注释 *@
}
```
# Razor类型转换
  AsInt(), IsInt()
　AsBool(),IsBool()
  AsFloat(),IsFloat()
　AsDecimal(),IsDecimal()
　AsDateTime(),IsDateTime()
　ToString()
```
@{
    var i = “10”;
}
<p> i = @i.AsInt() </p> <!-- 输出 i = 10 --> 
```
# 布局Layout
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>@ViewBag.Title</title>
    @Styles.Render("~/Content/css")
    @Scripts.Render("~/bundles/modernizr")
</head>
<body>
    @RenderBody()

    @Scripts.Render("~/bundles/jquery")
    @RenderSection("scripts", required: false)
</body>
</html>
```
-  @RenderBody
-  @Scripts.Render
-  @RenderSection