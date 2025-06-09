const unsortedArray = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0]

// O(n log n) time complexity

/* slice() -> creates a new array with a portion of elements copied from the original array,
 splice() -> mutates the original array itself by removing, replacing or adding elements to it.

    slice()
    slice(start)
    slice(start, end)

    splice(start)
    splice(start, deleteCount)
    splice(start, deleteCount, item1)
    splice(start, deleteCount, item1, item2)
    splice(start, deleteCount, item1, item2,  …,  itemN)

 */

function mergeSort (arr) {
  const length = arr.length
  if (arr.length === 1) return arr

  // Split array into left and right
  const middle = Math.floor(length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
  const _left = left
  const _right = right
  let result = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < _left.length && rightIndex < _right.length) {
    // put on the left or the the right based on the value
    // fill the result array, and keep track of the smallest, and the next small numbers (bigger)
    if (_left[leftIndex] < _right[rightIndex]) {
      result.push(_left[leftIndex])
      leftIndex++
    } else {
      result.push(_right[rightIndex])
      rightIndex++
    }
  }

  result = result.concat(_left.slice(leftIndex)) // Combines two or more arrays. This method returns a new array without modifying any existing arrays.
  result = result.concat(_right.slice(rightIndex)) // Combines two or more arrays. This method returns a new array without modifying any existing arrays.

  return result
}

console.log('unsortedArray', unsortedArray)
const sorted = mergeSort(unsortedArray)
console.log('sortedArray', sorted)
