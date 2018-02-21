---
title: Log4net学习
date: 2018-01-06 18:12:28
tags:
---

# Log4net的结构
Log4net有四种主要组件，分别是：
- Logger：记录器
- Repository：库
- Appender：附着器
- Layout：布局
## Logger
Logger是应用程序需要交互的主要组件，它用来产生日志消息。产生的日志消息并不直接显示，还要预先经过Layout的格式化处理后才会输出。
Logger提供了多种方式来记录一个日志消息，你可以在你的应用程序里创建多个Logger，每个实例化的Logger对象都被log4net框架作为命名实体(named entity)来维护。这意味着为了重用Logger对象，你不必将它在不同的类或对象间传递，只需要用它的名字为参数调用就可以了。log4net框架使用继承体系，继承体系类似于.NET中的名字空间。也就是说，如果有两个logger,分别被定义为a.b.c和a.b，那么我们说a.b是a.b.c的祖先。每一个logger都继承了祖先的属性。
Log4net框架定义了一个ILog接口，所有的logger类都必须实现这个接口。
Log4net框架定义了一个叫做LogManager的类，用来管理所有的logger对象。它有一个GetLogger()静态方法，用我们提供的名字参数来检索已经存在的Logger对象。如果框架里不存在该Logger对象，它也会为我们创建一个Logger对象。代码如下所示：
```
log4net.ILog log = log4net.LogManager.GetLogger("logger-name");
```
通常来说，我们会以类（class）的类型（type）为参数来调用GetLogger()，以便跟踪我们正在进行日志记录的类。传递的类(class)的类型(type)可以用typeof(Classname)方法来获得，或者可以用如下的反射方法来获得：
```
System.Reflection.MethodBase.GetCurrentMethod().DeclaringType
```
尽管符号长了一些，但是后者可以用于一些场合，比如获取调用方法的类(class)的类型(type)。
## 日志的级别
日志的级别作为常量定义在log4net.spi.Level类中。
级别由低到高
```
All Debug Info Warn Error Fatal Off
```
在log4net框架里，通过设置配置文件，每个日志对象都被分配了一个日志优先级别。如果没有给一个日志对象显式地分配一个级别，那么该对象会试图从他的祖先继承一个级别值。
举例说明，当你创建了一个日志对象，并且把他的级别设置为INFO。于是框架会设置日志的每个Boolean属性。当你调用相应的日志方法时，框架会检查相应的Boolean属性，以决定该方法能不能执行。如下的代码：
```
Logger.Info("message");
Logger.Debug("message");
Logger.Warn("message");
```
对于第一种方法，Info()的级别等与日志的级别（INFO），因此日志请求会被传递，我们可以得到输出结果”message”。
对于第二种方法，Debug()的级别低于日志对象logger的日志级别(INFO)，因此，日志请求被拒绝了，我们得不到任何输出。同样的，针对第三行语句，我们可以很容易得出结论。
你也可以显式地检查Logger对象的Boolean属性，如下所示：
```
if (logger.IsDebugEnabled)
{
  Logger.Debug("message");
}
```
## Repository
Repository主要用于负责日志对象组织结构的维护。在log4net的以前版本中，框架仅支持分等级的组织结构(hierarchical organization)。这种等级结构本质上是库的一个实现，并且定义在log4net.Repository.Hierarchy 名字空间中。要实现一个Repository，需要实现log4net.Repository.ILoggerRepository 接口。但是通常并不是直接实现该接口，而是以log4net.Repository.LoggerRepositorySkeleton为基类继承。体系库 (hierarchical repository )则由log4net.Repository.Hierarchy.Hierarchy类实现。
如果你是个log4net框架的使用者，而非扩展者，那么你几乎不会在你的代码里用到Repository的类。相反的，你需要用到LogManager类来自动管理库和日志对象
## Appender
一个好的日志框架应该能够产生多目的地的输出。比如说输出到控制台或保存到一个日志文件。log4net 能够很好的满足这些要求。它使用一个叫做Appender的组件来定义输出介质。正如名字所示，这些组件把它们附加到Logger日志组件上并将输出传递到输出流中。你可以把多个Appender组件附加到一个日志对象上。 Log4net框架提供了几个Appender组件。关于log4net提供的Appender组件的完整列表可以在log4net框架的帮助手册中找到。有了这些现成的Appender组件，一般来说你没有必要再自己编写了。但是如果你愿意，可以从log4net.Appender.AppenderSkeleton类继承。
## Appender Filters
一个Appender 对象缺省地将所有的日志事件传递到输出流。Appender的过滤器(Appender Filters) 可以按照不同的标准过滤日志事件。在log4net.Filter的名字空间下已经有几个预定义的过滤器。使用这些过滤器，你可以按照日志级别范围过滤日志事件，或者按照某个特殊的字符串进行过滤。你可以在API的帮助文件中发现更多关于过滤器的信息。
## Layout
Layout 组件用于向用户显示最后经过格式化的输出信息。输出信息可以以多种格式显示，主要依赖于我们采用的Layout组件类型。可以是线性的或一个XML文件。Layout组件和一个Appender组件一起工作。API帮助手册中有关于不同Layout组件的列表。一个Appender对象，只能对应一个Layout对象。要实现你自己的Layout类，你需要从log4net.Layout.LayoutSkeleton类继承，它实现了ILayout接口。

