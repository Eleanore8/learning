import { def } from './util';

const arrayProperty = Array.prototype;

export const arrayMethods = Object.create(arrayProperty);

const needChangeMethods = ['pop','push', 'shift', 'unshift', 'splice', 'sort', 'reserve'];

needChangeMethods.forEach((method) => {
    const origin = arrayMethods[method];
    def(arrayMethods, method, function() {
        // 将数组的__ob__属性取出来
        const ob = this.__ob__;
        // push unshift splice
        let insert = [];
        switch(method) {
            case 'push':
            case 'unshift':
                insert = arguments;
                break;
            case 'splice':
                insert = [...arguments].slice(2);
                break;
        }
        if (insert.length) {
            ob.arrayObserve(insert);
        }
        // 调用原先的方法
        const res = origin.call(this, ...arguments);

        ob.dep.notify();
        return res;
    }, false);
});
