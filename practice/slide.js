// 滑动窗口

// 209 最小子序列
function minSubArrayLen(target, nums) {
    let s = 0;
    let ans = nums.length + 1;
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        s += nums[left];
        // while(s - nums[left] >= target) {
        //     s -= nums[left];
        //     left++;
        // }
        // if(s >= target) {
        //     ans = Math.min(ans, right - left + 1);
        // }

        while (s >= target) {
            ans = Math.min(ans, right - left + 1);
            s -= nums[left];
            left++;
        }
    }
    return ans < nums.length + 1 ? ans : 0;
}

// 904 水果成篮
function totalFruit(fruits) {
    let ans = 0;
    const map = new Map();
    let l = 0;
    for (let r = 0; r < fruits.length; r++) {
        map.set(fruits[r], (map.get(fruits[r]) ?? 0) + 1);
        while (map.size > 2) {
            const out = fruits[l];
            map.set(out, (map.get(out) - 1))
            if (map.get(out) === 0) {
                map.delete(out)
            }
            l++
        }
        ans = Math.max(ans, r - l + 1)
    }
    return ans;
}

// 76 最小覆盖子串
function minWindow(s, t) {
    const sLen = s.length;
    const tLen = t.length;
    const need = new Map();
    for (let i = 0; i < tLen; i++) {
        need.set(t.charAt(i), (need.get(t.charAt(i)) ?? 0) + 1);
    }

    let l = 0;
    let valid = 0;
    let ansLen = sLen + 1;
    let ansStart = 0;
    const slide = new Map();
    for (let r = 0; r < sLen; r++) {
        const c = s.charAt(r);
        slide.set(c, (slide.get(c) ?? 0) + 1);
        if (slide.get(c) === need.get(c)) {
            valid++;
        }
        while (valid === need.size) {
            if (r - l + 1 < ansLen) {
                ansStart = l;
                ansLen = r - l + 1;
            }
            const out = s.charAt(l);
            l++;
            if (need.has(out) && need.get(out) === slide.get(out)) {
                valid--;
            }
            slide.set(out, slide.get(out) - 1);
        }
    }
    return ansLen > sLen ? '' : s.substr(ansStart, ansLen)
}
console.log(minWindow('ADOBECODEBANC', 'ABC'))
console.log(minWindow('a', 'a'))

// 713 乘积小于K的子数组
function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) {
        return 0;
    }
    let ans = 0;
    let l = 0;
    let x = 1;
    for (let r = 0; r < nums.length; r++) {
        x *= nums[r];
        while (x >= k) {
            x /= nums[l];
            l++;
        }
        ans += (r - l + 1);
    }
    return ans;
}
console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100))

// 3 无重复字符的最长子串
function lengthOfLongestSubstring(s) {
    const record = new Map();
    let ans = 0;
    let l = 0;
    for (let r = 0; r < s.length; r++) {
        const c = s.charAt(r);
        record.set(c, (record.get(c) ?? 0) + 1);
        while (record.get(c) > 1) {
            const out = s.charAt(l);
            record.set(out, record.get(out) - 1);
            l++;
        }
        ans = Math.max(ans, r - l + 1)
    }
    return ans;
}
console.log(lengthOfLongestSubstring('abcabcbb'))
console.log(lengthOfLongestSubstring('bbbbb'))
console.log(lengthOfLongestSubstring('pwwkew'))


// 1456 定长子串中元音的最大数目
function maxVowels(s, k) {
    const arr = ['a', 'e', 'i', 'o', 'u'];
    let vowels = 0;
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        // 进入窗口
        if (arr.includes(s.charAt(i))) {
            vowels++;
        }
        if (i - k + 1 < 0) {
            continue;
        }
        ans = Math.max(ans, vowels);
        // 离开窗口
        if (arr.includes(s.charAt(i - k + 1))) {
            vowels--;
        }
    }
    return ans;
}
// 643 子数组最大平均数
function findMaxAverage(nums, k) {
    let maxSum = -Infinity;
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        // 进入窗口
        sum += nums[i];
        if (i - k + 1 < 0) {
            continue;
        }
        maxSum = Math.max(maxSum, sum);
        // 离开窗口
        sum -= nums[i - k + 1]
    }
    return maxSum / k;
}
// 1343 大小为K且平均值大于等于阈值的子数组数目
function numOfSubarrays(arr, k, threshold) {
    let ans = 0;
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
        if (i - k + 1 < 0) {
            continue;
        }
        if (sum / k >= threshold) {
            ans++;
        }
        sum -= arr[i - k + 1]
    }
    return ans;
}

