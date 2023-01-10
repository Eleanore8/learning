import { def } from './util';
import defineReactive from './defineReactive';
import { arrayMethods } from './array';
import observe from './observe';
import Dep from './Dep';

export default class Observer {
    constructor(value) {
        // 每一个 Observer 的实例都有一个 dep 实例
        this.dep = new Dep();
        // console.log('Observer:', value);
        // 构造函数的this指向的是实例本身
        def(value, '__ob__', this, false);
        if (Array.isArray(value)) {
            // console.log('Observer:', value);
            // 将数组的原型指向 arrayMethods
            Object.setPrototypeOf(value, arrayMethods);
        } else {
            this.walk(value);
        }
    }
    // 遍历
    walk(val) {
        for(let key in val) {
            defineReactive(val, key);
        }
    }
    // 数组
    arrayObserve(arr) {
        for(let i = 0; i < arr.length; i++) {
            observe(arr[i]);
        }
    }
}
