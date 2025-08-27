// 广搜
function numIslands(grid) {
    let ans = 0;
    const m = grid.length;
    const n = grid[0].length;
    const dir = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== "1") {
                continue;
            }
            ans++;
            bfs(i, j);
        }
    }
    return ans;

    function bfs(x, y) {
        const queue = [[x, y]];
        grid[x][y] = "2";
        // 将其上下左右为1的都标记上
        while (queue.length) {
            const cur = queue.pop();
            for (const item of dir) {
                const [newX, newY] = [cur[0] + item[0], cur[1] + item[1]];
                if (
                    newX >= 0 &&
                    newX < m &&
                    newY >= 0 &&
                    newY < n &&
                    grid[newX][newY] === "1"
                ) {
                    queue.push([newX, newY]);
                    grid[newX][newY] = "2";
                }
            }
        }
    }
}

// 深搜
function numIslands1(grid) {
    let ans = 0;
    const m = grid.length;
    const n = grid[0].length;
    const dir = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== "1") {
                continue;
            }
            ans++;
            dfs(i, j);
        }
    }
    function dfs(x, y) {
        // 终止条件
        if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] !== "1") {
            return;
        }
        grid[x][y] = "2";
        for (const item of dir) {
            dfs(x + item[0], y + item[1]);
        }
    }
    return ans;
}
numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
]);
