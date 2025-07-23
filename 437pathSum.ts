// 遍历 + DFS
function pathSum(root, targetSum) {
    let ans = 0;
    dfs1(root);
    return ans;
    // 遍历
    function dfs1(root) {
        if (!root) {
            return;
        }
        dfs2(root, root.val);
        dfs1(root.left);
        dfs1(root.right);
    }
    // 搜索以 root 为根时，其向下的所有路径
    function dfs2(root, val) {
        if (val === targetSum) {
            ans++;
        }
        root.left && dfs2(root.left, val + root.left.val);
        root.right && dfs2(root.right, val + root.right.val);
    }
}

// 计算前缀和
// 从根节点到当前节点的路径和
function pathSum1(root, targetSum) {
    if (!root) return 0;
    const record = new Map();
    record.set(0, 1);
    let ans = 0;
    dfs(root, root.val);
    return ans;
    function dfs(root, val) {
        ans += record.get(val - targetSum) ?? 0;
        // 先序遍历位置，代表要进入这个节点，因此统计上此节点的前缀和
        record.set(val, (record.get(val) ?? 0) + 1);
        root.left && dfs(root.left, val + root.left.val);
        root.right && dfs(root.right, val + root.right.val);
        // 后序遍历位置，代表要离开这个节点，因此移除此节点的前缀和
        record.set(val, record.get(val) - 1);
        // 防止统计到跨越两个方向的路径
    }
}
