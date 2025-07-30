function generate(numRows) {
    const ans = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        ans[i] = new Array(i + 1);
        ans[i][0] = 1;
        ans[i][i] = 1;
        for (let j = 1; j < i; j++) {
            ans[i][j] = ans[i - 1][j - 1] + ans[i - 1][j];
        }
    }
    return ans;
}
