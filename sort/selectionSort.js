function selectionSort(arr) {
    let min = arr[0];
    let minIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++) {
            if(arr[j]<min){
                min = arr[j];
                minIndex = j
            }
        }
        exchange(arr,i,minIndex)
    }
    return arr
}

function exchange(arr, i, j) {
    let temp = arr[j];
    arr [j] = arr[i];
    arr [i] = temp;
}

console.log(selectionSort([3, 1, 5, 2]));