# 在程序中使用
在开始对你的程序进行日志记录前，需要先启动log4net引擎。这意味着你需要先配置前面提到的三种组件。你可以用两种方法来设定配置：在单独的文件中设定配置或在代码中定义配置。
因为下面几种原因，推荐在一个单独的文件中定义配置：
- 你不需要重新编译源代码就能改变配置；
- 你可以在程序正运行的时候就改变配置。这一点在一些WEB程序和远程过程调用的程序中有时很重要；
考虑到第一种方法的重要性，我们先看看怎样在文件中设定配置信息。

## 配置文件
配置信息可以放在如下几种形式文件的一种中。
在程序的配置文件里，如AssemblyName.config 或web.config.
在你自己的文件里。文件名可以是任何你想要的名字，如AppName.exe.xyz等.
log4net框架会在相对于AppDomain.CurrentDomain.BaseDirectory 属性定义的目录路径下查找配置文件。框架在配置文件里要查找的唯一标识是<log4net>标签。一个完整的配置文件的例子如下：
```
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <configSections>
    <section name="log4net"
      type="log4net.Config.Log4NetConfigurationSectionHandler,  log4net-net-1.0"/>
  </configSections>
  <log4net>
    <root>
      <level value="WARN" />
      <appender-ref ref="LogFileAppender" />
      <appender-ref ref="ConsoleAppender" />
    </root>
    <logger name="testApp.Logging">
      <level value="DEBUG"/>
    </logger>
    <appender name="LogFileAppender"
             type="log4net.Appender.FileAppender" >
      <param name="File" value="log-file.txt" />
      <param name="AppendToFile" value="true" />
      <layout type="log4net.Layout.PatternLayout">
        <param name="Header" value="[Header]\r\n"/>
        <param name="Footer" value="[Footer]\r\n"/>
        <param name="ConversionPattern"
           value="%d [%t] %-5p %c [%x]  - %m%n"
         />
      </layout>
      <filter type="log4net.Filter.LevelRangeFilter">
        <param name="LevelMin" value="DEBUG" />
        <param name="LevelMax" value="WARN" />
      </filter>
    </appender>
    <appender name="ConsoleAppender"
              type="log4net.Appender.ConsoleAppender" >
      <layout type="log4net.Layout.PatternLayout">
        <param name="ConversionPattern"
           value="%d [%t] %-5p %c [%x] - %m%n"
        />
      </layout>
    </appender>
  </log4net>
</configuration>
```
你可以直接将上面的文本拷贝到任何程序中使用，但是最好还是能够理解配置文件是怎样构成的。 只有当你需要在应用程序配置文件中使用log4net配置时，才需要在<configSection>标签中加入<section>配置节点入口。对于其他的单独文件，只有<log4net>标签内的文本才是必需的，这些标签的顺序并不是固定的。下面我们依次讲解各个标签内文本的含义：
### <root>
```
<root>
  <level value="WARN" />
  <appender-ref ref="LogFileAppender" />
  <appender-ref ref="ConsoleAppender" />
</root>
```
在框架的体系里，所有的日志对象都是根日志(root logger)的后代。 因此如果一个日志对象没有在配置文件里显式定义，则框架使用根日志中定义的属性。在<root>标签里，可以定义level级别值和Appender的列表。如果没有定义LEVEL的值，则缺省为DEBUG。可以通过<appender-ref>标签定义日志对象使用的Appender对象。<appender-ref>声明了在其他地方定义的Appender对象的一个引用。在一个logger对象中的设置会覆盖根日志的设置。而对Appender属性来说，子日志对象则会继承父日志对象的Appender列表。这种缺省的行为方式也可以通过显式地设定<logger>标签的additivity属性为false而改变。
```
<logger name="testApp.Logging" additivity="false">
</logger>
```
Additivity的值缺省是true.

