function searchMatrix(matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let i = m - 1;
    let j = 0;
    while (i >= 0 && j < n) {
        const x = matrix[i][j];
        if (x === target) {
            return true;
        }
        if (x > target) {
            i--;
        } else {
            j++;
        }
    }
    return false;
}
