var url = 'http://10.11.6.60:9999/api/Values/Get';
	         // var url = 'http://10.11.6.60:7777/Api/Values/Title';
$.ajax({
    type: "POST", //访问WebService使用Post方式请求
    contentType: "application/json;charset=utf-8", //WebService 会返回Json类型
    url:url,
    data: para, //Email参数
    dataType: 'json',
    crossDomain:true,
    beforeSend: function (x) { x.setRequestHeader("Content-Type", "application/json; charset=utf-8"); },
    error: function (x, e) { },
    success: function (response) { //回调函数，result，返回值
    	debugger;
    	// var data = response.d;
    	// var jsonData = 
    	// debugger;
        // $("#userloging").hide();
        // var json = eval('(' + response.d + ')');
        // var userid = json.user.id;
        // if (userid > 0) {
        //     $("#spanusername").html(json.user.name);
        //     $("#spanmessagenum").html(json.user.message);
        //     $("#userloginsucced").show();
        //     $("#userloginbox").hide();
        // }
        // JSON.parse();
        // debugger;
    }
});

//注意：
// 1. 参数形式,webservice 参数是json字符串，api格式是json对象
// 2. 返回数据格式,webservice 返回{d:response},其中response是字符串
	  // api返回正常数据