### <Logger>
```
<logger name="testApp.Logging">
  <level value="DEBUG"/>
</logger>
```
<logger> 元素预定义了一个具体日志对象的设置。然后通过调用LogManager.GetLogger(“testAPP.Logging”)函数，你可以检索具有该名字的日志。如果LogManager.GetLogger(…)打开的不是预定义的日志对象，则该日志对象会继承根日志对象的属性。知道了这一点，我们可以说，其实<logger>标签并不是必须的。
### <appender> 
```
<appender name="LogFileAppender"
          type="log4net.Appender.FileAppender" >
  <param name="File" value="log-file.txt" />
  <param name="AppendToFile" value="true" />
  <layout type="log4net.Layout.PatternLayout">
    <param name="Header" value="[Header]\r\n" />
    <param name="Footer" value="[Footer]\r\n"/>
    <param name="ConversionPattern"
      value="%d [%t] %-5p %c - %m%n"
    />
  </layout>
  <filter type="log4net.Filter.LevelRangeFilter">
    <param name="LevelMin" value="DEBUG" />
    <param name="LevelMax" value="WARN" />
  </filter>
</appender>
```

在<root>标签或单个的<logger>标签里的Appender对象可以用<appender>标签定义。<appender>标签的基本形式如上面所示。它定义了appender的名字和类型。 另外比较重要的是<appender>标签内部的其他标签。不同的appender有不同的<param>标签。在这里，为了使用FileAppender,你需要一个文件名作为参数。另外还需要一个在<appender>标签内部定义一个Layout对象。Layout对象定义在它自己的<layout>标签内。<layout>标签的type属性定义了Layout的类型(在本例里是PatternLayout)，同时也确定了需要提供的参数值。Header和Footer标签提供了一个日志会话(logging session)开始和结束时输出的文字。有关每种appender的具体配置的例子，可以在log4net\doc\manual\example-config-appender.html中得到。 

### log4net.Layout.PatternLayout中的转换模式(ConversionPattern)
```
%m(message):输出的日志消息，如ILog.Debug(…)输出的一条消息
%n(new line):换行
%d(datetime):输出当前语句运行的时刻
%r(run time):输出程序从运行到执行到当前语句时消耗的毫秒数
%t(thread id):当前语句所在的线程ID
%p(priority): 日志的当前优先级别，即DEBUG、INFO、WARN…等
%c(class):当前日志对象的名称，例如：
       模式字符串为：%-10c -%m%n
       代码为：
ILog log=LogManager.GetLogger(“Exam.Log”);
log.Debug(“Hello”);
    则输出为下面的形式：
Exam.Log       - Hello
%L：输出语句所在的行号
%F：输出语句所在的文件名
%-数字：表示该项的最小长度，如果不够，则用空格填充
例如，转换模式为%r [%t]%-5p %c - %m%n 的 PatternLayout 将生成类似于以下内容的输出：
176 [main] INFO  org.foo.Bar - Located nearest gas station.
```
### <filter>
最后，让我们看看在Appender元素里的<filter>标签。它定义了应用到Appender对象的过滤器。本例中，我们使用了LevelRangeFilter过滤器,它可以只记录LevelMin和LevelMax参数指定的日志级别之间的日志事件。可以在一个Appender上定义多个过滤器（Filter）,这些过滤器将会按照它们定义的顺序对日志事件进行过滤。其他过滤器的有关信息可以在log4net的SDK文档中找到。

