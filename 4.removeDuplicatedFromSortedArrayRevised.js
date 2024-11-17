/**
 * Given an integer array nums sorted in non-decreasing order,
 * remove *some* duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums.
More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.
Return k after placing the final result in the first k slots of nums.
Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.

 

Example 1:

Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
Example 2:

Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
 
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    // Initialize the count, k, to be the index at which we insert the next unique element.
    let k = 0;

    // Iterate through each number in the given array.
    for (const current of nums) {
        // If the count is less than 2 or the current number is not equal to
        // the number two places before in the array, it is not a duplicate (or it's
        // the second occurrence of a number that is allowed twice), so we add it to the array.
        if (k < 2 || current !== nums[k - 2]) {
            nums[k] = current;
            k++; // Increment the count since we've added a unique number.
        }
    }

    // Return the new length of the array after duplicates have been removed.
    // Elements after the returned length are considered irrelevant.
    return k;
}

const arr = [0,0,1,1,1,1,2,3,3]
console.log('k=', removeDuplicates(arr)) //[0,0,1,1,1,1,2,3,3] //7
console.log('arr=', (arr)) //[0,0,1,1,1,1,2,3,3] //7

