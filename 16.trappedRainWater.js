/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
                            
image source: https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png
       ^                                                                                                                      
       |                                                                                                                      
       |                                                                                                                      
       |                          @= BLACK                                                                                            
       |                          += BLUE                                                                                    
       |                                                                                                                      
       3                                                                   =@@@@@@@@@=                                        
       |                                                                   =@@@@@@@@@=                                        
       |                                                                   =@@@@@@@@@=                                        
       |                                                                   =@@@@@@@@@=                                        
       2                             @@@@@@@@@@++++++++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@+++++++++%@@@@@@@@@.           
       |                             @@@@@@@@@@++++++++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@*++++++++@@@@@@@@@@:           
       |                             @@@@@@@@@@++++++++++++ BLUE ++++++++++@@@@@@@@@@@@@@@@@@@@*++++++++@@@@@@@@@@:           
       |                             @@@@@@@@@@++++++++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@*++++++++@@@@@@@@@@:           
       |                             @@@@@@@@@@++++++++++++++++++++++++++++@@@@@@@@@@@@@@@@@@@@*++++++++@@@@@@@@@@:           
       1         .@@@@@@@@@@++++++++*@@@@@@@@@@@@@@@@@@@@++++++++*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
       |         .@@@@@@@@@@+++++++++@@@@@@@@@@@@@@@@@@@@++++++++*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
       |         .@@@@@@@@@@+++++++++@@@@@@@ BLACK @@@@@@++++++++*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ BLACK @@@@@@@@@@@@@@@@@@@@@@  
       0         .@@@@@@@@@@+++++++++@@@@@@@@@@@@@@@@@@@@++++++++*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  
     .                                                                                                                        
Example 1:

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1].
In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
*/

/**
 * @param {number[]} heights
 * @return {number}
 */
var trap = function(height) {
    var res = 0;
    var left = 0;
    var right = height.length - 1;
    var leftMax = 0;
    var rightMax = 0;
  
    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= leftMax) {
          leftMax = height[left];
        } else {
          res += leftMax - height[left];
        }
        left++;
      } else {
        if (height[right] >= rightMax) {
          rightMax = height[right];
        } else {
          res += rightMax - height[right];
        }
        right--;
      }
    }
  
    return res;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5])); // 9


