// 递归
function inorderTraversal(root) {
    const ans: any[] = [];
    function traverse(root, ans){
        if(!root){
            return;
        }
        traverse(root.left, ans);
        ans.push(root.val);
        traverse(root.right, ans)
    }
    traverse(root, ans);
    return ans;
}
// 迭代
function inorderTraversal1(root){
    const ans: any[] = [];
    // 用栈解决
    const stack: any[] = [];
    while(stack.length > 0 || root !== null) {
        while(root !== null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        ans.push(root.val);
        root = root.right;
    }
    return ans;
}