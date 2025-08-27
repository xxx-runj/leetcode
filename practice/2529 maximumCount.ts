// 正整数和负整数的最大计数
function maximumCount(nums) {
    // O(n) 一次遍历即可
    // O(logn) 二分法，分别找 1 的左边界 & 0 的左边界
    function func(nums, target) {
        let l = 0;
        let r = nums.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (nums[mid] >= target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        //  [0, l) 都是比 target 小的值，[l, nums.length - 1] 大于等于 target 的值
        return l;
    }
    const oneLeft = func(nums, 1);
    const zeroLeft = func(nums, 0);
    return Math.max(zeroLeft, nums.length - oneLeft)
}