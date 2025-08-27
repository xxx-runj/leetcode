class NumMatrix {
    preS: number[][];
    constructor(matrix: number[][]) {
        const m = matrix.length; // 行
        const n = matrix[0].length; // 列
        this.preS = new Array(m + 1).map((_v) => new Array(n + 1).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                this.preS[i + 1][j + 1] =
                    this.preS[i][j + 1] +
                    this.preS[i + 1][j] +
                    matrix[i][j] -
                    this.preS[i][j];
            }
        }
    }

    sumRegion(row1: number, col1: number, row2: number, col2: number): number {
        return (
            this.preS[row2 + 1][col2 + 1] -
            this.preS[row2+1][col1] -
            this.preS[row1][col2+1] +
            this.preS[row1][col1]
        );
    }
}
