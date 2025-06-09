const testMatrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
]

// [i,j]
const directions = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1]
}

const traversalBFS = (matrix) => {
  // array of seen elements
  const seen =
    new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(false))

  const values = []

  // recursive part is changed with queue technique (push, pop inside while loop)
  const queue = [[0, 0]]

  while (queue.length) {
    const currentPos = queue.shift()
    const row = currentPos[0]
    const col = currentPos[1]

    // recursive stop condition are changed with skipping the loop using 'continue'
    if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length || seen[row][col]) {
      continue
    }

    seen[row][col] = true // accessor
    values.push(matrix[row][col])

    // check outer directions

    queue.push([row + directions.up[0], col + directions.up[1]])
    queue.push([row + directions.right[0], col + directions.right[1]])
    queue.push([row + directions.down[0], col + directions.down[1]])
    queue.push([row + directions.left[0], col + directions.left[1]])
  }

  return values
}

console.log(traversalBFS(testMatrix))
