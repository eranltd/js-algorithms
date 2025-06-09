/*
Given an array nums of size n, return the majority element.
The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:

n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109

*/

function majorityElement (numbers) {
  // Initialize a count variable to keep track of the frequency of the majority element.
  let count = 0
  // Initialize a variable to hold the current majority element.
  let majorityElement = 0
  const i = 0
  // Iterate through each number in the numbers array.
  for (const number of numbers) {
    // If count is zero, we found a new possible majority element.
    if (count === 0) {
      majorityElement = number
      count = 1
    }
    // If the current number is the same as the majority element, increment the count.
    // Otherwise, decrement the count.
    else {
      count += (majorityElement === number) ? 1 : -1
    }
  }

  // At the end of the loop, the majorityElement variable will contain the majority element.
  return majorityElement
}

const majorityElementUsingMap = function (nums) {
  const map = new Map()
  nums.forEach(element => {
    map[element] = map[element] ? ++map[element] : 1
  })

  const higestOccurence = Math.max(...Object.values(map))
  const foundHighest = Object.keys(map).filter((item) => {
    return map[item] == higestOccurence
  })

  return foundHighest.shift()
}

console.log(majorityElement([3, 3, 2, 2, 3, 2, 2, 2])) // 3
// console.log(majorityElementUsingMap([3,2,3,3,3,3,3,2,2,2,1,1,1,10,1,1,1])) //3
