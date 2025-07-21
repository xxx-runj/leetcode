// 绝对差值和
function minAbsoluteSumDiff(nums1, nums2) {
    const mod = 10 ** 9 + 7;
    // 需要保证下标对应，因此要 clone 一份 nums1 来排序
    const arr = [...nums1].sort((a, b) => a - b);
    const n = nums1.length;
    let sum = 0;
    // 改变前后差值的差
    let max = 0;
    for (let i = 0; i < n; i++) {
        const diff = Math.abs(nums1[i] - nums2[i]);
        sum = (sum + diff) % mod;
        const l = lowerBound(arr, nums2[i]);
        if (l < n) {
            max = Math.max(max, diff - Math.abs(arr[l] - nums2[i]));
        }
        if (l > 0) {
            max = Math.max(max, diff - Math.abs(arr[l - 1] - nums2[i]));
        }
    }
    return (sum - max + mod) % mod;
    

    function lowerBound(arr, target) {
        let l = 0;
        let r = arr.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (arr[mid] >= target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
}
/**
 * 如果进行了替换，则 改变前差值 - 改变后差值 = |nums1[i] - nums2[i]| - |nums1[j] - nums2[i]| 。
 * 需要 改变前后差值的差 越大越好
 * 当 i 确定时，转换为：找与 nums2[i] 最接近的 nums1[j]，可以用二分法
 */
