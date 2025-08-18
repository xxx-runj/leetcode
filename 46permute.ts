import { TreeNode } from "./TreeNode";

function permute(nums) {
    const n = nums.length;
    const ans = [];
    const status = new Array(n).fill(false);
    dfs([], status);
    return ans;
    function dfs(path, status) {
        if (path.length === nums.length) {
            ans.push([...path]);
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!status[i]) {
                status[i] = true;
                path.push(nums[i]);
                dfs(path, status);
                path.pop();
                status[i] = false;
            }
        }
    }
}



function sumNumbers(root): number {
    let sum = 0;
    function dfs(root, path){
        if(!root){
            return;
        }
        path = path * 10 + root.val;
        if(!root.left && !root.right){
            sum += path;
            return;
        }
        dfs(root.left, path);
        dfs(root.right, path);
    }
    dfs(root, 0);
    return sum
};
const node2 = new TreeNode(2, null, null);
const node3 = new TreeNode(3, null, null);
const node1 = new TreeNode(1, node2, node3);
console.log(sumNumbers(node1));