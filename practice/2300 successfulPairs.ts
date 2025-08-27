// 咒语和药水的成功对数
function successfulPairs(spells, potions, success) {
    // 对 potions 先排序
    potions.sort((a, b) => a - b);
    // 写一个辅助函数，找出 >= target 的左边界
    function func(potions, target) {
        let l = 0;
        let r = potions.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (potions[mid] >= target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
    const pairs = new Array(spells.length).fill(0);
    for (let i = 0; i < spells.length; i++) {
        const res = func(potions, Math.ceil(success / spells[i]));
        pairs[i] = res > potions.length - 1 ? 0 : potions.length - res;
    }
    return pairs;
}
