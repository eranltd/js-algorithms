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
/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function (nums) {
  const finalArray  = []
  //one subproblem, product of array till i-1
  const left = []
  let multiplyLeft = 1
  for(let i=0; i< nums.length;i++){
    left[i] = multiplyLeft
    multiplyLeft = nums[i]*multiplyLeft
  }


  //two subproblem, product of array till i+1

  const right = []
  let multiplyRight = 1
  for(let i = nums.length-1; i >= 0;i--){
    right[i] = multiplyRight
    multiplyRight = nums[i] * multiplyRight
  }

  //final result, multiply both, can be reduce this part and multiply with left[i] on previous step
  for(let i = 0; i<right.length;i++){
    finalArray[i] = left[i] * right[i]
  }

  console.log('left',left)
  console.log('right',right)

  return finalArray

}

/* https://dev.to/akhilpokle/product-of-array-except-self-a-mind-boggling-google-interview-question-1en1 */

console.log(productExceptSelf([1, 2, 3, 4])) // [24,12,8,6]
// console.log(productExceptSelf([-1, 1, 0, -3, 3])) // [0,0,9,0,0]
// console.log(productExceptSelf([1, 2, 3, 4, 5])) // [120,60,40,30,24]


/** Why it works? */
/*
The Two-Array Approach: The Mathematical Insight

Let's simplify the explanation of the "Product of Array Except Self" problem using letters instead of numbers.

Imagine you have an array of letters: [A, B, C, D].
Your goal is to create a new array where each position X contains the product of all other letters except the letter at position X.

So, for [A, B, C, D], we want:

Position 0 (for A): B * C * D

Position 1 (for B): A * C * D

Position 2 (for C): A * B * D

Position 3 (for D): A * B * C

The Core Idea (Simplified):

To find the product of everything except a letter, say C, you just need to multiply:
(everything to its left) * (everything to its right)

So, for C:
(Product of A, B) * (Product of D) = (A * B) * (D)

How We Do It with Two Passes:

"Left Products" Pass:

We go from left to right.

For each spot, we figure out "what's the product of everything before me?"

Let's say we're building an array called left_prod:

left_prod[0] (before A): Nothing, so we use 1.

left_prod[1] (before B): Just A.

left_prod[2] (before C): A * B.

left_prod[3] (before D): A * B * C.

So, left_prod would be [1, A, A*B, A*B*C]

"Right Products" Pass:

Now we go from right to left.

For each spot, we figure out "what's the product of everything after me?"

Let's say we're building an array called right_prod:

right_prod[3] (after D): Nothing, so we use 1.

right_prod[2] (after C): Just D.

right_prod[1] (after B): C * D.

right_prod[0] (after A): B * C * D.

So, right_prod would be [B*C*D, C*D, D, 1]

Combining Them for the Final Answer:

Finally, to get our answer, we just multiply the corresponding values from our left_prod and right_prod arrays:

For position 0: left_prod[0] * right_prod[0] = 1 * (B * C * D) = B * C * D

For position 1: left_prod[1] * right_prod[1] = A * (C * D) = A * C * D

For position 2: left_prod[2] * right_prod[2] = (A * B) * D = A * B * D

For position 3: left_prod[3] * right_prod[3] = (A * B * C) * 1 = A * B * C

Why It Works:

Because every element's "product of others" can be perfectly split into two independent parts: what's before it, and what's after it. By calculating these two parts separately and then multiplying them, we get the total product of all other elements for each position, without ever directly multiplying all elements and then dividing (which would be an issue if there were zeros).
*/