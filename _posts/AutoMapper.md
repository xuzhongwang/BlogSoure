---
title: AutoMapper
date: 2018-01-19 09:40:01
tags:
---
# DTO

## 什么是DTO

DTO(Data Transfer Object)就是数据传输对象。
表现层与应用层通过DTO进行交互，数据传输对象是没有行为的POCO对象，它的目的只是为了对领域对象进行数据的封装，实现层与层之间的数据传递。

## 为什么要用DTO

- 领域对象更注重领域，而DTO更注重数据，是对领域模型的合理封装，从而不会将领域对象的行为过分暴露给表现层。
- [DTO](#dto)
    - [什么是DTO](#%E4%BB%80%E4%B9%88%E6%98%AFdto)
    - [为什么要用DTO](#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%94%A8dto)
- [AutoMapper](#automapper)

# AutoMapper

[源码地址](https://github.com/xuzhongwang/BlogCode/tree/master/AutoMapperDemo).

