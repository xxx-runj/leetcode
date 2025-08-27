function numberOfPoints(nums) {
    // 差分法
    const n = Math.max(...nums.map((v) => v[1]));
    const diff = new Array(n + 2).fill(0);
    for (const [start, end] of nums) {
        // [start, end]覆盖了数轴点
        diff[start]++;
        diff[end + 1]--;
    }
    let ans = 0;
    let s = 0;
    for (const d of diff) {
        s += d;
        if (s > 0) {
            ans++;
        }
    }
    return ans;
}
