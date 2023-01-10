// ast
import parseAttrs from './parseAttrs';

export default function parse(templateStr) {
    let stackDom = [];
    let stackText = [{
        children: []
    }];
    let i = 0;
    let rest = templateStr;
    const tagStart = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/;
    const tagEnd = /^\<\/([a-z]+[1-6]?)\>/;
    const wordReg = /^([^\<]+)\<\/[a-z]+[1-6]?\>/;
    while(i < templateStr.length) {
        rest = templateStr.substring(i);
        if (tagStart.test(rest)) {
            const matchs = rest.match(tagStart);
            const attrs = matchs[2] || '';
            const dom = matchs && matchs[1];
            stackDom.push(dom);
            stackText.push({
                tag: dom,
                attrs: parseAttrs(attrs),
                children: []
            });
            i += dom.length + 2 + attrs.length;
            // console.log(stackDom, stackText);
        } else if(tagEnd.test(rest)) {
            const matchs = rest.match(tagEnd);
            const dom = matchs && matchs[1];
            if (dom === stackDom[stackDom.length - 1]) {
                let domTop = stackDom.pop();
                let arrTop = stackText.pop();
                if (stackText.length) {
                    let last = stackText[stackText.length - 1];
                    last.children.push(arrTop);
                }
            }
            i += dom.length + 3;
            // console.log(stackDom, JSON.stringify(stackText));
        }  else if(wordReg.test(rest)) {
            const matchs = rest.match(wordReg);
            const dom = matchs && matchs[1];
            if(!/^\s/.test(dom)) {
                // console.log(stackText);
                stackText[stackText.length - 1].children.push({
                    text: dom,
                    tag: 3
                });
                // console.log(dom);
            }
            i += dom.length;
        } else {
            i++;
        }
    }
    // console.log(stackDom, JSON.stringify(stackText));
    return stackText[0].children;
}