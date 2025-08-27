function productExceptSelf(nums) {
    const n = nums.length;
    const preX = new Array(n + 1).fill(1);
    const sufX = new Array(n + 1).fill(1);
    for (let i = 0; i < n; i++) {
        preX[i + 1] = preX[i] * nums[i];
        const j = n - i - 1;
        sufX[j] = sufX[j + 1] * nums[j];
    }
    const answer = new Array(n);
    for (let i = 0; i < n; i++) {
        answer[i] = preX[i] * sufX[i + 1];
    }
    return answer;
}
