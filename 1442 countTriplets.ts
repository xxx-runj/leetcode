//
function countTriplets(arr) {
    const n = arr.length;
    // 统计前缀异或和
    const s = new Array(n + 1).fill(0);
    s[0] = 0;
    for (let i = 0; i < n; i++) {
        s[i + 1] = s[i] ^ arr[i];
    }
    let ans = 0;
    // 记录出现过的异或结果，存储格式：{ 异或结果 : [下标1, 下标2 ...] }
    const record = new Map();
    for (let k = 0; k < s.length; k++) {
        const pos = record.get(s[k]) ?? [];
        for (const p of pos) {
            // Xor[i, k] = s[k] ^ s[i-1]，所以我们找到的下标 p，其实等于 i - 1，那么 i = p + 1
            ans += k - (p + 1);
        }
        pos.push(k);
        record.set(s[k], pos);
    }
    return ans;
}
/**
 * 0 <= i < j <= k < arr.length
 * [i, j - 1] 和 [j, k] 两个子数组内的元素异或和相等
 * 也就是[i, k]内的元素异或和为0
 * Xor[i, k] = s[k] ^ s[i-1]
 */
