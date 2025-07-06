/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
 

Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/

/*
The classic and optimal way to solve this without a full sort is by using the Quickselect algorithm.

The Quickselect Algorithm
Quickselect is a selection algorithm that finds the k-th smallest (or largest) element in an unordered list. It's related to the Quicksort algorithm, but it's faster on average because it only recurses on one side of the partition.

Here's the high-level idea:

Choose a Pivot: Pick an element from the array. This element is the "pivot".
Partition: Rearrange the array into two parts: elements smaller than the pivot and elements larger than the pivot. After this step, the pivot is in its final, correct sorted position.
Compare and Recurse:
If the pivot's final position is the same as the k-th position we're looking for, we've found our answer!
If the k-th position is to the left of the pivot, we only need to repeat the process on the left subarray.
If the k-th position is to the right of the pivot, we only need to repeat the process on the right subarray.
This "divide and conquer" approach avoids sorting the entire array and has an average time complexity of O(n).
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function (nums, k) {
  // The k-th largest element is at index (nums.length - k) in a zero-indexed, sorted array.
  const targetIndex = nums.length - k

  /**
   * Partitions the array around a pivot and recursively searches in the correct partition.
   * @param {number} left - The starting index of the subarray.
   * @param {number} right - The ending index of the subarray.
   * @returns {number} The k-th largest element.
   */
  function quickSelect (left, right) {
    // Choose the rightmost element as the pivot.
    const pivotValue = nums[right]
    let partitionIndex = left // This will be the final position of the pivot.

    // Move all elements smaller than the pivot to the left of the partitionIndex.
    for (let i = left; i < right; i++) {
      if (nums[i] < pivotValue) {
        // Swap elements
        [nums[i], nums[partitionIndex]] = [nums[partitionIndex], nums[i]]
        partitionIndex++
      }
    }

    // Place the pivot in its correct sorted position.
    [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]]

    // Now, the pivot is at `partitionIndex`.
    // Check if this is the element we are looking for.
    if (partitionIndex === targetIndex) {
      return nums[partitionIndex]
    } else if (partitionIndex < targetIndex) {
      // The target element is in the right partition.
      return quickSelect(partitionIndex + 1, right)
    } else {
      // The target element is in the left partition.
      return quickSelect(left, partitionIndex - 1)
    }
  }

  return quickSelect(0, nums.length - 1)
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)) // Output: 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)) // Output: 4
console.log(findKthLargest([1], 1)) // Output: 1
console.log(findKthLargest([7, 6, 5, 4, 3, 2, 1], 5)) // Output: 3
console.log(findKthLargest([99, 99], 1)) // Output: 99
