/*
You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:

2 --> 4 --> 3
5 --> 6 --> 4

Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode();
    let current = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;
        let sum = val1 + val2 + carry;

        console.log(`Adding: ${val1} + ${val2} + ${carry} = ${sum}`);

        carry = Math.floor(sum / 10);

        console.log(`New carry: ${carry}`);
        console.log(`Current digit to add: ${sum % 10}`);
        let newNode = new ListNode(sum % 10);
        current.next = newNode;
        current = newNode;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummy.next;
};

class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let num of arr) {
        current.next = new ListNode(num);
        current = current.next;
    }
    return dummy.next;
}

// Helper function to print a linked list as an array
function printLinkedList(head) {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Example 1
let l1_example1 = createLinkedList([5, 7, 8]);
let l2_example1 = createLinkedList([5, 7, 4]);
console.log("Example 1 Input l1:", printLinkedList(l1_example1));
console.log("Example 1 Input l2:", printLinkedList(l2_example1));

// // Example 2
// let l1_example2 = createLinkedList([0]);
// let l2_example2 = createLinkedList([0]);
// console.log("Example 2 Input l1:", printLinkedList(l1_example2));
// console.log("Example 2 Input l2:", printLinkedList(l2_example2));

// // Example 3
// let l1_example3 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
// let l2_example3 = createLinkedList([9, 9, 9, 9]);
// console.log("Example 3 Input l1:", printLinkedList(l1_example3));
// console.log("Example 3 Input l2:", printLinkedList(l2_example3));

console.log("Example 1 Output:", printLinkedList(addTwoNumbers(l1_example1, l2_example1)));
// console.log("Example 2 Output:", printLinkedList(addTwoNumbers(l1_example2, l2_example2)));
// console.log("Example 3 Output:", printLinkedList(addTwoNumbers(l1_example3, l2_example3)));
