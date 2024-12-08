/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
*/

/**
 * Answer: Psuedo code
 * 
 *  KEEP IT SIMPLE STUPID
 *   End result is, for an index i we want product of all elements from 0 to i-1 and i+1 to n
 *
 *   So let's divide our problem into two sub-problems:
 *
 *   1> Find the product of all elements less than the current element.
 *   2> Find the product of all elements greater than the current element.
 *
 *   The product of these two subproblems will give us the final result.
 *   Input : [1,2,3,4]
 *   Output : [24,12,8,6]
 * 
 *  let left = [];
    let mul = 1;                 //keeping track of multiplication
    for(let i=0;i<nums.length;i++){
       left[i] = mul;
       mul = mul*nums[i];
   }
 * const leftArr = [ 
 *                  1, //i=0
 *                  1 * arr[0], //i=1, value=1
 *                  1 * arr[0] * arr[1], i=2, value = 1 * 2
 *                  1 * arr[0] * arr[1] * arr[2] i=3, value = 1 * 2 * 3
 *                ]
 *  let right = [];
    let mul = 1;                 //keeping track of multiplication
    for(let i=nums.length-1;i>=0;i++){
       right[i] = mul;
       mul = mul*nums[i];
   }
 * const rightArr = [
 *                  1 * arr[1] * arr[2] * arr[3], //i=, value = 2 * 3 * 4
 *                  1 * arr[2] * arr[3], //i=1, value = 3 * 4
 *                  1 * arr[3], //i=2, value = 4
 *                 ,1 //i=3
 *               ] 
 * 
 * let res = [];
   for(let i=0;i<nums.length;i++){
       res[i] = left[i]*right[i];
   }
   return res;
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  let res = [];
  let left = 1; //like arr[0]+arr[1]+arr[2]...arr[i-1] accumulator
  let right = 1;
  for(let i=0;i<nums.length;i++){
      res[i] = left;
      left = left*nums[i];
  }

  for(let i=nums.length-1;i>=0;i--){
      res[i] = right*res[i];
      right = right*nums[i];
  }
  return res;

};

/*https://dev.to/akhilpokle/product-of-array-except-self-a-mind-boggling-google-interview-question-1en1*/

console.log(productExceptSelf([1,2,3,4])); // [24,12,8,6]
console.log(productExceptSelf([-1,1,0,-3,3])); // [0,0,9,0,0]
console.log(productExceptSelf([1,2,3,4,5])); // [120,60,40,30,24]