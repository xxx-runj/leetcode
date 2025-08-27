function findDuplicate(nums) {
    const n = nums.length;
    let slow = nums[0];
    let fast = nums[0];
    while (true) {
        fast = nums[nums[fast]];
        slow = nums[slow];
        if(fast === slow) {
            // 说明两者相遇了
            slow = nums[0];
            while(slow !== fast) {
                slow = nums[slow];
                fast = nums[fast];
            }
            return slow;
        }
    }
}

// 二分法
// 标记法
// 判断入环点
