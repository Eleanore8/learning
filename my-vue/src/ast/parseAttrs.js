export default function parseAttrs (attrs) {
    if(!attrs) return [];
    let point = 0;
    let isYin = false;
    let res = [];
    for (let index = 0; index < attrs.length; index++) {
        const char = attrs[index];
        if(char === '"') {
            isYin = !isYin
        //不在引号中
        } else if(char === ' ' && !isYin && point !== index) {
            res.push(attrs.substring(point, index).trim());
            point = index;
        }
    }
    res.push(attrs.substring(point, attrs.length).trim());
    res = res.map(item => {
        let arr = item.split('=');
        return {
            name: arr[0],
            value: arr[1].replace(/\"/g, '')
        }
    });
    // console.log(res);
    return res;
}