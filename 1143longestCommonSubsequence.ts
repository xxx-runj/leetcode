function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    // dp[i][j]表示 text1 [0, i-1]子串 和 text2 [0, j-1]子串的 最长公共子序列长度
    // i 或 j 为0时，即对应 空串 和 子串 的匹配
    const dp = Array.from({ length: m + 1 }, () =>
        Array.from({ length: n + 1 }, () => 0)
    );
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1.charAt(i-1) === text2.charAt(j-1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n]
}
