// Given the root of a binary tree, return its maximum depth.
// A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

// Example 1:

// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:

// Input: root = [1,null,2]
// Output: 2

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function (root) {
  if (root === null) return 0

  const leftDepth = maxDepth(root.left)
  const rightDepth = maxDepth(root.right)

  return Math.max(leftDepth, rightDepth) + 1
}

// Node class to represent a binary tree
class TreeNode {
  constructor (val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

/* Helper function to create a binary tree from an array.
 * Each element in the array represents a node in the binary tree.
 * - If the element is `null`, it represents an empty node.
 * - The array is traversed level by level (breadth-first order).
 *
 * @param {Array} arr - The array representing the binary tree.
 *                      Example: [3, 9, 20, null, null, 15, 7]
 *                      corresponds to the tree:
 *                          3
 *                         / \
 *                        9  20
 *                           / \
 *                          15  7
 * @returns {TreeNode|null} - The root node of the binary tree, or `null` if the array is empty.
 */function createBinaryTree (arr) {
  if (!arr.length) return null

  const nodes = arr.map(val => (val !== null ? new TreeNode(val) : null))
  for (let i = 0, j = 1; j < nodes.length; i++) {
    if (nodes[i] !== null) {
      nodes[i].left = nodes[j++] || null
      if (j < nodes.length) {
        nodes[i].right = nodes[j++] || null
      }
    }
  }
  return nodes[0]
}

// Test cases
const tree1 = createBinaryTree([3, 9, 20, null, null, 15, 7])
console.log(maxDepth(tree1)) // Output: 3

const tree2 = createBinaryTree([1, null, 2])
console.log(maxDepth(tree2)) // Output: 2

const tree3 = createBinaryTree([])
console.log(maxDepth(tree3)) // Output: 0
