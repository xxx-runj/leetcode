//
function diameterOfBinaryTree(root) {
    let ans = 0;
    // 遍历每一个节点
    dfs(root);
    return ans;
    function dfs(root) {
        if (!root) {
            return 0;
        }
        const left = dfs(root.left);
        const right = dfs(root.right);
        ans = Math.max(left + right, ans);
        return Math.max(left, right) + 1;
    }
}
