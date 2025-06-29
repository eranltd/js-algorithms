/*
NOTE: The beginning portion builds our test case linked list. Scroll down to the section titled Our Solution for the code solution!
 */

class ListNode {
  constructor (val, next = null, prev = null, child = null) {
    this.val = val
    this.next = next
    this.prev = prev
    this.child = child
  }
}

// ---- Generate our linked list ----
const nodes = [1, [2, 7, [8, 10, 11], 9], 3, 4, [5, 12, 13], 6]

const buildMultiLevel = function (nodes) {
  const head = new ListNode(nodes[0])
  let currentNode = head

  for (let i = 1; i < nodes.length; i++) {
    const val = nodes[i]
    let nextNode

    if (Array.isArray(val)) {
      nextNode = buildMultiLevel(val)
      currentNode.child = nextNode
      continue
    }

    nextNode = new ListNode(val)
    currentNode.next = nextNode
    nextNode.prev = currentNode
    currentNode = nextNode
  }

  return head
}

const multiLinkedList = buildMultiLevel(nodes)

// ---- Generate our linked list ----

const printListMulti = head => {
  if (!head) {
    return
  }

  console.log(head.val)

  if (head.child) {
    printListMulti(head.child)
  }

  printListMulti(head.next)
}

const printList = head => {
  if (!head) {
    return
  }

  console.log(head.val)

  printList(head.next)
}

// --------- Our solution -----------
// Remember: each node has prev,next, child
const flatten = function (head) {
  if (!head) return head

  let currentNode = head
  while (currentNode != null) {
    if (currentNode.child === null) { // without child
      currentNode = currentNode.next
    } else { // with child
      let tail = currentNode.child // start
      while (tail.next != null) { // finding tail
        tail = tail.next
      }

      tail.next = currentNode.next // connecting sub list to the original nodes
      if (tail.next != null) {
        tail.next.prev = tail
      }
      // connecting the edges
      currentNode.child.prev = currentNode
      currentNode.next = currentNode.child
      currentNode.child = null
    }
  }

  return head
}

printListMulti(multiLinkedList)
console.log('after flatten')
printList(flatten(multiLinkedList))
