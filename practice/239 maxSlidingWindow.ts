function maxSlidingWindow(nums, k) {
    const n = nums.length;
    const queue: number[] = [];
    const ans: number[] = [];
    for (let i = 0; i < n; i++) {
        // 右边进
        while (queue.length > 0 && nums[queue[queue.length - 1]] <= nums[i]) {
            queue.pop();
        }
        queue.push(i);
        // 左边出
        const start = i - k + 1;
        // 说明记录的最大值下标已经不在窗口范围了，需要移除
        if(queue[0] < start) {
            queue.shift();
        }
        // 在窗口左端点处记录答案
        if(start >= 0) {
            ans.push(nums[queue[0]])
        }
    }
    return ans;
}
