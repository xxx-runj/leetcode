function c_throttle(fn, t) {
    let timerId = null;
    let latestArgs = null;

    return function (...args) {
        latestArgs = args;
        if (timerId) return;
        timerId = setTimeout(() => {
            fn.apply(this, latestArgs); // 用最新的参数
            timerId = null;
        }, t);
    };
}
