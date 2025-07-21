// 在 D 天内送达包裹的能力
function shipWithinDays(weights, days) {
    let r = 0;
    for (const w of weights) {
        r += w;
    }
    let l = Math.max(...weights);
    while (l <= r) {
        const c = l + Math.floor((r - l) / 2);
        // 计算运载能力为c时，需要几天
        let d = 1;
        let s = c;
        for(const w of weights) {
            if(s < w) {
                d++;
                s = c;
            }
            s -= w;
        }
        if(d <= days) {
            r = c - 1;
        } else {
            l = c + 1;
        }
    }
    return l;
}
