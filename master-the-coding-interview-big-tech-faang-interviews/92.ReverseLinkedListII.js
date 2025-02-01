/*
NOTE: The beginning portion builds our test case linked list. Scroll down to the section titled Our Solution for the code solution!
 */

class ListNode {
    constructor(val, next = null) {
      this.val = val;
      this.next = next;
    }
  }

  // ---- Generate our linked list ----
  
  const printList = (head) => {
    if(!head) {
      return;
    }
  
    console.log(head.val);
    printList(head.next);
  }

  /*
  Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 

Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]
 

Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n
*/

  
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
   
  //go over and find left and left-1

  //this linkedlist is ordered.
  //1 << left << right << 500
  let currentNode = head
  let start = head
  let currentPos = 1

  while(currentPos < left){
    start = currentNode
    currentNode = currentNode.next
    currentPos++
  }

  let prev = null, tail = currentNode

  //reversing section

  while(currentPos >=left && currentPos <= right){
    const next = currentNode.next
    currentNode.next = prev
    prev = currentNode
    currentNode = next
    currentPos++
  }

  start.next = prev
  tail.next = currentNode


  if(left > 1) {
    return head
  } else {
    return prev;
  }
};


//   // ---- Generate our linked list ----
  const linkedList = [5, 4, 3, 2, 1].reduce((acc, val) => new ListNode(val, acc), null);
  printList(linkedList); //before
  console.log('after reverseBetween')
  const reversedList = reverseBetween(linkedList,2,4);
  printList(reversedList ?? 'oh, you"re empty!');

// 


