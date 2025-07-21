function distance(nums) {
    const n = nums.length;
    const record = new Map();
    for (let i = 0; i < n; i++) {
        const group = record.get(nums[i]) ?? [];
        group.push(i);
        // 很明显，group单调递增
        record.set(nums[i], group);
    }
    const arr = new Array(n).fill(0);
    for (const group of record.values()) {
        const sum = getPreSum(group);
        const gn = group.length;
        for (let j = 0; j < group.length; j++) {
            const q = group[j];
            // 和 2602 题类似
            arr[q] = q * j - sum[j] + sum[gn] - sum[j] - q * (gn - j);
        }
    }
    return arr;

    // 统计一个数组的前缀和
    function getPreSum(arr) {
        const n = arr.length;
        const sum = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            sum[i + 1] = sum[i] + arr[i];
        }
        return sum;
    }
}
