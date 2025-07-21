// 修车的最少时间
function repairCars(ranks, cars) {
    ranks.sort((a, b) => a - b);
    let l = 0;
    let r = ranks[0] * cars ** 2;
    while (l <= r) {
        // 能修的车数量
        let s = 0;
        const t = l + Math.floor((r - l) / 2);
        for (let i = 0; i < ranks.length && s < cars; i++) {
            s += Math.floor(Math.sqrt(t / ranks[i]));
        }
        if (s >= cars) {
            r = t - 1;
        } else {
            l = t + 1;
        }
    }
    return l;
}
/**
 * 要 求t 最小值，则二分t。那么需要给定 t 的初始范围。
 * 一个能力值为 r 的人在 t 分钟内能修好的车数量为 r * n^2 <= t    ==>  n <= sqrt(t/r)
 * t 越大，能修的车越多，满足单调性，可以二分找答案
 * t 的上界为 min(ranks) * cars^2，即让能力值最小的人修全部的车
 */
