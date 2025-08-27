// K 连续位的最小翻转次数
function minKBitFlips(nums, k) {
    const queue: number[] = [];
    const n = nums.length;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        if(queue.length > 0 && (queue[0] + k - 1) < i) {
            // 说明在 queue[0] 处执行的翻转操作，影响不到 nums[i]
            queue.shift();
        }
        if ( queue.length % 2 === nums[i]) {
            // 上面的判断说明：前面执行的翻转操作会让nums[i] 为0，
            // 所以nums[i]这里也必须执行一次：翻转大小为k的窗口
            if (i + k > n) {
                // 剩下的元素不够 k 个了，则失败
                return -1;
            }
            queue.push(i);
            ans++;
        }
    }
    return ans;
}
