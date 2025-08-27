function combinationSum(candidates, target) {
    candidates.sort((a, b) => a - b);
    const n = candidates.length;
    const ans = [];
    const path = [];
    let sum = 0;
    dfs(0);
    return ans;
    // 小于 i 的元素都不再选了
    function dfs(i) {
        if (sum === target) {
            ans.push([...path]);
            return;
        }
        if (sum > target) {
            return;
        }
        for (let j = i; j < n; j++) {
            // 因为已经排序过了，且当前元素加上sum后已超出target
            // 那么后面的元素加上sum必定超出target，就无须再继续了
            if(sum + candidates[j] > target) {
                break;
            }
            path.push(candidates[j])
            sum += candidates[j];
            dfs(j);
            path.pop()
            sum -= candidates[j];
        }
    }
}
