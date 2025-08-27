// 中序遍历
function isValidBST(root) {
    let pre = -Infinity;
    return dfs(root);
    function dfs(root) {
        if (!root) {
            return true;
        }
        if (!dfs(root.left)) {
            return false;
        }
        // 执行到这里说明左子树是二叉搜索树
        // 访问当前节点：如果当前节点小于等于中序遍历的前一个节点，说明不满足BST
        if (root.val <= pre) {
            return false;
        }
        // 更新pre
        pre = root.val;
        // 访问右子树
        return dfs(root.right);
    }
}

// 前序遍历
function isValidBST1(root) {
    let l = -Infinity;
    let r = Infinity;
    return dfs(root, l, r);
    function dfs(root, l, r) {
        if (!root) {
            return true;
        }
        const x = root.val;
        return x > l && x < r && dfs(root.left, l, x) && dfs(root.right, x, r);
    }
}
