// 递归
function invertTree(root) {
    if (!root) {
        return root;
    }
    const left = root.left;
    const right = root.right;
    root.left = invertTree(right);
    root.right = invertTree(left);
    return root;
}

//
function invertTree1(root) {
    if (!root) {
        return root;
    }
    const queue = [root];
    while (queue.length) {
        const cur = queue.shift();
        const tmp = cur.right;
        cur.right = cur.left;
        cur.left = tmp;
        cur.left && queue.push(cur.left);
        cur.right && queue.push(cur.right);
    }
    return root;
}
