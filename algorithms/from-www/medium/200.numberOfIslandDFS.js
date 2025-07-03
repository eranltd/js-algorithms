/*

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

const DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]] // up, down, left, right
const dfs = function (grid,x,y) {
            const rows = grid.length
            const cols = grid.length[0]
            if (x < 0 || y < 0 || x >= rows || y >= cols) return;

              // If an adjacent cell is land ('1'), it's part of the current island. Add it to the queue to explore and "sink" it by marking it as visited ('0').
              if (grid[x][y] === '1') {
                grid[x][y] = '0' // Correctly mark the cell as visited
              


            for (const dir of DIRS) {
              const dx = x + dir[0]
              const dy = y + dir[1]
              dfs(grid, dx,dy)
            } }
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function (grid) {
  // first constraint
  if (!grid || grid.length === 0) {
    return 0
  }

  let islandsCount = 0
  const rows = grid.length
  const cols = grid[0].length

  // going through Sequential Order

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // determine if that is a new island, and set the element to zero
      if (grid[row][col] === '1') {
        islandsCount++

        // now traverse using DFS on all adjust elements using helper dfs recursive function
        dfs(grid,row,col)
        }
      }
    }

  return islandsCount
}

const grid1 = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
]
console.log('Example 1 Output:', numIslands(grid1)) // Expected: 1

// Example 2
const grid2 = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1']
]
console.log('Example 2 Output:', numIslands(grid2)) // Expected: 3

// Example 3 (Custom test case)
const grid3 = [
  ['1', '0', '1'],
  ['0', '1', '0'],
  ['1', '0', '1']
]
console.log('Example 3 Output:', numIslands(grid3)) // Expected: 5
