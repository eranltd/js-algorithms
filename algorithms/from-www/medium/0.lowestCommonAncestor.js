/*
Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”

        _______6______
       /              \
    ___2__          ___8__
   /      \        /      \
   0      _4       7       9
         /  \
         3   5
For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6.
Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
*/

// A binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.
// Left child is always less than it's parent and the right child is always bigger than it's parent.

// Recursive JavaScript program to print lca of two nodes

// A binary tree node
class Node {
  constructor (item) {
    this.data = item
    this.left = this.right = null
  }
}

let root

function lca (node, n1, n2) {
  if (node == null) { return null }

  // If both n1 and n2 are smaller than root,
  // then LCA lies in left
  if (node.data > n1 && node.data > n2) { return lca(node.left, n1, n2) }

  // If both n1 and n2 are greater than root,
  // then LCA lies in right
  if (node.data < n1 && node.data < n2) { return lca(node.right, n1, n2) }

  return node
}

/*      _______6______
       /              \
    ___2__          ___8__
   /      \        /      \
   0      _4       7       9
         /  \
         3   5
*/
/* Driver program to test lca() */
// Let us construct the BST shown in the above figure
root = new Node(6)
root.left = new Node(2)
root.right = new Node(8)
root.right.left = new Node(8)
root.right.left = new Node(9)
root.left.left = new Node(0)
root.left.right = new Node(4)
root.left.right.left = new Node(3)
root.left.right.right = new Node(5)

const n1 = 0; const n2 = 5
const t = lca(root, n1, n2)
console.log('LCA of ' + n1 + ' and ' + n2 + ' is ' + t.data)