## 使用配置文件
### 关联配置文件
当我们创建了上面的配置文件后，我们接下来需要把它和我们的应用联系起来。缺省的，每个独立的可执行程序集都会定义它自己的配置。log4net框架使用 log4net.Config.DOMConfiguratorAttribute在程序集的级别上定义配置文件。
例如：可以在项目的AssemblyInfo.cs文件里添加以下的语句
```
[assembly:log4net.Config.DOMConfigurator(ConfigFile="filename",
  ConfigFileExtension="ext",Watch=true/false)]
```
- ConfigFile:指出了我们的配置文件的路径及文件名，包括扩展名。
- ConfigFileExtension:如果我们对被编译程序的程序集使用了不同的文件扩展名，那么我们需要定义这个属性，缺省的，程序集的配置文件扩展名为”config”。
- Watch (Boolean属性): log4net框架用这个属性来确定是否需要在运行时监视文件的改变。如果这个属性为true,那么FileSystemWatcher将会被用来监视文件的改变，重命名，删除等事件。
其中：ConfigFile和ConfigFileExtension属性不能同时使用，ConfigFile指出了配置文件的名字，例如，ConfigFile=”Config.txt”
ConfigFileExtension则是指明了和可执行程序集同名的配置文件的扩展名，例如，应用程序的名称是”test.exe”,ConfigFileExtension=”txt”,则配置文件就应该是”test.exe.txt”；
也可以不带参数应用DOMConfiguratio():
```
 [assembly: log4net.Config.DOMConfigurator()]
```
也可以在程序代码中用DOMConfigurator类打开配置文件。类的构造函数需要一个FileInfo对象作参数，以指出要打开的配置文件名。 这个方法和前面在程序集里设置属性打开一个配置文件的效果是一样的。
```
log4net.Config.DOMConfigurator.Configure(
  new FileInfo("TestLogger.Exe.Config"));
```
DOMConfigurator 类还有一个方法ConfigureAndWatch(..), 用来配置框架并检测文件的变化。
以上的步骤总结了和配置相关的各个方面，下面我们将分两步来使用logger对象。

### 创建或获取日志对象
日志对象会使用在配置文件里定义的属性。如果某个日志对象没有事先在配置文件里定义，那么框架会根据继承结构获取祖先节点的属性，最终的，会从根日志获取属性。如下所示：
```
Log4net.ILog log = Log4net.LogManager.GetLogger("MyLogger");
```
### 输出日志信息
可以使用ILog的几种方法输出日志信息。你也可以在调用某方法前先检查IsXXXEnabled布尔变量，再决定是否调用输出日志信息的函数，这样可以提高程序的性能。因为框架在调用如ILog.Debug(…)这样的函数时，也会先判断是否满足Level日志级别条件。
```
if (log.IsDebugEnabled) log.Debug("message");
if (log.IsInfoEnabled) log.Info("message);
```
### 在程序中配置log4net
除了前面讲的用一个配置文件来配置log4net以外，还可以在程序中用代码来配置log4net框架。如下面的例子:
```
// 和PatternLayout一起使用FileAppender

log4net.Config.BasicConfigurator.Configure(

  new log4net.Appender.FileAppender(

     new log4net.Layout.PatternLayout("%d

       [%t]%-5p %c [%x] - %m%n"),"testfile.log"));

 

// using a FileAppender with an XMLLayout

log4net.Config.BasicConfigurator.Configure(

  new log4net.Appender.FileAppender(

    new log4net.Layout.XMLLayout(),"testfile.xml"));

 

// using a ConsoleAppender with a PatternLayout

log4net.Config.BasicConfigurator.Configure(

  new log4net.Appender.ConsoleAppender(

    new log4net.Layout.PatternLayout("%d

      [%t] %-5p %c - %m%n")));

 

// using a ConsoleAppender with a SimpleLayout

log4net.Config.BasicConfigurator.Configure(

  new log4net.Appender.ConsoleAppender(new

    log4net.Layout.SimpleLayout()));
```
尽管这里用代码配置log4net也很方便，但是你却不能分别配置每个日志对象。所有的这些配置都是被应用到根日志上的。

