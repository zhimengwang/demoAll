const nums = [2, 7, 11, 15];
const taget = 9;

var twoSum = function (nums, target) {
    let hashMap = new Map;
    nums.forEach((value, index) => {
        hashMap.set(value, index)
    })
    var result
    nums.forEach((value, index) => {
        const complement = target - value;
        if (hashMap.has(complement) && hashMap.get(complement) !== index) {
            result = [index,hashMap.get(complement)]
        }
    })

    return result
};

console.log(twoSum(nums, taget));