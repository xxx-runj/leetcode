function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    const m = coins.length;
    for (let i = 0; i < m; i++) {
        for (let j = 1; j <= amount; j++) {
            const newAmount = j - coins[i];
            dp[j] = Math.min(
                dp[j],
                newAmount < 0 ? Infinity : dp[j - coins[i]] + 1
            );
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}
coinChange([1, 2, 5], 11);
