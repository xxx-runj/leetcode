function spiralOrder(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    // 一共要转的圈数
    let s = Math.ceil(Math.min(m, n) / 2);
    const ans = new Array(m * n).fill(0);
    let index = 0;
    let [topI, bottomI] = [0, m - 1];
    let [leftJ, rightJ] = [0, n - 1];
    while (s > 0) {
        // 从左到右，i不变，j增加
        if (topI <= bottomI) {
            for (let j = leftJ; j <= rightJ; j++) {
                ans[index++] = matrix[topI][j]
            }
            topI++;
        }
        // 从上到下，j不变，i增加
        if(leftJ <= rightJ){
            for (let i = topI; i <= bottomI; i++) {
                ans[index++] = matrix[i][rightJ]
            }
            rightJ--;
        }
        // 从右到左，i不变，j减少
        if (topI <= bottomI) {
            for (let j = rightJ; j >= leftJ; j--) {
                ans[index++] = matrix[bottomI][j]
            }
            bottomI--;
        }
        // 从下到上，j不变，i减少
        if(leftJ <= rightJ){
            for (let i = bottomI; i >= topI; i--) {
                ans[index++] = matrix[i][leftJ]
            }
            leftJ++
        }
        s--;
    }
    return ans;
}
spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]);
