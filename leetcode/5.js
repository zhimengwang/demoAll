// var longestPalindrome = function (s) {
//     let t = "$#";
//     for (let i = 0; i < s.length; ++i) {
//         t += s[i];
//         t += "#";
//     }
//     // Process t
//     p = new Array(t.length);
//     let maxRight = 0, maxCenter = 0, resLen = 0, resCenter = 0;
//     for (let i = 1; i < t.length; i++) {
//         let j = maxCenter - (i - maxCenter);
//         p[i] = maxRight > i ? Math.min(p[j], maxRight - i) : 1;
//         //硬算p值
//         while (t[i + p[i]] === t[i - p[i]]) {
//             ++p[i];
//         }
//         if (maxRight < i + p[i]) {
//             maxRight = i + p[i];
//             maxCenter = i;
//         }
//         console.log(p);
//         // console.log([p[i],maxRight]);
//
//         //保存结果
//         if (resLen < p[i]) {
//             resLen = p[i];
//             resCenter = i;
//         }
//     }
//     return s.substr((resCenter - resLen) / 2, resLen - 1);
// };

function longestPalindrome(s) {
    let t = "$#";
    for (let i = 0; i < s.length; ++i) {
        t += s[i];
        t += "#";
    }

    let p = new Array(t.length);
    let maxCenter = 0;
    let maxRight = 0;
    for (let i = 1; i < p.length; i++) {
        let j = maxCenter - (i - maxCenter);
        p[i] = maxRight > i ? Math.min(p[j], maxRight - i) : 1;
        if (maxRight > i) {
            if (maxRight - i > p[j]) {// 是否j子串是否在最大回文子串内
                p[i] = p[j];
            } else {
                p[i] = maxRight - i; // 取最小
            }
        } else {
            p[i] = 1;
        }

        let l = 1;
        while (t[i + l] === t[i - l]) {
            l++
        }
        p[i] = p[i] + l - 1;

        if (i + p[i] > maxRight) {
            maxCenter = i + p[i];
            maxCenter = i;
        }
    }

            //保存结果
        if (resLen < p[i]) {
            resLen = p[i];
            resCenter = i;
        }
    return p

}

console.log(longestPalindrome('122122'));