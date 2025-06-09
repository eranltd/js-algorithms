/*
Given a string s, find the length of the longest
substring
 without repeating characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

/**
 * @param {string} s
 * @return {number}
 */

const lengthOfLongestSubstring = function (s) {
  if (s.length <= 1) return s.length // constraint

  const seen = {}
  let left = 0
  let longest = 0

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right]
    const previouslySeenChar = seen[currentChar]

    if (previouslySeenChar >= left) {
      left = previouslySeenChar + 1
    }

    seen[currentChar] = right

    longest = Math.max(longest, right - left + 1)
  }

  return longest
}

console.log(lengthOfLongestSubstring('abcabcbb')) // 3
console.log(lengthOfLongestSubstring('bbbbb')) // 1
console.log(lengthOfLongestSubstring('pwwkew')) // 3
console.log(lengthOfLongestSubstring('')) // 0
console.log(lengthOfLongestSubstring(' ')) // 1
console.log(lengthOfLongestSubstring('au')) // 2
