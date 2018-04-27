---
title: EasyUI使用
date: 2018-01-04 09:48:04
tags:
---

# datagrid使用

# combobox

```javascript
$("#comboid").combobox({
    url:"/Ashx/ImpownContract.ashx?type=GetOtherMan",
    valueField:"code",
    textField: "name_c",
    onSelect:function(record){
        var selectValue = record.value;
    }
});

//获取json数据格式
[
{"code":"0001","name_c":"中国工商银行股份有限公司兖州支行"},
{"code":"0002","name_c":"中国农业银行股份有限公司兖州市支行"},
{"code":"0003","name_c":"中国建设银行股份有限公司兖州支行"},
{"code":"0004","name_c":"中国银行股份有限公司兖州支行"},
{"code":"0005","name_c":"中国建设银行股份有限公司济宁分行"},
{"code":"0006","name_c":"山东圣泰农村合作银行草桥口支行"},
]
```

