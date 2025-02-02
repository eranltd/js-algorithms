/*
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

 

Example 1:


Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
Example 2:


Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.
Example 3:


Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.
 

Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.
*/




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
const linkedList = [8,7,6,5,4,3,2,1].reduce((acc, val) => new ListNode(val, acc), null);

let curr = linkedList, cycleNode;
while(curr.next !== null) {
  if(curr.val === 3) {
    cycleNode = curr;
  }

  curr = curr.next;
}

curr.next = cycleNode;
// ---- Generate our linked list ----

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var detectCycle = function(head) {
//   const seenNodes = new Set();
//   let currentNode = head;

// while(!seenNodes.has(currentNode)) {
//   if(currentNode.next === null) {
//     return false;
//   }

//   seenNodes.add(currentNode);
//   currentNode = currentNode.next;
// }

// return currentNode.val;
// };

var detectCycle = function(head) {

  let slow = head
  let fast = head

  while(fast!=null && fast.next !=null && fast.next.next!=null){
    //move by 1 each time
    slow = slow.next
    // Move fast pointer twice as fast as slow pointer and if there is a cycle, the fast will eventually meet slow at a node in the cycle but not necessarily the node that starts the cycle
    fast = fast.next.next

    // Once we determine there is a cycle we must find where the cycle starts
    if(slow === fast){
      console.log('cycle detected')
      // Move slow pointer to the head
      slow = head
      while(slow != fast){ //find the start of the cycle
        slow = slow.next
        fast = fast.next
      }
      return slow //cycle starts at this node.
    }
  }



  return null
}


console.log(detectCycle(linkedList)); // 3
