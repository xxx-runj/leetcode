class Heap {
    data: any[];
    compare: Function;
    constructor(compare) {
        this.data = [];
        this.compare = compare;
    }
    size() {
        return this.data.length;
    }
    peek() {
        return this.data[0];
    }
    // 上浮，时间复杂度 logn
    private _up(i) {
        while (i > 0) {
            // 其父节点索引
            const p = Math.floor((i - 1) / 2);
            // 原来的排序是 先 this.data[p]，后 this.data[i]
            if (this.compare(this.data[i], this.data[p]) < 0) {
                // 交换，让 this.data[i] 排在前面
                [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
                // 更新索引
                i = p;
            } else {
                // 说明已经找到了该放置的位置
                break;
            }
        }
    }
    _down(i) {
        const n = this.data.length;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let tmp = i;
        if (right < n && this.compare(this.data[tmp], this.data[right]) > 0) {
            tmp = right;
        }
        if (left < n && this.compare(this.data[tmp], this.data[left]) > 0) {
            tmp = left;
        }
        if (tmp !== i) {
            [this.data[tmp], this.data[i]] = [this.data[i], this.data[tmp]];
            this._down(tmp);
        }
    }
    push(val) {
        this.data.push(val);
        this._up(this.data.length - 1);
    }
    // 删除堆顶
    shift() {
        const n = this.data.length;
        if (n === 0) {
            return undefined;
        }
        // 把堆顶元素和末尾元素交换
        [this.data[0], this.data[n - 1]] = [this.data[n - 1], this.data[0]];
        // 删除新的末尾元素
        const last = this.data.pop();
        if (this.data.length > 0) {
            // 将堆顶元素下沉
            this._down(0);
        }
        return last;
    }
}
export class MaxPriorityQueue extends Heap {
    constructor() {
        super((a, b) => b - a);
    }
}

export class MinPriorityQueue extends Heap {
    constructor() {
        super((a, b) => a - b);
    }
}
