//  两个线段获得的最多奖品
function maximizeWin(prizePositions, k) {
    const n = prizePositions.length;
    let ans = 0;
    // 枚举第二条线段的右端点
    // 最终答案是：当前线段能覆盖的奖品数 + 前面（不重叠）线段的最多奖品数
    // 用 preMax 维护 前面（不重叠）线段能覆盖的最多奖品数
    const preMax = new Array(n).fill(0);
    let i = 0;
    for (let j = 0; j < n; j++) {
        while (prizePositions[j] - prizePositions[i] > k) {
            i++;
        }
        // 当前线段(长度 <=k 的滑动窗口)能获得的奖品数量
        const count = j - i + 1;
        // 更新preMax
        preMax[j] = j > 0 ? Math.max(preMax[j - 1], count) : count;
        // 更新最终答案
        // 如果当前窗口不是从0开始，拼接前一段
        const before = i === 0 ? 0 : preMax[i - 1];
        ans = Math.max(ans, before + count)
    }
    return ans;
}
