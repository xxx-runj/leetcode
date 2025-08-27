function letterCombinations(digits) {
    const n = digits.length;
    if (n === 0) {
        return [];
    }
    const dic = new Map();
    const baseCharCode = "a".charCodeAt(0);
    let j = 0;
    for (let i = 2; i <= 9; i++) {
        const len = i === 7 || i === 9 ? 4 : 3;
        const strs = []
        dic.set(`${i}`, strs);
        let k=0;
        for (; k < len; k++) {
            strs.push(String.fromCharCode(baseCharCode + j + k))
        }
        j += k;
    }
    const ans = [];
    const path = [];
    dfs(0);
    return ans;

    // 表示正在选第i个字符
    function dfs(i) {
        if (i === n) {
            ans.push([...path]);
            return;
        }
        for (const c of dic.get(digits.charAt(i))) {
            path.push(c);
            dfs(i + 1);
            path.pop();
        }
    }
}
