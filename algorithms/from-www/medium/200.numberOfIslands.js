/*

e
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    
};

console.log(numIslands())// Example 1
let grid1 = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
];
console.log("Example 1 Output:", numIslands(grid1)); // Expected: 1

// Example 2
let grid2 = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
];
console.log("Example 2 Output:", numIslands(grid2)); // Expected: 3

// Example 3 (Custom test case)
let grid3 = [
    ["1","0","1"],
    ["0","1","0"],
    ["1","0","1"]
];
console.log("Example 3 Output:", numIslands(grid3)); // Expected: 5
