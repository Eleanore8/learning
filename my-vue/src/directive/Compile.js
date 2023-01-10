export default class Compile {
    constructor(el, vue) {
        this.$vue = vue;
        this.$el = document.querySelector(el);
        if(this.$el) {
            // 将节点变为Fragment
            let $frag = this.nodeToFragment(this.$el);
            // 编译
            this.compile($frag);
        }
    }

    nodeToFragment(el) {
        let frag = document.createDocumentFragment();
        let child;
        while(child = el.firstElementChild) {
            frag.appendChild(child);
        }
        // console.log(frag);
        return frag;
    }

    compile(el) {
        let childNodes = el.childNodes;
        console.log(childNodes);
        childNodes.forEach(node => {
            // console.log(node.nodeType);
            if(node.nodeType === 1) {
                this.compileElement(node);
            } else if(node.nodeType === 3) {
                this.compileText(node);
            }
        });
    }

    compileElement(node) {
        let attrs = [...node.attributes];
        // console.log(attrs);
        attrs.forEach(attr => {
            let name = attr.name;
            let val = attr.value;
            if(name.indexOf('v-') === 0) {
                let directName = name.substring(2);
                if(directName === 'model') {
                    
                }
            }
        });
    }

    compileText() {}
}