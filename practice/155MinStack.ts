var MinStack = function () {
    this.arr = [];
    // 维护前缀最小值
    this.preMinStack = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
    this.arr.push(val);
    const m = this.preMinStack.length;
    if (m === 0) {
        this.preMinStack.push(val);
        return;
    }
    if (val <= this.preMinStack[m - 1]) {
        this.preMinStack.push(val);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    const val = this.arr.pop();
    if (val === this.preMinStack[this.preMinStack.length - 1]) {
        this.preMinStack.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    const n = this.arr.length;
    return n === 0 ? undefined : this.arr[n - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    const m = this.preMinStack.length;
    return m === 0 ? undefined : this.preMinStack[m - 1];
};
