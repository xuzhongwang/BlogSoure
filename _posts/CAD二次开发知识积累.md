---
title: CAD二次开发知识积累
date: 2018-02-07 10:38:52
tags:
---
# CommandFlags
枚举值|描述
ActionMacro|可以用动作录制器录制命令动作；
DocReadLock|命令执行时将被只读锁定；
Interruptible|提示用户输入时可以中断命令；
Modal|别的命令运行时不能运行此命令；
NoActionRecording|不能用动作录制器录制命令动作；
NoBlockEditor|不能从块编辑器使用该命令；
NoHistory|不能将命令添加到repeat-last-command（重复上一个命令）历史列表；
NoPaperSpace|不能从图纸空间使用该命令；
NoTileMode|当TILEMODE置1时不能使用该命令；
NoUndoMarker|命令不支持撤销标记。用于不修改数据库因而也就无需出现在撤销记录中的那些命令；
Redraw|不清空取回的先选择后执行设置及对象捕捉设置；
Session|命令运行于应用程序上下文，而不是当前图形文档上下文；
Transparent|别的命令运行时可以运行此命令；
Undefined|只能通过全局名使用命令；
UsePickSet|清空取回的先选择后执行设置；

