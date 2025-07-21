// 递归
function postorderTraversal(root){
    const ans = [];
    function traverse(root, ans) {
        if (!root) {
            return;
        }
        traverse(root.left, ans);
        traverse(root.right, ans);
        ans.push(root.val);
    }
    traverse(root, ans);
    return ans;
}
// 迭代
function postorderTraversal1(root){
    if (!root) return null;
    const stack: any = [root];
    const ans: any = [];
    while (stack.length) {
        const cur = stack.pop();
        ans.unshift(cur.val);
        // 再把左右节点压入栈
        cur.left && stack.push(cur.left);
        cur.right && stack.push(cur.right);
    }
    return ans;

}