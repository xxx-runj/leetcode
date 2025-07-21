// 27 移除元素
function removeElement(nums, val) {
    let fast = 0;
    let slow = 0;
    while (fast < nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    return slow
}

// 26 移除重复元素
function removeDuplicates(nums) {
    let fast = 0;
    let slow = 0;
    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }
    return slow + 1
}

// 283 移动零
function moveZeroes(nums) {
    let left = 0;
    let right = 0;
    while (right < nums.length) {
        if (nums[right] !== 0) {
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
        right++;
    }
    return left
}

// 844 比较含退格的字符串
function compareStr(s, t) {
    function filterStr(c) {
        const arr = c.split('');
        let fast = 0;
        let slow = 0;
        while (fast < arr.length) {
            if (arr[fast] !== '#') {
                [arr[fast], arr[slow]] = [arr[slow], arr[fast]];
                slow++;
            } else if (slow !== 0) {
                slow--;
            }
            fast++
        }
        arr.length = slow;
        return arr.join('');
    }
    const sStr = filterStr(s);
    const tStr = filterStr(t);
    return sStr === tStr;
}

// 977 排序 有序数组的平方
function sortArr(nums) {
    const arr = new Array(nums.length);
    let p = nums.length - 1;
    let left = 0;
    let right = p;
    while (left <= right) {
        const leftS = nums[left] ** 2;
        const rightS = nums[right] ** 2;
        if (rightS >= leftS) {
            arr[p] = rightS;
            right--;
        } else {
            arr[p] = leftS;
            left++;
        }
        p--;
    }
    return arr;
}

// LCR006 两数之和 - 输入有序数组
function twoSum(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum < target) {
            left++;
        } else if (sum > target) {
            right--;
        } else {
            return [left, right]
        }
    }
}

// 15 三数之和
function threeSum(nums) {
    nums.sort();
    const len = nums.length;
    const res = [];
    for (let i = 0; i < len - 2; i++) {
        // 跳过重复数字
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }
        // 优化
        if (nums[i] + nums[i + 1] + nums[i + 2] > 0) {
            break;
        }
        // 优化
        if (nums[i] + nums[len - 1] + nums[len - 2] < 0) {
            continue;
        }
        let left = i + 1;
        let right = len - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < 0) {
                left++
            } else if (sum > 0) {
                right--
            } else {
                res.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;
                // 跳过重复数字
                while (left < right && nums[left] === nums[left - 1]) {
                    left++
                }
                while (left < right && nums[right] === nums[right + 1]) {
                    right--
                }
            }
        }
    }
    return res;
}

