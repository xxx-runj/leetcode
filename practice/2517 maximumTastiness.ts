// 礼盒的最大甜蜜度
function maximumTastiness(price, k) {
    const n = price.length;
    price.sort((a, b) => a - b);
    let l = 0;
    let r = Math.floor((price[n - 1] - price[0]) / (k - 1)) + 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            // 能选的糖果种类 >=k，说明甜蜜度还可以再增加
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return l;

    function check(sweet) {
        let cnt = 0;
        let prev = -Infinity;
        for (const p of price) {
            if(p - prev >= sweet) {
                cnt++;
                prev = p;
            }
        }
        return cnt >= k;
    }
}
maximumTastiness([13,5,1,8,21,2], 3)

/**
 * 「任意两种糖果价格绝对差的最小值」等价于「排序后，任意两种相邻糖果价格绝对差的最小值」。
 * 二分的体现：甜蜜度越大，能选择的糖果越少
 * 贪心的体现：第一个数 price[0] 一定可以选。
 *           如果有其他不选 price[0] 的方案，那么把该方案中的第一个数改成 price[0]，也满足要求。
 *           或者说，选 price[0]，后面可以选的数比不选 price[0] 更多
 */
