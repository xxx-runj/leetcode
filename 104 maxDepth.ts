// 递归
function maxDepth(root) {
    if (!root) {
        return 0;
    }
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
}

// 层序遍历
function maxDepth1(root) {
    let depth = 0;
    if (!root) {
        return depth;
    }
    let queue = [root];
    while (queue.length) {
        const tmp: any[] = []; // 用于临时存储下一层节点数目
        for (const node of queue) {
            node.left && tmp.push(node.left);
            node.right && tmp.push(node.right);
        }
        queue = tmp;
        depth++;
    }
    return depth;
}
