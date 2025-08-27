// 范围内整数的最大得分
function maxPossibleScore(start, d) {
    start.sort((a, b) => a - b);
    const n = start.length;
    let l = 0;
    let r = start[n - 1] + d;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        // 满足条件，说明
        if (check(mid)) {
            l = mid + 1;
        } else {
            // 不满足条件，说明 score 太大了，导致所选的 x 无法在区间内，故要缩小
            r = mid - 1;
        }
    }
    return r;
    function check(score) {
        let prev = start[0];
        for (let i = 1; i < n; i++) {
            /**
             * 所选的数 x 要在区间 [num, num+d] 内
             * 且满足 x - prev >= score，即 x >= prev + score
             * 又为了保证与下一区间的差能 >= score，x 越小越好
             */
            prev = Math.max(prev + score, start[i]);
            if (prev > start[i] + d) {
                return false;
            }
        }
        return true;
    }
}

/**
 * 二分：由于得分越大，所选数字越可能不在区间内，有单调性，可以二分答案。
 * 贪心：贪心地想，第一个数越小，第二个数就越能在区间内，所以第一个数要选 x_0 = start[0]。
 */
