// 有序数组中出现次数超过25%的元素
function findSpecialInteger(arr) {
    // 方法一：定长滑动窗口法
    /**
     * 方法二：
     *      数组分成四份，m = Math.floor(n/4)，题意说明元素数量超过25%，元素数量至少有 m+1
     *      因此依次检查 i = m、(2 * m + 1)、(3 * m + 2)，其中一定有一个 arr[i] 的出现次数至少为 m+1
     *      遍历 [m, 2m+1, 3m+2]，在 arr 中 二分法 找到 arr[i] 的左边界 l，如果 arr[l+m] === arr[i]，则返回
     */
}
