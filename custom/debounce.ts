function c_debounce(fn, t) {
    let timer = null;
    return function (...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, t);
    };
}
