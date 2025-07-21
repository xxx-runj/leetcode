// 合并区间
function merge(intervals) {
    // 按照start升序
    intervals.sort((a, b) => a[0] - b[0]);
    const ans: any[] = [];
    for (const [start, end] of intervals) {
        const m = ans.length;
        // 当前正遍历的区间起点 <= 最后一个已合并区间的终点，可以合并
        if (m && start <= ans[m - 1][1]) {
            ans[m - 1][1] = Math.max(ans[m - 1][1], end);
        } else {
            ans.push([start, end])
        }
    }
    return ans
}
