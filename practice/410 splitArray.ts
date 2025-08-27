// 分割数组的最大值
function splitArray(nums, k) {
    function check(maxS) {
        // 和最大为 sum 时，分割的最小个数
        let cnt = 0;
        let i = 0;
        let sum = 0;
        while (i < nums.length) {
            if (nums[i] > maxS) {
                // 说明 maxS 需要增大一些
                return false;
            }
            if (sum + nums[i] > maxS) {
                cnt++;
                sum = 0;
            }
            sum += nums[i];
            i++;
        }
        cnt++;
        /**
         * cnt <= k，说明 maxS 还可以更小，r 往左移动
         * cnt > k，说明 maxS 需要增大一点，l 往右移动
         */
        return cnt <= k;
    }
    let l = 0;
    let r = 0;
    for (const x of nums) {
        r += x;
    }
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l
}
