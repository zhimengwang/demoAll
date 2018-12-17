function mergeSort(arr) {
    let minddle = parseInt(arr.length/2);
    if(arr.length<=1){
        return arr
    }
    let left = arr.slice(0,minddle);
    let right = arr.slice(minddle);
    // sort(sort(sort(mergeSort(left),mergeSort(right)),sort(mergeSort(left),mergeSort(right))),sort(sort(mergeSort(left),mergeSort(right)),sort(mergeSort(left),mergeSort(right))))
    return sort(mergeSort(left),mergeSort(right))
}
function sort(left,right) {
    let res =[];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }

    while (left.length)
        res.push(left.shift());

    while (right.length)
        res.push(right.shift());

    return res;
}

function exchange(arr, i, j) {
    let temp = arr[j];
    arr [j] = arr[i];
    arr [i] = temp;
}

console.log(mergeSort([3, 1, 5, 2]));