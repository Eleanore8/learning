import vnode from './vnode';

/**
 * @params sel
 * @params data
 * @params c
 * 
 * eg:
 * h('a',{}, '文字')
 * h('a',{}, [])
 * h('a',{}, h('span', {}, 'span'))
 */
export default function (sel, data, c) {
    if(arguments.length !== 3) throw Error('参数不合法');
    // c是文字
    if(typeof c === 'string' || typeof c === 'number') {
        return vnode(sel, data, undefined, c, undefined);
    } 
    // c是数组
    if (Array.isArray(c)) {
        let children = [];
        for (let i = 0; i < c.length; i++){
            if (typeof c[i] !== 'object' && !c[i].hasOwnProperty('sel')) {
                throw Error('数组参数不合法');
            }
            children.push(c[i]);
        }
        return vnode(sel, data, children, undefined, undefined);
    }
    // c是h函数
    if(typeof c === 'object' && c.hasOwnProperty('sel')) {
        return vnode(sel, data, [c], undefined, undefined);
    }
    throw Error('最后一位参数不合法');
}