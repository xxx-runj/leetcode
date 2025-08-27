function levelOrder(root) {
    if (!root) {
        return [];
    }
    const ans: any[] = [];
    const stack: any[] = [root];
    while(stack.length) {
        const n = stack.length;
        const nums: any[] = [];
        for(let i=0;i<n; i++){
            const node = stack.shift();
            if(node) {
                nums.push(node.val);
                node.left && stack.push(node.left);
                node.right && stack.push(node.right);
            }
        }
        ans.push(nums)
    }
    return ans;
}
