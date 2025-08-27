// 递归
function preorderTraversal(root) {
    const ans = [];
    function traverse(root, ans) {
        if (!root) {
            return;
        }
        ans.push(root.val);
        traverse(root.left, ans);
        traverse(root.right, ans);
    }
    traverse(root, ans);
    return ans;
}
// 迭代
function preorderTraversal1(root) {
    if (!root) return null;
    const stack: any = [root];
    const ans: any = [];
    while (stack.length) {
        const cur = stack.pop();
        ans.push(cur.val);
        // 再把左右节点压入栈
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
    }
    return ans;
}
