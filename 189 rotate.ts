//
function rotate(nums, k) {
    const n = nums.length;
    let pos = 0;
    let cur = nums[pos];
    let cnt = n;
    // 记录元素是否被操作过
    const operated = new Array(n).fill(0);
    while (cnt > 0) {
        while (operated[pos] === 1) {
            pos = (pos + 1) % n;
            cur = nums[pos];
        }
        // 即将要放置的新位置
        const newPos = (pos + k) % n;
        // 新位置上最开始的值
        const temp = nums[newPos];
        operated[pos] = 1;
        // 更新
        nums[newPos] = cur;
        cur = temp;
        pos = newPos;

        cnt--;
    }
    return nums;
}

function rotate1(nums, k) {
    function reverse(nums, l, r) {
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++;
            r--;
        }
    }
    const n = nums.length;
    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
    return nums
}
