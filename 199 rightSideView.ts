// 层序遍历找第一个值
function rightSideView(root) {
    if (!root) {
        return [];
    }
    const queue = [root];
    const ans: any[] = [];
    while (queue.length) {
        const n = queue.length;
        for (let i = 0; i < n; i++) {
            const node = queue.shift();
            if (i === n - 1) {
                ans.push(node.val);
            }
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
    return ans;
}
