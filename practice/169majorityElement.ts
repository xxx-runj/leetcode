// 法一：排序
function majorityElement(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    return nums[Math.floor(n / 2)];
}
// 法二：哈希表

// 法三：摩尔投票法：
function majorityElement1(nums) {
    let vote = 0;
    let ans = -1;
    /**
     * 假设众数为数组中未遍历到的第一个元素，记为： C_猜测
     * 继续遍历，如果 x === C_猜测，则 vote++；否则 vote--
     * 当 vote 为0时，说明前面有 一半的值等于C_猜测，一半的值不等于C_猜测
     * 若 C_猜测 === C_真实，那么剩余数组的众数依旧是C_真实
     * 若 C_猜测 !== C_真实，那么前面相互抵消的值中，不等于C_猜测 的那些数字可能是 C_真实，所以剩余数组的众数依旧是C_真实
     */
    for (const x of nums) {
        if (vote === 0) {
            ans = x;
        }
        if (x === ans) {
            vote++;
        } else {
            vote--;
        }
    }
    return ans;
}
