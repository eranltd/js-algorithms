/*
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

*/


/**
 * @param {number} n
 * @return {number}
 */
/* Approach 3(Bottom-Up DP)
     The solve function is a recursive function that calculates the number of distinct ways to climb stairs from step i to the top (n).
     Base cases: If i equals n, return 1 (reached the top). If i exceeds n, return 0 (invalid path).
     Memoization: Use a dp array to store already computed results to avoid redundant calculations.
     Recursive formula: The number of ways to climb stairs from step i to the top is the sum of ways from i+1 and i+2.
     The climbStairs function initiates the recursion with i=0 and returns the result.
*/
var climbStairs = function(n) {
    // step [n] = step[n-1] + step[n-2] //starting from n = 3
    //for n = 1->, 1
    //for n = 2->, 2
    //for n = 3->, 3
    //for n = 4->, 5
    //for n = 5->, 8
    //for n = 6->, 13
    //for n = 7->, 21
    //for n = 8->, 34
    //for n = 9->, 55
    //for n = 10->, 89

    if (n==1) return 1
    if (n==2) return 2

    const arr = Array.from({length: n + 1}, () => 0);

    arr[1] = 1; // 1 way to climb 1 step
    arr[2] = 2; // 2 ways to climb 2 steps (1+1 or 2)

    for(let i = 3 ; i<= n ; i++){
        arr[i] = arr[i - 1] + arr[i - 2];
    }

    return arr[n] || 1; // If n is 0, return 1 (1 way to stay at the ground)



};
    
    
console.log("Test cases for climbStairs:");

console.log("Edge case: n = 0 (no steps)");
console.log(climbStairs(0)); // Expected: 1 (1 way to stay at the ground)

console.log("Edge case: n = 1 (single step)");
console.log(climbStairs(1)); // Expected: 1 (1 way to climb 1 step)

console.log("Small input: n = 2");
console.log(climbStairs(2)); // Expected: 2 (1+1 or 2)

console.log("Small input: n = 3");
console.log(climbStairs(3)); // Expected: 3 (1+1+1, 1+2, 2+1)

console.log("Larger input: n = 5");
console.log(climbStairs(5)); // Expected: 8 (ways to climb 5 steps)

console.log("Edge case: n = 10 (larger input)");
console.log(climbStairs(10)); // Expected: 89 (ways to climb 10 steps)