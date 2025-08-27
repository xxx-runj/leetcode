/**
 * 请实现一个 sum 函数，接收一个数组 arr 进行累加
 * 只能使用add异步方法 add 函数已实现
 * 模拟异步请求后端返回一个相加后的值
 */
function add(a, b) {
    return Promise.resolve(a + b);
}
// 普通串行版
async function sum1(arr: number[]): Promise<number> {
    let result = 0;
    for (const num of arr) {
        result = await add(result, num);
    }
    return result;
}
async function sum2(arr: number[]): Promise<number> {
    return arr.reduce((acc, num) => {
        return acc.then((result) => add(result, num));
    }, Promise.resolve(0));
}
// 分治法 并行版
async function sum3(arr: number[]): Promise<number> {
    const n = arr.length;
    if (n === 0) {
        return Promise.resolve(0);
    }
    if (n === 1) {
        return Promise.resolve(arr[0]);
    }
    const mid = Math.floor(n / 2);
    const [left, right] = await Promise.all([
        sum3(arr.slice(0, mid)),
        sum3(arr.slice(mid))
    ])
    return add(left, right);
}
// 控制并发数的并行版 （ai自动写的）
async function sum4(arr: number[], concurrency = 2): Promise<number> {
    const n = arr.length;
    if (n === 0) {
        return Promise.resolve(0);
    }
    if (n === 1) {
        return Promise.resolve(arr[0]);
    }
    // 将数组分成多个子数组，每个子数组的长度不超过 concurrency
    const subArrays = [];
    for (let i = 0; i < n; i += concurrency) {
        subArrays.push(arr.slice(i, i + concurrency));
    }
    // 对每个子数组进行 sum1 计算，得到一个个 Promise
    const promises = subArrays.map(subArr => sum1(subArr));
    // 等待所有子数组的 sum1 计算完成，得到每个子数组的和
    const subSums = await Promise.all(promises);
    // 最后对所有子数组的和进行 sum1 计算，得到最终结果
    return sum1(subSums);
}

