/*
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);

Example 1:

Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"
Example 2:

Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
Example 3:

Input: s = "A", numRows = 1
Output: "A"

https://dev.to/alisabaj/the-zigzag-conversion-problem-3nne
https://www.youtube.com/watch?v=ZigwSsLqBwA
https://leetcode.com/problems/zigzag-conversion/

Constraints:

1 <= s.length <= 1000
s consists of English letters (lower-case and upper-case), ',' and '.'.
1 <= numRows <= 1000
*/

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function (s, numRows) {
  if (numRows === 1 || s.length < numRows) {
    return s
  }
  const rows = []
  let currentRow = 0
  let reverse = false
  let result = ''

  for (let i = 0; i < numRows; i++) {
    rows[i] = []
  }

  for (let i = 0; i < s.length; i++) {
    rows[currentRow].push(s[i])
    if (reverse === false) {
      currentRow++
    } else {
      currentRow--
    }

    if (currentRow === numRows - 1 || currentRow === 0) {
      reverse = !reverse
    }
  }

  rows.forEach((row) => {
    result += row.join('')
  })

  return result
}

console.log(convert('PAYPALISHIRING', 3)) // "PAHNAPLSIIGYIR"
console.log(convert('PAYPALISHIRING', 4)) // "PINALSIGYAHRPI"
console.log(convert('A', 1)) // "A"
console.log(convert('AB', 1)) // "AB"
console.log(convert('ABC', 1)) // "ABC"
console.log(convert('ABCD', 1)) // "ABCD"
console.log(convert('ABCDE', 1)) // "ABCDE"
console.log(convert('ABCDEF', 1)) // "ABCDEF"
