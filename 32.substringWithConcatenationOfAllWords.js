/*
You are given a string s and an array of strings words. All the strings of words are of the same length.
A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.


Example 1:

    Input: s = "barfoothefoobarman", words = ["foo","bar"]

    Output: [0,9]

Explanation:

    The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
    The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

Example 2:

    Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

    Output: []

Explanation:

    There is no concatenated substring.

Example 3:

    Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

    Output: [6,9,12]

Explanation:

    The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
    The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
    The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].

 

Constraints:

    1 <= s.length <= 104
    1 <= words.length <= 5000
    1 <= words[i].length <= 30
    s and words[i] consist of lowercase English letters.
*/
/*

Solution:

    Intuition:
        This solution uses a sliding window approach combined with hash maps to solve the problem.
        First, count the occurrences of each word in the 'words' array.
        Next, iterate through all possible starting positions in the string 's'.
        For each starting position, check if we can form a valid concatenation of all words.
        Use a hash map to keep track of the words we've seen in the current window.
        If we successfully match all words, add the starting index to our result.

        This algorithm efficiently finds all starting indices of substrings in s that are concatenations of all words in the given array.

    Approach:
        If 'length of s' is equal to 0 OR 'length of words' is equal to 0, return empty array.
        Set (result) to empty array.
        Set (wordLength) to 'words[0].length'.
        Set (totalLength) to 'wordLength * words.length'.
        Set (wordCount) to empty hash map.
        For word of words, set (wordCount[word]) to '(wordCount[word] || 0) + 1'.
            For i from 0 to 'length of s - totalLength', set (seenWords) to empty hash map.
            Create a variable 'j'. For j from 0 to 'length of words - 1', set (start) to 'i + j * wordLength'.
        Set (word) to 's.slice(start, start + wordLength)'.
        If word is NOT in wordCount, break.
        Set (seenWords[word]) to '(seenWords[word] || 0) + 1'.
        If 'seenWords[word]' is greater than 'wordCount[word]', break.
        If 'j' is equal to 'length of words', push (i) to 'result'. Return result.

        We use a sliding window approach to check all possible starting positions. We use hash maps to efficiently count and compare word occurrences. We utilize the fact that all words have the same length. We break out of the inner loop as soon as we find an invalid word or count.
*/
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) { //Input: s = "barfoothefoobarman", words = ["foo","bar"]
    
    const numberOfWords = words.length;
    
    if (s.length === 0 || numberOfWords === 0) return [];
    
    const wordLength = words[0].length; //all of the words are within the same length
    const totalLength = wordLength * numberOfWords;
    
    const wordCount = {};
    const result = []; //will hold occurrences of the start of the substring
    
    // Count occurrences of each word
    for (const word of words) {
        if (wordCount[word] == null) {
            wordCount[word] = 0;
        }
        wordCount[word]++;
    }
    
    // Check each possible starting position
    const outerLoopRunningCount = s.length - totalLength;
    for (let i = 0; i <= outerLoopRunningCount; i++) {
        const seenWords = {};
        let isValid = true;

        for (let j = 0; j < numberOfWords; j++) {
            const start = i + j * wordLength;
            const word = s.slice(start, start + wordLength);

            if (!(word in wordCount)) {
                isValid = false;
                break;
            }

            seenWords[word] = (seenWords[word] ?? 0) + 1;

            if (seenWords[word] > wordCount[word]) {
                isValid = false;
                break;
            }
        }

        if (isValid) result.push(i);
    }
    
    return result;
    
};

console.log(findSubstring("barfoothefoobarman", ["foo","bar"])) // [0,9]
console.log(findSubstring("wordgoodgoodgoodbestword", ["word","good","best","word"])) // []
console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])) // [6,9,12]
console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])) // [6,9,12]
console.log(findSubstring("barfoofoobarthefoobarman", ["bar","foo","the"])) // [6,9,12]