let x = 1534236469;
var reverse = function (x) {
    let isPostion = x < 0;
    x = Math.abs(x);
    x = x.toString().split('');
    if (isPostion) {
        x.reverse().unshift('-');
        return Number(x.join(''));
    } else {
        return Number(x.reverse().join(''));
    }
};
console.log(reverse(x));