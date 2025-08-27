function subsets(nums) {
    const n = nums.length;
    const path = [];
    const ans = [];
    dfs(0);
    return ans;

    // dfs 中的 i 表示当前考虑到 nums[i] 选或不选
    function dfs(i) {
        if (i === n) {
            // 所有的都考虑完了
            ans.push([...path]);
            return;
        }
        // 不选
        dfs(i + 1);

        // 选
        path.push(nums[i]);
        dfs(i + 1);
        path.pop();
    }
}
