/*
This is a direct maze problem where you need to find the shortest path between two points in a recursively constructed Hilbert maze.
This is a classic shortest path problem.

/*
There is a ball in a maze with empty spaces (represented as 0) and walls (represented as 1).
The ball can go through the empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall.
When the ball stops, it could choose the next direction.
Given the m x n maze, the ball's start position and the destination, where start = [startrow, startcol] and destination = [destinationrow, destinationcol], return true if the ball can stop at the destination, otherwise return false.

You may assume that the borders of the maze are all walls (see examples).

Input: maze = [[0,0,1,0,0],[0,0,0,0,0],[0,0,0,1,0],[1,1,0,1,1],[0,0,0,0,0]], start = [0,4], destination = [4,4]
Output: true
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

Constraints:

- m == maze.length
- n == maze[i].length
- 1 <= m, n <= 100
- maze[i][j] is 0 or 1.
- start.length == 2
- destination.length == 2
- 0 <= startrow, destinationrow <= m
- 0 <= startcol, destinationcol <= n
- Both the ball and the destination exist in an empty space, and they will not be in the same position initially.

The maze contains at least 2 empty spaces.

Idea
- First I want to say that this is not exactly a shortest path problem. However, both logic are so similar that I believe they fall into the same category.
- Let's see why.
- If you remember what we have done so far for the shortest path questions, you'll realize the most important part is how we do BFS.
- To generalize the logic a little bit, you'll find, we don't necessarily need the grid/matrix/maze to do BFS (like what we did in this hidden grid), as long as we can find the next-level cells to proceed, right?
- So for this question, we have the grid, so we don't have to build one. The difference is that when we traverse the maze, we won't be able to stop unless we hit a wall.
- So in a traditional grid, when we do BFS we can get the next-level cells by moving up/down/left/right. In this question, as long as we can find the next-level cells by "rolling until we hit a wall", then it's the same question.
- That's easy, we can just have a helper function that walks from [x,y] following the direction's delta [dx,dy], then we'll find the next-level cells.
- The code is astoundingly simiar to the previous questions, so it should explain itself well.

%#****#%*****@#*****#%*****@#*****#%*****%%*****##*****%@*****%#*****%@*****%%*****%%*****%%*****%-
@=----+#-----@%=----=#-----@%-----=*-----%@-----+*-----%@-----**-----%@-----#*-----%@=----#*-----@=.
%-:+*::::-*::@%-:**::::=+::@%::**::::+*::%%::+*::::+#::#@::=+::::=#::#@::==::::=#::%@::+=::::=*::@=.
@+=*#====+#==@%==##====**==@%==##====*#==%@==*#====*#==%@==**====*%==%@==*+====+%==%@==#+====+#==@=.
%-::::=#:::::@%-::::-*:::::@%:::::-*:::::%%:::::=+:::::#@:::::++:::::#@:::::**:::::%@:::::**:::::@=.
@+====*%=====@%+====+#=====@%=====+#=====%@=====**=====%@=====#*=====%@=====##=====%@+====##====+@=.
%-:+*::::-*::@%-:**::::=+::@%::**::::+*::%%::+*::::+#::#@::=+::::=#::#@::==::::-#::%@::+=::::=*::@=.
#@@@@@@@@@@@@%*@@@@@@@@@@@@%#@@@@@@@@@@@@%#@@@@@@@@@@@@%#@@@@@@@@@@@@#%@@@@@@@@@@@@##@@@@@@@@@@@@#-.
%=----+#-----@=            .=            :%-----+*-----#:            :. .+=%+=%=+. .@-----**-----@=.
@*++++#%++*+*@=            .=            :%+++++##++*++%:            :.=start:   ++:@*+*++%#++*+*@=.
%-:+*::::-*::@=            .=            :%::+*::::+#::#:            :==*  BALL  #-=@::+=::::=*::@=.
@##%%#####%##@=            .=            :%##%%####%%##%:            :@+ .:BALL - +*@##%######%##@=.
%-::::=#:::::@=            .=            :%:::::=+:::::#:            :+:  BALL--  :=@:::::**:::::@=.
@@%%%%@@%%%%%@=            .=            :@%%%%%@@%%%%%@:            :.+%*#::::#*%#:@@%%%%@@%%%%@@=.
%-:+*::::-*::@=            .=            :%::+*::::+#::#:            :. -+#-  -*+- .@::*=::::=*::@=.
+@@@@@@@@@@@@+*#############%#############*************+##############%#############*@@@@@@@@@@@@*=.
%-::::=#:::::@=            .=            ::            ::            .:            .@:::::**:::::@=.
@%#%%####%@##@=            .=            ::            ::            .:            .@##%%####%%##@=.
%-:++::::-*::@=            .=            ::            ::            .:            .@::+=::::=*::@=.
@#****#%*****@=            .=            ::            ::            .:            .@*****%%*****@=.
%-::::=#:::::@=            .=            ::            ::            .:            .@:::::**:::::@=.
@++##++++*#++@=            .=            ::            ::            .:            .@++#*++++*#++@=.
%+=*#====+#==@=            .=            ::            ::            .:            .@+=#+====*#=+@=.
%@%%%%@@%%%%@@-.............=............:-............:%@%%%%@@%%%%@%:............:@@%%%%@@%%%%@%-.
%-::::+#:::::@=            .=            ::            :%:::::*+:::::#:            .@-::::**::::-@=.
@=-**----=#--@=            .=            ::            :%--+*----+#--%:            .@--*+----+*--@=.
%-:+*::::=*::@=            .=            ::            :%::++::::+#:-#:            .@-:*=::::=*:-@=.
%=----+#-----@=            .=            ::            :%-----**-----%:            .@-----**-----@=.
%=----+#-----@=            .=            ::            :%-----**-----%:            .@-----**-----@=.
%=:**::::=*:-@=            .=            ::            :%::++::::+#:-#:            .@-:*=::::=*:-@=.
#%#%%####%@##%=:::::::::::::=::::::::::::--............-###%%####%@###-:::::::::::::%%#%%####%%#%%-.
%=::::+#::::-@%-::::=*:::::@@-::::=*:::::%-            :%-::::*+::::-%@-::::**::::-%@-::::**::::-@=.
@#****#%*****@@*****#%*****@@*****#%*****@-            :@*****%%*****@@*****%%*****@@*****%%*****@=.
%-:++::::-*::@@-:**::::=+::@@::**::::+*::%-            :%::=+::::=#::#@::==::::-#::%@::+=::::=*::@=.
@%%@@%%%%%@%%@@%%@@%%%%%@%%@@%%@@%%%%%@%%@-            :@%%%%%%%%%@%%@@%%%%%%%%%@%%@@%%@%%%%%%@%%@=.
%-::::=#:::::@@-::::-*:::::@@:::::-*:::::%-            :%:::::++:::::#@:::::**:::::%@:::::**:::::@=.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-            :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=.
%-:+*::::-*::@@-:**::::=+::@@::**::::+*::%-            :%::=+::::=#::#@::==::::-#::%@::*=::::=*::@=.
*@@@@@@@@@@@@*+#%%%%%%%%%%%++%%%%%%%%%%%%*-::::::::::::-+%%%%%%%%%%%#+=#%%%%%%%%%%#+*@@@@@@@@@@@@*-.
%-::::=#:::::@=            .=            ::            ::            .:            .@:::::**:::::@=.
@%#%%####%%##@=            .=            ::            ::            .:-==========-:@##%%####%%##@=.
%-:+*::::-*::@=            .=            ::            ::            .::+:::-.:.=+::@::*=::::=*::@=.
@######%#####@=            .=            ::            ::            .::*++TARGET*::@#####%%#####@=.
%-::::=#:::::@=            .=            ::            ::            .::+:: GATE *::@:::::**:::::@=.
@#*%%****#%**@=            .=            ::            ::            .**#***#**#*#*+@**%#****#%**@=.
%=-**----=#--@=            .=            ::            ::            .:            .@=-*+----+*-=@=.
#@%%%%@@%%%%@%#@%%%%@@%%%%%@#%%%%%@@%%%%%%#%%%%%@@%%%%%#%%%%%%@@%%%%%#%%%%%%@@%%%%%#%%%%%%@@%%%%%#=.
%-::::=#:::::@@-::::-*:::::@@:::::-*:::::%@:::::=+:::::%@:::::++:::::#@:::::**:::::%@:::::**:::::@=.
@++##++++*#++@@++##++++*#++@@++#%++++##++@@++##++++#%++%@++*#++++*%++%@++**++++*%++%@++#*++++*#++@=.
%-:+*::::=*::@@-:**::::++::@@::*#::::+*::%@::+*::::+#::%@::++::::+#::#@::+=::::=#::%@-:*=::::=*:-@=.
@=----+#----=@@=----+#-----@@=----+*-----@@-----**-----%@-----**----=%@-----#*----=%@=----##----=@=.
@=----+#-----@@=----=#-----@@=----+*-----@@-----+*-----%@-----**-----%@-----#*----=%@=----#*----=@=.
%-:+*::::=*::@@-:**::::++::@@::*#::::+*::%@::+*::::+#::%@::++::::+#::#@::+=::::=#:-%@-:*=::::=*:-@=.
###%%#####%##%###%%####%%##@###%@####%%##%%##%%####%@##%%##%%####%@###%##%######@##%%##%#####%%##%-.
...................................................................................................

*/
/**
 * Checks if the given coordinates (i, j) are within the bounds of the maze
 * and the cell at the coordinates is not blocked or it is not a wall.
 *
 * @param {number} i - The row index of the cell.
 * @param {number} j - The column index of the cell.
 * @param {number[][]} maze - A 2D array representing the maze, where 0 indicates an open cell and non-zero indicates a blocked cell.
 * @returns {boolean} - Returns true if the coordinates are within the maze bounds and the cell is open; otherwise, false.
 */
