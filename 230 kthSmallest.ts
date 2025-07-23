// 递归
function kthSmallest2(root, k) {
    const nums: any[] = [];
    dfs(root);
    return nums[k - 1];
    function dfs(root) {
        if (!root) {
            return;
        }
        dfs(root.left);
        nums.push(root.val);
        dfs(root.right);
    }
}

// 迭代
function kthSmallest1(root, k) {
    const stack: any[] = [];
    while (stack.length || root) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (--k === 0) {
            return root.val;
        }
        root = root.right;
    }
    return -1;
}
