

// 162 寻找峰值
/**
 * 解题核心算法：爬山
 * 两边都是负无穷，数组当中可能有很多波峰，也可能只有一个，如果尝试画图，就跟股票信息一样，没有规律
 * 如果根据中点値判断我们的二分方向该往何处取，你这样想，中点所在地方，可能是某座山的山峰，山的下坡处，山的上坡处
 * 关键是我们的二分方向，并不知道山峰在我们左边还是右边，送你两个字你就明白了，爬山（没错，就是带你去爬山）
 * 如果你往下坡方向走，也许可能遇到新的山峰，但是也许是一个一直下降的坡，最后到边界。
 * 但是如果你往上坡方向走，就算最后一直上的边界，由于最边界是负无穷，所以就一定能找到山峰，
 * 总的一句话，往递增的方向上，二分，一定能找到，往递减的方向只是可能找到，也许没有
 */
function findPeakElement(nums) {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        const mid = Math.floor((l + r) / 2);
        if (nums[mid] > nums[mid + 1]) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return r;
}
console.log(findPeakElement([1, 2, 3, 1]))
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4]))

// 153. 寻找旋转排序数组中的最小值 时间复杂度为 O(log n) 
// 重点在于 mid 和谁 进行比较，收缩方向
function findMin(nums) {
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] > nums[r]) {
            // 最小值一定在mid的右边
            l = mid + 1;
        } else {
            // 最小值为mid或者在mid的左边
            r = mid;
        }
    }
    return nums[r];
}

// 33 搜索旋转排序数组  时间复杂度为 O(log n) 
function search(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] >= nums[l]) {
            // mid左侧为递增数组，右侧为旋转数组
            if (nums[l] <= target && target < nums[mid]) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        } else {
            // 左侧为旋转数组，右侧为递增数组
            if (nums[mid] < target && target <= nums[r]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
    }
    return -1;
}
// 34 在排序数组中查找元素的第一个和最后一个位置（已做）
// 35 搜索插入位置
function searchInsert(nums, target) {
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (nums[mid] < target) {
            l = mid + 1;
        } else if(nums[mid] > target) {
            r = mid - 1;
        } else {
            return mid;
        }
    }
    return l;
};
// 704. 二分查找（已做）
// 744. 寻找比目标字母大的最小字母


// 2529. 正整数和负整数的最大计数
