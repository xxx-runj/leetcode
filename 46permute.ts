function permute(nums) {
    const n = nums.length;
    const ans = [];
    for (let i = 0; i < n; i++) {
        const status = new Array(n).fill(false);
        status[i] = true;
        dfs(i, [nums[i]], status);
    }
    return ans;
    function dfs(selectedIndex, path, status) {
        let count = 0;
        for (let i = 0; i < n; i++) {
            if (!status[i]) {
                count++;
            }
        }
        if (count === 0) {
            ans.push([...path]);
            return;
        }
        for (let i = 0; i < n; i++) {
            if (!status[i]) {
                status[i] = true;
                path.push(nums[i]);
                dfs(i, path, status);
                path.pop();
                status[i] = false;
            }
        }
    }
}
