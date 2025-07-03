/** Implement sum(5)(4) function */

const sum = (x) => (y) => x + y
console.log('sum(5)(4)', sum(5)(4))

/** Implement every and some using negate(isTrue(5)) => returns !5 */

const biggerThan = (x) => x >= 5
const negate = (fn) => (...args) => !fn(...args)

// implement every
const every = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (!fn(arr[i])) {
      return false
    }
  }
  return true
}
// implement some
const some = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return true
    }
  }
  return false
}

// implement every using some and negate
const every2 = (arr, fn) => !some(arr, negate(fn))
console.log('every([5,6,7,8], biggerThan)', every([5, 6, 7, 8], biggerThan)) // true
console.log('every2([5,6,7,8], biggerThan)', every2([5, 6, 7, 8], biggerThan)) // true

/** Implement lowestCommonAncestor -> checkout 0.lowestCommonAncestor.js */
