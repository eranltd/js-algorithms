/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true

 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.

*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = []; //implement using array, use push to tail, and pop from tail LIFO ( Last in first out )
    const closingTags = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    }
    
    if (s.length == 0)
        return true

    const length = s.length
    for(let i=0;i<length;i++){
        
        if(closingTags[s[i]])
            stack.push(s[i])
        else {
            //search for closure
            const pop = stack.pop()
            if(s[i] != closingTags[pop])
                return false
        }        
    }
    return stack.length===0
};


console.log('isValid("()")', isValid("()")); // Output: true
console.log('isValid("()[]{}")', isValid("()[]{}")); // Output: true
console.log('isValid("(]")',isValid("(]")); // Output: false
console.log('isValid("([])")', isValid("([])")); // Output: true
console.log('isValid("([)]")', isValid("([)]")); // Output: false
console.log('isValid("{[]}")', isValid("{[]}")); // Output: true
console.log('isValid("")', isValid("")); // Output: true
console.log('isValid("((")', isValid("((")) ; //Output: false
console.log('isValid("([")', isValid("([")) ; //Output: false