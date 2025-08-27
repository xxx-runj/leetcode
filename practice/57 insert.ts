//
function insert(intervals, newInterval) {
    const n = intervals.length;
    const ans = [];
    let i = 0;
    // 先把左边完全不与 newInterval 重叠的加入答案中
    while (i < n && intervals[i][1] < newInterval[0]) {
        ans.push(intervals[i]);
        i++;
    }
    // 接着判断当前区间是否与新区间重叠
    while (i < n && newInterval[1] >= intervals[i][0])  {
        newInterval = [
            Math.min(newInterval[0], intervals[i][0]),
            Math.max(newInterval[1], intervals[i][1]),
        ];
        i++;
    }
    ans.push(newInterval);
    while (i < n) {
        ans.push(intervals[i]);
        i++;
    }
    return ans
}
insert([[1,3],[6,9]], [2, 5])
