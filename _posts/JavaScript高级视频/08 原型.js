function Person(name){
    this.name = name;
}
Person.prototype.eat = function(){
    console.log("I want to eat!");
};
var per1 = new Person("张三");
var per2 = new Person("李四");

// console.dir(per1);
// console.dir(per2);
// console.log(per1.eat == per2.eat);
var per3 = new Person.prototype.constructor();
console.dir(per3);