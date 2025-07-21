// 递归
function isSymmetric(root) {
    if (!root) {
        return true;
    }
    return tmp(root.left, root.right);

    function tmp(left, right) {
        if (!left && !right) {
            return true;
        }
        if (left && right) {
            return (
                left.val === right.val &&
                tmp(left.left, right.right) &&
                tmp(left.right, right.left)
            );
        }
        return false;
    }
}
// 队列
function isSymmetric1(root) {
    if (!root) {
        return true;
    }
    const queue = [root.left, root.right];
    while(queue.length) {
        const tmp1 = queue.shift();
        const tmp2 = queue.shift();
        if(!tmp1 && !tmp2) {
            continue;
        }
        if(!tmp1 || !tmp2){
            return false;
        }
        if(tmp1.val !== tmp2.val){
            return false
        }
        queue.push(tmp1.left, tmp2.right);
        queue.push(tmp1.right, tmp2.left)
    }
    return true;
}
