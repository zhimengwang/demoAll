function shellSort(arr) {
    let gap = 0;
    while(gap < arr.length/3) {          //动态定义间隔序列
        gap =gap*3+1;
    }
    for (; gap > 0; gap--) {
        let index = 0;
        console.log(gap);
        while (index + gap < arr.length) {
            if (arr[index] > arr[index + gap]) {
                exchange(arr, index, index + gap);
            }
            index = index + gap;
        }
    }
    return arr;
}

function exchange(arr, i, j) {
    let temp = arr[j];
    arr [j] = arr[i];
    arr [i] = temp;
}

console.log(shellSort([4, 3, 2, 1]));
