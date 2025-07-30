/**
 * maxDP[i + 1] = max(maxDP[i] * A[i + 1], A[i + 1],minDP[i] * A[i + 1])
 * minDP[i + 1] = min(minDP[i] * A[i + 1], A[i + 1],maxDP[i] * A[i + 1])
 * dp[i + 1] = max(dp[i], maxDP[i + 1])
 */
function maxProduct(nums) {
    const n = nums.length;
    // 截止到当前元素，前面元素中 乘积的最大值
    let max = 1;
    // 截止到当前元素，前面元素中 乘积的最小值
    let min = 1;
    let ans = -Infinity;
    for (let i = 0; i < n; i++) {
        const c = nums[i];
        let t = max;
        max = Math.max(t * c, c, min * c);
        min = Math.min(min * c, c, t * c);
        ans = Math.max(ans, max);
    }
    return ans;
}
maxProduct([2, 3, -2, 4]);
