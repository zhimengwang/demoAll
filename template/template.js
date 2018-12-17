let tpl = '你好，我的名字<%name%>,今年已将<%info.age%>岁了';

function tokenize(str) {
    let openTag = '<%';
    let closeTag = '%>';
    let ret = [];
    do {
        let index = str.indexOf(openTag);
        index = index === -1 ? str.length : index;
        let value = str.slice(0, index);
        ret.push({
            expr: value,
            type: 'text'
        });
        str = str.slice(index + openTag.length);
        if (str) {
            index = str.indexOf(closeTag);
            let value = str.slice(0, index);
            ret.push({
                expr: value.trim(),
                type: 'js'
            });
            str = str.slice(index + closeTag.length);

        }

    } while (str.length);
    return ret;
}

let rproperty = /\.\s*[\w\.\$]+/g;
let stringPool = {};
let quote = JSON.stringify;
let rfill = /\?\?\d+/g;
let rident = /[$a-zA-Z_][$a-zA-Z0-9_]*/g;
let number = 1;

function dig(a) {
    let key = '??' + number++;
    stringPool[key] = a;
    return key;

}

function fill(a) {
    return stringPool[a];
}


function render(str) {
    stringPool = {};
    let tokens = tokenize(str);
    let ret = [];
    tokens.forEach((token) => {
        if (token.type === 'text') {
            ret.push(quote(token.expr));
        } else {
            var js = token.expr.replace(rproperty, dig);
            js = js.replace(rident, function (a) {
                return 'data.' + a;
            });
            js = js.replace(rfill, fill);
            ret.push(js);
        }
    });
    return ret.join('+');
}

console.log(render(tpl));