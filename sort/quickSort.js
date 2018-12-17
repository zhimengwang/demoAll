function quickSort(arr) {
    const l = arr.length
    if(l < 2) return arr
    const basic = arr[0], left = [], right = []
    for(let i = 1; i < l; i++) {
        const iv = arr[i]
        iv >= basic && right.push(iv) // to avoid repeatly element.
        iv < basic && left.push(iv)
    }
    return quickSort(left).concat(basic, quickSort(right))
}

function swap(arr, i, j) {
    let temp = arr[j];
    arr [j] = arr[i];
    arr [i] = temp;
}

console.log(quickSort([2, 1]));

// const arr = [5, 3, 7, 4, 1, 9, 8, 6, 2];
// const ascendArr = arr.quickSort()