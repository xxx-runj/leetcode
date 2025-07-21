// 正方形中的最多点数
function maxPointsInsideSquare(points, s) {
    // 正方形的 边长/2 最小为0，最大可以取离中心最远的点的坐标 Math.max(X, Y)
    // 如果为 k 时不存在重复点，则 k-1 、 k-2 等等也不存在
    // 如果为 k 时存在重复点，则 k+1 、 k+2 等等都存在
    let lower = 0;
    let upper = 10 ** 9;
    let ans = 0;
    while (lower <= upper) {
        const mid = lower + Math.floor((upper - lower) / 2);
        if (check(mid)) {
            lower = mid + 1;
        } else {
            upper = mid - 1;
        }
    }
    return ans;

    function check(mid) {
        const vis = new Set();
        for (let i = 0; i < points.length; i++) {
            const c = s.charAt(i);
            if (
                Math.abs(points[i][0]) <= mid &&
                Math.abs(points[i][1]) <= mid
            ) {
                // 说明元素在正方形内且已经存在了
                if(vis.has(c)) {
                    return false;
                }
                vis.add(c);
            }
        }
        ans = Math.max(ans, vis.size);
        return true;
    }
}
