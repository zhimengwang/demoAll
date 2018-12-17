const gcoord = require('gcoord');

var result = gcoord.transform([116.417273, 39.916216], gcoord.GCJ02, gcoord.Baidu);
console.log(result);  // [ 122.99395597, 44.99804071 ]