// 2090 半径为 k 的子数组平均值
function getAverages(nums, k) {
    const avgs = new Array(nums.length).fill(-1);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (i < 2 * k) {
            continue;
        }
        avgs[i - k] = Math.floor(sum / (2 * k + 1));
        sum -= nums[i - 2 * k];
    }
    return avgs;
}
// 2379 得到 K 个黑块的最少涂色次数
function minimumRecolors(blocks, k) {
    let ans = k;
    let ws = 0;
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i] === 'W') {
            ws++;
        }
        if (i - k + 1 < 0) {
            continue;
        }
        ans = Math.min(ans, ws);
        if (blocks[i - k + 1] === 'W') {
            ws--
        }
    }
    return ans;
};
// 2841 几乎唯一子数组的最大和
function maxSum(nums, m, k) {
    const record = new Map();
    let sum = 0;
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        sum += cur;
        record.set(cur, (record.get(cur) ?? 0) + 1);
        if (i - k + 1 < 0) {
            continue;
        }
        if (record.size >= m) {
            ans = Math.max(ans, sum)
        }
        const out = nums[i - k + 1];
        sum -= out;
        record.set(out, record.get(out) - 1);
        if (record.get(out) === 0) {
            record.delete(out);
        }
    }
    return ans;
};
// 1423 可获得的最大点数
function maxScore(cardPoints, k) {
    // 反向思维，只能从开头或末尾拿牌，则剩下的牌为中间连续的。计算连续的n-k个最小点数和
    const n = cardPoints.length;
    let allSum = 0;
    for (let i = 0; i < n; i++) {
        allSum += cardPoints[i]
    }
    if (n === k) {
        return allSum
    }
    let curSum = 0;
    let minSum = Infinity;
    for (let i = 0; i < n; i++) {
        curSum += cardPoints[i];
        if (i - (n - k) + 1 < 0) {
            continue;
        }
        minSum = Math.min(minSum, curSum);
        curSum -= cardPoints[i - (n - k) + 1];
    }
    return allSum - minSum
};
function maxScore2(cardPoints, k) {
    /**
     * 正向思维
     * 前 K 张牌，后 0 张牌
     * 前 K-1 张牌，后 1 张牌
     * ...
     * 前 1 张牌，后 K-1 张牌
     * 前 0 张牌，后 K 张牌
     */

    let kSum = 0;
    for (let i = 0; i < k; i++) {
        kSum += cardPoints[i]
    }
    let maxSum = kSum;
    for (let i = 1; i <= k; i++) {
        // 移一个，进一个
        const outV = cardPoints[k - i];
        const inV = cardPoints[cardPoints.length - i];
        kSum = kSum - outV + inV;
        maxSum = Math.max(maxSum, kSum)
    }
    return maxSum;
};

