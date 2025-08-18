// @ts-ignore
Function.prototype.c_apply = function (context, args) {
    context =
        context !== null && context !== undefined
            ? Object(context)
            : globalThis;
    const fnName = Symbol();
    // this 指向调用 c_call 的对象
    context[fnName] = this;
    let res;
    if (!args) {
        res = context[fnName]();
    } else {
        res = context[fnName](...args);
    }

    delete context[fnName];
    return res;
};