// 缺失的第一个正数
function firstMissingPositive(nums) {
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0) {
            continue;
        }
        while (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
            const j = nums[i] - 1;
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
    }
    for (let k = 1; k <= n; k++) {
        if (nums[k - 1] !== k) {
            return k;
        }
    }
    return n + 1;
}
/**
 * 数组长度为 N，相当于要求 [1, N]里的每一个数字都应该放到对应的下标处
 * 例子：
 *      [1,2,3,4] ：缺失的第一个正数是 5
 *      [1,1,3,4]：缺失的第一个整数是 2
 */
