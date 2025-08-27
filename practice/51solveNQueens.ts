function solveNQueens(n) {
    const ans = [];
    const col = new Set();
    const addS = new Set();
    const subS = new Set();
    const board = Array.from({ length: n }, () => {
        return new Array(n).fill(".");
    });
    dfs(0);
    return ans;

    // 正在放置第i个皇后
    function dfs(i) {
        if (i >= n) {
            ans.push(board.map(item => item.join('')));
            return;
        }
        // 将被放在第i行的某一列上
        for (let j = 0; j < n; j++) {
            if (col.has(j) || addS.has(i + j) || subS.has(i - j)) {
                continue;
            }
            // 修改棋盘
            board[i][j] = "Q";
            col.add(j);
            addS.add(i + j);
            subS.add(i - j);
            dfs(i + 1);
            board[i][j] = ".";
            col.delete(j);
            addS.delete(i + j);
            subS.delete(i - j);
        }
    }
}
