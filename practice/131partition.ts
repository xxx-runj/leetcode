function partition(s: string) {
    const ans = [];
    const path = [];
    const n = s.length;
    dfs(0);
    return ans;

    // i 为起始字符的索引
    function dfs(i) {
        if (i >= n) {
            ans.push([...path]);
            return;
        }
        for (let j = i; j < n; j++) {
            if (isOk(s, i, j)) {
                path.push(s.substring(i, j + 1));
                // j+1 就是下一个起始字符的索引
                dfs(j + 1);
                path.pop();
            }
        }
    }

    // 判断 s [i, j]子串是否为回文子串
    function isOk(s, i, j) {
        while (i <= j) {
            if (s.charAt(i) !== s.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
partition("aab");
