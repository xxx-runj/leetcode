// 快速排序
function findKthLargest(nums, k) {
    return quickSelect(nums, k);
    function quickSelect(nums, k) {
        const large = [];
        const small = [];
        const equal = [];
        const pivot = nums[0];
        for (let i = 0; i < nums.length; i++) {
            const x = nums[i];
            if (x > pivot) {
                large.push(x);
            } else if (x < pivot) {
                small.push(x);
            } else {
                equal.push(x);
            }
        }
        if (large.length >= k) {
            return quickSelect(large, k);
        } else if (k > large.length + equal.length) {
            return quickSelect(small, k - large.length - equal.length);
        } else {
            return pivot;
        }
    }
}
// k个元素的最小堆
// 最大堆

// 快速排序
/**
 * 选择一个基准数，将大于基准数的值放在其左边，小于等于基准数的值放在右边
 * 假设该基准数最终所处的索引 刚好是数组降序排序后 第k大的元素索引，那么就我们就找到了答案
 * 特殊用例下，会超出时间限制
 */
function findKthLargest1(nums, k) {
    return partition(nums, 0, nums.length - 1);
    function partition(nums, left, right) {
        // 随机选一个基准值
        const index = left + Math.floor(Math.random() * (right - left + 1));
        const pivot = nums[index];
        [nums[index], nums[right]] = [nums[right], nums[index]]
        let j = left;
        for (let i = left; i < right; i++) {
            if (nums[i] > pivot) {
                [nums[j], nums[i]] = [nums[i], nums[j]];
                j++;
            }
        }
        [nums[j], nums[right]] = [nums[right], nums[j]];
        // j 指向的位置就是基准值的索引
        if (j === k - 1) {
            return pivot;
        }
        if (j < k - 1) {
            return partition(nums, j + 1, right);
        }
        return partition(nums, left, j - 1);
    }
}