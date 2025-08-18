function nextPermutation(nums) {
    const n = nums.length;
    let r = n - 1;
    let l = n - 2;
    while (l >= 0 && nums[l] >= nums[r]) {
        r--;
        l--;
    }
    if (l >= 0) {
        for (let i = n - 1; i > l; i--) {
            if (nums[i] > nums[l]) {
                r = i;
                break;
            }
        }
        [nums[l], nums[r]] = [nums[r], nums[l]];
    }
    // 最后再将[l+1, n-1]的数字倒序
    l = l + 1;
    r = n - 1;
    while (l <= r) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
    }
}