log4net.Config.BasicConfigurator 类使用静态方法Configure 设置一个Appender 对象。而Appender的构造函数又会相应的要求Layout对象。你也可以不带参数直接调用BasicConfigurator.Configure()，它会使用一个缺省的PatternLayout对象，在一个ConsoleAppender中输出信息。如下所示： 
```
log4net.Config.BasicConfigurator.Configure();
```
在输出时会显示如下格式的信息：
```
0 [1688] DEBUG log1 A B C - Test
20 [1688] INFO log1 A B C - Test
```
当log4net框架被配置好以后，就可以如前所述使用日志功能了。

# 解决log4net独占日志文件的问题以及 log4net的各种输出配置(Appender)


由于log4net默认情况下会独占日志文件，该文件不能被File.Open。
可以通过增加配置：<lockingModel type="log4net.Appender.FileAppender+MinimalLock" />来使用最小锁定模型（minimal locking model），以允许多个进程可以写入同一个文件。


各种appender说明：
在log4net的配置中，appender是最重要的部分，一般来说，每一种appender都表示一种日志的输出介质，如日志文件、EvengLog、数据库、控制台、邮件、ASP.NET页面等。

本文对各种内置的appender的配置提供了示例，但却远称不上详尽。要想了解每一种appender的参数和选项的说明，请参看该appender的SDK文档。 

以下示例都是.NET 2.0下进行的, log4net的版本为1.2.10。

AdoNetAppender
详情参考 log4net.Appender. AdoNetAppender SDK文档。

AdoNetAppender的相关配置内容取决于目标数据库的provider。下面仅提供SQL Server 2000的例子。

首先建立数据表：

 

CREATE TABLE [dbo].[Log]
 (
    [Id] [int] IDENTITY (1, 1) NOT NULL,
    [Date] [datetime] NOT NULL,
    [Thread] [varchar] (255) NOT NULL,
    [Level] [varchar] (50) NOT NULL,
    [Logger] [varchar] (255) NOT NULL,
    [Message] [varchar] (4000) NOT NULL,
    [Exception] [varchar] (2000) NULL
)

然后添加配置：
 

