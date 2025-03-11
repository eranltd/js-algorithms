const testMatrix = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20]
  ];


  //[i,j]
  const directions = {
    up: [-1,0],
    right:[0,1],
    down:[1,0],
    left:[0,-1],
  }



  const dfs = (matrix, seen, visited, row, col) => {
    const rowLength = matrix.length
    const colLength = matrix[0].length

    //check params
    if(row < 0 || col < 0)
        return

    if(row >=rowLength || col>=colLength)
        return

    //stop statement
    if(seen[row][col])
        return


    //mark as seen
    seen[row][col] = true

    //save into values
    visited.push(matrix[row][col])

    //check other directions
    dfs(matrix, seen,visited, row + directions.up[0], col+directions.up[1])
    dfs(matrix, seen,visited, row + directions.right[0], col+directions.right[1])
    dfs(matrix, seen,visited, row + directions.down[0], col+directions.down[1])
    dfs(matrix, seen,visited, row + directions.left[0], col+directions.left[1])

  }


  const traversalDFS = (matrix) => {

    const seen = new Array(matrix.length).fill(0).map(()=> new Array(matrix[0].length).fill(false));
    const visitedValues = []

    dfs(matrix, seen, visitedValues,0,0)

    return visitedValues

  }

  console.log(traversalDFS(testMatrix));