/**
 * Count the number of nodes in a complete binary tree.
 * Definition of a complete binary tree from Wikipedia:
 * In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.
 * It can have between 1 and 2h nodes inclusive at the last level h.
 */


/*
NOTE: The beginning portion builds our test case binary tree. Scroll down to the section titled Our Solution for the code solution!
 */

// ------- Code to generate our binary tree -------
class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  
    insert(values) {
      const queue = [this];
      let i = 0;
      while (queue.length > 0) {
        let current = queue.shift();
        for (let side of ["left", "right"]) {
          if (!current[side]) {
            if (values[i] !== null) {
              current[side] = new TreeNode(values[i]);
            }
            i++;
            if (i >= values.length) return this;
          }
          if (current[side]) queue.push(current[side]);
        }
      }
      return this;
    }
  }
  
  const tree = new TreeNode();
  tree.insert([1,1,1,1,1,1,1,1,1,1,1, null, null, null]);
  
  // ------- Code to generate our binary tree -------
  
  // ------- Our Solution -------
  
  
/**
 * Calculates the height of a binary tree by traversing the leftmost path.
 * Calculates at O(log(n)) time complexity since we are traversing the leftmost path.
 * @param {TreeNode} root - The root node of the binary tree.
 * @returns {number} The height of the tree, where height is the number of edges 
 *                   on the longest path from the root to the deepest leaf node.
 */
  const getTreeHeight = function(root) {
    let height = 0;
    while(root.left !== null) {
      height++;
      root = root.left;
    }
    
    return height;
  }
  
/**
 * Determines if a node exists at a given index in the last level of a complete binary tree.
 *
 * @param {number} idxToFind - The index of the node to find in the last level (0-based).
 * @param {number} height - The height of the tree (number of levels excluding the root level).
 * @param {Object} node - The root node of the binary tree.
 * @param {Object} node.left - The left child of the current node.
 * @param {Object} node.right - The right child of the current node.
 * @returns {boolean} - Returns true if the node exists at the specified index, otherwise false.
 */
  const nodeExists = function(idxToFind, height, node) {
    let left = 0, right = Math.pow(2, height) - 1, count = 0;
    
    while(count < height) {
      const midOfNode = Math.ceil((left + right) / 2);
      
      if(idxToFind >= midOfNode) {
        node = node.right;
        left = midOfNode;
      } else {
        node = node.left;
        right = midOfNode - 1;
      }
      
      count++;
    }
    
    return node !== null;
  }
  
/**
 * Counts the number of nodes in a complete binary tree.
 *
 * A complete binary tree is a binary tree in which every level, except possibly the last, 
 * is completely filled, and all nodes are as far left as possible.
 *
 * @param {TreeNode} root - The root node of the binary tree.
 * @returns {number} The total number of nodes in the binary tree.
 */
  const countNodes = function(root) {
    if(!root) return 0;
    
    const height = getTreeHeight(root);
    
    if(height === 0) return 1;
    
    // 2^(h-1) - 1  //this represents the number of nodes in the upper tree meaning without the last level nodes
    const upperCount = Math.pow(2, height) - 1 // 2^h - 1 formula represents the number of nodes in tree
    
    let left = 0, right = upperCount;
    
    while(left < right) {
      const idxToFind = Math.ceil((left + right) / 2);
      
      if(nodeExists(idxToFind, height, root)) {
        left = idxToFind;
      } else {
        right = idxToFind - 1;
      }
    }
    
    return upperCount + left + 1;
  };
  
  console.log(countNodes(tree))