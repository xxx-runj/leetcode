// 每一个查询的最大美丽值
function maximumBeauty(items, queries) {
    // 按照物品价格进行排序
    items.sort((a,b) => a[0] - b[0]);
    // 计算前缀最大美丽值
    for(let i=1;i<items.length;i++){
        items[i][1] = Math.max(items[i][1], items[i-1][1]);
    }
    // 二分法找到 <= queries[i] 的右边界，或 > queries[i] 的左边界
    function lowerBound(arr, target){
        let l = 0;
        let r = arr.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (arr[mid][0] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }
    // 左边界 左侧的美丽值 即为answer
    return queries.map(x => {
        const left = lowerBound(items, x) - 1;
        if(left < 0) {
            return 0
        }
        return items[left][1]
    })
};