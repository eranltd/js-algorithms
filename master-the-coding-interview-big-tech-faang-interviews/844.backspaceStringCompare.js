/*
Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.

Example 1:

Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both s and t become "ac".
Example 2:

Input: s = "ab##", t = "c#d#"
Output: true
Explanation: Both s and t become "".
Example 3:

Input: s = "a#c", t = "b"
Output: false
Explanation: s becomes "c" while t becomes "b".

Constraints:

1 <= s.length, t.length <= 200
s and t only contain lowercase letters and '#' characters.
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const backspaceCompare = function (s, t) {
  const buildString = (str) => {
    const result = []
    for (let i = 0; i < str.length; i++) {
      if (str[i] != '#') { result.push(str[i]) } else { result.pop() }
    }

    return result
  }
  // if # occurs, ignore previous char (mark as backspace)
  const leftArr = buildString(s)
  const rightArr = buildString(t)

  if (leftArr.length != rightArr.length) {
    return false
  } else {
    for (let i = 0; i < leftArr.length; i++) {
      if (leftArr[i] != rightArr[i]) { return false }
    }
  }

  return true
}

console.log(backspaceCompare('ab#c', 'ad#c')) // true
console.log(backspaceCompare('ab##', 'c#d#')) // true
console.log(backspaceCompare('a#c', 'b')) // false
console.log(backspaceCompare('a##c', '#a#c')) // true
console.log(backspaceCompare('a#c', 'b')) // false
