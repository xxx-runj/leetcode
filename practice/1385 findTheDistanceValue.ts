// 两个数组间的距离值
function findTheDistanceValue(arr1, arr2, d) {
    arr2.sort((a, b) => a - b);
    // 辅助函数， arr2[j] - d <= arr1[i] <= arr2[j] + d，即在 arr2 中找到 >= arr[i] - d 的左边界
    function func(arr, target) {
        let l = 0;
        let r = arr.length;
        while (l < r) {
            const mid = l + Math.floor((r - l) / 2);
            if (arr[mid] >= target) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
    let ans = 0;
    for (const x of arr1) {
        const l = func(arr2, x - d);
        // 如果左边界不存在 或 存在且 arr2[l] > x + d，则符合要求
        if (l >= arr2.length || arr2[l] > x + d) {
            ans++;
        }
    }
    return ans;
}
findTheDistanceValue([4,5,8], [10,9,1,8], 2)
