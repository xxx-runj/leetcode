import { TreeNode } from "./TreeNode";

function flatten(root) {
    const dummy = new TreeNode(0, null, null);
    let pre = dummy;
    traverse(root);
    return dummy.right;
    // 先序遍历 不符合题目void要求
    function traverse(root) {
        if (!root) {
            return;
        }
        const node = new TreeNode(root.val, null, null);
        pre.right = node;
        pre = node;
        traverse(root.left);
        traverse(root.right);
    }
}
function flatten1(root) {
    let pre = null;
    post(root);
    // 后序遍历 原地展开，
    function post(root) {
        if (root == null) return;
        post(root.right);
        post(root.left);
        root.right = pre;
        root.left = null;
        pre = root;
    }
}
// 迭代
function flatten2(root) {
    while (root) {
        if (!root.left) {
            root = root.right;
        } else {
            // 找左子树最右边的节点
            let cur = root.left;
            while (cur.right) {
                cur = cur.right;
            }
            const right = root.right;
            // 将right拼接到左子树最右边节点上
            cur.right = right;
            root.left = null;
            // 更新root
            root = root.right;
        }
    }
}
// 递归
function flatten4(root) {
    if (!root) {
        return;
    }
    const left = flatten(root.left);
    const right = flatten(root.right);
    root.left = null;
    root.right = left;
    // 找到最后一个节点
    while(root.right){
        root = root.right;
    }
    root.right = right;
}

const node3 = new TreeNode(3, null, null);
const node4 = new TreeNode(4, null, null);
const node6 = new TreeNode(6, null, null);
const node5 = new TreeNode(5, null, node6);
const node2 = new TreeNode(2, node3, node4);
const root = new TreeNode(1, node2, node5);
console.log(flatten(root));
