import observe from './observe';
import Dep from './Dep';

export default function defineReactive(data, key, val) {
    const dep = new Dep();
    // console.log('defineReactive:', key, data);
    if (arguments.length === 2) {
        val = data[key];
    }

    let child = observe(val);

    Object.defineProperty(data, key, {
        get() {
            // console.log('访问', key, val);
            if (Dep.target) {
                dep.depend();
                if(child) {
                    child.dep.depend();
                }
            }
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            console.log('设置', key, val);
            val = newVal;
            // 当设置了新值，也需要被观察
            child = observe(newVal);
            // 发布订阅模式
            dep.notify();
        }
    });
}
