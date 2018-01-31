---
title: WCF学习笔记
date: 2018-01-30 16:46:21
tags:
---
# Webservice
## 定义
通过SOAP在web上提供的软件服务，使用WSDL文件进行说明，并通过UDDI进行注册。
## 优点
- 跨防火墙的通信
- 应用程序集成
- B2B的集成
- 软件和数据的重用
## 缺点
- 单机应用程序
- 局域网的一些程序

# WCF配置文件
WCF配置文件分为两部分：服务端配置和客户端配置
# 服务端配置
服务端的配置文件主要包括endpoint、binding、behavior的配置。一个标准的服务端配置文件所包含的主要xml配置节如下所示：
```
<system.ServiceModel>
   <services>
      <service>
         <endpoint/>
      </service>
   </services>

   <bindings>
   <!—定义一个或多个系统提供的binding元素，例如<basicHttpBinding> --> 
   <!—也可以是自定义的binding元素，如<customBinding>. -->
      <binding>
      <!—例如<BasicHttpBinding>元素. -->
      </binding>
   </bindings>

   <behaviors>
   <!—一个或多个系统提供的behavior元素. -->
      <behavior>
      <!—例如<throttling>元素. -->
      </behavior>
   </behaviors>
</system.ServiceModel>
```
## <service>配置节
在<services>配置节中可以定义多个服务，每一个服务都被放到<service>配置节中，WCF的宿主程序可以通过配置文件找到这些定义的服务并发布这些服务。
<service>置节包含name和behaviorConfiguration属性。其中，name配置了实现Service Contract的类型名。类型名必须是完整地包含了命名空间和类型名。而behaviorConfiguration的配置值则与其后的<behaviors>配置节的内容有关。<endpoint>是<service>配置节的主体，其中，<endpoint>配置节包含了endpoint的三个组成部分：Address、Binding和Contract。由于具体的binding配置是在<bindings>配置节中完成，因而，在<endpoint>中配置了bindingConfiguration属性，指向具体的binding配置。如下所示：
```
<services>
  <service name="BruceZhang.MyService" behaviorConfiguration="MyBehavior">
    <endpoint address=""
             binding="netTcpBinding"
             bindingConfiguration="DuplexBinding"
             contract="BruceZhang.IHello" />
  </service>
</services>
```
我们也可以定义多个endpoint，例如：
```
<services>
  <service 
      name="Microsoft.ServiceModel.Samples.CalculatorService"
      behaviorConfiguration="CalculatorServiceBehavior">
    <endpoint address=""
             binding="wsHttpBinding"
             contract="Microsoft.ServiceModel.Samples.ICalculator" />
    <endpoint address="mex"
             binding="mexHttpBinding"
             contract=" Microsoft.ServiceModel.Samples.IMetadataExchange" />
  </service>
</services>
```
如果address值为空，那么endpoint的地址就是默认的基地址（Base Address）。例如ICalculator服务的地址就是http://localhost/servicemodelsamples/service.svc，而IMetadataExchange服务的地址则为http://localhost/servicemodelsamples/service.svc/mex。这里所谓的基地址可以在<service>中通过配置<host>来定义：
```
<service 
      name="Microsoft.ServiceModel.Samples.CalculatorService"
      behaviorConfiguration="CalculatorServiceBehavior">
<host>
    <baseAddresses>
        <add baseAddress=
"http://localhost/ServiceModelSamples/service.svc"/>
    </baseAddresses>
</host>
<endpoint … />
</service>
```
## <behaviors>配置节
当我们在定义一个实现了Service Contract的类时， binding和address信息是客户端必须知道的，否则无法调用该服务。然而，如果需要指定服务在执行方面的相关特性时，就必须定义服务的behavior。在WCF中，定义behavior就可以设置服务的运行时属性，甚至于通过自定义behavior插入一些自定义类型。例如通过指定ServiceMetadataBehavior，可以使WCF服务对外公布Metadata。配置如下：
```
<behaviors>
    <serviceBehaviors>
    <behavior name="metadataSupport">
      <serviceMetadata httpGetEnabled="true" httpGetUrl=""/>
    </behavior>
    <serviceBehaviors>
<behaviors>
```
在WCF中，behavior被定义为Attribute，其中，System.ServiceModel.ServiceBehaviorAttribute和System.ServiceModel.OperationBehaviorAttribute是最常用的behavior。虽然，behavior作为Attribute可以通过编程的方式直接施加到服务上，但出于灵活性的考虑，将behavior定义到配置文件中才是最好的设计方式。 利用ServiceBehavior与OperationBehavior可以控制服务的如下属性： 1、 对象实例的生命周期； 2、 并发与异步处理； 3、 配置行为； 4、 事务行为； 5、 序列化行为； 6、 元数据转换； 7、 会话的生命周期； 8、 地址过滤以及消息头的处理； 9、 模拟（Impersonation）；

例如，通过ServiceBehavior设置对象实例的生命周期：
```
<behaviors>
    <serviceBehaviors>
    <behavior name="metadataSupport">
      <instanceContextMode httpGetEnabled="true" httpGetUrl=""/>
    </behavior>
    <serviceBehaviors>
<behaviors>
```
