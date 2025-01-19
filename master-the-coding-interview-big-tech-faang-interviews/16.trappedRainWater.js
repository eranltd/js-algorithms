/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
                            
image source: https://assets.leetcode.com/uploads/2018/10/22/rainwatertrap.png
       ^                                                                                                                      
       |                                                                                                                      
       |                                                                                                                      
       |                          @  BLACK                                                                                            
       |                          +  BLUE                                                                                    
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
/*
1. Identify the pointer with the lesser value
2. Is this pointer value greater than or equal to max on that side
  yes -> update max on that side
  no -> get water for pointer, add to total
3. move pointer inwards
4. repeat for other pointer
 */

var trap = function(height) {
    var res = 0;
    var left = 0;
    var right = height.length - 1;
    var leftMaxHeight = 0;
    var rightMaxHeight = 0;
  
    while (left < right) {
      if (height[left] < height[right]) { //trapped water is determined by the shorter wall
      
      
      
        if (height[left] >= leftMaxHeight) {
          leftMaxHeight = height[left]; //reset
        } else {
          res += leftMaxHeight - height[left];
        }



        left++;
      } else {
       
       
       
        if (height[right] >= rightMaxHeight) {
          rightMaxHeight = height[right]; //reset
        } else {
          res += rightMaxHeight - height[right];
        }




        right--;
      }
    }
  
    return res;
};

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
console.log(trap([4,2,0,3,2,5])); // 9


