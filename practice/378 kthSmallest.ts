// 有序矩阵中第 K 小的元素
function kthSmallest(matrix, k) {
    const n = matrix.length;
    let l = matrix[0][0];
    let r = matrix[n - 1][n - 1];
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            // 说明元素值选 mid 时，<=mid 的元素个数大于等于 k，因此还可以试着找更小的值
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l;

    function check(mid) {
        let cnt = 0;
        let x = 0;
        let y = n - 1;
        while (x < n && y >= 0) {
            if (matrix[x][y] <= mid) {
                cnt += y + 1;
                x++;
            } else {
                y--;
            }
        }
        return cnt >= k;
    }
}
kthSmallest(
    [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15],
    ],
    8
);

/**
 *
 * 二分的体现：元素值 x 越大，<=x 的个数越多
 *
 */
