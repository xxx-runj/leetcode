function RangeFreqQuery(arr) {
    this.record = {};
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i];
        if (!this.record[x]) {
            this.record[x] = [i]
        } else {
            this.record[x].push(i)
        }
    }
}
RangeFreqQuery.prototype.query = function (left, right, value) {
    const nums = this.record[value] || [];
    // 问题变成在递增的nums中找到值在[left, right]内的数目，可以二分，可以遍历
    function lowerBound(arr, target) {
        let l = 0;
        let r = arr.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (arr[mid] >= target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return l;
    }

    const temp1 = lowerBound(nums, left);
    const temp2 = lowerBound(nums, right + 1) - 1;
    return temp2 - temp1 + 1;
};
const obj = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
console.log(obj.query(0, 11, 33))
