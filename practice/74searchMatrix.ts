function searchMatrix(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;

    // 先逼近行
    let l = 0;
    let r = m - 1;
    let row = -1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (matrix[mid][0] > target) {
            r = mid - 1;
        } else if (matrix[mid][n - 1] < target) {
            l = mid + 1;
        } else {
            row = mid;
            break;
        }
    }
    if (row === -1) {
        return false;
    }
    // 再逼近列
    l = 0;
    r = n - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        const x = matrix[row][mid];
        if (x === target) {
            return true;
        }
        if (x > target) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return false;
}
searchMatrix([[1]], 2);
