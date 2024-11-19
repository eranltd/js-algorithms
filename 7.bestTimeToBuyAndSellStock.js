/**
 * You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

 

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
 

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) { //[7,1,5,3,6,4] // 2 pointers approch

    let buyStock = 0 //buy
    let sellStock = 1 //sell
    let maxProfit = 0

    while(sellStock < prices.length){ //[1...n]
        if(prices[buyStock] < prices[sellStock]){ //[0...n] < [1...n]
        let profit = prices[sellStock] - prices[buyStock] //right has to be higher always, else negative
        maxProfit = Math.max(maxProfit, profit)
        }
       else{
        buyStock = sellStock //we always have to be with left pointer smaller than the right one, else no profit
       }
       sellStock++
        }
        return maxProfit
    }

console.log(maxProfit([7,1,5,3,6,4])) //5
console.log(maxProfit([7,6,4,3,1])) //0 
console.log(maxProfit([1,2])) //1
console.log(maxProfit([2,1])) //0