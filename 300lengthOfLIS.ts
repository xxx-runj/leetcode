// DP 递推 + 记忆化：可以用动态规划解决
function lengthOfLIS(nums) {
    const n = nums.length;
    const dp = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const bigger = nums[i] > nums[j];
            dp[i] = Math.max(dp[i], bigger ? dp[j] + 1 : dp[i]);
        }
    }
    return Math.max(...dp);
}

// 贪心 + 二分
function lengthOfLIS1(nums) {
    const n = nums.length;
    // tails[k] 表示：当最长严格递增子序列长度为 k 时，序列中最后一个元素的值
    const tails = new Array(n + 1).fill(0);
    // ans 的值实际上也对应着 tails 的有效长度
    let ans = 0;

    for (let i = 0; i < n; i++) {
        // 找到tails中第一个大于或等于 nums[i] 的位置
        let l = 0;
        let r = ans - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (tails[mid] >= nums[i]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        tails[l] = nums[i];
        if (l === ans) {
            // 没找到，说明任意长度的递增子序列末尾元素都小于当前元素
            // 可以把当前元素加进来，那么最长子序列的长度可以+1
            ans += 1;
        }
    }
    return ans;
}
lengthOfLIS1([7,7,7,7,7,7,7])

// 输出最长递增子序列的结果
function resultOfLIS(nums){
    const n = nums.length;
    // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
    const dp = new Array(n).fill(1);
    const prev = new Array(n).fill(-1); // 用于记录前一个元素的索引
    let maxLength = 0;
    let maxIndex = -1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j; // 记录前一个元素的索引
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }

    // 重建最长递增子序列
    const lis = [];
    while (maxIndex !== -1) {
        lis.unshift(nums[maxIndex]);
        maxIndex = prev[maxIndex];
    }
    return lis;
}
console.log(resultOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 输出 [2, 3, 7, 101]