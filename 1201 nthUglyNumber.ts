// 丑数 III
function nthUglyNumber(n, a, b, c) {
    const abLcm = lcm(a, b);
    const acLcm = lcm(a, c);
    const bcLcm = lcm(b, c);
    const abcLcm = lcm(abLcm, c);

    let l = Math.min(a, b, c);
    let r = n * l;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (check(mid)) {
            // 神奇数字 >= n，右边界左移
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return l;

    function check(mid) {
        const cnt =
            Math.floor(mid / a) +
            Math.floor(mid / b) +
            Math.floor(mid / c) -
            Math.floor(mid / abLcm) -
            Math.floor(mid / acLcm) -
            Math.floor(mid / bcLcm) +
            Math.floor(mid / abcLcm);
            return cnt >= n;
    }

    // 最大公约数
    function gcd(a, b) {
        if (b !== 0) {
            return gcd(b, a % b);
        }
        return a;
    }
    // 最小公倍数
    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }
}
