function jump(nums) {
    const n = nums.length;
    let nxtS = 0;
    let curMax = 0;
    let ans = 0;

    /**
     * 说明一下 i 的边界
     * 只要 i 是合法的，那么就可以从 i 起跳一次，答案加1
     * 因此如果 右边界 设为 i < n，则说明跳到了 n - 1后，还要再跳一次
     * 故 设为 i < n - 1 避免多计算一次
     */
    for (let i = 0; i < n - 1; i++) {
        nxtS = Math.max(nxtS, nums[i] + i);
        if(i === curMax) {
            ans++;
            curMax = nxtS;
        }
    }
    return ans;
}
