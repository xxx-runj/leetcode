var cancellable = function (fn, args, t) {
    let isCancel = false;
    setTimeout(() => {
        if (!isCancel) {
            return fn(...args);
        }
    }, t);
    return function () {
        isCancel = true;
    };
};

class TimeLimitedCache {
    dic: Map<number, { value: number; timerId: any }>;
    constructor() {
        this.dic = new Map();
    }

    private add(key: number, value: number, duration: number) {
        const timerId = setTimeout(() => {
            this.dic.delete(key);
        }, duration);
        this.dic.set(key, { value, timerId });
    }
    private delete(key) {
        const { timerId } = this.dic.get(key);
        clearTimeout(timerId);
        this.dic.delete(key);
    }

    set(key: number, value: number, duration: number): boolean {
        const flag = this.dic.has(key);
        if (flag) {
            this.delete(key);
        }
        this.add(key, value, duration);
        return flag;
    }

    get(key: number): number {
        return this.dic.has(key) ? this.dic.get(key).value : -1;
    }

    count(): number {
        return this.dic.size;
    }
}

type Fn<T> = () => Promise<T>;

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const n = functions.length;
        const arr = Array.from<T>({ length: n });
        let resolvedCnt = 0;
        functions.forEach(async (fn, i) => {
            try {
                arr[i] = await functions[i]();
                resolvedCnt++;
                if (resolvedCnt === n) {
                    resolve(arr);
                }
            } catch (err) {
                reject(err);
            }
        });
    });
}

function flattenN(arr, n) {
    let result = arr.slice(); // 复制数组，避免修改原数组

    for (let i = 0; i < n; i++) {
        let hasNested = false;
        const next = [];
        for (const item of result) {
            if (Array.isArray(item)) {
                next.push(...item); // 展开一层
                hasNested = true;
            } else {
                next.push(item);
            }
        }
        result = next;
        if (!hasNested) break; // 如果已经没有嵌套结构，提前结束
    }

    return result;
}

function compactObject(obj) {
    if (!obj) {
        return false;
    }
    if (Array.isArray(obj)) {
        const tmp = [];
        for (const x of obj) {
            const res = compactObject(x);
            if (res) {
                tmp.push(res);
            }
        }
        return tmp;
    }
    if (Object.prototype.toLocaleString.call(obj) === "[object Object]") {
        const tmp = {};
        for (const x in obj) {
            const res = compactObject(obj[x]);
            if (res) {
                tmp[x] = res;
            }
        }
        return tmp;
    }
    return obj;
}
// compactObject( [null, 0, false, 1])
// compactObject({ a: null, b: [false, 1] });
// compactObject([null, 0, 5, [0], [false, 16]]);

type Callback = (...args: any[]) => any;
type Subscription = {
    unsubscribe: () => void;
};

class EventEmitter {
    dic: Map<string, Set<Callback>>;
    constructor() {
        this.dic = new Map();
    }
    subscribe(eventName: string, callback: Callback): Subscription {
        const backs = this.dic.get(eventName) ?? new Set();
        backs.add(callback);
        this.dic.set(eventName, backs);
        return {
            unsubscribe: () => {
                const backs = this.dic.get(eventName) ?? new Set();
                backs.delete(callback);
                this.dic.set(eventName, backs);
            },
        };
    }

    emit(eventName: string, args: any[] = []): any[] {
        const backs = this.dic.get(eventName) ?? new Set();
        return Array.from(backs).map(fn => {
            return fn(...args)
        })
    }
}
