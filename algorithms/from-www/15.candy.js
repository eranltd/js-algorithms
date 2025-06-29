/*
There are n children standing in a line.
Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.
- Return the minimum number of candies you need to have to distribute the candies to the children.

Example 1:

Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
Example 2:

Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.

Constraints:

n == ratings.length
1 <= n <= 2 * 104
0 <= ratings[i] <= 2 * 104
*/

/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = function (ratings) {
  if (ratings === null || ratings.length === 0) {
    return ratings
  }
  const count = 0
  const candies = new Array(ratings.length).fill(1)
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1
    }
  }
  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1)
    }
  }
  return candies.reduce((acc, cur) => acc + cur)
  // T.C: O(N)
  // S.C: O(N)

  // Think about this case: [3,2,1]
  // If we iterate from the left and try to stick with both rule (1) and (2),
  // we get [2,2,1], which is incorrect.
  // If we iterate from the left and try to stick with rule (1),
  // we get [1,1,1], which is again incorrect.
  // If we iterate both from the left and from the right, and try to stick with rule (1)
  // and rule (2) respectively, we get [1,1,1] -> [3,2,1], which is correct.
  // We can't stick with both rule (1) and (2) via just one iteration from left to right
  // because number of candies for some children gets updated as we iterate through
  // and we used their pre-updated number of candies to determine some child's number of candies
  // Hence, we iterate from left to right and also from right to left.
  // We take the maximum value of the two because we want to satisfy both rules (1) and (2).
}

console.log(candy([1, 0, 2])) // 5
console.log(candy([1, 2, 2])) // 4
console.log(candy([1, 2, 87, 87, 87, 2, 1])) // 13
console.log(candy([1, 3, 4, 5, 2])) // 11
