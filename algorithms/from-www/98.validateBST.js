/*
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [2,1,3]
Output: true

Example 2:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1

*/

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
 * @return {boolean}
 */
const isValidBST = function (root) {
  const currrentValue = root ? root.val : null
  const leftValue = root && root.left ? root.left.val : null
  const rightValue = root && root.right ? root.right.val : null

  if (root === null) return true
  if (currrentValue > rightValue) return false
  else if (currrentValue < rightValue) return true
  if (currrentValue < leftValue) return false
  else if (currrentValue > leftValue) { return isValidBST(root.left) && isValidBST(root.right) }
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
const tree1 = createBinaryTree([2, 1, 3])
console.log(isValidBST(tree1)) // true

const tree2 = createBinaryTree([5, 1, 4, null, null, 3, 6])
console.log(isValidBST(tree2)) // false
