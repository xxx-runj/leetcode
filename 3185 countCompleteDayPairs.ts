// 构成整天的下标对数目 II
function countCompleteDayPairs(hours){
    const record = new Array(24).fill(0);
    let ans = 0;
    for(const h of hours) {
        // rem 的值会在区间 [1, 24]出现，因此注意从 record 取值时，record[24] === record[0]
        const rem = 24 - h % 24;
        // 找record里面模24后等于 rem 有几个，即为构成的下标对数
        ans += record[rem % 24];
        // 注意：h % 24 的值会在区间 [0, 23]出现
        record[h % 24]++;
    }
    return ans;
}
console.log(countCompleteDayPairs([72,48,24,3]))

/** 注意 i < j，枚举 j 时，永远只在 j 的左边找能配队的 i
 * hours[i] + hours[j] = 24*n
 * 所以 hours[i] % 24 = 24 - hours[j] % 24;
 */