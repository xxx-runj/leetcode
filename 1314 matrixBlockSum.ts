// 考察二维前缀和
function matrixBlockSum(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    const sum = new Array(m + 1).fill(0).map((_v) => new Array(n + 1).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            sum[i + 1][j + 1] =
                sum[i][j + 1] + sum[i + 1][j] + mat[i][j] - sum[i][j];
        }
    }
    const answer = new Array(m).fill(0).map((_v) => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const r1 = Math.max(i - k, 0);
            const r2 = Math.min(i + k, m - 1);
            const c1 = Math.max(j - k, 0);
            const c2 = Math.min(j + k, n - 1);
            answer[i][j] =
                sum[r2 + 1][c2 + 1] -
                sum[r2 + 1][c1] -
                sum[r1][c2 + 1] +
                sum[r1][c1];
        }
    }
    return answer;
}
