/**
 * 最长连续序列
 * 在二重循环中，每个元素至多遍历两次：
 *      在外层循环中遍历一次，在内层循环中遍历一次。
 * 所以二重循环的时间复杂度是 O(n) 的
 */
function longestConsecutive(nums) {
    const s = new Set<number>(nums);
    let ans = 0;
    for (const x of s) {
        if (s.has(x - 1)) {
            // 说明还有比 x 更小的起始值
            continue;
        }
        // 说明 x 是序列的起点
        let y = x + 1;
        while(s.has(y)) {
            y++;
        }
        ans = Math.max(ans, y - x)
    }
    return ans;
}