<appender name="AdoNetAppender" type="log4net.Appender.AdoNetAppender">
    <bufferSize value="2" />
    <connectionType value="System.Data.SqlClient.SqlConnection, System.Data, Version=2.0.0.0, Culture=Neutral, PublicKeyToken=b77a5c561934e089" />
    <connectionString value="server=(local);database=TestBase;integrated security=false;persist security info=True;UID=sa;PWD=" />
    <commandText value="INSERT INTO Log ([Date],[Thread],[Level],[Logger],[Message],[Exception]) VALUES (@log_date, @thread, @log_level, @logger, @message, @exception)" />
    <parameter>
        <parameterName value="@log_date" />
        <dbType value="DateTime" />
        <layout type="log4net.Layout.RawTimeStampLayout" />
    </parameter>
    <parameter>
        <parameterName value="@thread" />
        <dbType value="String" />
        <size value="255" />
        <layout type="log4net.Layout.PatternLayout">
            <conversionPattern value="%thread" />
        </layout>
    </parameter>
    <parameter>
        <parameterName value="@log_level" />
        <dbType value="String" />
        <size value="50" />
        <layout type="log4net.Layout.PatternLayout">
            <conversionPattern value="%level" />
        </layout>
    </parameter>
    <parameter>
        <parameterName value="@logger" />
        <dbType value="String" />
        <size value="255" />
        <layout type="log4net.Layout.PatternLayout">
            <conversionPattern value="%logger" />
        </layout>
    </parameter>
    <parameter>
        <parameterName value="@message" />
        <dbType value="String" />
        <size value="4000" />
        <layout type="log4net.Layout.PatternLayout">
            <conversionPattern value="%message" />
        </layout>
    </parameter>
    <parameter>
        <parameterName value="@exception" />
        <dbType value="String" />
        <size value="2000" />
        <layout type="log4net.Layout.ExceptionLayout" />
    </parameter>
</appender>

bufferSize表示批处理的日志事件，可以避免每次日志事件都访问数据库；ConnectionType指定了要使用的IDbConnection的完全限定类型名称；connectionString表示连接字符串；CommandText是SQL语句或存储过程；最后一组parameter节点描述了SQL语句或存储过程需要的参数。 
 

AspNetTraceAppender 

详情参考 log4net.Appender.AspNetTraceAppender SDK 文档。  
 

<appender name="AspNetTraceAppender" type="log4net.Appender.AspNetTraceAppender" >
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

这段配置可将日志信息输出到页面的Trace上下文环境。如果日志的级别低于WARN，会以System.Web.TraceContext.Write方法输出；如果级别为WARN或WARN以上则会以System.Web.TraceContext.Warn方法输出，下图中的日志信息的不同颜色可以说明这一点。效果图如下：

 

这在进行页面调试的时候可是很方便的。
BufferingForwardingAppender

详情参考 log4net.Appender.BufferingForwardingAppender SDK 文档。 

<appender name="BufferingForwardingAppender" type="log4net.Appender.BufferingForwardingAppender" >
    <bufferSize value="5"/>
    <lossy value="true" />
    <evaluator type="log4net.Core.LevelEvaluator">
        <threshold value="WARN"/>
    </evaluator>
    <appender-ref ref="LogFileAppender" />
    <appender-ref ref="AspNetTraceAppender" />
</appender>

BufferingForwardingAppender的主要作用是将输出到指定类型（这里是LogFileAppender）的Appender的日志信息进行缓存。bufferSize属性指定了缓存的数量，如果value为5，那么将在信息量达到6条的时候，把这些日志批量输出。appender-ref属性指定了缓存的Appender类型，同root节点一样，这里可以指定多个。 

ColoredConsoleAppender 
详情参考log4net.Appender.ColoredConsoleAppender SDK 文档。

ColoredConsoleAppender将日志信息输出到控制台。默认情况下，日志信息被发送到控制台标准输出流。下面这个示例演示了如何高亮显示Error信息。 

<appender name="ColoredConsoleAppender" type="log4net.Appender.ColoredConsoleAppender">
    <mapping>
        <level value="ERROR" />
        <foreColor value="White" />
        <backColor value="Red, HighIntensity" />
    </mapping>
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

效果如下：


还可以为不同的级别指定不同的颜色： 

<appender name="ColoredConsoleAppender" type="log4net.Appender.ColoredConsoleAppender">
    <mapping>
        <level value="ERROR" />
        <foreColor value="White" />
        <backColor value="Red, HighIntensity" />
    </mapping>
    <mapping>
        <level value="DEBUG" />
        <backColor value="Green" />
    </mapping>
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

效果如下：



ConsoleAppender 
详情参考 log4net.Appender.ConsoleAppender SDK 文档。

ConsoleAppender将日志信息输出到控制台标准输出流。

