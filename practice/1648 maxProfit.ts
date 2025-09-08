// 销售价值减少的颜色球
function maxProfitK(inventory, orders) {
    let l = 0;
    let r = Math.max(...inventory);
    const mod = 10n ** 9n + 7n;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        let cnt = 0;
        for (let i = 0; i < inventory.length; i++) {
            cnt += Math.max(0, inventory[i] - mid);
        }
        if (cnt > orders) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    const k = l;
    let ord = 0;
    let sum = 0n;

    for (let x of inventory) {
        if (x > k) {
            let a = BigInt(x);
            let b = BigInt(k);
            ord += x - k;
            sum += (a * (a + 1n) / 2n) - (b * (b + 1n) / 2n);
        }
    }

    sum = (sum + BigInt(k) * BigInt(orders - ord)) % mod;
    return Number(sum);
};

/**
 * 价值 > k 的球都被卖掉了，= k 的球部分（可能是0）被卖掉了，二分去找这个 k
 * 要想求出最大总价值和，应该让 k 尽可能小，这样在卖出一样球的情况下，k 越小，所累加的价值就越高
 */
