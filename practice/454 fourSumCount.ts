// 四数相加 II
function fourSumCount(nums1, nums2, nums3, nums4) {
    const n = nums1.length;
    const abSum = new Map();
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const s = nums1[i] + nums2[j];
            abSum.set(s, (abSum.get(s) ?? 0) + 1);
        }
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const s = -nums3[i] - nums4[j];
            ans += abSum.get(s) ?? 0;
        }
    }
    return ans;
}
