function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                exchange(arr, j, j + 1);
            }
        }
    }
    return arr;
}

function exchange(arr, i, j) {
    let temp = arr[j];
    arr [j] = arr[i];
    arr [i] = temp;
}

console.log(bubbleSort([3, 1, 5, 2]));