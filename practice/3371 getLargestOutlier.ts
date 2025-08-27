// 识别数组中的最大异常值
function getLargestOutlier(nums) {
    const record = new Map();
    let total = 0;
    for (const x of nums) {
        total += x;
        record.set(x, (record.get(x) ?? 0) + 1);
    }
    let abnormal = -Infinity;
    // 枚举 x
    for (const x of nums) {
        // 先从全部值中去掉 x
        record.set(x, record.get(x) - 1);
        // 判断 y 是否在剩下的 n-1 个数中
        if ((total - x) % 2 === 0 && record.get((total - x) / 2) > 0) {
            abnormal = Math.max(abnormal, x);
        }
        // 再把 x 加回去
        record.set(x, record.get(x) + 1);
    }
    return abnormal;
}

/**
 * 异常值为 x，特殊值和为 y，x + y + y = total;
 * 枚举 x，2y = total - x;
 * 如果 total - x 为奇数，说明该 x 不是异常值；
 * 如果为偶数，且 y = (total - x) / 2 在其余 n - 1 个数之中，那么 x 就是异常值
 */
