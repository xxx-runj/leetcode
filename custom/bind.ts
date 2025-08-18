// @ts-ignore
Function.prototype.c_bind = function (context, bindArgs) {
    if(typeof this !== 'function'){
        throw new Error('Bind must be called on a function')
    }

    // self 对应原始函数
    const self = this;

    function boundFn(...args){
        return self.apply(
            this instanceof boundFn ? this : context,
            [...bindArgs, ...args]
        )
    }

    // 修复原型链
    boundFn.prototype = Object.create(self.prototype);

    return boundFn;
};

// 修复原型链 和 判断 this instanceof boundFn 举例：
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function() {
  console.log('Hi, I am ' + this.name);
};
// @ts-ignore
const Bound = Person.c_bind({}); // context 会被忽略，因为用 new
const p = new Bound('Alice');
console.log(p.name); // ✅ 'Alice'
p.sayHi() // 修复了原型链，这样才不会报错



// Object.prototype.toLocaleString 对应 bind 里的this
// const newFn = Object.prototype.toLocaleString.bind({});
