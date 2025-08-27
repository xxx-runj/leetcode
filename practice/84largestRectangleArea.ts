function largestRectangleArea(heights) {
    const n = heights.length;
    // 记录左边第一个比元素小的索引
    const left = new Array(n).fill(-1);
    const leftStack = [];
    // 记录右边第一个比元素小的索引
    const right = new Array(n).fill(n);
    const rightStack = [];
    for (let i = 0; i < n; i++) {
        // left
        while (
            leftStack.length > 0 &&
            heights[i] <= heights[leftStack[leftStack.length - 1]]
        ) {
            leftStack.pop();
        }
        if (leftStack.length > 0) {
            left[i] = leftStack[leftStack.length - 1];
        }
        leftStack.push(i);

        // right
        while (
            rightStack.length > 0 &&
            heights[i] < heights[rightStack[rightStack.length - 1]]
        ) {
            const j = rightStack.pop();
            right[j] = i;
        }
        rightStack.push(i);
    }
    let maxSum = 0;
    for (let i = 0; i < n; i++) {
        maxSum = Math.max(maxSum, (right[i] - left[i] - 1) * heights[i]);
    }
    return maxSum;
}
