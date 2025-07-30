// dfs
function canPartition(nums) {
    const n = nums.length;
    let s = 0;
    for (const c of nums) {
        s += c;
    }
    if (s % 2 === 1) {
        return false;
    }
    const memo = new Array(n).fill(-1);
    return dfs(n - 1, s / 2);
    // 能否从nums[0]...nums[i]中选出一个子序列，使其和恰好为j
    function dfs(i, j) {
        if (i < 0) {
            return j === 0;
        }
        // 有缓存
        if (memo[i] !== -1) {
            return memo[i];
        }
        const res =
            dfs(i - 1, j) || (j - nums[i] >= 0 && dfs(i - 1, j - nums[i]));
        // 缓存结果
        memo[i] = res ? 1 : 0;
        return res;
    }
}

// dp
function canPartition1(nums) {
    const n = nums.length;
    let s = 0;
    for (const c of nums) {
        s += c;
    }
    if (s % 2 === 1) {
        return false;
    }
    const sum = s / 2;
    const dp = new Array(sum + 1).fill(false);
    dp[0] = true;
    for (let i = 0; i < n; i++) {
        for (let j = sum; j >= 0; j--) {
            dp[j] = dp[j] || j >= nums[i] ? dp[j - nums[i]] : false;
        }
    }
    return dp[sum];
}
canPartition1([1,5,11,5])
