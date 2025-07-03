/* 
Given an integer array nums, return the length of the longest strictly increasing subsequence.


Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
*/


/*
Simple Dynamic Programming (O(n^2)) Solution
Concept:

The idea is to build an array, let's call it dp, where dp[i] represents the length of the longest increasing subsequence ending at nums[i].

Initialization: Every number can at least be an increasing subsequence of length 1 (itself). So, initialize all dp[i] to 1.

Iteration: For each nums[i], we look at all previous numbers nums[j] (where j < i). If nums[i] is greater than nums[j], it means nums[i] can extend the increasing subsequence that ends at nums[j]. So, we update dp[i] to be the maximum of its current value and dp[j] + 1.

Result: The maximum value in the dp array will be the length of the longest increasing subsequence in the entire nums array.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length === 0) {
        return 0;
    }

    // dp[i] will store the length of the longest increasing subsequence ending at nums[i]
    const dp = new Array(nums.length).fill(1); //every number is an increasing subsequence of length 1 by itself
    let maxLength = 1;

    // Iterate through each number in the array
    for (let i = 1; i < nums.length; i++) {
        // For each number, check all previous numbers
        for (let j = 0; j < i; j++) {
            // If nums[i] can extend the subsequence ending at nums[j]
            if (nums[j] < nums[i]) {
                // Update dp[i] if we found a longer subsequence
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        // Keep track of the overall maximum length found so far
        maxLength = Math.max(maxLength, dp[i]);
    }

    return maxLength;
    }




// Driver code to test the function with examples
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // Expected output: 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // Expected output: 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); // Expected output: 1
console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6])); // Expected output: 6
console.log(lengthOfLIS([2, 2, 2, 2, 2])); // Expected output: 1