<appender name="ConsoleAppender" type="log4net.Appender.ConsoleAppender" >
    <layout type="log4net.Layout.PatternLayout">
        <param name="ConversionPattern" value="%d [%t] %-5p %c [%x] - %m%n" />
    </layout>
</appender>

EventLogAppender 
详情参考 log4net.Appender.EventLogAppender SDK 文档。 

EventLogAppender将日志写入本地机器的应用程序事件日志中。默认情况下，该日志的源（Source）是AppDomain.FriendlyName，也可以手动指定其它名称。 

<appender name="EventLogAppender" type="log4net.Appender.EventLogAppender" >
    <layout type="log4net.Layout.PatternLayout">
        <param name="ConversionPattern" value="%d [%t] %-5p %c [%x] - %m%n" />
    </layout>
</appender>
FileAppender

详情参考 log4net.Appender.File Appender SDK 文档。 

FileAppender将日志信息输出到指定的日志文件。

<!--[if !vml]-->

<appender name="LogFileAppender" type="log4net.Appender.FileAppender" >
    <param name="File" value="WebUtilClient.log" />
    <param name="AppendToFile" value="true" />
    <layout type="log4net.Layout.PatternLayout">
        <param name="ConversionPattern" value="%d [%t] %-5p %c [%x] - %m%n" />
    </layout>
</appender>

File指定了文件名称，可以使用相对路径，此时日志文件的位置取决于项目的类型（如控制台、Windows Forms、ASP.NET等）；也可以使用绝对路径；甚至可以使用环境变量，如<file value="${TMP}/log-file.txt" />。
AppendToFile指定是追加到还是覆盖掉已有的日志文件。
还可以添加如下属性<lockingModel type="log4net.Appender.FileAppender+MinimalLock" />来使用最小锁定模型（minimal locking model），以允许多个进程可以写入同一个文件。
ForwardingAppender 

详情参考 log4net.Appender.ForwardingAppender SDK 文档。 

ForwardingAppender可以用来为一个Appender指定一组约束。看下面这个示例：

<appender name="ForwardingAppender" type="log4net.Appender.ForwardingAppender" >
    <threshold value="WARN"/>
    <appender-ref ref="ConsoleAppender" />
</appender>

在这个示例中，为ConsoleAppender添加了约束，Threshold为WARN。这意味着对于一条日志信息，如果直接使用ConsoleAppender，那么不论它是什么级别，总会进行输出，而如果使用这个ForwardingAppender，则只有那些WARN或WARN以上的日志才会发送到ConsoleAppender。 
MemoryAppender

详情参考 log4net.Appender.MemoryAppender SDK 文档。 

似乎不应该使用配置文件来配置MemoryAppender，但如果你非要这么做，看看这个示例（未验证）：

<appender name="MemoryAppender" type="log4net.Appender.MemoryAppender">
    <onlyFixPartialEventData value="true" />
</appender>

NetSendAppender 
详情参考 log4net.Appender.NetSendAppender SDK 文档。

NetSendAppender向特定用户的屏幕发送消息（未验证）。

<appender name="NetSendAppender" type="log4net.Appender.NetSendAppender">
    <threshold value="ERROR" />
    <server value="Anders" />
    <recipient value="xym" />
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

OutputDebugStringAppender 

详情参考 log4net.Appender.OutputDebugStringAppender SDK 文档。 
下面这个例子描述了如何配置该Appender以向OutputDebugString API写入日志（未验证）。 

 

<appender name="OutputDebugStringAppender" type="log4net.Appender.OutputDebugStringAppender" >
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

RemotingAppender
详情参考 log4net.Appender.RemotingAppender SDK 文档。

RemotingAppender向特定的Sink发送日志信息（未验证）：

<!--[if !vml]-->

<appender name="RemotingAppender" type="log4net.Appender.RemotingAppender" >
    <sink value="tcp://localhost:8085/LoggingSink" />
    <lossy value="false" />
    <bufferSize value="95" />
    <onlyFixPartialEventData value="true" />
