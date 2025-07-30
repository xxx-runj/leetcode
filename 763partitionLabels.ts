function partitionLabels(s) {
    const n = s.length;
    const dic = {};
    const ans = [];
    for (let i = 0; i < n; i++) {
        dic[s.charAt(i)] = i;
    }
    let mxfar = 0;
    let start = 0;
    for (let i = 0; i < n; i++) {
        mxfar = Math.max(mxfar, dic[s.charAt(i)]);
        if (mxfar === i) {
            ans.push(i - start + 1);
            start = i + 1;
        }
    }
    return ans;
}
// 和跳跃游戏类似
