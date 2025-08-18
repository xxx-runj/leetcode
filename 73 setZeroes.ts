// 空间O(1)写法
function setZeroes(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    // 用第一列和第一行记录剩下的行和列中有无0
    // 在此之前要把第一行和第一列的信息先保留下来
    let rowFlag = false;
    let colFlag = false;
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            colFlag = true;
            break;
        }
    }
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            rowFlag = true;
            break;
        }
    }
    // 读取0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[0][j] = 0;
                matrix[i][0] = 0;
            }
        }
    }
    // 写入0
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    // 对第一行和第一列写0
    if (rowFlag) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    if (colFlag) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
    return matrix;
}
setZeroes([[0,1,2,0],[3,4,5,2],[1,3,1,5]])

// 空间O(m+n)写法
function setZeroes1(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    const rowFlag = new Array(m).fill(1);
    const colFlag = new Array(n).fill(1);
    // 遍历matrix，记录某一行或某一列是否出现过0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0) {
                rowFlag[i] = 0;
                colFlag[j] = 0;
            }
        }
    }
    // 最后根据 flag 判断是否要把元素变为0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (rowFlag[i] === 0 || colFlag[j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;
}
