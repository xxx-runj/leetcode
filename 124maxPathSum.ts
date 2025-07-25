function maxPathSum(root) {
    let ans = -Infinity;
    dfs(root);
    return ans;
    function dfs(root) {
        if (!root) {
            return 0;
        }
        const left = dfs(root.left);
        const right = dfs(root.right);
        // 表示以当前节点作为根节点时（路径一定包含根节点）的最大路径和
        const innerMax = root.val + left + right;
        ans = Math.max(ans, innerMax);
        // 该节点对外提供的最大路径和为：要么选择左边，要么选择右边，要么左右都不选
        // 如果以上选择结果路径和都小于0，那么一个都不要
        return Math.max(0, root.val + Math.max(0, left, right))
    }
}
