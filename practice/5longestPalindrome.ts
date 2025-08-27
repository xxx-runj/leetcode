// 中心扩散
function longestPalindrome(s) {}

// dp
function longestPalindrome1(s: string) {
    const n = s.length;
    let maxLen = 1;
    let beigin = 0;
    // dp[i][j]：[i, j]区间是否为回文子串
    const dp = Array.from({ length: n }, () =>
        Array.from({ length: n }).fill(false)
    );
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i >= j) {
                dp[i][j] = true;
            }
        }
    }
    for (let j = 1; j < n; j++) {
        for (let i = j; i >= 0; i--) {
            if (i === j) {
                dp[i][j] = true;
            } else if (s.charAt(i) === s.charAt(j)) {
                dp[i][j] = dp[i + 1][j - 1];
            } else {
                dp[i][j] = false;
            }
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                beigin = i;
            }
        }
    }
    return s.substring(beigin, beigin + maxLen);
}
longestPalindrome1("a");
