/**
 * 真正创建节点
 * @param {*} Vnode 
 * props属性
 */
export default function createElement (Vnode) {
    let domNode = document.createElement(Vnode.sel);
    const children = Vnode.children;
    // 有字节点还是文本
    if(Vnode.text !== '' && (children === undefined || children.length === 0)) {
        domNode.innerText = Vnode.text;
    } else if (Array.isArray(children) && children.length) {
        // 内部有子节点
        for(let i = 0; i < children.length; i++) {
            const cur = children[i];
            let dom = createElement(cur);
            domNode.appendChild(dom);
        }
    }
    Vnode.elm = domNode;
    return domNode;
}