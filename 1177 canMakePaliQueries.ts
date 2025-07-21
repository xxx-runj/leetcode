function canMakePaliQueries(s, queries) {
    const n = s.length;
    // 优化1 -> 前缀和 统计子串中每种字符的出现（这样后面的判断就不需要再遍历了）
    // 优化2 -> 只关心字符个数是奇数还是偶数，因此用 1 表示奇数，0表示偶数即可
    const preS = new Array(n + 1).fill(0).map((_v) => new Array(26).fill(0));
    for (let i = 0; i < n; i++) {
        const index = s.charAt(i).charCodeAt(0) - "a".charCodeAt(0);
        preS[i + 1] = [...preS[i]];
        preS[i + 1][index] ^= 1;
    }
    return queries.map((item) => {
        let [left, right, k] = item;
        // [left, right] 有多少个字符为奇数个
        let m = 0;
        for (let i = 0; i < 26; i++) {
            m += preS[right + 1][i] ^ preS[left][i];
        }
        return Math.floor(m / 2) <= k;
    });
}
