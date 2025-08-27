// 第 N 个神奇数字
function nthMagicalNumber(n, a, b) {
    let l = Math.min(a, b);
    let r = n * Math.min(a, b);
    const c = lcm(Math.max(a, b), l);
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
        return (
            Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c) >= n
        );
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

/**
 * 数字 x 越大，[0, x]区间包含的神奇数字个数越多
 */
