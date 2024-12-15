/*
Seven different symbols represent Roman numerals with the following values:

Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).
Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.
Given an integer, convert it to a Roman numeral.

 

Example 1:

Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
Example 2:

Input: num = 58

Output: "LVIII"

Explanation:

50 = L
 8 = VIII
Example 3:

Input: num = 1994

Output: "MCMXCIV"

Explanation:

1000 = M
 900 = CM
  90 = XC
   4 = IV
 

Constraints:

1 <= num <= 3999
*/


/**
 * Another solution
 *     # Result string
    result = ''
    
    # Iterate over the mapping in descending order
    for integer, roman in mapping.items():
        # Check if the current integer value is less than or equal to the given number
        while num >= integer:
            # Add the corresponding roman numeral to the result string and subtract the integer value from the given number
            result += roman
            num -= integer
            
    # Return the result string
    return result
    
 * var intToRoman = function(num) {
    
    // create an empty string to store the roman numeral
    var roman = "";
    
    // create an array of all the decimal values that correspond to a roman numeral
    var decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
    
    // create an array of all the roman numerals
    var romanNumeral = [ "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I" ];
    
    // loop through the decimal values array
    for (var index = 0; index < decimalValue.length; index++) {
        // while the decimal value at the current index is less than or equal to the number passed into the function
        while (decimalValue[index] <= num) {
            // add the roman numeral at the current index to our roman numeral string
            roman += romanNumeral[index];
            // subtract the decimal value at the current index from the number passed into the function
            num -= decimalValue[index];
        }
    }
    
    // return the completed roman numeral string
    return roman;
};
 */



/**
 * The main algorithm is using the division num by map[key] and modulus operator.
 * The division tells us how many particular symbols do we need to repeat.
 * And the modulus operator helps us to change the num.

 * const intToRoman = function (num) {
  let result = '';
  const map = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  for (key in map) {
    result += key.repeat(Math.floor(num / map[key]));
    num %= map[key];
  }

  return result;
};
 */



/**
 * @param {number} num
 * @return {string}
 * Solution #3: Math
    This incredibly concise solution comes from LeetCode, and uses just a little bit of math to get the job done.
    The way it works is that it first initialises every combination of letters for each level of numeral (1, 10, 100, 1,000) in an array which starts with an empty value. Then, it calculates which array element to apply based on the modulo and / or division of the overall number by the relevant level (the exact path differs by level). The inclusion of the empty first element handles cases where the number is lower than that level (such as 500 being lower than the 1,000 level)
    I’d say it’s a little less readable than the others, but it’s certainly elegant:
 */
var intToRoman = function(num) {
    const M = ['', 'M', 'MM', 'MMM'];
    const C = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];
    const X = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];
    const I = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

    return (
        M[Math.floor(num / 1000)] +
        C[Math.floor((num % 1000) / 100)] +
        X[Math.floor((num % 100) / 10)] +
        I[num % 10]
    );
};

console.log(intToRoman(3749)); // "MMMDCCXLIX"
console.log(intToRoman(58)); // "LVIII"
console.log(intToRoman(1994)); // "MCMXCIV"
