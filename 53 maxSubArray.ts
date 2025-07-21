//
function maxSubArray(nums) {
    const n = nums.length;
    // 计算前缀和
    const s = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        s[i + 1] = s[i] + nums[i];
    }
    /**
     * 问题转换为：找出 i < j 且使得 s[j] - s[i] 最大
     * 枚举 j，s[j] 确定时，s[i]越小越好
     */
    let preMin = s[0];
    let ans = -Infinity;
    for (let j = 1; j < n + 1; j++) {
        ans = Math.max(ans, s[j] - preMin);
        preMin = Math.min(preMin, s[j]);
    }
    return ans;
}
function maxSubArray1(nums) {
    const n = nums.length;
    // 把两个for循环合为一个
    let ans = -Infinity;
    let minPreSum = 0;
    let preSum = 0;
    for(const x of nums){
        preSum += x;
        ans = Math.max(ans, preSum - minPreSum);
        minPreSum = Math.min(minPreSum, preSum)
    }
    return ans;
}
