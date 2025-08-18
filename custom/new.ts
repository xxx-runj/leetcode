// 手写 new 操作符
function c_new(constructor, ...args){
    const obj = Object.create(constructor.prototype);
    const result = constructor.apply(obj, args);
    if(result !== null && (typeof result === 'object' || typeof result === 'function')) {
        return result;
    }
    return obj;
}

// 构造函数特点：如果返回的是对象，那么 new 之后得到的就是被返回的那个对象；
// 如果返回的是普通类型，那么 new 之后得到的是 this
function Car(name, price){
    this.name = name;
    this.price = price;
}
const mycar = c_new(Car, 'xx', 1998)