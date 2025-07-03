/*
Problem Description
The task is to find the *longest* valid password from a string containing words separated by spaces. (0-n chars)
Return the longest word that is a valid password

A valid password must meet these criteria:
    It consists only of alphanumeric characters (a-z, A-Z, 0-9).
    It contains an even number of letters.
    It contains an odd number of digits.
    If no valid password exists, return -1.
*/

/**
 * Reminder : Types of for loops in JavaScript
 *
 * 1.for...of loop:  for (const object of collection)  :This loop iterates over the values of an iterable object (e.g., arrays, strings, maps, sets).
 * 2.for...in loop:  for (variable in object) :This loop iterates over the properties of an object.
 * 3.for(let i=0;i<100;i++)
 * 4.array.forEach(function(currentValue, index, arr) { // code to be executed }); : This is a method that is used to iterate over the elements of an array.
 * while
 * do..while
 * continue
 */

const checkDigit = (char) => {
  return char >= '0' && char <= '9'
}

const checkIsLetter = (char) => {
  return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z'
}

const checkAlphanumeric = (char) => {
  return checkIsLetter(char) || checkDigit(char)
}

const isValidWord = (word) => {
  let letterCount = 0
  let digitsCount = 0

  word.forEach(char => {
    const isDigit = checkDigit(char)
    const isLetter = checkIsLetter(char)
    if (isDigit) { digitsCount++ }

    if (isLetter) { letterCount++ }

    if (!isDigit || !isLetter) { return false }
  })

  return digitsCount % 2 != 0 && letterCount % 2 == 0
}

function longestPassword (s) {
  // example string: "test 5 a0A pass007 ? xy1";

  // there is not need to store words, only the longest length

  // Step 1: break into words and check constraints against each word:
  let maxLength = -1
  const wordsToCheck = s.split(' ')
  for (const word of wordsToCheck) {
    if (isValidWord) {
      maxLength = Math.max(maxLength, word.length)
    }
  }

  return maxLength
}

/*
Explanation:

solution(S) Function:
    Splits the input string S into an array of words using spaces as delimiters.
    Initializes maxLength to -1 (default if no valid password found).
    Iterates through each word in the words array.
    If a word is a valid password (checked using isValidPassword), it updates maxLength if the word's length is greater.
    Returns the maxLength.

isValidPassword(word) Function:
    Initializes letterCount and digitCount to 0.
    Iterates through each character char in the word.
    If a character is not alphanumeric (isAlphaNumeric), it returns false immediately.
    Increments letterCount if the character is a letter (isLetter).
    Increments digitCount if the character is a digit (isDigit).
    Returns true if the letter count is even and the digit count is odd; otherwise, returns false.

Helper Functions:
    isAlphaNumeric(char): Checks if a character is alphanumeric.
    isLetter(char): Checks if a character is a letter.
    isDigit(char): Checks if a character is a digit.
*/

/* Example usage: */

const inputString = 'test 5 a0A pass007 ? xy1'
const anotherInput = 'nfjdk a90d sdnfjk73829 NJKS!mdkjld'

console.log(`Testing longest password per word for: [${inputString}]`, longestPassword(inputString)) // Output: 7
console.log(`Testing longest password per word for: [${anotherInput}]`, longestPassword(anotherInput)) // Output: 11
