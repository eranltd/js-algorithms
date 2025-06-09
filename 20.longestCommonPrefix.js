/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

/*

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

Constraints:

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lowercase English letters.
*/

/**
 * @param {string[]} strs
 * @return {string}
 *
 * Firstly I was very confused about the problem because I have ignored the word "prefix". Prefix means the starting letters of the word.
So if the starting letter of any word in the array will not be matched then we will simply return empty string and if first word will be matched in the every array of strings using every method then we will look for the second word ans so on..
 */
const longestCommonPrefix = function (strs) {
  let output = ''
  for (let i = 0; i < strs[0].length; i++) {
    if (strs.every(str => str[i] === strs[0][i])) output += strs[0][i]
    else break
  }
  return output
}

console.log(longestCommonPrefix(['flower', 'flow', 'flight'])) // "fl"
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])) // ""
console.log(longestCommonPrefix(['a'])) // "a"
console.log(longestCommonPrefix(['a', 'b'])) // ""
console.log(longestCommonPrefix(['a', 'a'])) // "a"
console.log(longestCommonPrefix(['ab', 'a'])) // "a"
console.log(longestCommonPrefix(['ab', 'ac'])) // "a"
