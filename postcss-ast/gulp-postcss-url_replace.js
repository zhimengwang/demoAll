var postcss = require('postcss');
var path = require('path');
const ImgPublicPath = 'http://img.ddky.com';

module.exports = postcss.plugin('postcss-test-plugin', function(options) {
    options = options|| {};
    return function(root) {
        root.walkRules((rule) => {
            if (rule.nodes) {
                rule.nodes.forEach((item) => {
                    if (item.prop === 'background-image') {
                        item.value = transformUrl(item.value,options.publicPath);
                    }else if(item.prop ==='background'){
                        if(item.value.indexOf('url')>-1){
                            item.value = item.value.split(" ")
                                .map((value)=>{
                                    if(value.indexOf('url')>-1 ){
                                        return transformUrl(value,options.publicPath)
                                    }
                                    return value
                                })
                                .join(' ')
                        }
                    }
                });
            }
        });
    };
});
var ARROW_ARG = /^([^\(]+?)=>/;
var FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function extractArgs(fn) {
    var fnText =fn.replace(STRIP_COMMENTS, '')
        .replace(/['"]/g,'');
    args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS);
    return args[1].split(',');
};
function transformUrl(url,publicPath) {
    let imgPath = extractArgs(url)[0];
    return`url("${path.join(publicPath,path.basename(imgPath))}")`;
}