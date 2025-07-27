function exist(board, word) {
    const m = board.length;
    const n = board[0].length;
    const len = word.length;
    const visited = Array.from({ length: m }, () =>
        Array.from({ length: n }).fill(false)
    );
    const dir = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
    ];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const res = dfs(i, j, 0);
            if (res) {
                return true;
            }
        }
    }
    return false;

    // i：正在搜索 word 索引i对应的值
    function dfs(x, y, i) {
        if (i === len) {
            return true;
        }
        if (!inBoard(x, y) || visited[x][y] || board[x][y] !== word.charAt(i)) {
            return false;
        }
        visited[x][y] = true;
        let res = false;
        for (const d of dir) {
            const [newx, newy] = [x + d[0], y + d[1]];
            res = res || dfs(newx, newy, i + 1);
        }
        visited[x][y] = false;
        return res;
    }
    function inBoard(x, y) {
        return x >= 0 && y >= 0 && x < m && y < n;
    }
}
