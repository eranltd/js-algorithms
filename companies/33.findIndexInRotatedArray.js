/*

There is an integer array nums sorted in ascending order (with distinct values).
Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length)
such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).

For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.
    

Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Example 2:

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1
 

Constraints:

1 <= nums.length <= 5000
-104 <= nums[i] <= 104
All values of nums are unique.
nums is an ascending array that is possibly rotated.
-104 <= target <= 104
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) { 
    //Binary search implementation

    let low = 0;
    let high = nums.length - 1

    while(low <= high){
        let mid = Math.floor((low + high) / 2)
    
        //check middle
        if (nums[mid] === target) {
            return mid;
        }


        //cause it is rotated, it is not a classical binary search
        //check the lower half of the array
        if(nums[low] <= nums[mid]){
            if(nums[low] <= target && target < nums[mid]){
                high = mid - 1
            }
            else{
                low = mid+1
            }

        }


        //check the right half of the array
        else{ 

            if(nums[mid] < target && target <= nums[high]){
               low = mid +1
            }
            else{
                high = mid - 1
            }


        }


    
    
    }

    return -1

};
console.log(search([4,5,6,7,0,1,2], 0)); // Output: 4
console.log(search([4,5,6,7,0,1,2], 3)); // Output: -1
console.log(search([1], 0)); // Output: -1


/*
This implementation differs from a regular binary search because it is designed to handle rotated sorted arrays, which are arrays that were originally sorted but then rotated at some pivot point. For example, [4, 5, 6, 7, 0, 1, 2] is a rotated version of [0, 1, 2, 4, 5, 6, 7].

Key Differences:
Rotated Array Structure:

In a regular binary search, the array is fully sorted, so you can directly compare the middle element (nums[mid]) with the target to decide whether to search the left or right half.
In a rotated array, the sorted order is "broken" at the pivot point. This means that one half of the array (either left or right) is still sorted, while the other half may contain the rotation. You need to account for this when deciding which half to search.
Additional Checks:

The code includes extra checks to determine whether the target lies in the sorted half of the array. Specifically:
If nums[low] <= nums[mid], the left half is sorted. The target is checked to see if it lies within this range (nums[low] <= target < nums[mid]).
Otherwise, the right half is sorted, and the target is checked against that range (nums[mid] < target <= nums[high]).
Handling the Rotation:

The rotation introduces a discontinuity in the array, so the algorithm must first identify which half is sorted before deciding where to search. This is why the conditions nums[low] <= nums[mid] and nums[mid] < nums[high] are used.
Why This Works:
The rotated array still retains some properties of a sorted array:

At least one half (left or right) of the array is always sorted.
By identifying the sorted half, the algorithm can narrow down the search space effectively, just like in a regular binary search.
Example Walkthrough:
Consider the array [4, 5, 6, 7, 0, 1, 2] and target 0:

Start with low = 0, high = 6, and calculate mid = 3 (nums[mid] = 7).

The left half [4, 5, 6, 7] is sorted (nums[low] <= nums[mid]).
Since 0 is not in the range [4, 7], search the right half (low = mid + 1).
Update low = 4, high = 6, and calculate mid = 5 (nums[mid] = 1).

The right half [0, 1, 2] is sorted (nums[mid] < nums[high]).
Since 0 is in the range [0, 1], search the left half (high = mid - 1).
Update low = 4, high = 4, and calculate mid = 4 (nums[mid] = 0).

The target is found at index 4.

Summary:
The key difference is that this algorithm accounts for the rotation by identifying the sorted half of the array at each step, whereas a regular binary search assumes the entire array is sorted. This makes it effective for rotated arrays while retaining the efficiency of binary search (O(log n) complexity).
*/
