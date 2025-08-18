function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => Infinity)
    );
    dp[0][0] = dp[0][1] = dp[1][0] = 0;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] =
                Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i - 1][j - 1];
        }
    }
    return dp[m][n];
}

// dfs
function minPathSum1(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const memo = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => -1)
    );
    return dfs(m-1, n-1)
    // 表示从起点走到(i, j)的路径
    function dfs(i, j) {
        if (i < 0 || j < 0) {
            return Infinity;
        }
        if (i === 0 && j === 0) {
            return grid[i][j];
        }
        if (memo[i][j] !== -1) {
            return memo[i][j];
        }
        const res = Math.min(dfs(i - 1, j), dfs(i, j - 1)) + grid[i][j];
        memo[i][j] = res;
        return res;
    }
}
minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
]);
