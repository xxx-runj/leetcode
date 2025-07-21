// 爱吃香蕉的珂珂
function minEatingSpeed(piles, h) {
    let l = 1;
    let r = Math.max(...piles);
    while (l <= r) {
        let s = 0;
        const k = l + Math.floor((r - l) / 2);
        for (let i = 0; i < piles.length; i++) {
            s += Math.ceil(piles[i] / k);
        }
        if (s <= h) {
            r = k - 1;
        } else {
            l = k + 1;
        }
    }
    return l;
}
/**
 * 如果1小时吃 k 根，h小时内能吃完，则比 k 大的值都能满足要求
 * 如果1小时吃 k 根，h小时内不能吃完，则比 k 小的值都不能满足要求
 */
