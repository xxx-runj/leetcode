// 最大公约数（两个数的最大公约数 等于 较小数与两数相除余数的最大公约数）
export function gcd(a, b) {
    while (b !== 0) {
        const tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
}
export function gdc_1(a, b) {
    if (b === 0) {
        return a;
    }
    return gdc_1(b, a % b);
}

// 最小公倍数（两个数的最小公倍数 等于 两数乘积除以两数最大公约数）
export function lcm(a, b) {
    // 处理0的情况
    if (a === 0 || b === 0) {
        return 0;
    }
    return (a * b) / gcd(a, b);
}
