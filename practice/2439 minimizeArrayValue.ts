// 最小化数组中的最大值
function minimizeArrayValue(nums) {
    function check(limit) {
        let extra = 0;
        for (let i = nums.length - 1; i >= 1; i--) {
            // 注意：还存在小于 limit 且能够消化 extra 的场景
            extra = Math.max(0, nums[i] + extra - limit);
        }
        return nums[0] + extra <= limit;
    }
    let l = 0;
    let r = Math.max(...nums);
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return r + 1;
}
minimizeArrayValue([3, 7, 1, 6]);

/**
 * limit 越大越能够满足，越小越无法满足，可以二分猜答案
 * 可移动任意多次，故 i 的值可以挪到 i-1、i-2等等
 */
