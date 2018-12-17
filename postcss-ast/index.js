const fs = require('fs');
const postcss = require('postcss');
const path = require('path');

const baseCssPath = './orderDetail.css';

const outBasePath = './build';
const ImgPublicPath = 'http://img.ddky.com';
!fs.existsSync(outBasePath)&&fs.mkdirSync(outBasePath);
fs.readFile(baseCssPath, (err, css) => {
    // postcss([])
    //     .process(css, { from: baseCssPath, to: 'dest/app.css' })
    //     .then(result => {
    //         fs.writeFile('dest/app.css', result.css)
    //         if ( result.map ) fs.writeFile('dest/app.css.map', result.map)
    //     })

    let root = postcss.parse(css, {from: baseCssPath});
    root.walkRules((rule) => {
        if (rule.selector === 'distribution-box') {

        }
        if (rule.nodes) {
            rule.nodes.forEach((item) => {
                if (item.prop === 'background-image') {
                    var testStr = item.value;
                    let imgPath = extractArgs(testStr)[0];
                    item.value = `url("${path.join(ImgPublicPath,path.basename(imgPath))}")`;
                }
            });
        }
    });
    let outCssBasePath = path.join(__dirname,outBasePath,'css');
    !fs.existsSync(outCssBasePath)&&fs.mkdirSync(outCssBasePath);

    const writeCssPath = path.join(__dirname,outBasePath,'css',baseCssPath);
    const result = root.toResult({ to: writeCssPath, map: true });
    fs.writeFile(writeCssPath, result.css,function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('ok.');
        }
    })
    // if ( result.map ) fs.writeFile(writeCssPath, result.map)
    // console.log(root);
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
// console.log(extractArgs("url('../img/distribution_bg.png')"));