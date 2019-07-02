var events = require("events");
var eventEmitter = new events.EventEmitter();
var connetHandler = function connected(){
	console.log("连接成功"); 
	eventEmitter.emit("data_received");
}
eventEmitter.on("connection",connetHandler);
eventEmitter.on("data_received",function(){
	console.log("接收成功");
});
eventEmitter.emit("connection");
console.log("程序结束");

const buf = Buffer.from('runoob', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));

// 输出 cnVub29i
console.log(buf.toString('base64'));

var fs = require("fs");
var data = '';
var readerStream = fs.createReadStream("input.txt");
readerStream.setEncoding("UTF8");
readerStream.on("data",function(chunk){
	data+=chunk;
});
readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");