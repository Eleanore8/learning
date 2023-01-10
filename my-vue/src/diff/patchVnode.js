import createElement from './createElement';
import updateChildren from './updateChildren';

export default function (oldVnode, newVnode) {
    if(oldVnode === newVnode) return;
    const children = newVnode.children;
    const oldChildren = oldVnode.children;
    //  新的为文本节点
    if (newVnode.text !== undefined && (children === undefined || children.length === 0)) {
        if(newVnode.text !== oldVnode.text) {
            oldVnode.elm.innerText = newVnode.text;
        }
    } else {
        // 文本变为有children的
        if(oldChildren === undefined || oldChildren.length === 0) {
            oldVnode.elm.innerHTML = '';
            for(let i = 0; i < children.length; i++) {
                const newElmDom = createElement(children[i]);
                oldVnode.elm.appendChild(newElmDom, oldVnode.elm);
            }
        } else {
            // 新旧都为 children
            updateChildren(oldVnode.elm, oldChildren, children);
        }
    }
}