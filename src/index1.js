// 定义装饰器函数
function info(target){
    target.info = 'Person info....'
}

// 定义一个普通的类
@info
class Person{

}

console.log(Person.info)