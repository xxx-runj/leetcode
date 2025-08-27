function decodeString(s) {
    const stack = [];
    for (const c of s) {
        if (c !== "]") {
            stack.push(c);
        } else {
            // 找需要重复的字符串
            let tmp = "";
            while (stack.length > 0 && stack[stack.length - 1] !== "[") {
                tmp = stack.pop() + tmp;
            }
            // 弹出左括号
            stack.pop();
            // 找重复次数
            let num = "";
            while (
                stack.length > 0 &&
                stack[stack.length - 1] >= "0" &&
                stack[stack.length - 1] <= "9"
            ) {
                num = stack.pop() + num;
            }
            // 将 tmp 重复 num 次压入栈
            let str = "";
            for (let i = 0; i < Number(num); i++) {
                str += tmp;
            }
            stack.push(str);
        }
    }
    return stack.join("");
}
