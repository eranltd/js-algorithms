/**
 *
 * An axis-aligned rectangle is represented as a list [x1, y1, x2, y2],
 * where (x1, y1) is the coordinate of its bottom-left corner, and (x2, y2) is the coordinate of its top-right corner.
 * Its top and bottom edges are parallel to the X-axis, and its left and right edges are parallel to the Y-axis.

 * Two rectangles overlap if the area of their intersection is positive.
   To be clear, two rectangles that only touch at the corner or edges do not overlap.
 *
 * Given two axis-aligned rectangles rec1 and rec2, return true if they overlap, otherwise return false.

/*
Example of rectangles on an axis:
       [x1, y1, x2, y2]
rec1 = [0, 0, 2, 2]
rec2 = [1, 1, 3, 3]

Y
|
3               *-----*(3,3)
|               | rec2|
|               |     |
2         *-----*(2,2)
|         / rec1|     |
1         /(1,1)*-----*
|         /     /
0   (0,0) *-----*
|---------0-----1-----2-----3 X

In this example, the rectangles overlap.
*/
/*
    Example 1:

    Input: rec1 = [0,0,2,2], rec2 = [1,1,3,3]
    Output: true
    Example 2:

    Input: rec1 = [0,0,1,1], rec2 = [1,0,2,1]
    Output: false
    Example 3:

    Input: rec1 = [0,0,1,1], rec2 = [2,2,3,3]
    Output: false

    Constraints:

    rec1.length == 4
    rec2.length == 4
    -109 <= rec1[i], rec2[i] <= 109
    rec1 and rec2 represent a valid rectangle with a non-zero area.
 */

/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
const isRectangleOverlap = function (rec1, rec2) {
  // x1, y1, x2, y2 = rec1
  // x1, y1, x2, y2 = rec2
  // lower left corner of rec1 is (x1, y1)
  // upper right corner of rec1 is (x2, y2)
  // lower left corner of rec2 is (x1, y1)
  // upper right corner of rec2 is (x2, y2)

  return rec1[0] < rec2[2] &&
           rec1[1] < rec2[3] &&
           rec1[2] > rec2[0] &&
           rec1[3] > rec2[1]
}

console.log('isRectangleOverlap([0,0,2,2],[1,1,3,3])', isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3])) // true
console.log('isRectangleOverlap([0,0,1,1],[1,0,2,1])', isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1])) // false
