var uid = 0;

export default class Dep {
    constructor() {
        // console.log('dep');
        // 用数组存储自己的订阅者，存储的是 Watcher 的实例
        this.subs = [];
    }
    // 添加sub
    addSubs(sub) {
        this.subs.push(sub);
    }
    // 添加依赖
    depend() {
        // 自己指定的全局位置
        if (Dep.target) {
            this.addSubs(Dep.target);
        }
    }
    notify() {
        console.log('发布');
        // 浅克隆一份
        const subs = this.subs.slice();
        for(let i = 0; i < subs.length; i++) {
            subs[i].update();
        }
    }
}