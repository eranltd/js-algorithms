/*
NOTE: The beginning portion builds our test case linked list. Scroll down to the section titled Our Solution for the code solution!
 */

class ListNode {
  constructor (val, next = null) {
    this.val = val
    this.next = next
  }
}
// ---- Generate our linked list ----
const linkedList = [5, 4, 3, 2, 1].reduce((acc, val) => new ListNode(val, acc), null)

// ---- Generate our linked list ----

const printList = (head) => {
  if (!head) {
    return
  }

  console.log(head.val)
  printList(head.next)
}

// --------- Our solution -----------
// [1] -> [2] -> [3]
// [3] -> [2] -> [1]
const reverseList = function (head) {
  let current = head
  let next = null
  let prev = null

  while (current != null) {
    // at each node
    // save the current node
    // save current node next
    // on the node.next -> point to the current node
    next = current.next // saved
    current.next = prev

    // update prev
    prev = current

    // advance to the next
    current = next
  }

  return prev

  /** F*** Elbit! */
}

printList(linkedList)
console.log('after reverse')
const reversedList = reverseList(linkedList)
printList(reversedList ?? 'oh, you"re empty!')
