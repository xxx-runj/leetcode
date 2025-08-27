// 两球之间的磁力
function maxDistance(position, m) {
    const n = position.length;
    position.sort((a, b) => a - b);
    let l = 0;
    let r = Math.floor((position[n - 1] - position[0]) / (m - 1)) + 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return l - 1;

    function check(s) {
        let cnt = 0;
        let prev = -Infinity;
        for (const p of position) {
            if (p - prev >= s) {
                cnt++;
                prev = p;
            }
        }
        return cnt >= m;
    }
}

/**
 * 二分的体现：最小磁力越大，能容纳的球越少，满足单调性
 * 贪心的体现：（排序后）第一个盒子一定包含：原因同 2517 题
 */
