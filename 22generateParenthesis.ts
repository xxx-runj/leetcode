function generateParenthesis(n) {
    const ans = [];
    const path = [];
    dfs(0, 0);
    return ans;

    // 左括号数量 & 右括号数量
    function dfs(lc, rc) {
        if (lc === n && rc === n) {
            ans.push(path.join(""));
            return;
        }
        // 左括号数量小于n，那么可以选左
        if (lc < n) {
            path.push("(");
            dfs(lc + 1, rc);
            path.pop();
        }
        // 如果右括号数量小于左括号数量，那么也可以选右
        if (rc < lc) {
            path.push(")");
            dfs(lc, rc + 1);
            path.pop();
        }
    }
}

generateParenthesis(2);
