import Dep from './Dep';
import { parsePath } from './util';

/**
 * vm.$wather(data, 'parent.xxx', () => {});
 * 
 */
var wid = 0; 
export default class Watcher {
    constructor(target, expression, callback) {
        console.log('Watcher');
        this.id = wid++;
        this.target = target;
        this.getter = parsePath(expression);
        this.callback = callback;
        this.value = this.get();
    }
    get() {
        // 依赖收集，将全局的 Dep.target 设置为 Watcher 本身，那么就是进入了依赖收集阶段
        Dep.target = this;
        const obj = this.target;
        let value;
        try {
            value = this.getter(obj);
        } finally {
            Dep.target = null;
        }
        return value;
    }
    update() {
        this.run();
    }
    run() {
        this.getAndInvoke(this.callback);
    }
    getAndInvoke(cb) {
        const value = this.get();
        if(value !== this.value || typeof value === 'object') {
            const oldVal = this.value;
            this.value = value;
            cb.call(this.target, value, oldVal);
        }
    }
}