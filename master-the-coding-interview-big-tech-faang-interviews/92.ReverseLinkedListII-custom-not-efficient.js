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


  //[1] -> [2] -> [3]
  //[3] -> [2] -> [1]
  var reverseList = function(head, tail) {
    
    let current = head
    let next = null
    let prev = null
    while(current !=null && current.val != tail){
        //save previous next
        next = current.next
        current.next = prev
        prev = current
        current = next //advance by 1
    }
    return prev.next //why - investigate this line here

  };
  
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
      //[1] -> [2] -> [3] -> [4] -> [5] //left =2, right = 4
      //[1] -> [4] -> [3] -> [2] -> [5] //answer

    //we need to find boundaries
    //when left is achieved  ?
    //when right is achieved ?
    //reverse list within left and right ?
    //save pointers of two edges ? (before left and after right ?)
    //combine everything together

    let originalHead = null
    let originalTail = null
    let current = head
    let prev = null
    let start = null
    let end = null
    //find start and end of the sub-list

    while(current != null){
        
        if(originalHead!=null && originalTail!=null) break;
        if(left == current.val){
            originalHead = prev
            start = current
        }

        if(right == current.val){
            originalTail = current.next
            end = current
        }
        next = current.next
        prev = current
        current = next
         
    }

    let copyTail = {val: originalTail.val, next:originalTail.next}
    const subList = reverseList(start, end)
  
    originalHead.next = subList

    let prev2 = null
    let current2 = subList
    while(current2!=null){
        prev2 = current2
        current2 = current2.next
    }

    prev2.next = copyTail   

    return head
    //now the middle is reversed, but what about the next pointers ?
};


//   // ---- Generate our linked list ----
//   const linkedList = [5, 4, 3, 2, 1].reduce((acc, val) => new ListNode(val, acc), null);
  
//   printList(linkedList); //before
//   console.log('after reverseBetween')
//   const reversedList = reverseBetween(linkedList,2,4);
//   printList(reversedList ?? 'oh, you"re empty!');

// 


