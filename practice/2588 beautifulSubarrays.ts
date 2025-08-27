// 统计美丽子数组数目
function beautifulSubarrays(nums) {
    // 子数组[0, i]的异或和
    let s = 0;
    const record = new Map();
    record.set(0, 1);
    let ans = 0;
    for (const x of nums) {
        s ^= x;
        // 与当前 s 异或后 等于 0 的值的个数
        const c = record.get(s) ?? 0;
        ans += c;
        record.set(s, c + 1);
    }
    return ans
}

/**
 * nums[i] - 2^k 转成二进制就是相当于把 nums[i] 二进制中的某个1变为0
 * 对 nums[i] 和 nums[j] 同时减去 2^k
 * 即对 nums[i] 和 nums[j] 二进制的同一个位置处的1变为0
 * 要求进行若干次操作后，子数组值都为0，说明子数组所有元素 二进制 的同一位置，1的总个数必须为偶数
 *      假设位置 i 处， 1 的总个数为 s[i]，即 s[i] % 2 = 0；
 *      由于二进制只有 0 1，想知道十进制 a, b 对应的二进制形式 a2、b2 的位置 i 处 1 的总个数是否为偶数
 *      只需要 a2 异或 b2 ，判断位置 i 是否为 0 即可。
 * 美丽子数组为：全为 0 的数组，即二进制形式的任意位置都为0
 * 将上述推导进行推广，对于任意位置 j, 都必须有偶数个 1：即子数组的异或和等于0
 */
