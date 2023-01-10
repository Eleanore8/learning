import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';

export default function (oldVnode, newVnode) {
    if(oldVnode.sel === '' || oldVnode.sel === undefined){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }
    // console.log(sameVnode(oldVnode, newVnode));
    // 相同节点
    if(sameVnode(oldVnode, newVnode)){
        patchVnode(oldVnode, newVnode);
    } else {
        // console.log('newVnode:', newVnode);
        // 不是同一个节点，暴力插入新的节点，删除老的节点
        const newElmDom = createElement(newVnode);
        if(oldVnode.elm && oldVnode.elm.parentNode && newElmDom) {
            oldVnode.elm.parentNode.insertBefore(newElmDom, oldVnode.elm);
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
    // console.log(oldVnode);
}

function sameVnode (oldVnode, newVnode) {
    return oldVnode.sel === newVnode.sel && oldVnode.key === oldVnode.key;
}