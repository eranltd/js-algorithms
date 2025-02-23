const unsortedArray = [5, 3, 8, 2, 1, 4];

//swap the current element with the next element if the current element is greater than the next element
// O(n^2) time complexity   
// O(1) space complexity
function bubbleSort(arr) {
    const length = arr.length

    for(let i=0; i< length;i++){
        for(let j=0; j< length-1; j++){
            if(arr[j] > arr[j+1]){
                const temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    return arr

}


console.log('unsortedArray', unsortedArray)
const sorted = bubbleSort(unsortedArray)
console.log('sortedArray', sorted)