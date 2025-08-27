// 寻找比目标字母大的最小字母
function nextGreatestLetter(letters, target) {
    // 就是找目标元素右边界的下一个
    let l = 0;
    let r = letters.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);
        if (letters[mid] <= target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    if (r + 1 <= letters.length - 1) {
        return letters[r + 1];
    }
    return letters[0];
}
