// 找出出现至少三次的最长特殊子字符串 II
function maximumLength(s) {
    let l = 0;
    let r = s.length - 2;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        // 满足条件
        if (check(s, mid)) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return r <= 0 ? -1 : r;

    function check(s, mid) {
        const len = s.length;
        // 统计
        const record = new Array(26).fill(0);
        for (let i = 0; i < len; ) {
            const c = s.charAt(i);
            let j = i + 1;
            while (s.charAt(j) === c) {
                j++;
            }
            // 对于字符 c , 如果 (j-i) 对应的长度刚好等于 mid 长度，则符合一次特殊子字符串；
            // 类推，如果等于 (mid+1) 长度，则符合两次特殊子字符串
            const index = c.charCodeAt(0) - "a".charCodeAt(0);
            record[index] += Math.max(0, j - i - mid + 1);
            if(record[index] >= 3 ) {
                return true
            }
            i = j;
        }
        return false;
    }
}
maximumLength('akphhppppp')