</appender>
RollingFileAppender

详情参考 log4net.Appender.RollingFileAppender SDK 文档。

RollingFileAppender以FileAppender为基础，与后者有着相同的配置选项。

下面这个例子演示了如何配置RollingFileAppender以写入log.txt文件。写入的文件名总是为log.txt（StaticLogFileName参数指定为true）；根据文件大小（RollingStyle）来生成新的文件；最多保存有10个文件（MaxSizeRollBackups属性，而且一旦写满10个文件，就不再写入日志了），每个文件最大为10KB。这些文件名称为log.txt.1, log.txt.2…等。

<appender name="RollingFileAppender" type="log4net.Appender.RollingFileAppender">
    <param name="File" value="log/Log.txt" />
    <param name="AppendToFile" value="true" />
    <param name="MaxSizeRollBackups" value="10" />
    <param name="MaximumFileSize" value="5MB" />
    <param name="RollingStyle" value="Size" />
    <param name="StaticLogFileName" value="true" />
    <layout type="log4net.Layout.PatternLayout">
        <param name="ConversionPattern" value="%d [%t] %-5p %c [%x] - %m%n" />
    </layout>
</appender>

SmtpAppender 

详情参考 log4net.Appender.SmtpAppender SDK 文档。
SmtpAppender通过Smtp邮件服务器发送日志信息：

        <appender name="SmtpAppender" type="log4net.Appender.SmtpAppender">
            <authentication value="Basic" />
            <to value="anderscui@tom.com" />
            <from value="anderscui@163.com" />
            <username value="anderscui" />
            <password value="password" />
            <subject value="test logging message" />
            <smtpHost value="smtp.163.com" />
            <bufferSize value="512" />
            <lossy value="true" />
            <evaluator type="log4net.Core.LevelEvaluator">
                <threshold value="WARN"/>
            </evaluator>
            <layout type="log4net.Layout.PatternLayout">
                <conversionPattern value="%newline%date [%thread] %-5level %logger [%property{NDC}] - %message%newline%newline%newline" />
            </layout>
        </appender>

将其中的to、from、username、password、subject、smtpHost配置正确才可能发送成功。bufferSize可将多条信息打包在一个邮件中。evaluator可以对日志进行过滤。
SmtpPickupDirAppender

详情参考 log4net.Appender.SmtpPickupDirAppender SDK 文档。

配置与SmtpAppender类似，但要把SmtpHost换为PickupDir（未验证）。

<appender name="SmtpPickupDirAppender" type="log4net.Appender.SmtpPickupDirAppender">
    <to value="to@domain.com" />
    <from value="from@domain.com" />
    <subject value="test logging message" />
    <pickupDir value="C:/SmtpPickup" />
    <bufferSize value="512" />
    <lossy value="true" />
    <evaluator type="log4net.Core.LevelEvaluator">
        <threshold value="WARN"/>
    </evaluator>
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%newline%date [%thread] %-5level %logger [%property{NDC}] - %message%newline%newline%newline" />
    </layout>
</appender>
TraceAppender

详情参考 log4net.Appender.TraceAppender SDK 文档。

TraceAppender将日志信息写入System.Diagnostics.Trace系统（出现在输出窗口）。

<appender name="TraceAppender" type="log4net.Appender.TraceAppender">
    <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%thread] %-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

UdpAppender
详情参考 log4net.Appender.UdpAppender SDK 文档。

下例演示了如何配置UdpAppender(未验证)：

<appender name="UdpAppender" type="log4net.Appender.UdpAppender">
    <localPort value="8080" />
    <remoteAddress value="224.0.0.1" />
    <remotePort value="8080" />
    <layout type="log4net.Layout.PatternLayout, log4net">
        <conversionPattern value="%-5level %logger [%property{NDC}] - %message%newline" />
    </layout>
</appender>

上面有若干个Appender标注为"未验证"的，是指这些Appender极少用到，或者在我的机器上没能实现 :(

希望这些内容能对您有所帮助。