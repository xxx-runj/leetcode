function orangesRotting(grid) {
    const m = grid.length;
    const n = grid[0].length;
    // 把所有腐烂的、新鲜的橘子统计出来
    let fresh = 0;
    const queue = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                fresh++;
            } else if (grid[i][j] === 2) {
                queue.push([i, j]);
            }
        }
    }
    let ans = 0;
    while (queue.length && fresh) {
        // 每过一分钟，把队列里腐烂橘子的四周都进行感染
        ans++;
        const len = queue.length;
        for (let k = 0; k < len; k++) {
            const [x, y] = queue.shift();
            if (x - 1 >= 0 && grid[x - 1][y] === 1) {
                grid[x - 1][y] = 2;
                queue.push([x - 1, y]);
                fresh--;
            }
            if (x + 1 < m && grid[x + 1][y] === 1) {
                grid[x + 1][y] = 2;
                queue.push([x + 1, y]);
                fresh--;
            }
            if (y - 1 >= 0 && grid[x][y - 1] === 1) {
                grid[x][y - 1] = 2;
                queue.push([x, y - 1]);
                fresh--;
            }
            if (y + 1 < n && grid[x][y + 1] === 1) {
                grid[x][y + 1] = 2;
                queue.push([x, y + 1]);
                fresh--;
            }
        }
    }
    return fresh > 0 ? -1 : ans;
}
orangesRotting([[2,1,1],[1,1,0],[0,1,1]])

