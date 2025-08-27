// 找出最长的超赞子字符串
function longestAwesome(s) {
    const n = s.length;
    const D = 10;
    // 用 Map 进行记录
    const record = new Map();
    record.set(0, -1);
    // 用二进制记录个数，0表示偶数，1表示
    let preS = 0;
    let ans = 0;
    for (let i = 0; i < n; i++) {
        const c = Number(s.charAt(i));
        preS ^= 1 << Number(c);
        /**
         * 当前末端是 i，找一个末端 j , j < i，使 [j+1, i] 这个子串为超赞子字符串。
         * 满足 preS_i ^ preS_j = 2**k ; preS_j = preS_i ^ 2**k
         * 满足 preS_i ^ preS_j = 0
         */
        for (let d = 0; d < D; d++) {
            const pos = record.has(preS ^ (1 << d))
                ? record.get(preS ^ (1 << d))
                : i;
            ans = Math.max(ans, i - pos);
        }
        if (record.has(preS)) {
            ans = Math.max(ans, i - record.get(preS));
        } else {
            record.set(preS, i)
        }
    }
    return ans;
}
