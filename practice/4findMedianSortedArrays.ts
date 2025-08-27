function findMedianSortedArrays(nums1, nums2) {
    const m = nums1.length;
    const n = nums2.length;
    // 左右各一半，左边 Math.ceil((m+n)/2) 个
    const halfCount = Math.ceil((m + n) / 2);
    // 假设左边一半中，包含 nums1 中前 k1 个元素 [0, i)，nums2 中前 (halfCount-k1) 个元素[0, j)
    // 二分法在nums1中找一个索引 i
    let l = 0;
    let r = m - 1;
    while (l <= r) {
        const i = l + Math.floor((r - l) / 2);
        const j = halfCount - i;
        const tmp =
            j - 1 < 0 ? -Infinity : j - 1 >= n ? Infinity : nums2[j - 1];
        if (nums1[i] <= tmp) {
            l = i + 1;
        } else {
            r = i - 1;
        }
    }
    const k2 = halfCount - l;
    // 第一个参与中位数计算的元素
    const c1 = Math.max(
        l > 0 ? nums1[l - 1] : -Infinity,
        k2 > 0 ? nums2[k2 - 1] : -Infinity
    );
    if ((m + n) % 2 === 1) {
        return c1;
    }
    // 第二个参与中位数计算的元素
    const c2 = Math.min(
        l === m ? Infinity : nums1[l],
        k2 === n ? Infinity : nums2[k2]
    );
    return (c1 + c2) / 2;
}
findMedianSortedArrays([1, 3], [2, 7]);
