function minDistance(word1: string, word2: string) {
    const m = word1.length;
    const n = word2.length;
    // dp[i][j]：将 word1 [0,i-1] 转换成 word2 [0,j-1] 所需的最少操作数
    const dp = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0)
    );
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) === word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // 对应：删除、插入、替换
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
            }
        }
    }
    return dp[m][n];
}
