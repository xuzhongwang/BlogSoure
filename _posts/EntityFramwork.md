---
title: EntityFramwork
date: 2018-02-01 13:28:22
tags:
---
# 问题记录

## 未找到实例框架程序

未找到具有固定名称“System.Data.SqlClient”的 ADO.NET 提供程序的实体框架提供程序。请确保在应用程序配置文件的“entityFramework”节中注册了该提供程序。有关详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkId=260882

解决方法，在项目中添加EntityFramework.SqlServer.dll引用

# EntityFramwork 操作Access



## 注册

```bash
C:\Windows\Microsoft.NET\Framework\v4.0.30319\Config\machine.config
```

## EntityFramework 启用迁移 Enable-Migrations 报异常 "No context type was found in the assembly"

转载 2017年04月17日 15:43:11 343
以前做项目的时候，没有采用分类库的形式，所以迁移一致非常顺利，没有出现过任何状况。

这次做项目稍微有点大，必须要分类库才方便开发维护。

在解决方案中启用项目EntityFramework迁移时却发生了异常。

异常说在我的项目中没有找到DBContext类。

这个DBContext类确实没有放在启动项目下面，是另外建立了一个独立的类库来存放。

在启动项目中引用了却无法找到。。。

查看get-help Enable-Migrations帮助，发现启用迁移命令带了几个参数。

Enable-Migrations [-ContextTypeName <String>] [-EnableAutomaticMigrations] [-ProjectName <String>] [-StartUpProjectName <String>] [-ConnectionStringName <String>] [-Force] [<CommonParameters>]

ContextTypeName：项目继承自DBContext的类名字。

EnableAutomaticMigrations：开启自动迁移。

ProjectName：存放DBContext类的项目名称。

StartUpProjectName：解决方案中启动项目的名称，作用是调用该项目下的连接字符串。

ConnectionStringName：连接字符串名称

上面五个参数是解决问题必须的，其它的无关紧要。

例如：

Enable-Migrations -ContextTypeName "DBAccessLib.TJSSDBContext" -ProjectName "DBAccessLib" -StartUpProjectName "WebSite" -ConnectionStringName "TJSSDBContext" -Verbose

依次填好之后，问题解决。

同样的在Add-Migration、Update-Database的时候也需要填写相应的参数。否则会出现同样错误。

例如：

Add-Migration -Name "EditCST_DevicePhoto"  -ProjectName "DBAccessLib" -StartUpProjectName "WebSite" -ConnectionStringName "TJSSDBContext" -Verbose

Update-Database -Script -ProjectName "DBAccessLib" -StartUpProjectName "WebSite" -ConnectionStringName "TJSSDBContext"  -Verbose

使用过程中注意去掉 script参数