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

$("#xx").combobox({disabled: true});      //设置下拉款为禁用

$("#xx").combobox('setValue',xlid);  //设置下拉款的默认值  xlid是你下拉款的id属性

$("#xx").combobox('getValue');      //获取下拉款id值

$("#xx").combobox('getText');      //获取下拉款name值
```

# 判断Div
```javascript
var isHaveHouse =  $("#HouseDiv").is(":hidden");//是否隐藏
var temp1=$("#test").is(":visible");//是否可见
```

# datagrid

## 初始化

```javascript
$('#HouseData').datagrid({
    url: '/Ashx/TempHouse.ashx?type=extractinghouseinfo&ownerinfo=' + ownerInfo,
    method: 'get',
    idField: 'house_id',
    loadMsg: "数据加载中......",
    fitColumns: true,//自适应宽度
    singleSelect: true,//是否单选 
    pagination: true,//分页控件 
    pageSize: 15,//每页显示的记录条数，默认为10 
    pageList: [5, 10, 15],//可以设置每页记录条数的列表 
    beforePageText: '第',//页数文本框前显示的汉字 
    afterPageText: '页    共 {pages} 页',
    displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
    rownumbers: true,//行号 
    striped: true,//隔行变色
    columns: [[
        { field: 'ck', checkbox: true },
        { field: 'house_id', title: '房屋ID', width: 180, hidden: 'true' },
        { field: 'income_id', title: '业务号', width: 180 },
        { field: 'right_id', title: '房产证号', width: 180 },
        { field: 'owner_name', title: '产权人', width: 180 },
        { field: 'card_id', title: '身份证号', width: 180 },
        { field: 'seat_name', title: '房屋坐落', width: 180 },
        { field: 'build_name', title: "幢名", width: 180 },
        { field: 'house_name', title: "房名", width: 180 },
        { field: 'current_floor', title: "所在层", width: 180 },
        { field: 'build_area', title: "建筑面积", width: 180 },
        { field: 'from_name', title: "产权来源", width: 180 }
    ]],
    enableFilter: true
});
```

## 获取选中行
```javascript
if ($("#dg_houselist").datagrid("getSelections").length >= 1) {
    var houseids = "";
    var rows = $("#dg_houselist").datagrid("getSelections");
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].limit_flag =="0") {
            $.messager.alert("警告", rows[i].house_name + "不存在纪监查封");
            return false;
        }
        houseids += rows[i].house_id + ",";
    }


}
else {
    $.messager.alert("友情提示", "请您选择要添加限制的房屋");
}
```

