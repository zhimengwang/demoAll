function heapSort1(array) {
    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function maxHeapify(array, index, heapSize) {
        var iMax = index,
            iLeft = 2 * index + 1,
            iRight = 2 * (index + 1);
        if (iLeft < heapSize && array[index] < array[iLeft]) {
            iMax = iLeft;
        }
        if (iRight < heapSize && array[iMax] < array[iRight]) {
            iMax = iRight;
        }
        if (iMax != index) {
            swap(array, iMax, index);
            maxHeapify(array, iMax, heapSize); // 递归调整
        }
    }

    function buildMaxHeap(array) {
        var i,
            iParent = Math.floor(array.length / 2) - 1;
        for (i = iParent; i >= 0; i--) {
            maxHeapify(array, i, array.length);
        }
    }

    function sort(array) {
        buildMaxHeap(array);
        console.log(array);
        for (var i = array.length - 1; i > 0; i--) {
            swap(array, 0, i);
            maxHeapify(array, 0, i);
        }
        return array;
    }

    return sort(array);
}

function heapSort(array) {
    function swap(array, i, j) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    function maxHeapify(array, index, heapSize) {
        let iMax = index;
        let iLeft = 2 * index + 1;
        let iRight = 2 * index + 2;
        if (iLeft < heapSize && array[index] < array[iLeft]) {
            iMax = iLeft;
        }
        if (iRight < heapSize && array[iMax] < array[iRight]) {
            iMax = iRight;
        }

        if (iMax !== index) {
            swap(array, iMax, index);
            maxHeapify(array, iMax, heapSize);
        }
    }

    function maxHeapify(array, index, heapSize) {
        var iMax = index,
            iLeft = 2 * index + 1,
            iRight = 2 * (index + 1);
        if (iLeft < heapSize && array[index] < array[iLeft]) {
            iMax = iLeft;
        }
        if (iRight < heapSize && array[iMax] < array[iRight]) {
            iMax = iRight;
        }
        if (iMax != index) {
            swap(array, iMax, index);
            maxHeapify(array, iMax, heapSize); // 递归调整
        }
    }
    function buildMaxHeap(array) {
        const len = array.length;
        let lastParent = Math.floor(array.length / 2) - 1;
        for (let i = lastParent; i >= 0; i--) {
            maxHeapify(array, i, array.length);
        }
    }

    function sort(array) {
        buildMaxHeap(array);
        console.log(array);
        for (var i = array.length - 1; i > 0; i--) {
            swap(array, 0, i);
            maxHeapify(array, 0, i);
        }
        return array;
    }

    return sort(array);
}

console.log(heapSort([1, 5, 4, 3, 2, 6, 8, 7]));