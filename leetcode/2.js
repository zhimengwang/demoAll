let l1 = [2, 4, 3];
let l2 = [5, 6, 4];

var addTwoNumbers = function(l1, l2) {
    let maxLength = Math.max(l1.length, l2.length)
    let carry = 0;
    let result = [];
    for (let i=0; i < maxLength; i++) {
        let x = l1[i] === undefined ? 0 : l1[i];
        let y = l2[i] === undefined ? 0 : l2[i];
        let sum = x + y + carry;
        carry = parseInt(sum / 10);
        result.push(sum % 10)
    }
    return result
};
console.log(addTwoNumbers(l1, l2));