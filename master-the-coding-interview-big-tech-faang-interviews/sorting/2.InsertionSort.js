const unsortedArray = [5, 3, 8, 2, 1, 4]

//
// O(n^2) time complexity
// O(1) space complexity
function InsertionSort (arr) {
  const length = arr.length

  for (let i = 0; i < length; i++) {
    if (arr[i] < arr[0]) {
      // move the current element to the first position
      const removed = arr.splice(i, 1)[0]
      arr.unshift(removed) // put in the first position
    } else {
      // find where the current element should go
      for (let j = 1; j < i; j++) {
        const isSmaller = arr[i] < arr[j]
        if (arr[i] > arr[j - 1] && isSmaller) {
          // move the current element to the right position
          const removed = arr.splice(i, 1)[0] // This line removes one element from the array arr at index i and stores it in the variable removed. The splice method returns an array of removed elements, so [0] is used to get the first (and only) element from that array.
          arr.splice(j, 0, removed) // This line inserts the removed element back into the array arr at index j. The 0 in the splice method indicates that no elements should be removed at the insertion point.
        }
      }
    }
  }

  return arr
}

console.log('unsortedArray', unsortedArray)
const sorted = InsertionSort(unsortedArray)
console.log('sortedArray', sorted)
