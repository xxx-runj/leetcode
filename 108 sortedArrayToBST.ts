import { TreeNode } from "./TreeNode";

function sortedArrayToBST(nums) {
    return d(nums, 0, nums.length - 1);
    function d(arr, l, r) {
        const len = r - l + 1;
        if (len <= 0) {
            return null;
        }
        const mid = l + Math.floor((r - l) / 2);
        const root = new TreeNode(
            arr[mid],
            d(arr, l, mid - 1),
            d(arr, mid + 1, r)
        );
        return root;
    }
}
