// 和有限的最长子序列
function answerQueries(nums, queries) {
    // 排序 + 前缀和 + 二分
    nums.sort((a, b) => a - b);
    for (let i = 0; i < nums.length; i++) {
        if (i > 0) {
            nums[i] += nums[i - 1];
        }
    }
    function binary(arr, target) {
        let l = 0;
        let r = arr.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return r;
    }
    return queries.map((x) => {
        const r = binary(nums, x);
        return r < 0 ? 0 : r + 1;
    });
}
function answerQueries1(nums, queries) {
    // 排序 + 双指针
    nums.sort((a, b) => a - b);
    function pointer(arr, target) {
        let l = 0;
        let r = 0;
        let sum = 0;
        let ans = 0;
        while (r < nums.length) {
            sum += nums[r];
            r++;
            if (sum <= target) {
                ans = Math.max(ans, r - l);
            } else {
                l++;
            }
        }
        return ans;
    }
    return queries.map((x) => {
        const len = pointer(nums, x);
        return len;
    });
}
