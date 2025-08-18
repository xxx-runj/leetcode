class C_Promise {
    state: "pending" | "fulfilled" | "rejected";
    value: any;
    reason: any;
    onFulfilledCallbacks: Function[];
    onRejectedCallbacks: Function[];

    constructor(executor) {
        this.state = "pending";
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const that = this;

        function resolve(value) {
            // 普通函数的this是调用时动态决定的，谁调用我，this就指向谁。所以这里要用that
            if (that.state === "pending") {
                that.state = "fulfilled";
                that.value = value;
                that.onFulfilledCallbacks.forEach((fn) => fn(that.value));
            }
        }
        function reject(reason) {
            if (that.state === "pending") {
                that.state = "rejected";
                that.reason = reason;
                that.onRejectedCallbacks.forEach((fn) => fn(that.reason));
            }
        }
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        const that = this;
        const realOnFulfilled =
            typeof onFulfilled === "function" ? onFulfilled : (v) => v;
        const realOnRejected =
            typeof onRejected === "function"
                ? onRejected
                : (err) => {
                      if (err instanceof Error) {
                          throw err;
                      } else {
                          throw new Error(err);
                      }
                  };
        // 根据规范，then的返回值必须也是一个promise，所以我们要 new 一个promise 作为返回
        // 如果executor内部是同步代码，当执行到这里时，state 只会是 fulfilled 或 rejected
        // 即使 promise 立即完成（同步 resolve），它的回调也不能立刻执行，必须延后到下一轮事件循环，所以要用 setTimeout 包一层
        if (this.state === "fulfilled") {
            const promise2 = new C_Promise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        // promise1 成功执行了， 但 onFulfilled 不是函数 ， promise2 成功执行必须返回相同的值
                        if (typeof onFulfilled !== "function") {
                            resolve(that.value);
                        } else {
                            // x 可能是普通值、可能是Error、可能是一个promise
                            const x = realOnFulfilled(that.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            });
            return promise2;
        }
        if (this.state === "rejected") {
            const promise2 = new C_Promise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        if (typeof onRejected !== "function") {
                            reject(that.reason);
                        } else {
                            // x 可能是普通值、可能是Error、可能是一个promise
                            const x = realOnRejected(that.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch (err) {
                        reject(err);
                    }
                }, 0);
            });
            return promise2;
        }
        // 如果executor内部是异步代码，当执行到这里时，state 的状态可能还是 pending
        if (this.state === "pending") {
            const promise2 = new C_Promise((resolve, reject) => {
                // 包一层含错误处理的
                that.onFulfilledCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            if (typeof onFulfilled !== "function") {
                                resolve(that.value);
                            } else {
                                const x = realOnFulfilled(that.value);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
                that.onRejectedCallbacks.push(function () {
                    setTimeout(function () {
                        try {
                            if (typeof onRejected !== "function") {
                                reject(that.reason);
                            } else {
                                const x = realOnRejected(that.reason);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (err) {
                            reject(err);
                        }
                    }, 0);
                });
            });
            return promise2;
        }

        function resolvePromise(promise2, x, resolve2, reject2) {
            if (promise2 === x) {
                return reject2(
                    new TypeError(
                        "The promise and the return value are the same"
                    )
                );
            }
            if (typeof x === "object" || typeof x === "function") {
                let then: Function;
                let called = false;
                try {
                    then = x.then;
                } catch (err) {
                    reject2(err);
                }
                if (typeof then === "function") {
                    try {
                        then.call(
                            x,
                            function (y) {
                                if (called) {
                                    return;
                                }
                                called = true;
                                resolvePromise(promise2, y, resolve2, reject2);
                            },
                            function (e) {
                                if (called) {
                                    return;
                                }
                                called = true;
                                reject2(e);
                            }
                        );
                    } catch (err) {
                        reject2(err);
                    }
                }
            } else {
                resolve2(x);
            }
        }
    }
}

const promise1 = new C_Promise((resolve, reject) => {
    resolve("111");
    reject("fail");
});
