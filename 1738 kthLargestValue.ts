//
function kthLargestValue(matrix, k) {
    // 先求一个前缀异或和
    const m = matrix.length;
    const n = matrix[0].length;
    const xorSum = new Array(m + 1)
        .fill(0)
        .map((_v) => new Array(n + 1).fill(0));
    const ans:number[] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            xorSum[i + 1][j + 1] =
                xorSum[i + 1][j] ^
                xorSum[i][j + 1] ^
                matrix[i][j] ^
                xorSum[i][j];
            ans.push(xorSum[i + 1][j + 1]);
        }
    }
    ans.sort((a, b) => b - a);
    return ans[k - 1];
}
