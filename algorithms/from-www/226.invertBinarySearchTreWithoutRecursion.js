/*Given the root of a binary tree, invert the tree, and return its root.

 

Example 1:


Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
Example 2:


Input: root = [2,1,3]
Output: [2,3,1]
Example 3:

Input: root = []
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100 */

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
 * @return {TreeNode}
 */
var invertTree = function(root) {
    //we will use the queue mechanism to achieve like recursion
    
    if(root === null) return null
    
    // Initialize a queue for Breadth-First Search (BFS).
    // The queue will hold nodes whose children need to be swapped.
    const queue = [root];

    while(queue.length > 0){

      //in-queue first in line

      const currentVisitedNode = queue.shift()

      //swap pointers
      const curr = currentVisitedNode.left
      currentVisitedNode.left = currentVisitedNode.right
      currentVisitedNode.right = curr


      if(currentVisitedNode.left)
        queue.push(currentVisitedNode.left)

      if(currentVisitedNode.right)
        queue.push(currentVisitedNode.right)


    }
  
    return root

    
};

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
  const tree1 = createBinaryTree([4,2,7,1,3,6,9])
  const traversalTree1 = invertTree(tree1)
  console.log(traversalTree1) // [4,7,2,9,6,3,1]
  
  const tree2 = createBinaryTree([2,1,3])
  const traversalTree2 = invertTree(tree2)

  console.log(traversalTree2) //[2,3,1]
  