function insertionSort(arr) {
    let nArr = [arr[0]];
    arr.shift();
    for (let i = 0; i < arr.length; i++) {
        let maxIndex = null;

        nArr.forEach((item,j)=>{
            console.log(maxIndex,'max');
            if (arr[i] > nArr[j]) {
                maxIndex = j;
            }
        })
        if (maxIndex!==null) {
            insert(nArr, maxIndex+1, arr[i]);
        } else {
            insert(nArr, 0, arr[i]);
        }
        console.log(maxIndex);
        console.log(nArr);
    }
    return nArr;
}

function insert(arr, index, item) {
    arr.splice(index, 0, item);
}

console.log(insertionSort([3, 1, 5, 2,6,4]));