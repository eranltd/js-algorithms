/*
Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:

Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
Example 2:

Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.

Constraints:

1 <= haystack.length, needle.length <= 104
haystack and needle consist of only lowercase English characters.
*/

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 * For those who want some humor, you can submit this as a valid solution, but that's not the point of this problem. Just note that we are implementing strStr (in C) or indexOf in Java and JavaScript.

var strStr = (haystack, needle) => haystack.indexOf(needle);
Also, it's not O(1), it depends on the implementation of indexOf which is basically the function we are recreating.

The point of the problem is to implement it without using any String functions. While you're just implementing something that's already implemented, this is to show case your fundamentals of programming with strings and arrays using their bare structures.
 */
const strStr = function (haystack, needle) {
  if (haystack.length >= needle.length) {
    let j
    for (let i = 0; i < haystack.length; i++) {
      for (j = 0; j < needle.length; j++) {
        if (needle[j] !== haystack[i + j]) break
      }
      if (j === needle.length) return i
    }
  }
  return -1
}

console.log(strStr('sadbutsad', 'sad')) // 0
console.log(strStr('leetcode', 'leeto')) // -1
console.log(strStr('a', 'a')) // 0
console.log(strStr('a', 'b')) // -1
console.log(strStr('a', '')) // 0
console.log(strStr('', 'a')) // -1
console.log(strStr('', '')) // 0
