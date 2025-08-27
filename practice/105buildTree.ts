import { TreeNode } from "./TreeNode";

// 从前序与中序遍历序列构造二叉树
function buildTree(preorder, inorder) {
    const inMap = new Map();
    const n = inorder.length;
    for (let i = 0; i < n; i++) {
        inMap.set(inorder[i], i);
    }
    return cons(0, n - 1, 0, n - 1);

    // [pl, pr] 对应以某节点为根节点先序遍历后的索引区间
    // [il, ir] 对应以某节点为根节点中序遍历后的索引区间
    function cons(pl, pr, il, ir) {
        const x = preorder[pl];
        // 构造根节点
        const root = new TreeNode(x, null, null);
        // 查找元素在inorder的下标
        const root_index = inMap.get(x);
        // 节点左子树的长度
        const leftLen = root_index - il;
        // 节点右子树的长度
        const rightLen = ir - root_index;
        // 节点左子树
        if (leftLen > 0) {
            root.left = cons(pl + 1, pl + leftLen, il, root_index - 1);
        }
        if (rightLen > 0) {
            root.right = cons(pr - rightLen + 1, pr, root_index + 1, ir);
        }
        return root;
    }
}
buildTree([3,9,20,15,7], [9,3,15,20,7])