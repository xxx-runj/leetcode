function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    // 从左到右，把还没找到答案的都入栈
    const stack = [];
    const answer = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        while (
            stack.length &&
            temperatures[stack[stack.length - 1]] < temperatures[i]
        ) {
            const j = stack.pop();
            answer[j] = i - j;
        }
        stack.push(i);
    }
    return answer;
}

// 从右到左遍历：对于索引为i的元素，要找右边第一个比自己大的值的索引（假设为j）
// 说明在 j 的右侧，所有小于或等于 temperatures[j]的值，i 都看不见
function dailyTemperatures1(temperatures) {
    const n = temperatures.length;
    const stack = [];
    const answer = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        while (
            stack.length &&
            temperatures[i] >= temperatures[stack[stack.length - 1]]
        ) {
            stack.pop();
        }
        stack.length > 0 && (answer[i] = stack[stack.length - 1] - i);
        stack.push(i);
    }
    return answer;
}
