function canJump(nums) {
    const n = nums.length;
    // 维护前面能到达的最远位置
    let mx = 0;
    for (let i = 0; i < n; i++) {
        if (mx < i) {
            // 说明无法到达 i ，那么更不能往后走了
            return false;
        }
        mx = Math.max(mx, i + nums[i]);
    }
    return true;
}