// cow 看不懂应用题的题目！！！
// 1052 爱生气的书店老板
function maxSatisfied(customers, grumpy, minutes) {
    // 最多满意人数 = 全部顾客中满意人数之和 + 连续minutes分钟最多的不满意人数之和
    let s = 0;
    let maxUns = 0;
    let curUns = 0;
    for (let i = 0; i < customers.length; i++) {
        s += (grumpy[i] === 0 ? customers[i] : 0);
        curUns += (grumpy[i] === 1 ? customers[i] : 0);
        if (i - minutes + 1 < 0) {
            continue;
        }
        maxUns = Math.max(maxUns, curUns);
        const outIndex = i - minutes + 1;
        if (grumpy[outIndex] === 1) {
            curUns -= customers[outIndex]
        }
    }
    return s + maxUns;
};
// 1652 拆炸弹
function decrypt(code, k) {
    const ans = new Array(code.length).fill(0);
    if (k === 0) {
        return ans;
    }
    const n = code.length;
    // 无论 k>0 还是 k<0,滑动窗口永远向右移动，只要确定初始窗口即可
    let r;
    if (k > 0) {
        r = k;
    } else {
        r = n - 1;
    }
    k = Math.abs(k);
    let s = 0;
    // 计算初始窗口的和
    for (let i = r; i > r - k; i--) {
        s += code[i]
    }
    for (let i = 0; i < n; i++) {
        ans[i] = s;
        s = s + code[(r + 1) % n] - code[(r - k + 1) % n];
        r = r + 1;
    }
    return ans;
}
// 3090 每个字符最多出现两次的最长子字符串
function maximumLengthSubstring(s) {
    const n = s.length;
    const arr = new Array(26).fill(0);
    let ans = 0;
    let left = 0;
    // 把 i 作为右指针
    for (let i = 0; i < n; i++) {
        const inIndex = s.charCodeAt(i) - 97;
        arr[inIndex]++;
        while (arr[inIndex] > 2) {
            // 移出字符
            const outIndex = s.charAt(left).charCodeAt(0) - 97;
            arr[outIndex]--;
            left++;
        }
        ans = Math.max(ans, i - left + 1)
    }
    return ans
}
// 1493 删掉一个元素以后全为 1 的最长子数组
function longestSubarray(nums) {
    let ans = 0;
    let zeroC = 0;
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        // 进一个
        zeroC += (1 - nums[i]);
        while (zeroC > 1) {
            // 出一个
            zeroC -= (1 - nums[left]);
            left++;
        }
        // 最后必须要删一个元素
        ans = Math.max(ans, i - left)
    }
    return ans;
}
// 1208 尽可能使字符串相等
function equalSubstring(s, t, maxCost) {
    let costs = 0;
    let left = 0;
    let ans = 0;
    for (let i = 0; i < s.length; i++) {
        costs += Math.abs(s.charCodeAt(i) - t.charCodeAt(i));
        while (costs > maxCost) {
            // out
            costs -= Math.abs(s.charCodeAt(left) - t.charCodeAt(left));
            left++
        }
        ans = Math.max(ans, i - left + 1);
    }
    return ans;
};
// 1695 删除子数组的最大得分
function maximumUniqueSubarray(nums) {
    // 即找 无重复数字的子数组最大和
}
// 2958 最多 K 个重复元素的最长子数组
function maxSubarrayLength(nums, k) {
    const record = new Map();
    let left = 0;
    let ans = 0;
    for (let i = 0; i < nums.length; i++) {
        record.set(nums[i], (record.get(nums[i]) ?? 0) + 1);
        while (record.get(nums[i]) > k) {
            // out
            record.set(nums[left], record.get(nums[left]) - 1);
            left++;
        }
        ans = Math.max(ans, i - left + 1)
    }
    return ans
}
// 2024 考试的最大困扰度 
function maxConsecutiveAnswers(answerKey, k) {
    const cnt = { 'T': 0, 'F': 0 };
    let left = 0;
    let ans = 0;
    for (let i = 0; i < answerKey.length; i++) {
        cnt[answerKey[i]]++;
        while (cnt.T > k && cnt.F > k) {
            // out
            cnt[answerKey[left]]--;
            left++;
        }
        ans = Math.max(ans, i - left + 1)
    }
    return ans
}
// 1004 最大连续 1 的个数 III 
function longestOnes(nums, k) {
    let ans = 0;
    let cnt = 0;
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        cnt += (1 - nums[i]);
        while (cnt > k) {
            // out
            cnt -= (1 - nums[left]);
            left++;
        }
        ans = Math.max(ans, i - left + 1)
    }
    return ans;
}
// 1658 将 x 减到 0 的最小操作数
function minOperations(nums, x) {
    // 逆向思维 找出最长子串，子串和为 S_nums - x
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i]
    }
    if (total < x) {
        return -1
    }
    let left = 0;
    let s = 0;
    let maxLen = -Infinity;
    for (let r = 0; r < nums.length; r++) {
        s += nums[r];
        while (s > total - x) {
            s -= nums[left];
            left++
        }
        if (s === total - x) {
            maxLen = Math.max(maxLen, r - left + 1)
        }
    }
    return maxLen === -Infinity ? -1 : (nums.length - maxLen);
}
// 2904 最短且字典序最小的美丽子字符串
function shortestBeautifulSubstring(s, k) {
    let ans = '';
    let len = Infinity;
    let cnt = 0;
    let left = 0;
    for (let r = 0; r < s.length; r++) {
        cnt += Number(s.charAt(r));
        while (cnt > k || s.charAt(left) === '0') {
            cnt -= Number(s.charAt(left));
            left++;
        }
        if (cnt === k) {
            const t = s.substring(left, r + 1);
            if (t.length < len || t.length === len && t - ans < 0) {
                len = t.length;
                ans = t;
            }
        }
    }
    return ans;
}
// 1234 替换子串得到平衡字符串
function balancedString(s) {
    const obj = { 'Q': 0, 'W': 0, 'E': 0, 'R': 0, };
    for (let i = 0; i < s.length; i++) {
        obj[s.charAt(i)]++;
    }
    const needMap = new Map();
    for (let c in obj) {
        const diff = obj[c] - s.length / 4;
        if (diff > 0) {
            needMap.set(c, diff)
        }
    }
    if (needMap.size === 0) {
        return 0;
    }
    let recordMap = new Map();
    let valid = 0;
    let ans = s.length;
    let left = 0;
    // 长度最短 且 满足 needMap 字符数量要求的连续子串
    for (let r = 0; r < s.length; r++) {
        const c = s.charAt(r);
        if (needMap.has(c)) {
            recordMap.set(c, (recordMap.get(c) ?? 0) + 1);
            if (recordMap.get(c) === needMap.get(c)) {
                valid++
            }
        }
        while (valid === needMap.size) {
            ans = Math.min(ans, r - left + 1)
            // out
            const o = s.charAt(left);
            recordMap.set(o, recordMap.get(o) - 1);
            left++;
            if (needMap.has(o) && needMap.get(o) > recordMap.get(o)) {
                valid--;
            }
        }
    }
    return ans;
}
// 2875
function minSizeSubarray(nums, target) {
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += nums[i]
    }
    let left = 0;
    let s = 0;
    let ans = Infinity;
    for (let i = 0; i < 2 * n; i++) {
        s += nums[i % n];
        while (s > target % total) {
            s -= nums[left % n]
            left++;
        }
        if (s === target % total) {
            ans = Math.min(ans, i - left + 1)
        }
    }
    return ans === Infinity ? -1 : ans + n * Math.floor(target / total);
}
// 632 最小区间 明天回顾题解思路
function smallestRange(nums) {
    const arr = [];
    for (let i = 0; i < nums.length; i++) {
        for (const n of nums[i]) {
            arr.push([n, i])
        }
    }
    // 排序
    arr.sort((a, b) => a[0] - b[0]);
    // 找一个最短连续子数组，满足nums每个列表都至少有一个值在里面
    const record = new Array(nums.length).fill(0);
    let valid = 0;
    let left = 0;
    let x = -Infinity;
    let y = Infinity;
    for (const [v, i] of arr) {
        record[i]++;
        if (record[i] === 1) {
            valid++;
        }
        while (valid === nums.length) {
            if (v - arr[left][0] < y - x) {
                y = v;
                x = arr[left][0];
            }
            if (record[arr[left][1]] === 1) {
                valid--
            }
            record[arr[left][1]]--;
            left++;
        }
    }
    return [x, y];
}
// 1358 包含所有三种字符的子字符串数目
function numberOfSubstrings(s) {
    let arr = s.split('');
    let ans = 0;
    let left = 0;
    const record = { a: 0, b: 0, c: 0 };
    for (let r = 0; r < arr.length; r++) {
        record[arr[r]]++;
        while (record.a > 0 && record.b > 0 && record.c > 0) {
            record[arr[left]]--;
            left++;
        }
        // while循环结束后，[left, r]肯定不满足要求，但[left-1, r] 。。。[0,r]都是满足要求的
        ans += left;
    }
    return ans;
}
// 2962 统计最大元素出现至少 K 次的子数组
function countSubarrays(nums, k) {
    let maxNum = -Infinity;
    for (let i = 0; i < nums.length; i++) {
        maxNum = Math.max(maxNum, nums[i])
    }
    let cnt = 0;
    let l = 0;
    let ans = 0;
    for (let r = 0; r < nums.length; r++) {
        cnt += nums[r] === maxNum ? 1 : 0;
        while (cnt >= k) {
            cnt -= nums[l] === maxNum ? 1 : 0;
            l++
        }
        ans += l
    }
    return ans;
}
// 3325 字符至少出现 K 次的子字符串 I 
function numberOfSubstrings(s, k) {
    const record = new Array(26).fill(0);
    let valid = 0;
    let left = 0;
    let ans = 0
    for (let r = 0; r < s.length; r++) {
        const index = s.charCodeAt(r) - 97;
        record[index]++;
        if (record[index] === k) {
            valid++;
        }
        while (valid >= 1) {
            const index = s.charCodeAt(left) - 97;
            if (record[index] === k) {
                valid--;
            }
            record[index]--;
            left++;
        }
        ans += left;
    }
    return ans;
}
// 2799 统计完全子数组的数目
function countCompleteSubarrays(nums) {
    const temp = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (!temp.has(nums[i])) {
            temp.set(nums[i], 1)
        }
    }
    const k = temp.size;
    const recordMap = new Map();
    let l = 0;
    let cnt = 0
    for (let r = 0; r < nums.length; r++) {
        recordMap.set(nums[r], (recordMap.get(nums[r]) ?? 0) + 1);
        while (recordMap.size >= k) {
            recordMap.set(nums[l], recordMap.get(nums[l]) - 1);
            if (recordMap.get(nums[l]) === 0) {
                recordMap.delete(nums[l])
            }
            l++;
        }
        cnt += l
    }
    return cnt;
}
// 2537 统计好子数组的数目
function countGood(nums, k) {
    // 下标对 数量
    let pairs = 0;
    const record = new Map();
    let l = 0;
    let ans = 0;
    for (const x of nums) {
        const c = record.get(x) ?? 0;
        pairs += c;
        record.set(x, c + 1);
        while (pairs >= k) {
            const y = nums[l];
            const c = record.get(y);
            pairs -= c - 1;
            record.set(y, c - 1);
            l++;
        }
        ans += l
    }
    return ans;
}
// 3298 统计重新排列后包含另一个字符串的子字符串数目 II  同 76 题
function validSubstringCount(word1, word2) {
    const needMap = new Map();
    for (let i = 0; i < word2.length; i++) {
        const c = word2.charAt(i);
        needMap.set(c, (needMap.get(c) ?? 0) + 1)
    }
    let ans = 0
    let l = 0;
    let valid = 0;
    const recordMap = new Map();
    for (let r = 0; r < word1.length; r++) {
        const c = word1.charAt(r);
        recordMap.set(c, (recordMap.get(c) ?? 0) + 1);
        if (needMap.has(c) && needMap.get(c) === recordMap.get(c)) {
            valid++;
        }
        while (valid >= needMap.size) {
            const c = word1.charAt(l);
            if (needMap.has(c) && needMap.get(c) === recordMap.get(c)) {
                valid--;
            }
            recordMap.set(c, recordMap.get(c) - 1);
            l++;
        }
        ans += l;
    }
    return ans
}
// 3258 统计满足 K 约束的子字符串数量 I
function countKConstraintSubstrings(s, k) {
    let ans = 0;
    const cnt = [0, 0];
    let l = 0;
    for (let r = 0; r < s.length; r++) {
        cnt[Number(s.charAt(r))]++;
        while (cnt[0] > k && cnt[1] > k) {
            cnt[Number(s.charAt(l))]--;
            l++;
        }
        // [0, ..., l-1]都不合法，[l, r]均合法
        ans += (r - l + 1);
    }
    return ans;
}
// 2302 统计得分小于 K 的子数组数目
function countSubarrays(nums, k) {
    let ans = 0;
    let sum = 0;
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        sum += nums[r];
        while (sum * (r - l + 1) >= k) {
            sum -= nums[l];
            l++;
        }
        ans += (r - l + 1)
    }
    return ans;
}
// 2762 不间断子数组 （双端队列统计滑窗最大值和最小值
function continuousSubarrays(nums) {
    let ans = 0;
    const minQueue = [];
    const maxQueue = [];
    let l = 0;
    for (let r = 0; r < nums.length; r++) {
        while (minQueue.length > 0 && nums[r] < minQueue[minQueue.length - 1]) {
            minQueue.pop()
        }
        while (maxQueue.length > 0 && nums[r] > maxQueue[maxQueue.length - 1]) {
            maxQueue.pop()
        }
        minQueue.push(nums[r]);
        maxQueue.push(nums[r])
        while (maxQueue.length && minQueue.length && (maxQueue[0] - minQueue[0]) > 2) {
            if (nums[l] === minQueue[0]) {
                minQueue.shift();
            }
            if (nums[l] === maxQueue[0]) {
                maxQueue.shift();
            }
            l++;
        }
        ans += r - l + 1;
    }
    return ans;
}
// LCP68 美观的花束
function beautifulBouquet(flowers, cnt) {
    const record = new Map();
    let l = 0;
    let ans = 0;
    for (let r = 0; r < flowers.length; r++) {
        const kind = flowers[r];
        record.set(kind, (record.get(kind) ?? 0) + 1);
        while (record.get(kind) > cnt) {
            const kind = flowers[l];
            record.set(kind, record.get(kind) - 1);
            l++;
        }
        ans += r - l + 1
    }
    return ans;
};
// 930 和相同的二元子数组 
function numSubarraysWithSum(nums, goal) {
    function ansNoMoreThanK(nums, k) {
        if (k < 0) {
            return 0
        }
        let ans = 0;
        let sum = 0;
        let left = 0;
        for (let r = 0; r < nums.length; r++) {
            sum += nums[r];
            while (sum > k) {
                sum -= nums[left];
                left++;
            }
            ans += (r - left + 1);
        }
        return ans;
    }
    const a = ansNoMoreThanK(nums, goal);
    const b = ansNoMoreThanK(nums, goal - 1);
    return a - b;
}
// 1248 统计「优美子数组」
function numberOfSubarrays(nums, k) {
    let ans = 0;
    let cnt1 = 0;
    let cnt2 = 0;
    let l1 = 0;
    let l2 = 0;
    for (let r = 0; r < nums.length; r++) {
        cnt1 += nums[r] % 2;
        cnt2 += nums[r] % 2;
        while (l1 <= r && cnt1 >= k) {
            cnt1 -= nums[l1] % 2;
            l1++;
        }
        while (l2 <= r && cnt2 >= k + 1) {
            cnt2 -= nums[l2] % 2;
            l2++;
        }
        ans += (l1 - l2)
    }
    return ans;
}
// 3306 元音辅音字符串计数 II
function countOfSubstrings(word, k) {
    const record1 = new Map();
    const record2 = new Map();
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let cnt1 = 0;
    let cnt2 = 0;
    let ans = 0;
    let l1 = 0;
    let l2 = 0;
    for (let r = 0; r < word.length; r++) {
        const c = word.charAt(r);
        if (vowels.includes(c)) {
            record1.set(c, (record1.get(c) ?? 0) + 1);
            record2.set(c, (record2.get(c) ?? 0) + 1);
        } else {
            cnt1++;
            cnt2++;
        }
        while (l1 <= r && record1.size === vowels.length && cnt1 >= k) {
            const c = word.charAt(l1);
            if (vowels.includes(c)) {
                record1.set(c, record1.get(c) - 1);
            } else {
                cnt1--;
            }
            if (record1.get(c) === 0) {
                record1.delete(c);
            }
            l1++;
        }
        while (l2 <= r && record2.size === vowels.length && cnt2 >= k + 1) {
            const c = word.charAt(l2);
            if (vowels.includes(c)) {
                record2.set(c, record2.get(c) - 1);
            } else {
                cnt2--;
            }
            if (record2.get(c) === 0) {
                record2.delete(c);
            }
            l2++;
        }
        ans += (l1 - l2)
    }
    return ans;
}
// 992 K 个不同整数的子数组 
function subarraysWithKDistinct(nums, k) {
    function goodMoreThanM(nums, m) {
        let ans = 0;
        let record = new Map();
        let l = 0;
        for (let r = 0; r < nums.length; r++) {
            const c = nums[r];
            record.set(c, (record.get(c) ?? 0) + 1);
            while (record.size >= m) {
                const c = nums[l];
                record.set(c, record.get(c) - 1);
                if (record.get(c) === 0) {
                    record.delete(c)
                }
                l++
            }
            ans += l;
        }
        return ans;
    }
    const a = goodMoreThanM(nums, k);
    const b = goodMoreThanM(nums, k + 1)
    return a - b;
}