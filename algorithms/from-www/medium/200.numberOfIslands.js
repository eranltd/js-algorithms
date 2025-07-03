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
  const DIRS = [[0, 1], [0, -1], [1, 0], [-1, 0]] // up, down, left, right

  // going through Sequential Order

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // determine if that is a new island, and set the element to zero
      if (grid[i][j] === '1') {
        islandsCount++
        grid[i][j] = '0' // Mark as visited

        // now traverse using BFS on all adjust elements

        const queue = [[i, j]]

        while (queue.length > 0) {
          const [currentX, currentY] = queue.shift()

          for (const dir of DIRS) {
            const dx = currentX + dir[0]
            const dy = currentY + dir[1]

            // check we are in range.
            if (dx < 0 || dy < 0 || dx >= rows || dy >= cols) continue

            // If an adjacent cell is land ('1'), it's part of the current island. Add it to the queue to explore and "sink" it by marking it as visited ('0').
            if (grid[dx][dy] === '1') {
              queue.push([dx, dy])
              grid[dx][dy] = '0' // Correctly mark the cell as visited
            }
          } // for each direction
        }
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
