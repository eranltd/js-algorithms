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
 

Follow-up: Could you solve the problem in linear time and in O(1) space?
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    //place a variable to store the majority element
    var count = 0;
    var majorNum = 0;
    var len = nums.length;
    for (var i = 0; i < len; i++) {
        if (!count) {
        majorNum = nums[i];
        count = 1;
        } else {
        count += (nums[i] === majorNum ? 1 : -1);
        }
  }
  return majorNum;
};

var majorityElementUsingMap = function(nums) {
   
  const map = new Map();
  nums.forEach(element => {
    map[element] = map[element]? ++map[element]: 1

  });


  const higestOccurence = Math.max(...Object.values(map))
  const foundHighest = Object.keys(map).filter((item)=>{
    return map[item] == higestOccurence
  })
  
  return foundHighest.shift()
};



// console.log(majorityElement([3,2,3])) //3

console.log(majorityElementUsingMap([3,2,3])) //3