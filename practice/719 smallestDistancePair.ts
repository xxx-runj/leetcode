// 找出第 K 小的数对距离
function smallestDistancePair(nums, k) {
    const n = nums.length;
    nums.sort((a, b) => a - b);
    let l = 0;
    let r = nums[n - 1] - nums[0];
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            // 根据此距离计算出的 数对个数 >=k，说明猜测的距离还可以再小点
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l;

    function check(dis) {
        let cnt = 0;
        for (let i = 0, j = 1; i < n; i++) {
            while (j < n && nums[j] - nums[i] <= dis) {
                j++;
            }
            cnt += j - i - 1;
        }
        return cnt >= k;
    }
}
smallestDistancePair([1,6,1], 3)
