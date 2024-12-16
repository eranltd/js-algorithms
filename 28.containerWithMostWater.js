/**
   * You are given an integer array height of length n.
     There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
     Find two lines that together with the x-axis form a container, such that the container contains the most water.
     Return the maximum amount of water a container can store.

    Notice that you may not slant the container.
 

Example 1:
             :::::::::::: = water
   .                                                                                                   
    .                                                                                                   
                              
  8               ##*                                                   *@#                             
    .             ##*                                                   *@#                             
  7...            ##*:::::::::::::::::::::::::::::::::::::::::::::::::::#@%::::::::::::::::::##*        
                  ###:::::::::::::::::::::::::::::::::::::::::::::::::::#@%::::::::::::::::::##*        
  . .             *##:::::::::::::::::::::::::::::::::::::::::::::::::::#@%::::::::::::::::::##*        
  :..             *##:::::::::+@@-::::::::::::::::::::::::::::::::::::::#@%::::::::::::::::::##*        
  6               *##:::::::::+@@-::::::::::::::::::::::::::::::::::::::#@%::::::::::::::::::##*        
  -..             ###:::::::::+@@-::::::::::::::::::::::::::::::::::::::#@%::::::::::::::::::##*        
  5 .             ###:::::::::+@@-:::::::::::::::::*@@-:::::::::::::::::#@%::::::::::::::::::##*        
                  ###:::::::::+@@-:::::::::::::::::*@@-:::::::::::::::::#@%::::::::::::::::::##*        
  4..             ###:::::::::+@@-:::::::::::::::::*@@-::::::-%%=:::::::#@%::::::::::::::::::##*        
    .             ###:::::::::+@@-:::::::::::::::::*@@-::::::-@@+:::::::#@%::::::::::::::::::##*        
                  ###:::::::::+@@-:::::::::::::::::*@@-::::::-@@+:::::::#@%::::::::::::::::::##*        
  3:.             ###:::::::::+@@-:::::::::::::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
    .             ###:::::::::+@@-:::::::::::::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
  :..             ###:::::::::+@@-:::::::::::::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
  2..             ###:::::::::+@@-:::::::@@*:::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
                  *##:::::::::+@@-:::::::@@*:::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
  : .:   :--      *##:::::::::+@@-:::::::@@*:::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
  1 .    =@@.     *##:::::::::+@@-:::::::@@*:::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
    .    =@@.     ###:::::::::+@@-:::::::@@*:::::::*@@-::::::-@@+:::::::#@%:::::::-@@=:::::::##*        
  0  .....::......::::........::::::::::::::..:.::::::::::::.::-:::::::::::...:.:.::::.:::::::::........

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
 

Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104
*/

/*
Algorithm: 
    Keep two index, first = 0 and last = n-1 and a value max_area that stores the maximum area.
    Run a loop until first is less than the last.
    Update the max_area with maximum of max_area and min(array[first] , array[last])*(last-first)
    if the value at array[first] is greater the array[last] then update last as last – 1 else update first as first + 1
    Print the maximum area.

Complexity Analysis: 

    Time Complexity: O(n). 
    As only one traversal of the array is required, so time complexity is O(n).
    Space Complexity: O(1). 
    No extra space is required, so space complexity is constant.

Solution Analysis – Why this solution works?

    Every time, we are moving our pointer i ahead if height of line at ith index is smaller or j pointer if height of line at jth index is smaller. This means whichever line is smaller, we won’t consider it again, because, this line could be the answer only if the other line is larger than it and at maximum width and to be noticed that this is the time when other line is larger as well as max distance apart. So, not considering it makes sense.
    In other words, we are required to pair up every line with that line which is greater than it and at maximum distance apart i.e. 

    For example -> 8 5 9 1 10 2 6

    here, if 8 has to be in the answer then other line that we choose should be 10 as it is the first line from the end that is at maximum distance apart from 8 and longer than 8. Hence, for 8 to be in the answer, other line should be 10.
    Now, Lets assume i at 8 and j at 10. Compare it and move the pointer i to 5.
    Now, you may ask, ok, you have moved the pointer i to 5 but can it not happen that 5 could pair up with other lines after 10 as we have neglected those lines by moving j pointer to 10.
    So, to be noticed that if 5 would have been in the answer then any line after 10 must be >= 5 and if there is any line after 10 whose height is greater than or equal to 5 then its contribution would surely have been calculated while pointer ‘i’ was at 8.
    So, for the combinations of lines which we are neglecting, have been already taken care of.
*/
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let n = height.length;
    let left = 0;
    let right = n - 1;
    let area = 0;
    
    while (left < right) {
        
        // Calculating the max area
        const minimumHeight = Math.min(height[left], height[right]);
        const newArea = minimumHeight * (right - left); //7,8 -> 7 * (8 - 1) = 7*7 = 49
        area = Math.max(area, newArea);
                            
        if (height[left] < height[right])
            left += 1;
        else 
            right -= 1;
    }
    return area;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7])) // 49
console.log(maxArea([1,1])) // 1
console.log(maxArea([4,3,2,1,4])) // 16
console.log(maxArea([1,2,1])) // 2
