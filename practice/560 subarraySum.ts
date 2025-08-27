//
function subarraySum(nums, k) {
    const n = nums.length;
    const s = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        s[i + 1] = s[i] + nums[i];
    }
    let ans = 0;
    const record = new Map();
    for (const si of s) {
        ans += record.get(si - k) ?? 0;
        record.set(si, (record.get(si) ?? 0) + 1);
    }
    return ans;
}
