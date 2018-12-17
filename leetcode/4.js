let nums1 = [1];
let nums2 = [2, 3, 4, 5, 6];
var findMedianSortedArrays = function (nums1, nums2) {
    let n1 = nums1.length;
    let n2 = nums2.length;
    if (n1 > n2)
        return findMedianSortedArrays(nums2, nums1);

    let k = Math.floor((n1 + n2 + 1) / 2);
    let l = 0;
    let r = n1;

    while (l < r) {
        let m1 = Math.floor(l + (r - l) / 2);
        let m2 = k - m1;
        if (nums1[m1] < nums2[m2 - 1])
            l = m1 + 1;
        else
            r = m1;
    }

    let m1 = l;
    let m2 = k - l;

    let c1 = Math.max(m1 <= 0 ? -Infinity : nums1[m1 - 1],
        m2 <= 0 ? -Infinity : nums2[m2 - 1]);

    if ((n1 + n2) % 2 == 1)
        return c1;

    let c2 = Math.min(m1 >= n1 ? Infinity : nums1[m1],
        m2 >= n2 ? Infinity : nums2[m2]);
    return (c1 + c2) * 0.5;
}


console.log(findMedianSortedArrays(nums1, nums2));