function largestIsland(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const direction = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];
    let index = 2;
    const area = new Map();
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                area.set(index++, dfs(i, j, index))
            }
        }
    }
    // 全是海洋，没有岛屿
    if (area.size === 0) { return 1 }

    let max = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                const group = getSum(i, j);
                // 周围全是海洋
                if (group.size === 0) { continue }
                max = Math.max(max, 1 + [...group].reduce((pre, cur) => {
                    return pre+area.get(cur)
                }, 0))
            }
        }
    }
    if(max === 0){
        // 全是岛屿没有海洋
        return area.get(2)
    }
    return max;


    function inGrid(i, j) {
        return i >= 0 && j >= 0 && i < m && j < n;
    }
    function dfs(i, j, index) {
        if (!inGrid(i, j) || grid[i][j] !== 1) {
            return 0
        }
        grid[i][j] = index;
        let sum = 1;
        for (const dir of direction) {
            sum += dfs(i + dir[0], j + dir[1], index)
        }
        return sum
    }

    function getSum(i, j) {
        let group = new Set<number>();
        for (const dir of direction) {
            const [x, y] = [i + dir[0], j + dir[1]];
            if (inGrid(x, y) && grid[x][y] !== 0) {
                group.add(grid[x][y])
            }
        }
        return group
    }
};

console.log(largestIsland([[1,1], [1,1]]))