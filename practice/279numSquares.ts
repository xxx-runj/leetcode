function numSquares(n) {
    const dp = Array.from({ length: n + 1 }, (v, i) => {
        return i;
    });
    // 状态转移方程 dp[j] = Math.min(dp[j], dp[j-i^2] + 1)
    for (let i = 1; i <= Math.sqrt(n); i++) {
        for (let j = 1; j < n + 1; j++) {
            const index = j - i ** 2;
            dp[j] = Math.min(dp[j], index < 0 ? Infinity : dp[j - i ** 2] + 1);
        }
    }
    return dp[n];
}
numSquares(12);
