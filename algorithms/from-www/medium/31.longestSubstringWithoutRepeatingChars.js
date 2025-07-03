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
  // If the string is empty or has one character, the longest substring is the string itself.
  if (s.length <= 1) return s.length

  // 'seen' stores the last index where we saw each character.
  const seen = {}
  // 'left' is the starting index of our current window.
  let left = 0
  // 'longest' stores the maximum length found so far.
  let longest = 0

  // 'right' is the ending index of our current window. We expand the window by moving it.
  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right]
    const previouslySeenChar = seen[currentChar]

    // If we have seen the currentChar before AND its last position is inside our current window...
    if (previouslySeenChar >= left) { //The if (previouslySeenChar >= left) check is the most brilliant part. It ensures we only slide the window if the character we've seen before is part of our current window.
      // ...then we must "slide" the window's start to be right after that last position.
      left = previouslySeenChar + 1
    }

    // Update the last seen position of the current character.
    seen[currentChar] = right

    // Check if the current window's length is the new longest.
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
