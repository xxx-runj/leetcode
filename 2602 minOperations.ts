// 使数组元素全部相等的最少操作次数
function minOperations(nums, queries) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    // 前缀和
    const sum = new Array<bigint>(n + 1).fill(0n);
    for (let i = 0; i < n; i++) {
        sum[i + 1] = sum[i] + BigInt(nums[i]);
    }
    return queries.map((q) => {
        const bq = BigInt(q);
        const t = lowerBound(bq);
        // 计算面积
        return Number(bq * BigInt(t) - sum[t] + sum[n] - sum[t] - bq * BigInt(n - t));
    });

    // 找到 > target 的左边界
    function lowerBound(target) {
        let l = 0;
        let r = nums.length;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (nums[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l;
    }
}
