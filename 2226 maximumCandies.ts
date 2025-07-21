// 每个小孩最多能分到多少糖果
function maximumCandies(candies, k) {
    let l = 0;
    let r = Math.max(...candies);
    const n = candies.length;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        // 每个小孩拿 mid 个，计算 candies 能分给几个小孩
        let s = 0;
        for (let i = 0; i < n; i++) {
            s += Math.floor(candies[i] / mid);
        }
        if(s >= k) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return r;
}