const inRange = (i, j, maze) => {
  const H = maze.length
  const W = maze[0].length
  return i >= 0 && i < H && j >= 0 && j < W && !maze[i][j]
}

/**
 * Moves a point (x, y) in a matrix continuously in the direction specified by (dx, dy)
 * until it goes out of range or hit a wall (maze[i][j]==1), and returns the final position.
 *
 * @param {number} x - The starting x-coordinate.
 * @param {number} y - The starting y-coordinate.
 * @param {number} dx - The change in x-coordinate for each step.
 * @param {number} dy - The change in y-coordinate for each step.
 * @returns {number[]} An array containing the final [x, y] coordinates after walking.
 */
function walk (x, y, dx, dy, maze) {
  while (inRange(x + dx, y + dy, maze)) {
    x += dx, y += dy
  }
  return [x, y]
}

const hasPath = function (maze, start, dest) {
  console.log('start', maze[start[0], start[1]])
  console.log('dest', maze[dest[0], dest[1]])

  const DIRS = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1] // left
  ]

  // BFS traversal
  const queue = [start]
  const visited = new Set() // BFS, keep track of visited nodes

  while (queue.length > 0) {
    const [x, y] = queue.shift() // This is ideal for implementing a FIFO (First-In-First-Out) queue
    if (x == dest[0] && y == dest[1]) return true // done -> found the target

    // going once on each direction and check - loop(4)
    for (const [dx, dy] of DIRS) {
      if (inRange(x + dx, y + dy, maze)) {
        const walkOncePosition = walk(x, y, dx, dy, maze)
        const key = walkOncePosition.join() // convert 1,1 ->11, 4,5 ->45

        if (!visited.has(key)) { // keep track of nodes, and enable recursion
          visited.add(key)
          queue.push(walkOncePosition)
        }
      }
    }
  }
  return false
}

// Driver
const matrix = [[0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0]]
const start = [0, 4]
const destination = [4, 4]
// One possible way is : left -> down -> left -> down -> right -> down -> right.

console.log(hasPath(matrix, start, destination)) // true
