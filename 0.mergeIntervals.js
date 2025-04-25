/*
Input: arr[] = [[1, 3], [2, 4], [6, 8], [9, 10]]
Output: [[1, 4], [6, 8], [9, 10]]
Explanation: In the given intervals, we have only two overlapping intervals [1, 3] and [2, 4]. Therefore, we will merge these two and return [[1, 4]], [6, 8], [9, 10]].


Input: arr[] = [[7, 8], [1, 5], [2, 4], [4, 6]]
Output: [[1, 6], [7, 8]]
Explanation: We will merge the overlapping intervals [[1, 5], [2, 4], [4, 6]] into a single interval [1, 6].
*/

function mergeIntervals(intervals) {
    //step 1: sort the intervals based on the start time
    intervals.sort((a, b) => a[0] - b[0]); //sort the original array
    const merged = [[intervals[0][0], intervals[0][1]]] //putting the first 


    for(let i = 1; i< intervals.length ; i++) { //iterating from the 2nd
        if(intervals[i][0] <= merged[merged.length-1][1]){
            merged[merged.length-1][1] = Math.max(intervals[i][1], merged[merged.length-1][1])
        }
        else{
            merged.push(intervals[i])
        }
    }

    return merged

}

console.log(mergeIntervals([[1,3],[8,10],[2,6],[15,18]])) //[ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
console.log(mergeIntervals([[1, 3], [2, 4], [6, 8], [9, 10]])) // [[1, 4], [6, 8], [9, 10]]
console.log(mergeIntervals([[7, 8], [1, 5], [2, 4], [4, 6]])) // [[1, 6], [7, 8]]
console.log(mergeIntervals([[1, 3], [2, 4], [6, 8], [9, 10]])) // [[1, 4], [6, 8], [9, 10]]
console.log(mergeIntervals([[7, 8], [1, 5], [2, 4], [4, 6]])) // [[1, 6], [7, 8]]