// 11 盛最多水的容器
function mostContainer(height) {
    let left = 0;
    let right = height.length - 1;
    let sum = 0;
    while (left < right) {
        const temp = (right - left) * Math.min(height[left], height[right]);
        sum = Math.max(sum, temp);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return sum;
}

// 42 接雨水
function getRain(height) {
    const len = height.length;
    // 存储 前缀最高值 数组
    const preArr = new Array(len);
    preArr[0] = height[0];
    // 存储 前后缀最高值 数组
    const sufArr = new Array(len);
    sufArr[len - 1] = height[len - 1]
    for (let i = 1; i < len; i++) {
        preArr[i] = Math.max(preArr[i - 1], height[i])
    }
    for (let i = len - 2; i >= 0; i--) {
        sufArr[i] = Math.max(sufArr[i + 1], height[i])
    }
    let ans = 0;
    // 计算每根柱子的储水量
    for (let i = 0; i < len; i++) {
        ans += Math.min(preArr[i], sufArr[i]) - height[i];
    }
    return ans
}
// 接雨水 优化
// 前后缀不需要用数组存储，每次利用 上一个最高值 和 当前高度 比较即可
function getRain2(height) {
    let left = 0;
    let right = height.length - 1;
    let preMax = 0;
    let surMax = 0;
    let ans = 0;
    while (left <= right) {
        // 更新前后缀最大值
        preMax = Math.max(preMax, height[left]);
        surMax = Math.max(surMax, height[right]);
        if (preMax < surMax) {
            ans += preMax - height[left];
            left++;
        } else {
            ans += surMax - height[right];
            right--;
        }
    }
    return ans;
}

// 206 反转链表
function reverseList(head) {
    let pre = null;
    let cur = head;
    while (cur !== null) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    return pre;
}

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
// 92 反转链表2
function reverseBetween(head, left, right) {
    const dummy = new ListNode(null, head);
    let p0 = dummy;
    // 找到 left 的上一个
    for (let i = 0; i < left - 1; i++) {
        p0 = p0.next;
    }
    // 开始进行反转
    let pre = null;
    let cur = p0.next;
    for (let i = 0; i < right - left + 1; i++) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // 反转结束，此时cur指向right的下一个，pre指向right
    p0.next.next = cur;
    p0.next = pre;
    return dummy.next;
}
// 25 K个一组反转链表
function reverseKGroup(head, k) {
    // 先求出链表长度
    let n = 0;
    let curr = head;
    while (curr) {
        n++;
        curr = curr.next;
    }
    const dummy = new ListNode(null, head);
    let groupPre = dummy;
    let cur = dummy.next;
    let pre = null;
    // 一共需要反转的组数
    for (; n >= k; n -= k) {
        // 开始反转其中一组
        for (let i = 0; i < k; i++) {
            const next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        const temp = groupPre.next;
        groupPre.next.next = cur;
        groupPre.next = pre;
        groupPre = temp;
    }
    return dummy.next;
}

// 876 寻找链表的中间节点
function middleNode(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next
    }
    return slow;
}
// 141 环形链表（判断链表是否有环）
function hasCycle(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            return true
        }
    }
    return false;
}
// 142 环形链表2 返回链表开始入环的第一个节点
function detectCycle(head) {
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        // 快慢指针相遇
        if (slow === fast) {
            let slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}
// 143 重排链表
function reorderList(head) {
    function reverseList(head) {
        let pre = null;
        let cur = head;
        while (cur !== null) {
            const next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        return pre;
    }
    // 链表的中间节点（偶数则找前一个）
    function middleNode(head) {
        let slow = head;
        let fast = head.next;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    const mid = middleNode(head);
    mid.next = null;
    const second = reverseList(mid.next);
    let first = head;
    while (second) {
        firstNext = first.next;
        secondNext = second.next;
        first.next = second;
        second.next = firstNext;
        first = firstNext;
        second = secondNext;
    }
    return head;
}
// 237 删除链表中的节点（看到的解法太妙了）
function deleteNode(node) {
    node.val = node.next.val;
    node.next = node.next.next;
}
// 19 删除链表的倒数第N个节点
function removeNthFromEnd(head, n) {
    const dummy = new ListNode(null, head);
    let fast = dummy;
    let slow = dummy;
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }
    while (fast.next) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}
// 83 删除排序链表中的重复元素
function deleteDuplicates(head) {
    if (!head) {
        return head;
    }
    let cur = head;
    while (cur.next) {
        if (cur.next.val === cur.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
}
// 82 删除排序链表中的重复元素2
function deleteDuplicates(head) {
    const dummy = new ListNode(null, head);
    let s = dummy;
    let f = head;
    while (f && f.next) {
        if (f.val === f.next.val) {
            const duplicateV = f.val;
            while (f && f.val === duplicateV) {
                f = f.next;
            }
            s.next = f;
        } else {
            s = s.next;
            f = f.next;
        }
    }
    return dummy.next;
}
// 344 反转字符串
function reverseString(s) {
    let l = 0;
    let r = s.length - 1;
    while (l < r) {
        [s[l], s[r]] = [s[r], s[l]];
        l++;
        r--;
    }
    return s;
}
// 125 验证回文串
function isPalindrome(s) {
    let l = 0;
    let r = s.length - 1;
    while (l < r) {
        if (!/[a-zA-Z\d]/.test(s[l])) {
            l++;
        } else if (!/[a-zA-Z\d]/.test(s[r])) {
            r--;
        } else if (s[l].toLowerCase() !== s[r].toLowerCase()) {
            return false
        } else {
            l++;
            r--;
        }
    }
    return true;
}
// 1750 删除字符串两端相同字符后的最短长度
function minimumLength(s) {
    const n = s.length;
    let left = 0, right = n - 1;
    while (left < right && s[left] === s[right]) {
        const c = s[left];
        while (left <= right && s[left] === c) {
            left++;
        }
        while (left <= right && s[right] === c) {
            right--;
        }
    }
    return right - left + 1;
}
// 2105 给植物浇水 II 
function minimumRefill(plants, capacityA, capacityB) {
    let l = 0;
    let r = plants.length - 1;
    let cnt = 0;
    let cA = capacityA;
    let cB = capacityB;
    while (l < r) {
        if (cA < plants[l]) {
            cnt++;
            cA = capacityA;
        }
        cA -= plants[l];
        l++;
        if (cB < plants[r]) {
            cnt++;
            cB = capacityB;
        }
        cB -= plants[r];
        r--;
    }
    if (l === r) {
        const cMax = Math.max(cA, cB);
        if (cMax < plants[l]) {
            cnt++;
        }
    }
    return cnt;
}
// 658 找到 K 个最接近的元素
function findClosestElements(arr, k, x) {
    let l = 0;
    let r = arr.length - 1;
    // 什么时候去缩小窗口？ 当窗口内元素个数超出 k 时，需要缩小窗口
    while (r - l + 1 > k) {
        if (Math.abs(arr[r] - x) >= Math.abs(arr[l] - x)) {
            r--;
        } else {
            l++
        }
    }
    return arr.slice(l, r + 1)
}
// 1471 数组中的 K 个最强值 
function getStrongest(arr, k) {
    const ans = new Array(k);
    // 先排序
    arr.sort((a, b) => a - b)
    // 中位数
    const m = arr[Math.floor((arr.length - 1) / 2)];
    let l = 0;
    let r = arr.length - 1;
    // l、r越靠近中位数，越不强
    while ((arr.length - r + l - 1) < k) {
        if (Math.abs(arr[r] - m) >= Math.abs(arr[l] - m)) {
            // r更强
            ans.push(arr[r]);
            r--;
        } else {
            ans.push(arr[l])
            l++
        }
    }
    return ans;
}
// 167 两数之和 II - 输入有序数组
function twoSum(numbers, target) {
    let l = 0;
    let r = numbers.length - 1;
    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (sum === target) {
            return [l + 1, r + 1];
        }
        sum > target ? r-- : l++
    }
}
// 633 平方数之和
function judgeSquareSum(c) {
    let l = 0;
    let r = Math.floor(Math.sqrt(c));
    while (l <= r) {
        if (l ** 2 === c - r ** 2) {
            return true;
        }
        l ** 2 > (c - r ** 2) ? r-- : l++
    }
    return false;
}
// 2824 统计和小于目标的下标对数目
function countPairs(nums, target) {
    // 方式一：暴力法
    // 方式二：排序 + 相向双指针
    nums.sort((a, b) => a - b);
    let ans = 0;
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        if (nums[l] + nums[r] < target) {
            // 为什么不用 +1，是因为这个判断表示 nums[l] 和 nums[l+1]...nums[r] 中的任意数相加都能小于 target
            // 下标对为 [l, l+1], ..., [l, r]
            ans += (r - l)
            l++;
        } else {
            r--;
        }
    }
    return ans
}
// 2563 统计公平数对的数目
function countFairPairs(nums, lower, upper) {
    nums.sort((a, b) => a - b);
    // 排序后，分别统计 sum < upper + 1 以及 sum < lower 的数目，两者相减
    function cntLessThanK(nums, k) {
        let ans = 0;
        let l = 0;
        let r = nums.length - 1;
        while (l < r) {
            if (nums[l] + nums[r] < k) {
                ans += (r - l);
                l++
            } else {
                r--;
            }
        }
        return ans;
    }
    const a = cntLessThanK(nums, upper + 1);
    const b = cntLessThanK(nums, lower);
    return a - b
}
// LCP28 采购方案
function purchasePlans(nums, target) {
    // 先排序
    nums.sort((a, b) => a - b);
    // 统计
    let ans = 0;
    let l = 0;
    let r = nums.length - 1;
    while (l < r) {
        if (nums[l] + nums[r] <= target) {
            ans += (r - l);
            l++
        } else {
            r--;
        }
    }
    return ans % 1000000007;
}
// 16 最接近的三数之和
function threeSumClosest(nums, target) {
    // 先排序
    nums.sort((a, b) => a - b);
    let minDiff = Infinity;
    let closeSum = Infinity;
    for (let i = 0; i < nums.length - 2; i++) {
        let l = i + 1;
        let r = nums.length - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === target) {
                return target;
            }
            if (Math.abs(sum - target) < minDiff) {
                closeSum = sum;
                minDiff = Math.abs(sum - target);
            }
            if (sum > target) {
                r--;
            } else {
                l++;
            }
        }
    }
    return closeSum;
}
// 18 四数之和
function fourSum(nums, target) {
    const n = nums.length;
    if (n < 4) {
        return [];
    }
    // 先排序
    nums.sort((a, b) => a - b);
    const ans = [];
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        if (nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target) {
            continue;
        }
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }
            if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
                break;
            }
            if (nums[i] + nums[j] + nums[n - 1] + nums[n - 2] < target) {
                continue;
            }
            let left = j + 1;
            let right = n - 1;
            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum === target) {
                    ans.push([nums[i], nums[j], nums[left], nums[right]]);
                    left++;
                    right--;
                    while (left < right && nums[left] === nums[left - 1]) {
                        left++;
                    }
                    while (left < right && nums[right] === nums[right + 1]) {
                        right--;
                    }
                } else if (sum > target) {
                    right--;
                } else {
                    left++;
                }
            }
        }
    }
    return ans;
}
// 611 有效三角形的个数 最小的两边之和大于第三边
function triangleNumber(nums) {
    let ans = 0;
    const n = nums.length
    nums.sort((a, b) => a - b);
    for (let i = n - 1; i > 1; i--) {
        const c = nums[i];
        if (nums[i - 1] + nums[i - 2] <= c) {
            continue;
        }
        if (nums[0] + nums[1] > c) {
            ans += i * (i - 1) / 2;
            continue
        }
        let l = 0;
        let r = i - 1;
        while (l < r) {
            if (nums[l] + nums[r] <= c) {
                l++;
            } else {
                ans += (r - l)
                r--;
            }
        }
    }
    return ans;
}
// 1577 数的平方等于两数乘积的方法数
function numTriplets(nums1, nums2) {
    // 构造一个函数，找出满足（arr2中两数乘积等于arr1中某数平方）的数目
    function triplets(arr1, arr2) {
        const n2 = arr2.length;
        if (n2 < 2) {
            return 0;
        }
        let ans = 0;
        arr1.sort((a, b) => a - b);
        arr2.sort((a, b) => a - b);
        for (const a of arr1) {
            // arr2 最大的两数乘积 小于 a^2，则 arr1 剩下的都不满足要求
            if (arr2[n2 - 1] * arr2[n2 - 2] < a ** 2) {
                break;
            }
            let l = 0;
            let r = n2 - 1;
            while (l < r) {
                if (arr2[l] * arr2[r] > a ** 2) {
                    r--;
                } else if (arr2[l] * arr2[r] < a ** 2) {
                    l++;
                } else {
                    // 乘积 等于 平方 的条件下
                    // 如果 左、右值相等，则下标 [l, r]中的任意两数都满足要求
                    if (arr2[l] === arr2[r]) {
                        ans += (r - l + 1) * (r - l) / 2;
                        break;
                    } else {
                        // 左右值若不相等，则分别找出重复值
                        let repeatL = repeatR = 0;
                        const tempL = arr2[l];
                        const tempR = arr2[r];
                        while (arr2[l] === tempL) {
                            repeatL++;
                            l++;
                        }
                        while (arr2[r] === tempR) {
                            repeatR++;
                            r--;
                        }
                        ans += repeatL * repeatR;
                    }
                }
            }
        }
        return ans;
    }
    const ans1 = triplets(nums1, nums2);
    const ans2 = triplets(nums2, nums1);
    return ans1 + ans2
}
// 923 三数之和的多种可能
function threeSumMulti(arr, target) {
    const mod = 10 ** 9 + 7
    let ans = 0;
    arr.sort((a, b) => a - b);
    const n = arr.length;
    for (let i = 0; i < n - 2; i++) {
        if (arr[i] + arr[n - 1] + arr[n - 2] < target) {
            continue;
        }
        let l = i + 1;
        let r = n - 1;
        while (l < r) {
            const sum = arr[i] + arr[l] + arr[r];
            if (sum > target) {
                r--;
            } else if (sum < target) {
                l++
            } else {
                if (arr[l] === arr[r]) {
                    ans = (ans + (r - l + 1) * (r - l) / 2) % mod;
                    break;
                } else {
                    let repeatL = repeatR = 0;
                    const tempL = arr[l];
                    const tempR = arr[r];
                    while (arr[l] === tempL) {
                        repeatL++;
                        l++;
                    }
                    while (arr[r] === tempR) {
                        repeatR++;
                        r--;
                    }
                    ans = (ans + repeatL * repeatR) % mod;
                }
            }
        }
    }
    return ans;
}
// 948 令牌放置
function bagOfTokensScore(tokens, power) {
    // 排序 + 双指针
    tokens.sort((a, b) => a - b);
    let ans = 0;
    let score = 0;
    let l = 0;
    let r = tokens.length - 1;
    while (l <= r) {
        if (power >= tokens[l]) {
            score++;
            ans = score;
            power -= tokens[l];
            l++;
        } else if (score > 0) {
            power += tokens[r];
            score--;
            r--;
        } else {
            break;
        }
    }
    return ans;
}
// 1616 分割两个字符串得到回文串 1868
function checkPalindromeFormation(a, b) {
    // 辅助函数1 校验 s [i, j] 区间对应的是否为回文字符串
    function isPalindrome(s, i, j) {
        let l = i;
        let r = j;
        while (l <= r) {
            if (s.charAt(l) !== s.charAt(r)) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
    // 辅助函数2 s1从前往后，s2从后往前 
    function check(s1, s2) {
        const n = s2.length;;
        let l = 0;
        let r = n - 1;
        while (l <= r && s1.charAt(l) === s2.charAt(r)) {
            l++;
            r--;
        }
        return isPalindrome(s2, l, r) || isPalindrome(s1, l, r);
    }
    return check(a, b) || check(b, a)
}
// 1498 满足条件的子序列数目 2276
function numSubseq(nums, target) {
    const mod = 10 ** 9 + 7;
    // 预计算
    const pow2 = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++) {
        pow2[i] = (pow2[i - 1] * 2) % mod;
    }
    nums.sort((a, b) => a - b);
    let l = 0;
    let r = nums.length - 1;
    let ans = 0;
    while (l <= r) {
        if (nums[l] + nums[r] > target) {
            r--;
        } else {
            ans = (ans + pow2[r - l]) % mod;
            l++
        }
    }
    return ans % mod;
}
// 1782 统计点对的数目 2457  暂时pass
function countPairs(n, edges, queries) { }

// 1574 删除最短的子数组使剩余数组有序 1932
function findLengthOfShortestSubarray(arr) {
    const n = arr.length;
    let L = 0;
    let R = n - 1;
    while ((L + 1) < n && arr[L] <= arr[L + 1]) {
        L++;
    }
    while (R >= 1 && arr[R - 1] <= arr[R]) {
        R--;
    }
    // 本身就是非递减
    if (L >= R) {
        return 0
    }
    // 初始值设为 仅保留前缀 或 仅保留后缀 时需删去的最小长度
    let ans = Math.min(n - L - 1, R);
    let j = n - 1;
    // 枚举左侧前缀的最右端点，找合适的右侧最左端点
    for (let i = L; i >= 0; i--) {
        while (j >= R && arr[j] >= arr[i]) {
            j--;
        }
        ans = Math.min(ans, j - i)
    }
    return ans;
}
// 2972 统计移除递增子数组的数目 II 
function incremovableSubarrayCount(nums) {
    const n = nums.length;
    let L = 0;
    let R = n - 1;
    while ((L + 1) < n && nums[L] < nums[L + 1]) {
        L++;
    }
    while (R >= 1 && nums[R - 1] < nums[R]) {
        R--;
    }
    // 本身就是严格递增
    if (L >= R) {
        return n * (n + 1) / 2;
    }
    let ans = 0;
    let j = n - 1;
    // 枚举左侧前缀的最右端点，找合适的右侧最左端点
    for (let i = L; i >= 0; i--) {
        while (j >= R && nums[j] > nums[i]) {
            j--;
        }
        ans += (n - j)
    }
    // 补上 前缀一个都不保留的情况下 的数目
    ans += (n - R + 1);
    return ans;
}
// 2122  还原原数组 2159 暂时pass
function recoverArray(nums) {

}
// 2234 花园的最大总美丽值 2562 暂时pass
// 581 最短无序连续子数
function findUnsortedSubarray(nums) {
    const n = nums.length;
    let p = q = -1;
    let max = -Infinity;
    let min = Infinity;
    // 从左往右，找到比左边最大值还要小的最靠右的元素
    for (let i = 0; i < n; i++) {
        if (nums[i] < max) {
            p = i;
        } else {
            max = nums[i];
        }
    }
    // 从右往左，找到比右边最小值还要大的最靠左的元素
    for (let i = n - 1; i >= 0; i--) {
        if (nums[i] > min) {
            q = i;
        } else {
            min = nums[i];
        }
    }
    return p === -1 ? 0 : (p - q + 1);
}
findUnsortedSubarray([2,6,4,8,10,9,15])

// 1793 好子数组的最大分数 
function maximumScore(nums, k) {
    let ans = nums[k];
    let i = j = k;
    let min = nums[k];
    const n = nums.length;
    for (let m = 0; m < n - 1; m++) {
        if (j === n - 1 || i > 0 && nums[i - 1] > nums[j + 1]) {
            min = Math.min(min, nums[--i]);
        } else {
            min = Math.min(min, nums[++j]);
        }
        ans = Math.max(ans, min * (j - i + 1));
    }
    return ans;
}
// 80 删除有序数组中的重复项 II (🥹想不出来如何模仿26)
function removeDuplicates(nums) {
    const n = nums.length;
    if (n <= 2) {
        return n;
    }
    let slow = fast = 2;
    while (fast < n) {
        if (nums[slow - 2] !== nums[fast]) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
}
// 905. 按奇偶排序数组
function sortArrayByParity(nums) {
    // 同向双指针
    // let slow = 0;
    // let fast = 0;
    // while (fast < nums.length) {
    //     if(nums[fast] % 2 === 0) {
    //         [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
    //         slow++;
    //     }
    //     fast++;
    // }

    // 相向双指针
    const n = nums.length;
    let l = 0;
    let r = n - 1;
    while (l < r) {
        while (l < n && nums[l] % 2 === 0) {
            l++;
        }
        while (r >= 0 && nums[r] % 2 === 1) {
            r--;
        }
        if (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++;
            r--;
        }
    }
}
// 922. 按奇偶排序数组 II
function sortArrayByParityII(nums) {
    // let a = 0;
    // let b = 0;
    // const res = new Array(nums.length).fill(0);
    // for (let i = 0; i < nums.length; i++) {
    //     const c = nums[i];
    //     // 偶数
    //     if (c % 2 === 0) {
    //         res[0 + a * 2] = c;
    //         a++;
    //     } else {
    //         res[1 + b * 2] = c;
    //         b++;
    //     }
    // }
    // return res;

    // 
    const n = nums.length;
    let i = 0;
    let j = 1;
    while (i < n) {
        if (nums[i] % 2 === 0) {
            i += 2; // 找到不满足偶数位置的i
        } else if (nums[j] % 2 === 1) {
            j += 2; // 找到不满足奇数位置的j
        } else { // 交换两者
            [nums[i], num[j]] = [nums[j], nums[i]];
            i += 2;
            j += 2;
        }
    }
    return nums;
}
// 3467. 将数组按照奇偶性转化
function transformArray(nums) {
    // 其实就是偶数在前，奇数在后
    const n = nums.length;
    let i = 0;
    let j = n - 1;
    while (i <= j) {
        while (i < n && nums[i] % 2 === 0) {
            nums[i] = 0;
            i++;
        }
        while (j >= 0 && nums[j] % 2 === 1) {
            nums[j] = 1;
            j--;
        }
        if (i <= j) {
            nums[i] = 0;
            nums[j] = 1;
            i++;
            j--;
        }
    }
    return nums;
}
// 2460. 对数组执行操作
function applyOperations(nums) {
    // 两步法：按题意遍历执行 + 对结果进行 (283. 移动零) 操作
    // 一次遍历法：
    let j = 0;
    for (let i = 0; i < nums.length; i++) {
        if ((i + 1) < nums.length && nums[i + 1] === nums[i]) {
            nums[i] *= 2;
            nums[i + 1] = 0;
        }
        if (nums[i] !== 0) {
            [nums[j], nums[i]] = [nums[i], nums[j]];
            j++;
        }
    }
    return nums;
}
// 1089. 复写零
function duplicateZeros(arr) {
    // 先找出最后可操作的元素
    const n = arr.length;
    let i = 0;
    let j = 0;
    while (j < n) {
        if (arr[i] === 0) {
            j++;
        }
        i++;
        j++;
    }
    // 结束循环了，说明最多可以操作原数组中[0, i-1]的元素
    // 准备倒序复写
    i--;
    j--; // 注意，若 arr[i] = 0,此时的 j = n
    while (i >= 0) {
        if (j < n) { arr[j] = arr[i]; }
        if (arr[i] === 0 && j >= 1) {
            j--;
            arr[j] = 0;
        }
        i--;
        j--;
    }
}
duplicateZeros([1, 0, 2, 3, 0, 4, 5, 0])
// 75. 颜色分类
function sortColors(nums) {
    let a = b = c = 0;
    for (const i of nums) {
        if (i === 0) {
            a++;
        } else if (i === 1) {
            b++;
        } else {
            c++;
        }
    }
    let i = 0;
    while (a > 0) {
        nums[i] = 0;
        a--;
        i++
    }
    while (b > 0) {
        nums[i] = 1;
        b--;
        i++;
    }
    while (c > 0) {
        nums[i] = 2;
        c--;
        i++
    }
    return nums;
}
// 75. 颜色分类 插入法
function sortColors1(nums) {
    /**
     * 假设 nums 是一个已经按照 0 1 2 排好序的数组，现在新增一个1，如何插入？（从后往前覆盖法）
     * https://leetcode.cn/problems/sort-colors/solutions/3679069/on-cha-ru-pai-xu-jian-ji-xie-fa-pythonja-zk60/
     */
    let p0 = p1 = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        const c = nums[i];
        nums[i] = 2;
        if (c < 2) {
            nums[p1] = 1;
            p1++;
        }
        if (c < 1) {
            nums[p0] = 0;
            p0++;
        }
    }
    return nums
}
// 考验原地修改的思路，暂时pass
// 1920 基于排列构建数组
// 442 数组中重复的数据
// 448 找到所有数组中消失的数字
// 41 缺失的第一个正数
// 287 寻找重复数

