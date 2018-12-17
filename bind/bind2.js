
Function.prototype.bind = function (_this) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    const fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(_this, args.concat(bindArgs));
    };

    return fBound;

};

function list() {
    return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
console.log(list2);
console.log(list3);
