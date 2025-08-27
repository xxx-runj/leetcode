// dfs
function wordBreak(s: string, wordDict: string[]) {
    const n = s.length;
    const memo = new Map();
    return dfs(0);

    // j : 被匹配的子串起始位置
    function dfs(j) {
        if (j === n) {
            return true;
        }
        // 加入记忆化，避免超时
        if (memo.has(j)) {
            return memo.get(j);
        }
        let res = false;
        for (let i = 0; i < wordDict.length; i++) {
            const word = wordDict[i];
            const tmp = s.substring(j, j + word.length);
            if (word !== tmp) {
                continue;
            }
            res = res || dfs(j + word.length);
        }
        memo.set(j, res);
        return res;
    }
}

// bfs
function wordBreak1(s: string, wordDict: string[]) {
    let curLevel = new Set();
    curLevel.add("");
    while (curLevel.size > 0) {
        const nextLevel = new Set();
        for (const str of curLevel) {
            if (str === s) {
                return true;
            }
            for (const word of wordDict) {
                const prefix = str + word;
                if (s.startsWith(prefix)) {
                    nextLevel.add(prefix);
                }
            }
        }
        curLevel = nextLevel;
    }
    return false;
}

// dp
// 注意遍历顺序：先单词再字典，这是 排列问题（顺序很重要），所以要先遍历单词
// 硬币问题是组合问题（不考虑顺序），因此先遍历硬币，在考虑了coins[i]的基础上，再去考虑 coins[i+1]
function wordBreak2(s: string, wordDict: string[]) {
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let j = 1; j <= n; j++) {
        for (let i = 0; i < wordDict.length; i++) {
            const word = wordDict[i];
            const tmp = j - word.length;
            dp[j] =
                dp[j] ||
                (tmp < 0 ? false : dp[tmp] && word === s.substring(tmp, j));
        }
    }
    return dp[n];
}
wordBreak2("leetcode", ["leet", "code"]);
wordBreak2("applepenapple", ["apple", "pen"]);
// wordBreak(
//     "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab",
//     [
//         "a",
//         "aa",
//         "aaa",
//         "aaaa",
//         "aaaaa",
//         "aaaaaa",
//         "aaaaaaa",
//         "aaaaaaaa",
//         "aaaaaaaaa",
//         "aaaaaaaaaa",
//     ]
// );
