import createElement from './createElement';
import patchVnode from './patchVnode';

function checkSameVnode(oldVnode, newVnode) {
    return newVnode.sel === oldVnode.sel && newVnode.key === oldVnode.key;
}

export default function (parentElm, oldChildren, newChildren) {
    // console.log('parentElm:', parentElm);
    // console.log('oldChildren:', oldChildren);
    // console.log('newChildren:', newChildren);
    // 旧前
    let oldStartI = 0;
    // 旧后
    let oldEndI = oldChildren.length - 1;
    // 新前
    let newStartI = 0;
    // 新后
    let newEndI = newChildren.length - 1;
    // 旧前节点
    let oldStartVnode = oldChildren[0];
    // 旧后节点
    let oldEndVnode = oldChildren[oldEndI];
    // 新前节点
    let newStartVnode = newChildren[0];
    // 新后节点
    let newEndVnode = newChildren[newEndI];
    let keyMap;
    // debugger;
    while(oldStartI <= oldEndI && newStartI <= newEndI) {
        console.log('=====');
        if(oldStartVnode == null) {
            oldStartVnode = oldChildren[++oldStartI];
        } else if(oldEndVnode == null) {
            oldEndVnode = oldChildren[--oldEndI];
        } else if(newStartVnode == null) {
            newStartVnode = newChildren[++newStartVnode];
        } else if(newEndVnode == null) {
            newEndVnode = newChildren[--newEndI];
        } else if(checkSameVnode(oldStartVnode, newStartVnode)) {
            // 新前与旧前
            console.log('1. 新前与旧前');
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldChildren[++oldStartI];
            newStartVnode = newChildren[++newStartI];
        } else if(checkSameVnode(oldEndVnode, newEndVnode)) {
            // 新后与旧后
            console.log('2. 新后与旧后');
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldChildren[--oldEndI];
            newEndVnode = newChildren[--newEndI];
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 新后与旧前
            console.log('3. 新后与旧前');
            patchVnode(oldStartVnode, newEndVnode);
            // console.log(33, oldEndVnode.elm.nextSibling);
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
            oldStartVnode = oldChildren[++oldStartI];
            newEndVnode = newChildren[--newEndI];
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 新前与旧后
            console.log('4. 新前与旧后');
            patchVnode(oldEndVnode, newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldChildren[--oldEndI];
            newStartVnode = newChildren[++newStartI];
        } else {
            // 寻找key的map
            if(!keyMap) {
                keyMap = {};
                for (let i = oldStartI; i <= oldEndI; i++) {
                    let key = oldChildren[i].key;
                    if(key !== undefined) {
                        keyMap[key] = i;
                    }
                }
            }
            const idxInOld = keyMap[newStartVnode.key];
            console.log('idxInOld:', idxInOld);
            // idxInOld 为 undefined，表示为新的一项
            if (idxInOld === undefined) {
                parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
            } else {
            // 否则不是新的，需要移动
                const moveVnode = oldChildren[idxInOld];
                patchVnode(moveVnode, newStartVnode);
                // 将其设置为 undefined
                oldChildren[idxInOld] = undefined;
                parentElm.insertBefore(moveVnode.elm, oldStartVnode.elm);

            }
            newStartVnode = newChildren[++newStartI];
        }
    }
    // 是否有剩余节点
    if(newStartI <= newEndI) {
        console.log('新增');
        console.log(newStartI);
        console.log(newEndI);
        const child =  newChildren[newEndI + 1];
        const before = !child ? null : child.elm;
        console.log(before);
        for(let i = newStartI; i <= newEndI; i++) {
            parentElm.insertBefore(createElement(newChildren[i]), before);
        }
    } else if(oldStartI <= oldEndI) {
        console.log('删除');
        console.log(oldStartI);
        console.log(oldEndI);
        for(let i = oldStartI; i <= oldEndI; i++) {
            console.log(oldChildren[i]);
            if (oldChildren[i]) {
                parentElm.removeChild(oldChildren[i].elm);
            }
        }
    }
}