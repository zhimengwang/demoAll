var rotate = function(nums, k) {
    if(!k){
        return
    }
    var rotate = function(nums, k) {
        if(!k)return
        for(let i=nums.length-1;i<nums.length-k;i--){
            nums.unshift(numsnums.pop())
        }
    };
}
var a=[1,2,3,4,5,6,7]
rotate(a,3)
console.log(a);