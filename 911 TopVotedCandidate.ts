// 在线选举
function TopVotedCandidate(persons, times) {
    // 预计算领先候选人
    let top = -1;
    this.tops = [];
    this.record = { '-1': -1 };
    this.times = times;
    for (let i = 0; i < persons.length; i++) {
        const p = persons[i];
        if (!this.record[p]) {
            this.record[p] = 1;
        } else {
            this.record[p]++;
        }
        if (this.record[p] >= this.record[top]) {
            top = p;
        }
        this.tops.push(top);
    }
}
TopVotedCandidate.prototype.q = function (t) {
    // 找右边界
    function upperBound(nums, target) {
        let l = 0;
        let r = nums.length - 1;
        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2);
            if (nums[mid] > target) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return r;
    }
    // 找出时刻对应的下标
    const x = upperBound(this.times, t);
    return this.tops[x];
};
