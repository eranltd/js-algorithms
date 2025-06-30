/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
 

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
*/

const nums = [1, 3, 7, 9, 2]
const target = 11


//find the complementary 
//store inside map the <complementary, i>
const twoSum = (nums, target) => {
    const map = new Map()
    for(let i=0; i< nums.length; i++){
      const complement = target - nums[i]
      if(map.has(complement)){
        return [map.get(complement), i]
      }
      map.set(nums[i], i) //set indice && actual number 
    }

    return []

}

// two pointers approach brute-force - only if must. not so good and trivial
const twoSumBruteForce = (nums, target) => {

  let p1 = 0
  let p2 = 0

  for(let i=0; i< nums.length; i++){
    p1=i
    p2=i
    while(p2 < nums.length){
      if(nums[p2] === target - nums[p1]){
        return [p1,p2]
      }
      p2++
    }
  }

  return []
}


console.log(twoSum(nums, target)) // 3,4
console.log(twoSumBruteForce(nums, target)) // 3,4
