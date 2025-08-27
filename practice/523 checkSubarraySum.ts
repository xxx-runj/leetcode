// 连续的子数组和
function checkSubarraySum(nums, k) {
    const n = nums.length;
    // 统计前缀和
    const s = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        s[i + 1] = s[i] + nums[i];
    }
    const record = new Set();
    // 子数组长度至少为2
    for (let i = 2; i < s.length; i++) {
        // i为2时，才能把 i=0 记录；i为3时，才能把 i=1 记录，类推
        record.add(s[i - 2] % k);
        if (record.has(s[i] % k)) {
            return true;
        }
    }
    return false;
}
