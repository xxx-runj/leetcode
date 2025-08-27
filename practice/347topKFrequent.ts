function topKFrequent(nums, k) {
    const n = nums.length;
    // 先统计每个元素的出现频率
    const dic = new Map();
    for (const x of nums) {
        dic.set(x, (dic.get(x) ?? 0) + 1);
    }

    const maxFre = Math.max(...dic.values());
    // 把出现频次相同的元素放到一起，索引 i 对应出现频次为 i 的元素集合
    const freList = new Array(maxFre + 1).fill(0).map(() => []);
    for (const [x, fre] of dic.entries()) {
        freList[fre].push(x);
    }
    const ans = [];
    // 倒序遍历
    for (let i = freList.length - 1; i >= 0 && ans.length < k; i--) {
        ans.push(...freList[i]);
    }
    return ans;
}
// 方法二：采用 k个元素的小顶堆 或 桶排序
