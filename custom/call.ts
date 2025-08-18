// @ts-ignore
Function.prototype.c_call = function(context, ...args){
    context = context !== null && context !== undefined ? Object(context) : globalThis;
    const fnName = Symbol();
    // this 指向调用 c_call 的对象
    context[fnName] = this;
    const res = context[fnName](...args);
    delete context[fnName]
    return res;
}