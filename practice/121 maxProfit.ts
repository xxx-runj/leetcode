// 买卖股票的最佳时机
function maxProfit(prices) {
    const n = prices.length;
    let minPrice = prices[0];
    let maxProfile = 0;
    for (let i = 1; i < n; i++) {
        maxProfile = Math.max(maxProfile, prices[i] - minPrice);
        minPrice = Math.min(minPrice, prices[i]);
    }
    return maxProfile;
}
/**
 * 考虑一个问题：如果要在第 i 天卖出，那么如何才能获得最大利润？
 *  很明显，只有在第 i 天之前的最低点买入，才能获得最大利润
 */
