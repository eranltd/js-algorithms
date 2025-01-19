/*
Given a string s, return true if the s can be palindrome after deleting at most one character from it.

 

Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.






*/

const validSubPalindrom = (str,l,r) =>{
    let left = l , right = r ;

    while(left!=right){
        if(str[left] != str[right]){
            return false
        }

        left++
        right--
    }

    return true
} 
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(str, l, r ) {
    const cleanedStr = str.toLowerCase().replace(/[^0-9A-Za-z]/g, "");
    let left =  0, right = cleanedStr.length-1;

    while(left!=right){
        if(cleanedStr[left] != cleanedStr[right]){
            return validSubPalindrom(cleanedStr, left+1, right) || validSubPalindrom(cleanedStr,left,right+1)
        }

        left++
        right--
    }

    return true
    
};



console.log(validPalindrome("abccdba")) //true
console.log(validPalindrome("abcdefdba")) //false
console.log(validPalindrome("abc")) //false
console.log(validPalindrome("abca")) //true
console.log(validPalindrome("aba")) //true

