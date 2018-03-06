---
title: EntityFramwork
date: 2018-02-01 13:28:22
tags:
---
# 1. 问题记录

## 1.1. 未找到实例框架程序

未找到具有固定名称“System.Data.SqlClient”的 ADO.NET 提供程序的实体框架提供程序。请确保在应用程序配置文件的“entityFramework”节中注册了该提供程序。有关详细信息，请参阅 http://go.microsoft.com/fwlink/?LinkId=260882

解决方法，在项目中添加EntityFramework.SqlServer.dll引用

# 2. EntityFramwork 操作Access

## 2.1. 注册

```bash
C:\Windows\Microsoft.NET\Framework\v4.0.30319\Config\machine.config
```

## 2.2. EntityFramework 启用迁移 Enable-Migrations 报异常 "No context type was found in the assembly"

查看get-help Enable-Migrations帮助，发现启用迁移命令带了几个参数。

Enable-Migrations [-ContextTypeName <String>] [-EnableAutomaticMigrations] [-ProjectName <String>] [-StartUpProjectName <String>] [-ConnectionStringName <String>] [-Force] [<CommonParameters>]

ContextTypeName：项目继承自DBContext的类名字。

EnableAutomaticMigrations：开启自动迁移。

ProjectName：存放DBContext类的项目名称。

StartUpProjectName：解决方案中启动项目的名称，作用是调用该项目下的连接字符串。

ConnectionStringName：连接字符串名称

上面五个参数是解决问题必须的，其它的无关紧要。

例如：

```bash
Enable-Migrations -ContextTypeName "DBAccessLib.TJSSDBContext" -ProjectName "DBAccessLib" -StartUpProjectName "WebSite" -ConnectionStringName "TJSSDBContext" -Verbose
```

依次填好之后，问题解决。

同样的在Add-Migration、Update-Database的时候也需要填写相应的参数。否则会出现同样错误。

例如：

```bash
Add-Migration -Name "EditCST_DevicePhoto"  -ProjectName "DBAccessLib" -StartUpProjectName "WebSite" -ConnectionStringName "TJSSDBContext" -Verbose

Update-Database -Script -ProjectName "DBAccessLib" -StartUpProjectName "WebSite" -ConnectionStringName "TJSSDBContext"  -Verbose
```

使用过程中注意去掉 script参数

## 2.3. Migration 数据迁移常用命令

```bash
PM> Enable-Migrations -EnableAutomaticMigrations
PM> Add-Migration InitialCreate
PM> Update-Database -Verbose
PM> Update-Database –TargetMigration:"201309201643300_AddCity.cs"

生成数据库版本之间的Sql脚本
　　执行程序包管理器控制台语句，生成数据库版本之间的Sql脚本。该操作仅为生成Sql语句，并未在数据库中进行执行。
Update-Database -Script -SourceMigration:"201309201643300_AddCity.cs" -TargetMigration:"201309201708043_ModifyCity.cs" 

```