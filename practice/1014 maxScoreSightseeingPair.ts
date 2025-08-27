// 最佳观光组合
function maxScoreSightseeingPair(values){
    const n = values.length;
    let maxI = values[0];
    let ans = 0;
    let j = 1;
    while(j < n) {
        ans = Math.max(ans, maxI + values[j] - j);
        maxI = Math.max(maxI, values[j] + j);
        j++;
    }
    return ans;
}
/**
 * 大家都是怎么想出来的啊
 * 
 * values[i] + values[j] + i - j = (values[i] + i) + (values[j] - j)
 * 枚举 j，values[j] - j 是确定的，因此只需要找到 j 之前使 values[i] + i 最大的 i即可
 */