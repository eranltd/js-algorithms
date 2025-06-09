const unsortedArray = [5, 3, 8, 2, 1, 4]

// find min at each iteration and swap with the current element
// O(n^2) time complexity
// O(1) space complexity
function SelectionSort (arr) {
  const length = arr.length
  for (let i = 0; i < length - 1; i++) {
    let min = i
    const temp = arr[i]

    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[min]) {
        // Update minimum if current is lower that what we had previously
        min = j
      }
    }

    // swap here
    arr[i] = arr[min]
    arr[min] = temp
  }
  return arr
}

console.log('unsortedArray', unsortedArray)
const sorted = SelectionSort(unsortedArray)
console.log('sortedArray', sorted)
