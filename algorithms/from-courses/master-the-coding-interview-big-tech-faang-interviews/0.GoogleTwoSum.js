const nums = [1, 3, 7, 9, 2]
const target = 11

// two pointers
const twoSum = (nums, target) => {
  let p1 = 0
  let p2 = 0

  const loopBoundry = nums.length
  for (let i = 0; i < loopBoundry; i++) {
    p1 = i
    p2 = i
    while (p2 < loopBoundry) {
      if (nums[p2] === target - nums[p1]) {
        return [p1, p2]
      }
      p2++
    }
  }

  return null
}

// using map
const twoSumOptimized = (nums, target) => {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    // we have the completment at every step

  }
}

console.log(twoSum(nums, target)) // 3,4
