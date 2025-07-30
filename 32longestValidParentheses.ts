// 用栈
function longestValidParentheses(s) {
    const n = s.length;
    const stack = [];
    const marks = new Array(n);
    for (let i = 0; i < n; i++) {
        if (s.charAt(i) === "(") {
            stack.push(i);
        } else {
            if (stack.length > 0) {
                marks[stack.pop()] = true;
                marks[i] = true;
            }
        }
    }
    // 问题变为：查找 marks 中，值为true的最长连续子数组
    let maxLen = 0;
    let curLen = 0;
    for (let i = 0; i < n; i++) {
        if (marks[i]) {
            curLen++;
            maxLen = Math.max(maxLen, curLen);
        } else {
            curLen = 0;
        }
    }
    return maxLen;
}

// dp
function longestValidParentheses1(s) {
    const n = s.length;
    // 以第 i 个位置为结尾的最长有效括号个数
    const dp = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        if (s.charAt(i) === ")") {
            if (i - 1 >= 0 && s[i - 1] === "(") {
                dp[i] = i - 2 >= 0 ? dp[i - 2] + 2 : 2;
            }
            if (i - 1 >= 0 && s[i - 1] === ")") {
                const left = i - 1 - dp[i - 1];
                if (left >= 0 && s[left] === "(") {
                    dp[i] = dp[i - 1] + 2 + (left - 1 >= 0 ? dp[left - 1] : 0);
                }
            }
        }
    }

    return Math.max(...dp, 0);
}
console.log(longestValidParentheses1('(())'))