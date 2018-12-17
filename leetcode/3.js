let s = "pwwkew";

var lengthOfLongestSubstring = function(s) {
    let n = s.length;
    let ans =0;
    let map= new Map()
    for (let start = 0, last = 0; start < n; start++) {
        if(map.has(s[start])){
            last =  Math.max(map.get(s[start])+1, last);//+1 last跳掉下一个
        }
        ans = Math.max(ans,start-last+1);
        map.set(s[start],start)

    }
    return ans;
};
console.log(lengthOfLongestSubstring(s));